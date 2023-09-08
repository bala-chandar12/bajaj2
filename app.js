const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// Replace with your user_id, email, and roll_number
const user_info = {
  user_id: 'Balachandar_N_13102002',
  email: 'ns5021@srmist.edu.in',
  roll_number: 'RA2011004020148',
};

app.use(bodyParser.json());

app.post('/bfhl', (req, res) => {
  try {
    const data = req.body.data;
    const is_success = true;
    const numbers = data.filter((x) => !isNaN(x));
    const alphabets = data.filter((x) => /^[a-zA-Z]$/.test(x));

    const highest_alphabet = alphabets.length
      ? [alphabets.reduce((a, b) => (a.toLowerCase() > b.toLowerCase() ? a : b))]
      : [];

    const response = {
      is_success,
      ...user_info,
      numbers,
      alphabets,
      highest_alphabet,
    };
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ is_success: false, error: error.message });
  }
});

app.get('/bfhl', (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

app.listen(process.env.PORT ||port, () => {
  console.log(`Server is running on port ${port}`);
});
