// api/index.js
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const qs = require('qs');
const PORT = process.env.PORT || 5000;
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());
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
        console.log('ok');
        if (response.status === 200) {
            res.status(200).json({ message: 'Form submitted successfully', data: response.data });
        } else {
            console.error('Form submission error:', response.data);
            res.status(response.status).json({ message: 'Form submission error', error: response.data });
        }
    } catch (error) {
        if (error.response) {
            console.error('Response data:', error.response.data);
            console.error('Response status:', error.response.status);
            console.error('Response headers:', error.response.headers);
            res.status(error.response.status).json({ message: 'Form submission error', error: error.response.data });
        } else if (error.request) {
            console.error('Request data:', error.request);
            res.status(500).json({ message: 'No response from server', error: error.message });
        } else {
            console.error('Error message:', error.message);
            res.status(500).json({ message: 'Error submitting form', error: error.message });
        }
    }
});

app.get('/formsubmission', (req, res) => {
    res.send('h2asdfasdfas');
});


app.get('/', (req, res) => {
    res.send('API Working properly');
    console.log('hi1')
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
