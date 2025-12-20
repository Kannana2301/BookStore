# 📚 BookStore App

A full-stack MERN bookstore with admin panel and real-time notifications.

## Features

- User authentication (JWT)
- Admin role for managing books
- Real-time notifications via WebSocket
- Book catalog with search/filter
- Responsive design with dark mode

---

## Prerequisites

- Node.js (v14+)
- MongoDB running on `localhost:27017`

---

## Installation

### 1. Clone and Install Dependencies

```bash
# Install backend dependencies
cd Backend
npm install

# Install frontend dependencies
cd ../Frontend
npm install
```

### 2. Setup Environment Variables

Create `.env` file in the `Backend` folder:

```env
PORT=4001
MongoDBURI=mongodb://localhost:27017/bookstore
JWT_SECRET=your_secret_key_change_this
FRONTEND_URL=http://localhost:5173
```

### 3. Seed Database

```bash
cd Backend

# Seed sample books
npm run seed

# Create admin user
npm run create-admin
```

**Default Admin Credentials:**
- Email: `admin@bookstore.com`
- Password: `admin123`

---

## Running the Application

**Terminal 1 - Backend:**
```bash
cd Backend
npm start
```

**Terminal 2 - Frontend:**
```bash
cd Frontend
npm run dev
```

**Access the app:**
- Frontend: http://localhost:5173
- Backend API: http://localhost:4001

---

## Usage

### As Regular User:
1. Sign up or login
2. Browse books by category
3. Receive notifications when new books are added

### As Admin:
1. Login with admin credentials
2. Click **👑 Admin** in navbar
3. Add new books via the dashboard
4. All users get instant notifications

---

## Project Structure

```
bookStoreApp/
├── Backend/
│   ├── controller/       # Request handlers
│   ├── model/            # MongoDB schemas
│   ├── route/            # API routes
│   ├── middleware/       # Auth & admin middleware
│   ├── utils/            # JWT & Socket.IO utilities
│   ├── data/             # Sample data
│   ├── index.js          # Server entry
│   ├── seed.js           # Database seeder
│   └── createAdmin.js    # Admin creator
│
└── Frontend/
    └── src/
        ├── components/   # React components
        ├── context/      # Auth & Socket contexts
        ├── pages/        # Page components
        └── App.jsx       # Main app
```

---

## API Endpoints

### Books
- `GET /book` - Get all books
- `POST /book` - Add book (admin only)

### Users
- `POST /user/signup` - Register
- `POST /user/login` - Login

---

## Tech Stack

**Backend:** Node.js, Express, MongoDB, Socket.IO, JWT  
**Frontend:** React, Vite, Tailwind CSS, DaisyUI, Socket.IO Client

---

## Troubleshooting

**MongoDB connection failed:**
- Ensure MongoDB is running: `mongod`

**Admin link not showing:**
- Run `npm run create-admin` in Backend folder
- Login with admin credentials

**Notifications not working:**
- Check both servers are running
- Check browser console for WebSocket connection

---

## License

MIT

