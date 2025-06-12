# Parking Reservation App 🚗

A web app that lets parking spot owners free up their spots and lets non-owners reserve them in real-time using a calendar view.

## 📦 Features
-👤 User authentication with Supabase using email and password
- 📅 Calendar-based spot availability
- 🅿️ User can either pick a spot or chose to be a spotless user (not given a personal parking spot)
- 🔐 Role-based access (owner vs spotless user)
- ✅ Real-time data updates and notification toasts

## 🚀 Getting Started
- Download and extract the .zip file
- Open the root of the project in a terminal of your choice
- Run **npm install** to install all neccessary dependencies

## Setup Enviroment Variables
- Create a `.env.local` file in your root directory and add:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

## 🧪 Run the App Locally
- Run `npm run dev` to start the local server
- Open `http://localhost:3000`
- Sometimes the jsx component files are renamed and start with a capital letter which triggers an error when importing components
- In that case just capitalise the first letter of the component file name like so: `footer.tsx` -> `Footer.tsx`

## 🧰 How It Works

# Starting as a new user
- The parking layout consists of 2 floors
- Every parking spot consists of a parking spot number and a name of the person that currently has the spot reserved
- Green and red colors are used to visualise the status of the spot, red meaning "RESERVED" and green meaning "FREE"
- The main background color of a spot indicates the availability status for today
- The little triangle in the top right corner indicates the availability status for tommorow

# Starting as a new user
- Every new user need to register and confirm an link that is send to the selected email address
- After a successfull cofirmation the user is greeted with a modal
- The modal allows the user to pick a number (number = parking spot number) if they own a parking spot
- or the option "I Dont Own A Parking Spot" if they do not own a parking spot
- After that the role and the selected spot is inserted into the database

# Owners workflow
- Owners can select the free up button and free up their parking spot by selecting the wanted dates and confirming by clicking the button
- In case the owner changes their mind, they can reverse the freed up reservation by selecting the trash big icon and selecting the dates they want to keep their spot locked

# Spotless Users Workflow
- Users can click on any spot they want and are shown a calendar that shows the dates the selected spot is free
- Free days are marked as green and are selectable
- The unavailable days are unselectable
- The user can select the dates they wish to reserve the spot and confirm using the button
- The reservation is then inserted into the database

## 🗄️ Backend
- The backend is setup using Supabase
- 2 services: Auth and Database

  # Auth
- Every new user is inserted into the Authentication table and give a unique id, email and password

  # Database
- In the Database part, there are 3 tables;
- **parking_availability** - every row inside this table represents a free parking spot for a date. Consists of a parking spot id **(spot_id)** and date **(date)**
- **parking_reservations** - every row in the table represents a reservation made by a spotless user. Every row consists of a **spot_id**, **date**, **user_id** and **username**
- **profiles** - every row represents a user and their role (a number representing a parking spot or "none" if the user is a spotless user). Every row consists of **id** and **role**
