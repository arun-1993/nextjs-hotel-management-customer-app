# A Hotel Booking App in Next.js

## Functionalities

-   Users of the app are customers. They should be able to do the following:
    -   Learn about the hotel.
    -   Get information about each cabin and see booking dates.
    -   Filter cabins by their maximum occupancy.
    -   Reserve a cabin for a certain date range.
    -   View their reservation history.
    -   Update or delete a reservation.
    -   Set and update basic data about their profile to make the check-in process easier.
-   There is no payment integration required. Payments will be made upon arrival. Therefore, new reservations should be set to "unconfirmed" (booked but not checked in).
-   Users need to Log In or Sign Up before they can reserve a cabin.
-   On Sign Up, each user should have a profile in the database.

## Features

-   Cabins
-   Reservations
-   Authentication
-   Profile
-   About

## Pages

| Page             | Route                       |
| ---------------- | --------------------------- |
| Homepage         | `/`                         |
| About            | `/about   `                 |
| Cabins Overview  | `/cabins`                   |
| Cabin Details    | `/cabins/:cabinId`          |
| Login            | `/login`                    |
| Reservation List | `/account/reservations`     |
| Edit Reservation | `/acount/reservations/edit` |
| Update Profile   | `/account/profile`          |

## Tech Stack

-   **Framework:** Next.js
-   **UI State Management:** React Context API
-   **Database/API:** Supabase
-   **Styling:** Tailwind
