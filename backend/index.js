
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Allow any localhost/127.0.0.1 origin (any port) during development
const corsOptions = {
  origin: (origin, cb) => {
    if (!origin) return cb(null, true); // allow tools like curl/postman
    try {
      const { hostname } = new URL(origin);
      if (hostname === 'localhost' || hostname === '127.0.0.1') {
        return cb(null, true);
      }
    } catch (e) {
      // fallthrough to deny
    }
    return cb(null, false);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token'],
  optionsSuccessStatus: 204,
};

dotenv.config();

connectDB(); 

const app = express();

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use('/tasks', require('./routes/taskRoutes'));
app.use('/auth', require('./routes/authRoutes')); 
app.get('/', (req, res) => {
  res.send('Taskify API is running...');
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});