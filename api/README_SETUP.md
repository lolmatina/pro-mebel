# Orders API - Setup Guide

## Requirements
- PHP 8.0+ (tested with PHP 8.4.14)
- Composer
- MySQL (optional, for database support)

## Installation

1. **Install dependencies:**
   ```bash
   cd api
   composer install
   ```

2. **Configure environment variables:**
   
   Copy the example file:
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and set your values:
   ```env
   # Admin Credentials
   ADMIN_USERNAME=your_username
   ADMIN_PASSWORD=your_password
   
   # JWT Configuration
   JWT_SECRET=your-secret-key-change-in-production
   
   # Database Configuration (if using Docker)
   DB_HOST=localhost
   DB_PORT=3306
   DB_NAME=orders
   DB_USER=orders_user
   DB_PASSWORD=orders_password
   ```

3. **Start the development server:**
   ```bash
   php -S localhost:8080 -t public
   ```

## Login Credentials

Use the credentials you set in your `.env` file:
- **Username**: Value of `ADMIN_USERNAME`
- **Password**: Value of `ADMIN_PASSWORD`

## API Endpoints

### Public Endpoints (No Authentication Required)

- `GET /` - Welcome message
- `POST /login` - Login and get JWT token
- `GET /categories` - List all categories (paginated)
- `GET /categories/{id}` - Get category by ID
- `GET /subcategories` - List all subcategories (paginated)
- `GET /subcategories/{id}` - Get subcategory by ID
- `GET /products` - List all products (paginated)
- `GET /products/{id}` - Get product by ID

### Admin Endpoints (Require JWT Authentication)

Add `Authorization: Bearer <token>` header to all admin requests.

#### Categories
- `POST /admin/categories` - Create category
- `PUT /admin/categories/{id}` - Update category
- `DELETE /admin/categories/{id}` - Delete category

#### SubCategories
- `POST /admin/subcategories` - Create subcategory
- `PUT /admin/subcategories/{id}` - Update subcategory
- `DELETE /admin/subcategories/{id}` - Delete subcategory

#### Products
- `POST /admin/products` - Create product
- `PUT /admin/products/{id}` - Update product
- `DELETE /admin/products/{id}` - Delete product

## Pagination

All list endpoints support pagination via query parameters:
- `?page=1` - Page number (default: 1)
- `?limit=10` - Items per page (default: 10, max: 100)

Example: `GET /categories?page=2&limit=20`

## CORS

CORS is enabled for all origins (`*`). To restrict to specific origins, edit `api/public/index.php`.

## Docker Support

Start with Docker Compose:
```bash
docker-compose up
```

This will start:
- PHP API server on port 8080
- MySQL database on port 3306
- phpMyAdmin on port 8081

## Troubleshooting

### PHP 8.4 Deprecation Warnings
All deprecation warnings have been fixed. If you see any, make sure you've pulled the latest code.

### Login Returns 401
Make sure your `.env` file exists and contains the correct credentials. The API loads environment variables from the `.env` file.

### CORS Errors
CORS is configured in `api/public/index.php`. Make sure the server is running and accessible.


