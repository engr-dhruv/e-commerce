#include <bits/stdc++.h>
using namespace std;

int main()
{
    int n;
    cin >> n;
    while(n!=1)
    {
        cout << n <<" ";
        if(n%2)
        {
            n = 3*n+1;
        }
        else
        {
            n/=2;
        }
    }
    cout << "1";
}