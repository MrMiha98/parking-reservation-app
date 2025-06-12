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
- open the root of the project in a terminal of your choice
- run **npm install** to install all neccessary dependencies

## Setup Enviroment Variables
- Create a `.env.local` file in your root directory and add:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key```

## 🧪 Run the App Locally
