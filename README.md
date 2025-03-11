# E-Commerce Backend Project

# NOTE: Postman Collections are stored in the folder postmanCollections

# Similarly, MongoDB collections are stored in mongoCollections

This is a backend application for an e-commerce website built using **Node.js**, **Express**, and **MongoDB**. The system includes authentication, order management, product management, and review functionality. It follows the **MVC architecture** and is designed to scale.

## Features

- **User Authentication** (Register, Login, JWT-based session management)
- **Product Management** (Create, Update, Retrieve, Filter, Sort Products)
- **Order Management** (Place Orders, Update Order Status, Order Details)
- **Product Reviews** (Add Reviews with Ratings)
- **Image Upload** (Using Multer for handling images)
- **Email Notifications** (Using Nodemailer)
- **JWT Authentication** (Protecting Routes)

## Prerequisites

Before running this project, ensure you have the following installed on your machine:

- **Node.js**: [Download and install Node.js](https://nodejs.org/)
- **MongoDB**: [Download and install MongoDB](https://www.mongodb.com/try/download/community) or use **MongoDB Atlas** for cloud hosting.
- **Postman** or any API testing tool for testing the endpoints (optional).

## Installation

Follow these steps to set up the project on your local machine:

### 1. Clone the Repository

Clone the repository to your local machine using Git:

```bash
git clone https://github.com/buland-growexxer/node-test.git
cd node-test
```

### 2. Install Dependencies

Run the following command to install all the necessary dependencies:

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory of the project and add the following environment variables:

```bash
MONGO_URI=mongodb://localhost:27017/
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

- `MONGO_URI`: The connection string for your MongoDB database. You can use a local database or a cloud instance (like MongoDB Atlas).
- `JWT_SECRET`: The secret key used for signing JWT tokens.
- `PORT`: The port on which the server will run (default: 5000).

### 4. Run the Project

Now that everything is set up, run the application using:

```bash
npm start
```

This will start the server at `http://localhost:5000` by default.

### 5. Run the Development Server (Optional)

If you are working on the project and need to automatically restart the server on changes, use the following command:

```bash
npm run dev
```

This will start the server with **nodemon**, which will watch for file changes and restart the server automatically.

### 6. Testing API Endpoints

You can use **Postman** to test the API endpoints. Here are the main endpoints:

#### **Authentication Routes**

- **POST** `/register`: Register a new user (Name, Email, Password).
- **POST** `/login`: Login with email and password to receive a JWT token.

#### **Product Routes**

- **GET** `/products`: Get all products with filtering, sorting, and pagination.
- **POST** `/products`: Create a new product (with multiple image uploads).
- **PATCH** `/products/:id`: Update an existing product's details (including images).
- **POST** `/products/:id/reviews`: Add a review for a specific product.

#### **Order Routes**

- **POST** `/orders`: Place a new order (authenticated user only).
- **PATCH** `/orders/:id`: Update order status (authenticated user only).
- **GET** `/orders/:id`: Get details of a specific order (authenticated user only).
- **GET** `/orders`: List orders (with filtering and pagination, authenticated user only).

#### **Authentication Required**

For routes that require authentication (like placing orders or updating order statuses), you'll need to provide a **JWT token** in the `Authorization` header as a Bearer token.

---

## Directory Structure

The directory structure of the project is as follows:

```
ecommerce-backend/
│
├── controllers/           # Controllers for handling requests
├── models/                # Mongoose models (Product, Order, User, Review)
├── routes/                # API routes (Product, Order, Auth)
├── services/              # Business logic for operations (e.g., creating products)
├── middlewares/           # Middleware functions (e.g., authentication)
├── config/                # Configuration files (e.g., email configuration)
├── uploads/               # Folder for storing uploaded images
├── .env                   # Environment variables (e.g., DB URI, JWT secret)
├── app.js                 # Entry point for the application
├── package.json           # Project dependencies and scripts
└── README.md              # Project documentation
```

---

## Additional Information

- **MongoDB Atlas**: If you choose to use MongoDB Atlas, you will need to create a cluster and get the connection URI to replace in your `.env` file.
- **JWT Token Expiration**: The JWT tokens are set to expire after **7 days**. You can adjust this by modifying the `expiresIn` value in the JWT sign method.
