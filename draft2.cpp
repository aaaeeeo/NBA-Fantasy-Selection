    //
    // Created by Li Zuoming on 11/11/15.
    //
    #include <iostream>
    #include <string>
    #include <sstream>
    #include <map>

    using namespace std;

    #define MAX_LINES 20000
    #define MAX_SALARY 500
    #define MAX_POS 3
    #define NUM_SOL 5

    #define CLEAR() printf("\033[2J")

    int err_input()
    {
        cerr<<"ERROR: ILLAGE INPUT. Please use DKSalaries.csv as stdin."<<endl;
        cerr<<"ABORT"<<endl;
        return 1;
    }

    int main(int argc, char *argv[])
    {

        fprintf(stderr,"\033[2J\033[35m \
               ************************************************\n \
               *****   DRAFT KING NBA optimal draft 2.0   *****\n \
               *****        Author:     Zuoming Li        *****\n \
               *****  please use DKSalaries.csv as stdin  *****\n \
               ************************************************\033[0m");

        string ori_data[MAX_LINES][6];
        string line;
        string word;

        fprintf(stderr,"\n\n\033[34m\033[47mReading from stdin ...\033[0m\n");
        int i=0;
        while( getline(cin,line))
        {
            if(line.at(0)!='"')
                return err_input();

            istringstream is;
            is.str(line);
            int j=0;
            while(getline(is,word,','))
            {
                if (*word.begin() == '"')
                    word.erase(word.begin());
                if (*(--word.end()) == '"')
                    word.erase(--word.end());
                if (*(word.end()-2) == '"')
                {
                    word.erase(--word.end());
                    word.erase(--word.end());
                }
                ori_data[i][j]=word;
                j++;
                //cerr<<word<<endl;
            }
            if(j!=6)
                return err_input();
            i++;
            //cerr<<"rd.."<<i<<endl;
        }

        int player_num = i-1;
        int max_salary = MAX_SALARY;
        int max_pos_num = 3;

        fprintf(stderr, "\033[32mDONE: %d players read.\033[0m\n\n", player_num);
        //cerr<<"DONE: "<<player_num<<" players read."<<endl<<endl;


        auto dp = new double[player_num+1][MAX_SALARY+1][MAX_POS+1][MAX_POS+1][MAX_POS+1][MAX_POS+1][MAX_POS+1];
        memset(dp,0, sizeof(double)*(player_num+1)*(MAX_SALARY+1)*(MAX_POS+1)*(MAX_POS+1)*(MAX_POS+1)*(MAX_POS+1)*(MAX_POS+1));

        auto dp2 = new double[player_num+1][MAX_SALARY+1][MAX_POS+1][MAX_POS+1][MAX_POS+1][MAX_POS+1][MAX_POS+1];
        memset(dp2,0, sizeof(double)*(player_num+1)*(MAX_SALARY+1)*(MAX_POS+1)*(MAX_POS+1)*(MAX_POS+1)*(MAX_POS+1)*(MAX_POS+1));

        for(int sol_num=1; sol_num<=NUM_SOL; sol_num++)
        {
            memcpy(dp,dp2,sizeof(double)*(player_num+1)*(MAX_SALARY+1)*(MAX_POS+1)*(MAX_POS+1)*(MAX_POS+1)*(MAX_POS+1)*(MAX_POS+1));
            memset(dp2,0, sizeof(double)*(player_num+1)*(MAX_SALARY+1)*(MAX_POS+1)*(MAX_POS+1)*(MAX_POS+1)*(MAX_POS+1)*(MAX_POS+1));
            //cerr<<dp[player_num][MAX_SALARY][2][2][2][2][2];

            fprintf(stderr,"\033[?25l\033[34m\033[47mComputing the %d-th optimal selection ...\033[0m\n\033[31m0%%\033[0m\n", sol_num);

            

            int dis=1;
            for(int i=1; i<=player_num; i++)
            {
                if(100*i/player_num>=dis)
                {
                    //CLEAR();
                    fprintf(stderr,"\033[1A\033[K\033[31m%d%%\033[0m\n",dis);
                    //cerr<<dis<<"%"<<endl;
                    dis=100*i/player_num+1;
                }
                for(int j=0; j<=max_salary; j++)
                {
                    for(int a=0; a<=MAX_POS; a++)
                    {
                        for(int b=0; b<=MAX_POS; b++)
                        {
                            for(int c=0; c<=MAX_POS; c++)
                            {
                                for(int d=0; d<=MAX_POS; d++)
                                {
                                    for(int e=0; e<=MAX_POS; e++)
                                    {
                                        int salary = stoi(ori_data[i][2])/100;
                                        double fppg = stof(ori_data[i][4]);
                                        string pos = ori_data[i][0];
                                        double max = dp[i][j][a][b][c][d][e];
                                        if(sol_num==1)
                                            max=1000000;
                                        double max2 = 0;
                                        if(max > dp[i-1][j][a][b][c][d][e])
                                            max2 = dp[i-1][j][a][b][c][d][e];
                                        if(dp2[i-1][j][a][b][c][d][e] > max2 && dp2[i-1][j][a][b][c][d][e] < max)
                                            max2 = dp2[i-1][j][a][b][c][d][e];

                                        if(j-salary >= 0)
                                        {
                                            double put=-10000;
                                            if(pos=="PG" && a>0)
                                                put = dp2[i - 1][j - salary][a-1][b][c][d][e];
                                            else if(pos=="SG" && b>0)
                                                put = dp2[i - 1][j - salary][a][b-1][c][d][e];
                                            else if(pos=="SF" && c>0)
                                                put = dp2[i - 1][j - salary][a][b][c-1][d][e];
                                            else if(pos=="PF" && d>0)
                                                put = dp2[i - 1][j - salary][a][b][c][d-1][e];
                                            else if(pos=="C" && e>0)
                                                put = dp2[i - 1][j - salary][a][b][c][d][e-1];
                                            put+=fppg;

                                            if( put>max2 && put < max)
                                                max2=put;
                                        }
                                        dp2[i][j][a][b][c][d][e]=max2;
                                        //cerr<<i<<" "<<j<<" "<<a<<b<<c<<d<<e<<" : "<<max2<<endl;
                                    }
                                }
                            }
                        }
                    }

                }

            }

            double op=0;
            int a,b,c,d,e;
            for(int i=0; i<2; i++)
                for(int j=0; j<2; j++)
                    for(int k=1; k<=5; k++)
                    {
                        a = 1 + (i==0) + (k==1);
                        b = 1 + (i==1) + (k==2);
                        c = 1 + (j==0) + (k==3);
                        d = 1 + (j==1) + (k==4);
                        e = 1 + (k==5);

                        double subop = dp2[player_num][MAX_SALARY][a][b][c][d][e];
                        if(subop>op)
                        {
                            op=subop;
                        }

                    }

    ////////////////////////

            fprintf(stderr, "\033[32mDONE.\033[0m");
            fprintf(stderr,"\n\033[34mOutputing results to stdout ...\033[0m\n\33[?25h");


            cout<<"-------------------------------------------------------------------------------"<<endl;
            cout<<"Selection "<<sol_num<<":"<<endl<<"TOTAL FPPG: "<<op<<endl;
            cout<<"TYPE: "<<a<<"PG "<<b<<"SG "<<c<<"SF "<<d<<"PF "<<e<<"C"<<endl<<endl;

            map<int, int> ply;
            int key;
            int num=0;
            int j = MAX_SALARY;
            for (int i = player_num; i > 0; i--)
            {

                if (dp2[i][j][a][b][c][d][e] != dp2[i - 1][j][a][b][c][d][e])
                {
                    num++;
                    int salary = stoi(ori_data[i][2]) / 100;
                    string pos = ori_data[i][0];

                    j -= salary;
                    if (pos == "PG")
                    {
                        a--;
                        key=10+num;
                    }
                    else if (pos == "SG")
                    {
                        b--;
                        key=20+num;
                    }
                    else if (pos == "SF")
                    {
                        c--;
                        key=30+num;
                    }
                    else if (pos == "PF")
                    {
                        d--;
                        key=40+num;
                    }
                    else if (pos == "C")
                    {
                        e--;
                        key=50+num;
                    }
                    ply[key]=i;
                    //cerr<<a<<b<<c<<d<<e<<endl;
                }

            }

            for(auto it=ply.begin(); it!=ply.end(); it++)
            {
                int i= (*it).second;
                cout << ori_data[i][0] << "\t" << ori_data[i][1] << "\t\t" << ori_data[i][5] << "\t"
                << ori_data[i][2] << "\t" << ori_data[i][4] <<"\t" << ori_data[i][3]<< endl;
            }
            cout<<"-------------------------------------------------------------------------------"<<endl;
            //cerr<<"PRESS ANY KEY TO COMTINUE"<<endl;
            //getchar();
            //system("PAUSE");

            fprintf(stderr, "\033[32mDONE.\033[0m\n\n");
        }

        return 0;
    }