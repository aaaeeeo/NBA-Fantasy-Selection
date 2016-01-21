final: draft DKSalaries.csv
	@./draft <DKSalaries.csv

draft: draft.cpp
	g++ draft.cpp -o draft -std=c++11

clean:
	@rm -f draft