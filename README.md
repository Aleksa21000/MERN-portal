# MERN Stack Portal Platform

## Tech Stack

-   **Frontend:** React.js, Vite, Tailwind CSS
-   **Backend:** Node.js, Express.js, MongoDB

## Future Structure Plans

### Backend

-   Refactor and organize controllers by applying **code splitting**.
-   Implement a **repository pattern** to abstract direct database queries.
-   Introduce a **service layer** to encapsulate business logic separately from controllers.
-   Ensure controllers only handle API endpoints, delegating logic to services.
-   Prepare the codebase for implementing the **Mediator Design Pattern** by ensuring proper separation of concerns and decoupling dependencies.

### Frontend

-   Implement **code splitting** to optimize performance.
-   Create additional **reusable UI components** (e.g., buttons, input fields) to reduce redundancy.
-   Improve overall **code structure and maintainability**.
-   Optimize API calls and state management for better user experience.

## Features

-   **User Authentication** with JSON Web Tokens (JWT)
-   **Suggested Users to Follow**
-   **Create, Delete, Like, and Comment on Posts**
-   **Notifications for Follow and Like Events**
-   **Image Uploads via Cloud Services**
-   Listing Posts on Profile Page **(based on feed type)**

## Features in Progress

-   Edit Profile Information
-   Edit Cover & Profile Image
-   Soft Demo Deployment

## Future Features

-   Notifications for Comments
-   Adding Favorite Page & Functionality
-   Implementing Repost Feature
-   Live Chat Integration
-   Request and Approval System for Chats
-   Group Chat Functionality

## Setup .env File

Create a `.env` file or rename `.env-sample` to `.env` in the root directory and configure the following variables:

```env
MONGO_URI=...
PORT=...
JWT_SECRET=...
NODE_ENV=...
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
```

## Install Dependencies

Run the following command in the **root** and **frontend** directories:

```shell
npm install
```

## Start Backend Server

Run this command from the **root** directory:

```shell
npm run dev
```

## Start Vite Development Server

Run this command from the **frontend** directory:

```shell
cd frontend
npm run dev
```
