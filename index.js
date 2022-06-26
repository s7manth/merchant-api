require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

const http = require('http').createServer(app);

app.use('/data', require('./routes/dataRouter'));
app.use('/logic', require('./routes/logicRouter'));

const URL = `${process.env.MONGODB_URL}`;

mongoose.connect(
    URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    (err) => {
        if (err) {
            throw err;
        }
        console.log('Connected to MongoDB');
    }
);

const port = process.env.PORT || 5001;
http.listen(port, () => {
    console.log('Server is running on port', port);
});
