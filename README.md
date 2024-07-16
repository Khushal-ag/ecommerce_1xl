<div align="center">

# 1XL Backend Assignment

</div>

## 🛠️ Getting Started

🚧 **Create `.env` file & add your own `ENV_VARIABLES` as mentioned in `.env.example` file.**

```csharp
PORT=3000
MONGODB_URI = <Your MongoDB URI>
JWT_SECRET = <Your JWT Secret>
```

- 💻 **Run Project Locally (bun should be installed):**

```csharp
bun i

bun dev
```

**You can replace `bun` by any other package manager like `pnpm` , `yarn` or `npm`**

- 🐋 **Run with Docker:**

```csharp
docker build -t ecommerce .

docker compose up
```

```csharp
Base URL: http://localhost:3000
```

## 1XL Ecommerce API Documentation

### Auth Routes (`/auth`)

#### Register or Signup

- **POST** `/auth/register` or `/auth/signup`
  - **Body:**
    - `name` (string)
    - `email` (string)
    - `password` (string)
    - `admin` (boolean)

#### Login or Signin

- **POST** `/auth/login` or `/auth/signin`
  - **Body:**
    - `email` (string)
    - `password` (string)

### Category Routes (`/category`)

#### Get All Categories

- **GET** `/category/`

#### Add Category (Admin only)

- **POST** `/category/add`
  - **Body:**
    - `title` (string)
    - `slug` (string)

#### Upload Category (Admin only)

- **POST** `/category/upload`

### Product Routes (`/products`)

#### Get All Products

- **GET** `/products/`

#### Get Product by ID

- **GET** `/products/product/:productId`

#### Add Product (Admin only)

- **POST** `/products/add`
  - **Body:**
    - `pName` (string)
    - `description` (string)
    - `price` (number)
    - `category` (string)
    - `stock` (boolean)

#### Update Product (Admin only)

- **PUT** `/products/update/:productId`
  - **Body:**
    - `pName` (string)
    - `description` (string)
    - `price` (number)
    - `category` (string)
    - `stock` (boolean)

#### Upload Product (Admin only)

- **POST** `/product/upload`

#### Delete Product (Admin only)

- **DELETE** `/products/:productId`

#### Filter Products

- **GET** `/products/filter/?category=string&search=string`
  - **Query:**
    - `category` (string)
    - `search` (string)

### Cart Routes (`/cart`)

#### Get User Cart

- **GET** `/cart/`

#### Add Product to Cart

- **POST** `/cart/add`
  - **Body:**
    - `productId` (string)
    - `qty` (number)

#### Update Cart Items

- **PUT** `/cart/update`
  - **Body:**
    - `productId` (string)
    - `qty` (number)

#### Checkout Cart

- **GET** `/cart/checkout`

### Order Routes (`/order`)

#### Get All Orders (Admin only)

- **GET** `/order/all`

#### Get User Orders

- **GET** `/order/get`

#### Update Status (Admin only)

- **PUT** `/order/update-status`
  - **Body:**
    - `orderId` (string)
    - `status` (string)
