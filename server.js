const express = require('express');

const app = express();

// Just for test purpose
app.get('/', (req, res) => res.send('API Running'))

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));  