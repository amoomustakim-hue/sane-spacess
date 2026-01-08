const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the current directory
app.use(express.static(path.join(__dirname)));

// API Routes (Mock implementation for now)
app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;
    console.log('Contact form submission:', { name, email, message });
    // In a real app, you would save this to a database or send an email
    res.json({ success: true, message: 'Message received! We will reach out soon.' });
});

app.post('/api/book', (req, res) => {
    const { service, date, name } = req.body;
    console.log('Booking request:', { service, date, name });
    res.json({ success: true, message: 'Booking request received! Please check your email for confirmation.' });
});

// Fallback for any other route to serve index.html (SPA feel, though these are static pages)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`SaneSpace is ready to help.`);
});
