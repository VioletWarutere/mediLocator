const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const bodyParser = require('body-parser');

app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.json());
app.use(express(express.urlencoded({ extended: true })));

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) =>{
    res.send('Welcome to the MediLocator app');
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})