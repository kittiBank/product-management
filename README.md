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

1. Navigate to the back-end directory:
```bash
cd product-management-backend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```
The backend will run on `http://localhost:3000`

4. Navigate to the front-end directory:
```bash
cd product-management-frontend
```

5. Install dependencies:
```bash
npm install
```

6. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`


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

  
  



