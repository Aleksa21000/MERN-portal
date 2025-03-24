# MERN Stack Portal Platform

## Tech Stack

-   **Frontend:** React.js, Vite, Tailwind CSS
-   **Backend:** Node.js, Express.js, MongoDB

## Future Structure Plans

### Frontend

-   Implement **code splitting** to optimize performance.
-   Create additional **reusable UI components** (e.g., buttons, input fields) to reduce redundancy.
-   Improve overall **code structure and maintainability**.
-   Optimize API calls and state management for better user experience.

### Backend

-   Refactor everything from JavaScript to **TypeScript**.
-   Implementation of **Reflections** on queryBus, eventBus and commandBus.
-   Implementation of **Dependency injection**.
-   Implementation of **Load testing** with **JMeter**.

## Features

-   **User Authentication** with JSON Web Tokens (JWT)
-   **Suggested Users to Follow**
-   **Create, Delete, Like, and Comment on Posts**
-   **Notifications for Follow and Like Events**
-   **Image Uploads via Cloud Services**
-   Listing Posts on Profile Page **(based on feed type)**
-   Edit **Cover & Profile Image**
-   Edit **Profile Information**

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

## Deploy Scripts

Run this commands from the **root** directory:

```shell
npm run build
npm run start
```
