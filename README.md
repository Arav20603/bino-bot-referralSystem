# Referral and Rewards MVP

This is a small project I made in less than 24 hours.  
The idea is simple — each user gets a unique referral link.  
If someone signs up using that link, the owner of the link gets some random points (0–10).  
These points can be used later for discounts or other perks.

---

## Features

- Signup and login
- Each user gets their own referral link
- Random points are given when a friend signs up
- Simple wallet to keep track of points
- Can be connected to any system for redeeming perks

## Live demo
🌐https://bino-bot-referral-frontend.onrender.com/

---

## Screenshots

**Login Page**  
<img src="https://github.com/user-attachments/assets/e70b7e3e-dc6d-4fda-bbc1-ced0c6715621" width="400"/>

**Signup Page**  
<img src="https://github.com/user-attachments/assets/6475f280-043b-48e8-9273-497a62a4ead3" width="400"/>

**Home Page 1**  
<img src="https://github.com/user-attachments/assets/e017e9cb-62e5-4df5-b07a-71000b386a99" width="400"/>  

**Home Page 2**  
<img src="https://github.com/user-attachments/assets/d1a848fb-9a00-4b68-97e9-85ea7da898f9" width="400"/>  

**Menu**  
<img src="https://github.com/user-attachments/assets/97c4b4eb-454c-46e1-8b1a-c04147459763" width="400"/>


---

## Tech Stack

- **Frontend:** React, Redux Toolkit, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Deploy:** (Render - for both frontend and backend)

---

## How to run

```bash
# clone the repo
git clone https://github.com/Arav20603/bino-bot-referralSystem.git

# go to the project folder
cd bino-bot-referralSystem

# go to the folder
cd client

# install frontend
cd client
npm install

# install backend
cd ../server
npm install

# run backend
npm start

# run frontend
npm run dev
