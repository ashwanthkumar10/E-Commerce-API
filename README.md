# **E-Commerce Backend API**

## **Project Overview**
This is a role-based e-commerce backend built using **Node.js, Express.js, MongoDB, and JWT authentication**. The system includes the following roles:
- **Admin**: Manages the system and has full control.
- **Staff**: Manages orders and assists in operations.
- **Vendor**: Manages their own products.
- **User**: Can browse and purchase products.

The API provides authentication, role-based access control, product management, and server-side pagination for product listings.

---

## **Tech Stack**
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ORM
- **Authentication**: JWT (JSON Web Token)
- **Validation**: Middleware for role-based authentication
- **Testing**: Postman (API Testing)

---

## **Project Structure**
backend/ ├── src/ │ ├── middleware/ # Authentication & Authorization Middleware │ ├── models/ # Mongoose Models │ ├── routes/ # Express Routes │ ├── lib/ # Database Connection │ ├── createSuperAdmin.js # Script to create Admin │ ├── index.js # Main Entry Point │ ├── .env # Environment Variables ├── README.md # Documentation └── package.json # Dependencies

yaml
Copy
Edit

---

## **Installation & Setup**

### **1. Clone the Repository**
```sh
git clone https://github.com/your-repo.git
cd backend
2. Install Dependencies
sh
Copy
Edit
npm install
3. Configure Environment Variables (.env)
Create a .env file in the root directory and add:

sh
Copy
Edit
PORT=5000
MONGO_URI=your_mongo_connection_string
SECRET_KEY=your_secret_key
4. Start the Server
sh
Copy
Edit
npm start
Authentication & Authorization
This system uses JWT-based authentication. Each role has different access permissions.

Admin Authentication
Endpoint: POST /api/admin/login
Payload:
json
Copy
Edit
{
  "email": "admin@email.com",
  "password": "superadmin@123"
}
Response:
json
Copy
Edit
{
  "token": "your_jwt_token",
  "role": "admin"
}
Staff Authentication
Endpoint: POST /api/staff/login
Vendor Authentication
Endpoint: POST /api/vendor/login
User Authentication
Endpoint: POST /api/user/login
Note: Include the token in the Authorization header as Bearer <token> for protected routes.

Product Management
View All Products
Endpoint: GET /api/user/products
Query Params:
page (default: 1)
limit (default: 10)
search (optional: search by product name)
Response:
json
Copy
Edit
{
  "totalPages": 5,
  "currentPage": 1,
  "totalProducts": 50,
  "products": [
    {
      "name": "Product A",
      "vendor": "Vendor Name",
      "expiryDate": "2025-12-31",
      "oldPrice": "100.00",
      "newPrice": "80.00",
      "discountPercentage": "20.00",
      "discountAmount": "20.00",
      "deliveryAmount": "5.00",
      "url": "unique-product-url"
    }
  ]
}
API Endpoints
Authentication Routes
POST /api/admin/login → Admin Login
POST /api/staff/login → Staff Login
POST /api/vendor/login → Vendor Login
POST /api/user/login → User Login
Product Routes
GET /api/user/products → View Products (Paginated, Searchable)
POST /api/vendor/products → Vendor Adds Product (Auth Required)
PUT /api/vendor/products/:id → Update Product (Vendor Only)
DELETE /api/vendor/products/:id → Delete Product (Vendor Only)
Postman Collection
To test the API, import the provided Postman collection.

Open Postman → Click Import
Select postman_collection.json
Test the available endpoints.
Troubleshooting
Common Issues
❌ Error: Cannot find module './routes/staffAuth' ✅ Ensure staffAuth.js exists in the routes/ folder.

❌ MongooseError: URI malformed ✅ Check your MongoDB connection string in .env.

Notes
Ensure proper authentication before accessing protected routes.
Passwords are securely hashed using bcrypt.
Tokens expire after 1 hour for security reasons.
