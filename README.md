MERN Todo App with Authentication
A full-stack todo application built with MongoDB, Express.js, React.js, and Node.js, featuring JWT authentication and user management.
🚀 Features

User Authentication: Secure signup and login with JWT tokens
Personal Todo Management: Each user has their own private todo list
Full CRUD Operations: Create, read, update, and delete todos
Real-time Updates: Instant UI updates without page refreshes
Responsive Design: Works seamlessly on desktop and mobile devices
Modern JavaScript: Built with ES6+ modules and latest React hooks
Secure: Password hashing with bcrypt and protected API routes

🛠️ Tech Stack
Frontend:

React.js 18+
Modern CSS3 with responsive design
Fetch API for HTTP requests

Backend:

Node.js with Express.js
MongoDB with Mongoose ODM
JWT for authentication
bcrypt for password hashing
CORS enabled

📦 Project Structure
todo-app/
├── backend/
│   ├── server.js          # Main server file
│   ├── package.json       # Backend dependencies
│   ├── .env.example       # Environment variables template
│   └── .gitignore         # Backend gitignore
├── frontend/
│   ├── src/
│   │   ├── App.js         # Main React component
│   │   ├── App.css        # Styles
│   │   └── index.js       # React entry point
│   ├── package.json       # Frontend dependencies
│   └── public/            # Static files
├── README.md
└── .gitignore             # Root gitignore
🚀 Quick Start
Prerequisites

Node.js (v16 or higher)
MongoDB (local installation or MongoDB Atlas)
Git

Installation

Clone the repository

bash   git clone <your-repo-url>
   cd todo-app

Setup Backend

bash   cd backend
   npm install

Setup Environment Variables

bash   cp .env.example .env
   # Edit .env with your MongoDB URI and JWT secret

Setup Frontend

bash   cd ../frontend
   npm install

Start the Application
Terminal 1 - Backend:

bash   cd backend
   npm run dev
Terminal 2 - Frontend:
bash   cd frontend
   npm start

Access the Application

Frontend: http://localhost:3000
Backend API: http://localhost:5000



📝 API Endpoints
Authentication
POST /api/register    # Register new user
POST /api/login       # Login user
Todos (Protected Routes)
GET    /api/todos     # Get all user's todos
POST   /api/todos     # Create new todo
PUT    /api/todos/:id # Update todo
DELETE /api/todos/:id # Delete todo
🔐 Environment Variables
Create a .env file in the backend directory:
envMONGODB_URI=mongodb://localhost:27017/todoapp
JWT_SECRET=your-super-secret-jwt-key-here
PORT=5000
NODE_ENV=development
🔨 Available Scripts
Backend

npm start - Start production server
npm run dev - Start development server with nodemon

Frontend

npm start - Start development server
npm run build - Build for production
npm test - Run tests

📱 Usage

Sign Up: Create a new account with name, email, and password
Log In: Access your account with email and password
Add Todos: Create new todos with title and optional description
Manage Todos: Mark as complete, edit, or delete your todos
Log Out: Securely end your session

🔒 Security Features

Password hashing with bcrypt
JWT token-based authentication
Protected API routes with middleware
Input validation and sanitization
CORS configuration for secure cross-origin requests

🌐 Deployment
Production Environment Variables
envMONGODB_URI=your-production-mongodb-uri
JWT_SECRET=your-super-secure-jwt-secret
NODE_ENV=production
PORT=5000
Deployment Platforms

Heroku: Easy deployment with Git integration
Vercel/Netlify: Great for frontend deployment
Railway/Render: Modern alternatives to Heroku
MongoDB Atlas: Cloud MongoDB hosting

Build Commands
bash# Backend
npm install --production

# Frontend
npm run build
🤝 Contributing

Fork the repository
Create your feature branch (git checkout -b feature/amazing-feature)
Commit your changes (git commit -m 'Add some amazing feature')
Push to the branch (git push origin feature/amazing-feature)
Open a Pull Request

📄 License
This project is open source and available under the MIT License.
🐛 Troubleshooting
Common Issues
MongoDB Connection Error:

Ensure MongoDB is running locally
Check your MONGODB_URI in .env file
For MongoDB Atlas, whitelist your IP address

CORS Errors:

Verify frontend is running on http://localhost:3000
Check backend CORS configuration
Ensure API calls use correct base URL

Authentication Issues:

Check JWT_SECRET is set in .env
Verify tokens are being sent in request headers
Clear localStorage if tokens are corrupted

Port Conflicts:

Backend default: 5000
Frontend default: 3000
Change PORT in .env if needed

📞 Support
If you encounter any issues or have questions:

Check the troubleshooting section above
Search existing GitHub issues
Create a new issue with detailed description
Include error messages and environment details


Happy Coding! 🎉