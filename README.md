<img width="1000" height="600" alt="image" src="https://github.com/user-attachments/assets/220b8a02-cf22-4189-a75d-ec2468821be7" />


----
# Order Management Web Application

This project provides a complete order management solution with both frontend and backend components. 
It allows users to manage products and categories through an intuitive web interface, with all data stored securely in a cloud database.

## Features
- Product management (CRUD)
- Category management (CRUD)
- Form validation
- Pagination support
- Error handling and user notifications

## Tech Stack
- Fron-end: Vue, TypeScript, VueRouter, Axios, Tailwind
- Back-end: Node, Express, Mongoose
- Database: MongoDB Atlas on clound

## How to Run

### 1: Clone the Repository
```bash
git clone https://github.com/kittiBank/product-management.git
cd product-management
```

### 2: Backend Setup

1. Navigate to the backend directory:
```bash
cd product-management-backend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp dev.env.example dev.env
```

4. Open `dev.env` and replace only Username and Password for MongoDB connection string URI:
```env
PORT=3000
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/product-management
NODE_ENV=development
```

5. Start the backend server:
```bash
npm run dev
```
The backend will run on `http://localhost:3000`

### 3: Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
```bash
cd product-management-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the frontend server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

### 4: Access the Application
Open your browser and go to `http://localhost:5173`


## Project Structure
```
product-management/
├── product-management-backend/    # Backend API
│   ├── src/
│   │   ├── controllers/          # Request handlers
│   │   ├── models/               # Database models
│   │   ├── routes/               # API routes
│   │   ├── services/             # Business logic
│   │   └── middleware/           # Custom middleware
│   └── package.json
│
└── product-management-frontend/   # Frontend application
    ├── src/
    │   ├── views/                # Page components
    │   ├── components/           # Reusable components
    │   ├── services/             # API service layer
    │   ├── router/               # Route definitions
    │   └── types/                # TypeScript types
    └── package.json
```


## Screenshot
- Postman test API

<img width="600" height="400" alt="image" src="https://github.com/user-attachments/assets/fc57d124-6bb4-472f-8d9f-5a36c1342104" />

- MongoDB data

<img width="600" height="400" alt="image" src="https://github.com/user-attachments/assets/b3a30288-7e92-4ba3-9bfd-d6e86a4eaa8e" />

  
  



