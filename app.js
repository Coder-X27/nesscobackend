const express = require('express');
const cors = require('cors');
const axios = require('axios'); // Import axios
const qs = require('qs'); // Import qs for form-urlencoded serialization
const app = express();
const path = require('path');

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'build')));
// Enable all CORS requests
app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
    res.send('hi');
});

app.post('/form-submission', async (req, res) => {
    const { SingleLine, Email, PhoneNumber_countrycode, SingleLine1, MultiLine } = req.body;
    const formData = qs.stringify({
        "SingleLine": SingleLine,
        "Email": Email,
        "PhoneNumber_countrycode": PhoneNumber_countrycode,
        "SingleLine1": SingleLine1,
        "MultiLine": MultiLine
    });

    try {
        const response = await axios.post('https://forms.zohopublic.com/daulattraders/form/ContactsUs/formperma/XLczgDgfmQuzWXzJ8PJNEwrN9ShOJDYtTgaj-OSxQ0M/htmlRecords/submit', formData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        });

        if (response.status === 200) {
            // console.log('Form submitted successfully:', response.data);
            // res.status(200).json({ message: 'Form submitted successfully', data: response.data });
            console.log('ok')
        } else {
            console.error('Form submission error:', response.data);
            res.status(response.status).json({ message: 'Form submission error', error: response.data });
        }
    } catch (error) {
        if (error.response) {
            // Server responded with a status other than 2xx
            console.error('Response data:', error.response.data);
            console.error('Response status:', error.response.status);
            console.error('Response headers:', error.response.headers);
            res.status(error.response.status).json({ message: 'Form submission error', error: error.response.data });
        } else if (error.request) {
            // Request was made but no response received
            console.error('Request data:', error.request);
            res.status(500).json({ message: 'No response from server', error: error.message });
        } else {
            // Something else happened in making the request
            console.error('Error message:', error.message);
            res.status(500).json({ message: 'Error submitting form', error: error.message });
        }
    }
});
app.get('/form-submission', async (req, res) => {
    res.send('h2')
});
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/build/index.html'));
});
app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
