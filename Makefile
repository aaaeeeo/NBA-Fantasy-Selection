CXX=g++
CPPFLAGS=-std=c++11

GUIDIR=electron
BLDDIR=builds
CAPI=draft-api
APPNAME=NBA-Selection
OS:=$(shell uname)
LOWER_OS=$(shell echo $(OS) | tr A-Z a-z)
ifeq ($(OS),Darwin)
  OPEN=open
else
  OPEN= 
endif
UNAME_P:=$(shell uname -m)
ifeq ($(UNAME_P),x86_64)
    ARCH = x64
else
	ifneq ($(filter %86,$(UNAME_P)),)
	    ARCH = ia32
	endif
	ifneq ($(filter arm%,$(UNAME_P)),)
	    ARCH = armv7l
	endif
endif
GENDIR=$(APPNAME)-$(LOWER_OS)-$(ARCH)

debug: $(GUIDIR)/node_modules deploy
	@cp $(GUIDIR)/main.js.debug $(GUIDIR)/main.js
	@Electron $(GUIDIR)
	@rm $(GUIDIR)/main.js

release: $(BLDDIR)
	@$(OPEN) ./$(BLDDIR)/$(GENDIR)/$(APPNAME)*

package: $(BLDDIR)

$(BLDDIR): deploy $(GUIDIR)/node_modules
	@cp $(GUIDIR)/main.js.release $(GUIDIR)/main.js
	@electron-packager $(GUIDIR) --overwrite --out=$@
	@rm $(GUIDIR)/main.js

$(GUIDIR)/node_modules: $(GUIDIR)/package.json
	@(cd $(GUIDIR) && npm install)

deploy: $(CAPI) 
	@cp $^ $(GUIDIR)/app/lib

api: $(CAPI)

$(CAPI): $(CAPI).o
	$(CXX) -o $@ $^

clean:
	@rm -f -r $(BLDDIR) *.o *~ $(CAPI)

call: $(CAPI)
	@./$(CAPI) 200 1 1 1 1 1 1 1 1 < result.json 2&>null

run: $(CAPI)
	@./$(CAPI) 200 1 1 1 1 1 1 1 1 < result.json