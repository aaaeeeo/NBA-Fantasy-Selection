final: electron/node_modules deploy
	@Electron electron

electron/node_modules: electron/package.json
	@(cd electron && npm install)

deploy: draft-api 
	@cp draft-api electron/app/lib

draft-api: draft-api.cpp
	g++ draft-api.cpp -o draft-api -std=c++11

clean:
	@rm -f draft-api

call: draft-api
	@./draft-api 200 1 1 1 1 1 1 1 1 < result.json 2&>null

run: draft-api
	@./draft-api 200 1 1 1 1 1 1 1 1 < result.json