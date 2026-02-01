# Backend API Architecture & Design

## 1. Auth Module
**Purpose**: Manage user identity, authentication, and session handling.
**Tables**: `users`, `profiles`

### POST /auth/register
- **Endpoint**: Register a new user
- **Method**: POST
- **Route**: `/api/v1/auth/register`
- **Auth**: Public
- **Request Body**:
  ```json
  {
    "full_name": "John Doe",
    "email": "john@example.com",
    "password": "securePassword123"
  }
  ```
- **Response**:
  ```json
  {
    "token": "jwt_token_string",
    "user": { "id": "uuid", "email": "john@example.com", "role": "user" }
  }
  ```
- **Errors**: 400 (Validation), 409 (Email exists)

### POST /auth/login
- **Endpoint**: Authenticate user
- **Method**: POST
- **Route**: `/api/v1/auth/login`
- **Auth**: Public
- **Request Body**:
  ```json
  {
    "email": "john@example.com",
    "password": "securePassword123"
  }
  ```
- **Response**:
  ```json
  {
    "token": "jwt_token_string",
    "user": { "id": "uuid", "role": "user" }
  }
  ```
- **Errors**: 401 (Invalid credentials)

---

## 2. Users Module
**Purpose**: Manage user profiles, settings, and shipping addresses.
**Tables**: `users`, `profiles`, `addresses`

### GET /users/me
- **Endpoint**: Get current user profile
- **Method**: GET
- **Route**: `/api/v1/users/me`
- **Auth**: Authenticated
- **Response**:
  ```json
  {
    "id": "uuid",
    "email": "john@example.com",
    "profile": { "avatar_url": "url", "bio": "...", "preferences": {} }
  }
  ```

### PATCH /users/profile
- **Endpoint**: Update profile details
- **Method**: PATCH
- **Route**: `/api/v1/users/profile`
- **Auth**: Authenticated
- **Request Body**:
  ```json
  {
    "username": "johndoe",
    "gender": "male",
    "interests": ["tech", "fashion"]
  }
  ```

### GET /users/addresses
- **Endpoint**: List shipping addresses
- **Method**: GET
- **Route**: `/api/v1/users/addresses`
- **Auth**: Authenticated
- **Response**: `[ { "id": "uuid", "address_line1": "..." } ]`

### POST /users/addresses
- **Endpoint**: Add new address
- **Method**: POST
- **Route**: `/api/v1/users/addresses`
- **Auth**: Authenticated
- **Request Body**:
  ```json
  {
    "full_name": "John Doe",
    "address_line1": "123 Main St",
    "city": "New York",
    "state": "NY",
    "postal_code": "10001",
    "country": "USA",
    "is_default": true
  }
  ```

---

## 3. Sellers Module
**Purpose**: Manage shop profiles and seller verification.
**Tables**: `sellers`

### POST /sellers/apply
- **Endpoint**: Apply to become a seller
- **Method**: POST
- **Route**: `/api/v1/sellers/apply`
- **Auth**: Authenticated
- **Request Body**:
  ```json
  {
    "shop_name": "Vintage Vault",
    "category": "Fashion",
    "experience_level": "I sell occasionally",
    "monthly_revenue": "$1000-$5000",
    "platforms": ["eBay", "Poshmark"],
    "social_links": { "instagram": "@vintage", "website": "..." },
    "return_address": { "full_name": "...", "post_code": "..." },
    "agreed_to_terms": true
  }
  ```
- **Response**:
  ```json
  {
    "id": "uuid",
    "status": "pending_verification"
  }
  ```

### GET /sellers/:id
- **Endpoint**: Get public seller/shop profile
- **Method**: GET
- **Route**: `/api/v1/sellers/:id`
- **Auth**: Public
- **Response**:
  ```json
  {
    "id": "uuid",
    "shop_name": "Vintage Vault",
    "logo_url": "url",
    "rating": 4.8,
    "review_count": 120,
    "follower_count": 500
  }
  ```

---

## 4. Products Module
**Purpose**: Manage inventory, searching, and product details.
**Tables**: `products`, `categories`, `shipping_profiles`

### GET /products
- **Endpoint**: Search and filter products
- **Method**: GET
- **Route**: `/api/v1/products`
- **Auth**: Public
- **Query Params**: `?seller_id=uuid&category_id=uuid&search=term&sort=price_asc&page=1`
- **Response**:
  ```json
  {
    "data": [ { "id": "uuid", "title": "Nike Air", "price": 100 } ],
    "pagination": { "total": 50, "page": 1, "limit": 20 }
  }
  ```

### GET /products/:id
- **Endpoint**: Get single product details
- **Method**: GET
- **Route**: `/api/v1/products/:id`
- **Auth**: Public
- **Response**: Full product object including seller info and images.

### POST /products
- **Endpoint**: Create a product (Seller only)
- **Method**: POST
- **Route**: `/api/v1/products`
- **Auth**: **Role: Seller**
- **Request Body**:
  ```json
  {
    "title": "Nike Air Jordan",
    "price": 150.00,
    "description": "...",
    "stock_quantity": 5,
    "images": ["url1", "url2"],
    "category_id": "uuid",
    "shipping_profile_id": "uuid"
  }
  ```

### PATCH /products/:id
- **Endpoint**: Update product details
- **Method**: PATCH
- **Route**: `/api/v1/products/:id`
- **Auth**: **Role: Seller + Owner** (Must own the product)
- **Request Body**: Partial product object

### DELETE /products/:id
- **Endpoint**: Remove a product
- **Method**: DELETE
- **Route**: `/api/v1/products/:id`
- **Auth**: **Role: Seller + Owner** (Must own the product)

---

## 5. Live Module
**Purpose**: Manage live stream sessions.
**Tables**: `streams`

### GET /streams/live
- **Endpoint**: List currently active streams
- **Method**: GET
- **Route**: `/api/v1/streams/live`
- **Auth**: Public
- **Response**: List of active stream objects with viewer counts.

### POST /streams
- **Endpoint**: Start/Schedule a stream
- **Method**: POST
- **Route**: `/api/v1/streams`
- **Auth**: **Role: Seller** (One active stream per seller limit)
- **Request Body**:
  ```json
  {
    "title": "Friday Night Drop",
    "scheduled_at": "ISO_DATE",
    "description": "...", 
    "category": "Sneakers", 
    "tags": ["nike", "jordan"]
  }
  ```

---

## 6. Orders Module
**Purpose**: Handle checkout and order history.
**Tables**: `orders`, `order_items`

### POST /orders/checkout
- **Endpoint**: Preview order (Calculate totals, shipping, tax)
- **Method**: POST
- **Route**: `/api/v1/orders/checkout`
- **Auth**: Authenticated
- **Request Body**:
  ```json
  {
    "items": [{ "product_id": "uuid", "quantity": 1 }],
    "shipping_address_id": "uuid"
  }
  ```
- **Response**:
  ```json
  {
    "subtotal": 100.00,
    "shipping": 5.00,
    "total": 105.00
  }
  ```

### POST /orders
- **Endpoint**: Place an order
- **Method**: POST
- **Route**: `/api/v1/orders`
- **Auth**: Authenticated
- **Request Body**:
  ```json
  {
    "items": [{ "product_id": "uuid", "quantity": 1 }],
    "shipping_address_id": "uuid",
    "payment_method": "card"
  }
  ```
- **Response**:
  ```json
  {
    "order_id": "uuid",
    "status": "pending",
    "payment_url": "https://stripe..." // If redirect needed
  }
  ```

### GET /orders
- **Endpoint**: Get user order history
- **Method**: GET
- **Route**: `/api/v1/orders`
- **Auth**: Authenticated

---

## 7. Interactions Module
**Purpose**: Social features like following and reviewing.
**Tables**: `follows`, `product_reviews`

### POST /sellers/:id/follow
- **Endpoint**: Follow a seller
- **Method**: POST
- **Route**: `/api/v1/sellers/:id/follow`
- **Auth**: Authenticated

### POST /products/:id/reviews
- **Endpoint**: Review a product
- **Method**: POST
- **Route**: `/api/v1/products/:id/reviews`
- **Auth**: Authenticated
- **Request Body**: `{ "rating": 5, "comment": "Great!" }`

---

## Diagrams

### 1. API Dependency Dependencies
[Auth Service] --issues tokens--> [Gateway/Client]
[Gateway] --validates token--> [All Protected Services]

[Order Service] --reads--> [Product Service] (Check stock/price)
[Order Service] --reads--> [User Service] (Get Address)
[Order Service] --writes--> [Payment Service] (Initiate charge)

[Product Service] --reads--> [Seller Service] (Verify owner)

### 2. Purchase Flow Sequence
User -> API: GET /products/:id (View Item)
User -> API: POST /orders/checkout (Calc Total)
API -> User: Returns Total + Shipping
User -> API: POST /orders (Place Order)
API -> DB: Create Order (Pending)
API -> DB: Inventory -1 (Atomic)
API -> Payment Provider: Create Charge
Payment Provider -> API: Success Webhook
API -> DB: Update Order (Confirmed)
API -> User: 201 Created (Order Confirmation)
