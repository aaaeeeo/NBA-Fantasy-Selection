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

debug: $(GUIDIR)/node_modules deploy
	@Electron $(GUIDIR)

release: $(BLDDIR)
	@$(OPEN) ./$(BLDDIR)/$(APPNAME)-$(LOWER_OS)*/$(APPNAME)*

package: $(BLDDIR)

$(BLDDIR): deploy $(GUIDIR)/node_modules
	@electron-packager $(GUIDIR) --overwrite --out=$@

$(GUIDIR)/node_modules: $(GUIDIR)/package.json
	@(cd $(GUIDIR) && npm install)

deploy: $(CAPI) 
	@cp $^ $(GUIDIR)/app/lib

$(CAPI): $(CAPI).o
	$(CXX) -o $@ $^

clean:
	@rm -f -r $(BLDDIR) *.o *~ $(CAPI)

call: $(CAPI)
	@./$(CAPI) 200 1 1 1 1 1 1 1 1 < result.json 2&>null

run: $(CAPI)
	@./$(CAPI) 200 1 1 1 1 1 1 1 1 < result.json