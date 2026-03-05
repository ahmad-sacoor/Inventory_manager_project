# Inventory Manager

A full-stack inventory management application for tracking products, managing stock levels, and getting low-stock alerts. Built as a learning project covering REST API design with Java Spring Boot, frontend development with Next.js, and MongoDB for data persistence.

---

## Tech Stack

- **Backend:** Java 17, Spring Boot, Spring Data MongoDB, Lombok
- **Frontend:** Next.js 14, TypeScript, CSS Modules
- **Database:** MongoDB
- **API Testing:** Postman

---

## Architecture

The application is split into two separate services that run independently. The frontend (Next.js on port 3000) communicates with the backend (Spring Boot on port 8080) through REST API calls. The backend connects to a local MongoDB instance to store and retrieve product data.

```
Browser → Frontend :3000 → Backend :8080 → MongoDB :27017
```

---

## Project Structure

```
inventory-backend/
├── backend/                        # Spring Boot REST API
│   ├── src/main/java/com/example/inventorybackend/
│   │   ├── controller/             # HTTP request handlers
│   │   ├── service/                # Business logic
│   │   ├── repository/             # MongoDB data access
│   │   ├── model/                  # Product entity
│   │   └── exception/              # Error handling
│   └── src/main/resources/
│       └── application.properties
└── frontend/                       # Next.js frontend
    ├── app/
    │   ├── page.tsx                # Dashboard (/)
    │   ├── products/
    │   │   ├── page.tsx            # Products list (/products)
    │   │   └── new/
    │   │       └── page.tsx        # Add product (/products/new)
    ├── lib/
    │   └── api.ts                  # All API calls in one place
    └── types/
        └── product.ts              # Shared TypeScript types
```

---

## Running Locally

### Prerequisites

- Java 17
- Node.js 20+
- MongoDB running locally on port 27017

If MongoDB isn't running, start it with:

```bash
net start MongoDB
```

### Backend

Open the `backend` folder in IntelliJ IDEA as a Maven project, then run `InventoryBackendApplication.java`. The API will be available at `http://localhost:8080`.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The app will be available at `http://localhost:3000`.

---

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/products` | Get all products |
| GET | `/api/products?category={category}` | Filter by category |
| POST | `/api/products` | Create a new product |
| PUT | `/api/products/{id}/quantity` | Update stock quantity |
| DELETE | `/api/products/{id}` | Delete a product |
| GET | `/api/products/stats` | Total count and low stock list |

### Example Request Body (POST /api/products)

```json
{
  "name": "Wireless Mouse",
  "category": "Electronics",
  "quantity": 25,
  "price": 29.99
}
```

---

## Features

- View all products in a sortable table
- Filter products by category
- Add new products via a form
- Update stock quantity inline
- Delete products
- Dashboard showing total product count and low-stock warnings (quantity below 10)

---

## Planned Improvements

- Containerize both services with Docker and wire them together using Docker Compose
- Add a GitHub Actions CI/CD pipeline to automatically build and test both services on every push to `main`
- Deploy all three services to Railway
