require('dotenv').config();

const express = require('express');

const app = express();
app.use(express.json());

const http = require('http').createServer(app);

app.use('/data', require('./routes/dataRouter'));

// const URI = process.env.MONGODB_URL;
// mongoose.connect(
//     URI,
//     {
//         useCreateIndex: true,
//         useFindAndModify: false,
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//     },
//     (err) => {
//         if (err) throw err;
//         console.log('Connected to MongoDB');
//     }
// );

const port = process.env.PORT || 5001;
http.listen(port, () => {
    console.log('Server is running on port', port);
});