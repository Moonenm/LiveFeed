const express = require ('express');
const mongoose = require('mongoose');
const path = require('path'); // extra

const authRouter = require('./auth');
const router = require('./routes');

const bodyParser = require('body-parser');

require('dotenv').config();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(router);
app.use(authRouter);
app.use(express.static('public')); // extra
app.set('views', path.join(__dirname, 'views')); // extra
app.set('view engine', 'pug'); // extra

mongoose.connect(process.env.CONNECTIONSTRING, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('Succesfully connected to the database!');
       app.listen(process.env.PORT, () => {
            console.log(`Server is up and running on ${process.env.PORT}`);
        });
    })
    .catch((e) => console.error(`Failed to connect to database. Error: ${e}`)
    );
