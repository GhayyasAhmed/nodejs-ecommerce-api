# Node.js E-commerce Backend

A production-style Node.js e-commerce backend built with Express and MongoDB.

## Features

- User authentication with JWT and cookies
- Protected routes with auth middleware
- Product CRUD endpoints
- Order CRUD endpoints
- MVC folder structure
- Environment-based configuration

## Tech Stack

- Node.js
- Express
- MongoDB
- Mongoose
- JWT

## Project Structure

```text
backend/
  config/
  controllers/
  middlewares/
  models/
  routes/
  utils/
  app.js
  server.js
```

## Setup

1. Clone the repository.
2. Install dependencies:

```bash
npm install
```

3. Create your environment file from the example:

```bash
copy backend\config\config.env.example backend\config\config.env
```

4. Update `backend/config/config.env` with your real values.
5. Make sure MongoDB is running locally.
6. Start the server:

```bash
npm run dev
```

## Environment Variables

Use the following variables in `backend/config/config.env`:

```env
PORT=5000
DB_URI=mongodb://127.0.0.1:27017/ecommerce
JWT_SECRET=replace_with_your_jwt_secret
JWT_EXPIRE=5d
COOKIE_EXPIRE=5
SMTP_SERVICE=gmail
SMTP_MAIL=replace_with_your_email@example.com
SMTP_PASSWORD=replace_with_your_app_password
SMPT_HOST=smtp.gmail.com
SMPT_PORT=465
```

## API Base URL

```text
http://localhost:5000/api/v1
```

## Routes

### User Routes

- `POST /user/register` - Register user
- `POST /user/login` - Login user
- `POST /user/logout` - Logout user
- `POST /user/password/forgot` - Send reset password email
- `PUT /user/password/reset/:token` - Reset password
- `GET /user/me` - Get logged-in user
- `PUT /user/password/update` - Update password
- `PUT /user/me/update` - Update profile
- `GET /user/admin/users` - Get all users (admin)
- `GET /user/admin/user/:id` - Get single user (admin)
- `PUT /user/admin/user/:id/role` - Update user role (admin)
- `DELETE /user/admin/user/:id` - Delete user (admin)

### Product Routes

- `GET /product` - Get all products
- `GET /product/:id` - Get product details
- `POST /product/admin/new` - Create product (admin)
- `PATCH /product/admin/:id` - Update product (admin)
- `DELETE /product/admin/:id` - Delete product (admin)
- `PUT /product/review` - Create or update review
- `GET /product/review?id=:productId` - Get product reviews
- `DELETE /product/review?id=:productId&reviewId=:reviewId` - Delete product review

### Order Routes

- `POST /order/new` - Create order
- `GET /order/me` - Get logged-in user orders
- `GET /order/:id` - Get single order
- `GET /order/admin/orders` - Get all orders (admin)
- `PUT /order/admin/status/:id` - Update order status (admin)
- `DELETE /order/admin/:id` - Delete order (admin)

## Run Scripts

```bash
npm run dev
npm start
```
