# E-Commerce Platform

## Overview
This project is a comprehensive e-commerce platform that includes an admin panel, backend server, and frontend client. The platform allows users to browse products, add them to the cart, place orders, and make payments. The admin panel enables administrators to manage products and orders efficiently.

## Features
- User authentication and authorization
- Product management
- Shopping cart functionality
- Order management
- Payment integration
- Admin panel for managing products and orders
- Image upload and management using Cloudinary

## Technologies Used
- **Frontend**: React, Vite, Tailwind CSS
- **Backend**: Node.js, Express, MongoDB
- **Authentication**: JWT
- **Payment Gateway**: Stripe, Razorpay
- **Image Storage**: Cloudinary
- **Deployment**: Vercel

## Project Structure
```
E-Commerce/
├── admin/
│   ├── .env
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── public/
│   ├── README.md
│   ├── src/
│   │   ├── App.jsx
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── index.css
│   │   └── main.jsx
│   ├── tailwind.config.js
│   ├── vercel.json
│   └── vite.config.js
├── backend/
│   ├── .env
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── package.json
│   ├── routes/
│   ├── server.js
│   └── vercel.json
├── frontend/
│   ├── .env
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── public/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── index.css
│   │   └── main.jsx
│   ├── tailwind.config.js
│   ├── vercel.json
│   └── vite.config.js
├── .gitignore
└── README.md
```

## Setting Up Environment Variables
Create a `.env` file in the root of each directory (`admin`, `backend`, `frontend`) and add the following environment variables:

### Admin Panel (`admin/.env`)
```
VITE_BACKEND_URL=<backend_url>
```

### Backend (`backend/.env`)
```
MONGODB_URI=<your_mongodb_uri>
JWT_SECRET_KEY=<your_jwt_secret_key>
ADMIN_EMAIL=<admin_email>
ADMIN_PASSWORD=<admin_password>
CLOUDINARY_CLOUD_NAME=<your_cloudinary_cloud_name>
CLOUDINARY_API_KEY=<your_cloudinary_api_key>
CLOUDINARY_API_SECRET=<your_cloudinary_api_secret>
STRIPE_SECRET_KEY=<your_stripe_secret_key>
RAZORPAY_KEY_ID=<your_razorpay_key_id>
RAZORPAY_KEY_SECRET=<your_razorpay_key_secret>
```

### Frontend (`frontend/.env`)
```
VITE_BACKEND_URL=<backend_url>
```

## Getting Started
To get the project up and running locally, follow these steps:

### Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/iaman-mishra/E-Commerce.git
   cd e-commerce
   ```

2. Install dependencies for the admin panel:
   ```sh
   cd admin
   npm install
   ```

3. Install dependencies for the backend:
   ```sh
   cd ../backend
   npm install
   ```

4. Install dependencies for the frontend:
   ```sh
   cd ../frontend
   npm install
   ```

## Usage
Once the project is running, you can access the admin panel and frontend client through your web browser. The admin panel allows you to manage products and orders, while the frontend client lets users browse products and make purchases.

## Contributing
If you would like to contribute to this project, please follow these steps:
1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them.
4. Push your branch and create a pull request.

## Testing
To run tests for the application, use the following command in the respective directory:
```sh
npm test
```

## Contact Information
For any inquiries or support, please reach out to [amanmishra.5272@gmail.com].
