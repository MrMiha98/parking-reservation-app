# Parking Reservation App 🚗

A web application that enables parking spot owners to manage their spots and allows non-owners to reserve available spots in real-time using an intuitive calendar view.

## 📦 Features
- **User Authentication**: Secure email and password login powered by Supabase.
- **Calendar-Based Availability**: View and manage parking spot availability through a user-friendly calendar interface.
- **User Roles**: Choose between being a spot owner (assigned a personal parking spot) or a spotless user (no personal spot).
- **Role-Based Access Control**: Distinct functionalities for owners and spotless users.
- **Real-Time Updates**: Instant data synchronization with notification toasts for user actions.

## 🚀 Getting Started

### Prerequisites
- Node.js (version 18 or higher)
- npm (version 9 or higher)
- A Supabase account with a project set up

### Installation
1. Download and extract the project `.zip` file.
2. Open a terminal in the project’s root directory.
3. Run the following command to install dependencies:
   ```bash
   npm install
   ```

### Environment Variables
1. Create a `.env.local` file in the project root.
2. Add the following Supabase credentials (replace with your project-specific values):
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```
3. Ensure the `.env.local` file is added to `.gitignore` to prevent committing sensitive data.

### Running the App Locally
1. Start the development server:
   ```bash
   npm run dev
   ```
2. Open your browser and navigate to `http://localhost:3000`.
3. **Note**: If you encounter import errors due to component file naming, ensure component file names start with a capital letter (e.g., rename `footer.tsx` to `Footer.tsx`).

## 🧰 How It Works

### Parking Layout
- The parking garage consists of **2 floors**.
- Each parking spot displays:
  - **Spot Number**: Unique identifier for the spot.
  - **Current Occupant**: Name of the user who has reserved the spot (if any).
  - **Availability Status**:
    - **Today**: Indicated by the spot’s background color (🟢 Green = Free, 🔴 Red = Reserved).
    - **Tomorrow**: Indicated by a small triangle in the top-right corner (🟢 Green = Free, 🔴 Red = Reserved).

### New User Registration
1. Register with an email and password.
2. Confirm your account via a verification link sent to your email.
3. Upon successful confirmation, a modal prompts you to:
   - Select a parking spot number if you are an owner, or
   - Choose "I Don’t Own a Parking Spot" to register as a spotless user.
4. Your role and spot (if applicable) are saved to the database.

### Owner Workflow
- **Freeing a Spot**:
  1. Click the "Free Up" button.
  2. Select the desired dates for freeing your spot.
  3. Confirm to update the spot’s availability.
- **Reclaiming a Spot**:
  1. Click the trash bin icon.
  2. Select the dates you want to reclaim.
  3. Confirm to lock the spot back to your ownership.

### Spotless User Workflow
1. Click on any parking spot to view its availability calendar.
2. **Calendar Details**:
   - 🟢 Green dates are free and selectable.
   - Unavailable dates are disabled.
3. Select the desired reservation dates and confirm.
4. The reservation is recorded in the database.

## 🗄️ Backend
The backend is powered by **Supabase**, providing two core services: Authentication and Database.

### Authentication
- Each new user is registered in the Supabase Authentication table with:
  - Unique ID
  - Email
  - Password

### Database Schema
The database includes three tables:
- **Turn off RLS security policy** for all tables when in development, before production its recommended to assing rules and safety policies.

- **parking_availability**:
  - Tracks free parking spots for specific dates.
  - Columns:
    - `spot_id`: Unique identifier for the parking spot.
    - `date`: Date the spot is available.
- **parking_reservations**:
  - Stores reservations made by spotless users.
  - Create a constrait that prevents the user from reserving multiple spots for a specific date (one spot per given date).
  - ```sql
    ALTER TABLE parking_reservations
    ADD CONSTRAINT only_one_spot_per_date UNIQUE (user_id, date);
    ```
  - Columns:
    - `spot_id`: Parking spot identifier.
    - `date`: Reservation date.
    - `user_id`: ID of the reserving user.
    - `username`: Name of the reserving user.
- **profiles**:
  - Stores user information and roles.
  - Columns:
    - `id`: Unique user ID.
    - `role`: User role (spot number for owners or "none" for spotless users).

## 🛠️ Troubleshooting
- **Component Import Errors**: Ensure component file names start with a capital letter (e.g., `Footer.tsx` instead of `footer.tsx`).
- **Supabase Connection Issues**: Verify that `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are correctly set in `.env.local`.
- **Real-Time Updates Not Working**: Ensure your Supabase Realtime subscription is active and properly configured in the app.

## 📚 Additional Resources
- [Supabase Documentation](https://supabase.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Node.js Installation Guide](https://nodejs.org/en/download)
