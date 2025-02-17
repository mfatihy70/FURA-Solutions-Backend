# FURA Solutions Backend

This is the backend for the FURA Solutions application, built with Node.js, Express, and MongoDB.

## Features

- User authentication and management
- Product management
- Carousel management
- Partner management

## Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed and created a [MongoDB](https://www.mongodb.com/) account

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/fura-solutions-backend.git
   cd fura-solutions-backend
   ```
2. Install the dependencies
   ```bash
   npm install
   ```
3. Create a `.env` file with following entries:
   ```bash
   MONGO_URI=your_mongodb_connection_string (password not hidden)
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```
4. Run the server in dev or prod mode
   ```bash
   npm run dev
   ```
   or
   ```bash
   npm start
   ```

The server will be running on your specified port (e.g. http://localhost:5000)

Feel free to customize the content as needed or contact me for improvements.
