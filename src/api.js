const express = require ('express');
const mongoose = require('mongoose');

const authRouter = require('./auth');
const router = require('./routes');

require('dotenv').config();

const app = express();

app.use(express.json());
app.use(router);
app.use(authRouter);

mongoose.connect(process.env.CONNECTIONSTRING, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('Succesfully connected to the database!');
       app.listen(process.env.PORT, () => {
            console.log(`Server is up and running on ${process.env.PORT}`);
        });
    })
    .catch((e) => console.error(`Failed to connect to database. Error: ${e}`)
    );
