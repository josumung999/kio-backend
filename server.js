const express = require('express');
const connectDB = require('./config/db');

const app = express();

// connect DB
connectDB();

// Init middleware
app.use(express.json({ extended: false }))

// Just for test purpose
app.get('/', (req, res) => res.send('API Running'))

// Define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/transactions', require('./routes/api/transactions'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));  