# Nine Tigers Online Platform — Release 1 (MVP)

Kung Fu school member portal with secure authentication, instructional video library, and admin management.

## Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT (JSON Web Tokens)
- **API:** REST endpoints + GraphQL (Apollo Server)
- **Frontend:** React 18 with React Router

## Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)

## Setup

```bash
# Install all dependencies
npm run install-all

# Configure environment
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret

# Seed the database with sample data
npm run seed

# Start both server and client
npm run dev
```

## Default Accounts (after seeding)

| Role   | Email                | Password   |
|--------|----------------------|------------|
| Admin  | admin@ninetiger.com  | admin123   |
| Member | maria@example.com    | member123  |
| Member | david@example.com    | member123  |

## API Endpoints

### Auth
- `POST /api/auth/register` — Register new user
- `POST /api/auth/login` — Login (returns JWT)
- `GET /api/auth/me` — Current user profile (auth required)

### Videos
- `GET /api/videos` — List all published videos
- `GET /api/videos/search?q=keyword` — Full-text search
- `GET /api/videos/filter?level=Beginner&category=forms` — Filter by level/category
- `GET /api/videos/categories` — Available categories and levels
- `GET /api/videos/:id` — Get video details
- `POST /api/videos` — Create video (admin)
- `PUT /api/videos/:id` — Update video (admin)
- `DELETE /api/videos/:id` — Delete video (admin)

### Users
- `GET /api/users` — List all users (admin)
- `GET /api/users/:id` — Get user profile
- `PUT /api/users/:id` — Update profile
- `DELETE /api/users/:id` — Delete user (admin)

### Products
- `GET /api/products` — List all products
- `GET /api/products/search?name=keyword` — Search by name
- `GET /api/products/price?min=X&max=Y` — Filter by price
- `GET /api/products/:id` — Get product details
- `POST /api/products` — Create product (admin)
- `PUT /api/products/:id` — Update product (admin)
- `DELETE /api/products/:id` — Delete product (admin)

### Orders
- `GET /api/orders` — Get user's orders
- `POST /api/orders` — Create order

### GraphQL
- `POST /graphql` — GraphQL endpoint (Apollo Server playground at `/graphql`)

## Project Structure

```
mvp/
├── server/
│   ├── index.js          # Express server entry point
│   ├── seed.js           # Database seeder
│   ├── middleware/
│   │   └── auth.js       # JWT auth & role middleware
│   ├── models/
│   │   ├── User.js       # User model (bcrypt hashing)
│   │   ├── Video.js      # Video model (text indexes)
│   │   ├── Product.js    # Product model
│   │   └── Order.js      # Order model
│   ├── routes/
│   │   ├── auth.js       # Auth routes (register/login)
│   │   ├── users.js      # User CRUD routes
│   │   ├── videos.js     # Video CRUD + search/filter
│   │   └── products.js   # Product & order routes
│   └── graphql/
│       └── index.js      # GraphQL typeDefs & resolvers
├── client/
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── App.js        # Router + route definitions
│       ├── index.js       # React entry point
│       ├── index.css      # Global styles
│       ├── services/
│       │   └── api.js     # Axios instance with JWT interceptor
│       ├── context/
│       │   └── AuthContext.js  # Auth state management
│       ├── components/
│       │   ├── Navbar.js       # Navigation bar
│       │   ├── PrivateRoute.js # Auth route guard
│       │   ├── AdminRoute.js   # Admin route guard
│       │   └── VideoCard.js    # Video card component
│       └── pages/
│           ├── Home.js          # Dashboard with announcements
│           ├── Login.js         # Login form
│           ├── Register.js      # Registration form
│           ├── VideoLibrary.js  # Video browsing + search/filter
│           ├── VideoPlayer.js   # Video playback page
│           ├── Profile.js       # Profile management
│           ├── AdminDashboard.js # Admin overview
│           ├── AdminVideos.js   # Video management (CRUD)
│           └── AdminUsers.js    # User management
├── package.json
├── .env
└── .env.example
```

## Release 1 Features

- ✅ Secure authentication (JWT)
- ✅ Role-based access control (member/admin)
- ✅ Instructional video library with categories
- ✅ Video playback with embedded player
- ✅ Full-text search across video library
- ✅ Filter videos by skill level and category
- ✅ REST API endpoints (tested via Postman)
- ✅ GraphQL API (tested via Apollo playground)
- ✅ Personal profile management
- ✅ Admin dashboard with stats
- ✅ Admin video management (CRUD)
- ✅ Admin user management
- ✅ Responsive design (mobile/tablet/desktop)
- ✅ MongoDB with Mongoose ODM
