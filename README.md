# D&D Tracker
[![Ask DeepWiki](https://devin.ai/assets/askdeepwiki.png)](https://deepwiki.com/KhalaidW/DND_Tracker)

## About The Project

D&D Tracker is a full-stack web application designed for Dungeons & Dragons players and Dungeon Masters. It provides two core functionalities: a personal character management system and a comprehensive browser for D&D 5th Edition System Reference Document (SRD) content, powered by the [Open5e API](https://api.open5e.com/).

This application allows users to create, view, update, and delete their own characters, while also offering a powerful tool to search and filter through spells, monsters, classes, races, and other essential D&D information.

## Features

*   **Character Management:** Full CRUD (Create, Read, Update, Delete) functionality for your personal D&D characters.
*   **SRD Content Browser:** Explore a wide range of D&D 5e data, including:
    *   Spells
    *   Monsters
    *   Classes
    *   Races
    *   Feats
    *   Backgrounds
*   **Dynamic Filtering & Search:** Easily find what you're looking for with real-time search and category-specific filters (e.g., filter spells by level and school, or monsters by challenge rating).
*   **User Authentication:** A basic registration and login system to manage user accounts.
*   **Responsive Interface:** Built with React and Bootstrap, ensuring a clean and usable experience across devices.

## Tech Stack

*   **Frontend:**
    *   React
    *   Vite
    *   React Router
    *   Axios
    *   Bootstrap
*   **Backend:**
    *   Node.js
    *   Express.js
    *   MongoDB
    *   Mongoose
*   **External API:**
    *   [Open5e API](https://api.open5e.com/)

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

*   Node.js (v18.0 or higher)
*   npm (v8.0 or higher)
*   MongoDB (A local instance or a cloud-hosted URI like MongoDB Atlas)

### Server Setup

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/KhalaidW/DND_Tracker.git
    cd DND_Tracker/server
    ```

2.  **Install NPM packages:**
    ```sh
    npm install
    ```

3.  **Create a `.env` file** in the `server` directory and add your environment variables:
    ```env
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    ```

4.  **Run the server:**
    ```sh
    npm run dev
    ```
    The backend API will be running on `http://localhost:5000`.

### Client Setup

1.  **Navigate to the client directory** from the root folder:
    ```sh
    cd ../client
    ```

2.  **Install NPM packages:**
    ```sh
    npm install
    ```

3.  **Run the client:**
    ```sh
    npm run dev
    ```
    The React application will be available at `http://localhost:5173` (or another port if 5173 is in use).

## API Endpoints

The backend provides the following RESTful API endpoints for managing characters and users.

### Authentication

*   `POST /api/auth/register`: Register a new user.
*   `POST /api/auth/login`: Log in an existing user.

### Characters

*   `GET /api/characters`: Fetches all characters.
*   `POST /api/characters`: Creates a new character.
*   `GET /api/characters/:id`: Fetches a single character by its ID.
*   `PATCH /api/characters/:id`: Updates a character's details.
*   `DELETE /api/characters/:id`: Deletes a character.