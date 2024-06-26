# Impromptu

Welcome to **Impromptu**, the game where quick wit and creativity reign supreme! 🎉

## Overview

Impromptu is a fun and engaging platform where users respond to the "Question of the Day," rate each other's responses, and compete for the top spots on the leaderboard. Whether you're a master of improvisation or just looking to have a good time, Impromptu has something for everyone!

## Features

- **Daily Questions**: Every day brings a new and exciting question to spark your imagination. No two questions are the same, so you'll always have something fresh to ponder.
- **Submit Responses**: Let your creativity shine by submitting your unique answers to the daily question. There's no right or wrong answer—just have fun!
- **Rate Responses**: Browse and rate other players' responses. Give a high rating to the ones that make you laugh, think, or say "Wow!"
- **Leaderboard**: Check out the leaderboard to see who’s leading the pack with the most popular responses. Can you climb to the top?

## Getting Started

1. **Sign Up**: Create an account to start participating in the fun.
2. **Check the Daily Question**: Head to the prompt page to see the current Question of the Day.
3. **Submit Your Response**: Type out your answer and submit it for others to see.
4. **Rate Other Responses**: Read through other players’ submissions on the vote page and rate your favorites.
5. **Watch the Leaderboard**: See where you stand among the top wits of Impromptu!

## Set Up Locally

To run Impromptu locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/stewartkwokca/impromptu.git
   ```
2. Navigate into impromptu:
   ```bash
   cd impromptu
   ```
3. Start up the server:
   ```bash
   cd server
   echo MONGO_URL="mongodb+srv://stewartkwok:CpK9cDvMgshY3ozj@impromptudb.ertsh7p.mongodb.net/main" >.env
   echo GEMINI_API_KEY="AIzaSyD-TLeTgFJOUSEjwMbw823usitacyiVCDc" >>.env
   npm install
   node app.js
   ```
   (yes, I know we put an API key in the github, it is not connected to a credit card)
4. Start up the front-end. In impromptu/impromptu-client,
   ```bash
   npm install
   npm start
   ```
Then, you should be able to see the impromptu webpage at http://localhost:3000.


## Feedback and Support

Reach out to Jake (@JakeYoung271 on GitHub) or by email at youngjakecubes@g.ucla.edu

## Acknowledgements

Thank you to all the developers and contributors who have helped make Impromptu a reality.

---

Get ready to think on your feet, showcase your creativity, and join the fun on Impromptu! 🥳

Happy responding!

---

<p align="center">
  <img src="impromptu-client/src/pages/impromptu-icon.png" alt="Impromptu Logo" />
</p

---

*This README was generated with ❤️ by the Impromptu team: stewartkwokca (Stewart Kwok), cdevadhar (Chinmay Devadhar), JakeYoung271 (Jake Young), szxp0422 (Steven Pan), riverofspring (Kevin Zhao).*
