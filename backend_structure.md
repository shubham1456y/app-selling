# Backend Structure & Architecture

## Core Entities & Responsibilities

1.  **User Service** (`users`, `profiles`, `addresses`)
    *   **Responsibility**: Identity management, auth, user preferences, shipping details.
    *   **Key Logic**: Password hashing, JWT generation, address validation.

2.  **Catalog Service** (`categories`, `products`, `product_reviews`)
    *   **Responsibility**: Management of product data, organization, inventory tracking.
    *   **Key Logic**: Search indexing, category verification, stock management (atomic decrements).

3.  **Seller Service** (`sellers`, `follows`, `streams`)
    *   **Responsibility**: Shop profiles, verification, live stream management.
    *   **Key Logic**: Stream key generation, verification workflows, aggregating follower stats.

4.  **Order Service** (`orders`, `order_items`)
    *   **Responsibility**: Cart processing, order placement, order history.
    *   **Key Logic**: Price calculation snapshots, status state machine (Pending -> Confirmed -> Shipped).

5.  **Payment Service** (`payments`)
    *   **Responsibility**: Gateway integration (Stripe/Google Pay), transaction auditing.
    *   **Key Logic**: Webhook handling, reconciliation, secure token management.

## Key Relationships

*   **Users <-> Sellers**: 1:1 Relationship via FK. A user can "upgrade" to be a seller.
*   **Categories <-> Products**: 1:N. A category has many products. Self-reference table for subcategories.
*   **Sellers <-> Products**: 1:N. A seller owns the inventory.
*   **Orders <-> OrderItems**: 1:N. Standard Line Item pattern.
*   **Users <-> Orders**: 1:N. Purchase history.
*   **Sellers <-> Streams**: 1:N. A seller can have many past/current streams.

## Suggested API Endpoints

### Auth Module
*   `POST /auth/register` - Create user
*   `POST /auth/login` - Get JWT
*   `GET /auth/me` - Current user profile
*   `PATCH /auth/profile` - Update bio/avatar

### Store Module
*   `GET /sellers/:id` - Shop details
*   `GET /sellers/:id/products` - Store inventory
*   `POST /sellers/apply` - Become a seller

### Product Module
*   `GET /products` - Search users/filters
*   `GET /products/:id` - Detailed view
*   `GET /categories` - Tree view of categories

### Live Module
*   `GET /streams/live` - List active streams
*   `POST /streams` - Schedule/Start stream (Seller only)

### Cart & Checkout Module
*   `POST /orders/checkout` - Initialize checkout flow
*   `POST /orders` - Finalize/Place order
*   `GET /orders/:id` - Order receipt/status

### User Data Module
*   `GET /users/addresses` - List shipping addresses
*   `POST /users/addresses` - Add new address
