https://66ad6a8364f3fcee7437771e--deft-lokum-4b73ba.netlify.app/

app needs to be redeployed after changes
--------------------

Backend Repository: https://github.com/BeMorr16/capstone_casino_backend
---------------------
Frontend Repository: https://github.com/BeMorr16/capstone_casino_frontend
---------------------
Wise Guys Casino
Overview
Wise Guys Casino is an engaging online gambling platform that offers a variety of casino games including Blackjack, Roulette, and Slot Machines. Whether you're a seasoned gambler or a newcomer looking for some fun, Wise Guys Casino provides a thrilling experience with both guest and registered user options.

---------------------
Features
Guest Access: Play with unlimited virtual money to test strategies. Your funds reset with each game or page refresh.
Registered User Benefits: Create an account to save and track your progress. Access your chip count, game record, get access to the blackjack miniGame, and build your fortune over time.
Account Information and Advanced Stats: Manage your details, analyze advanced game statistics, and filter your bet slips/transaction history.
Leaderboards and Competition: Compete for top rankings in various categories including highest winnings, most money accumulated, and best win percentage. Additional leaderboards for miniGame results.
Blackjack Mini-Game: Challenge yourself with a special Blackjack mini-game. Logged-in users start with $100 and aim to achieve 10 straight wins. Track your performance and see how you rank on the leaderboard.

---------------------


TO RUN LOCALLY:
1. _Through this repository_
   ------------------------
1. git clone git@github.com:BeMorr16/casino_capstone_BDJ.git
2. cd casino_capstone_BDJ
3. cd backend
4. steps 3-9 below
5. cd ../client
6. steps 9-12 below
---------------------

2. _Through the separate repositorys_
   ---------------------------------
1. Pull down backend repository
2. npm install
3. replace DATABASE_URL in .env file with specific local postgres DB
4. * If no SSR change ssl in shared.js to false *
5. npm run seed
6. npm run build
7. npm run start
8. will be listening on specified port.
---------------------
9. Pull down the frontend repository
10. npm install
11. npm run dev (to test and develop)
12. npm run build -> deploy on Netifly, render or other platform
