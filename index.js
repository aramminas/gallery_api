require('dotenv').config();
const mongoose = require('mongoose');

// const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const session = require('express-session');
const app = express();
const auth = require('./middlewares/auth');

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


/* Routes part */
const addRoutes = require('./routes/add');
const allRoutes = require('./routes/all');
const removeRoutes = require('./routes/remove');
const imageRoutes = require('./routes/image');
const authRoutes = require('./routes/auth');

app.use('/auth', authRoutes);

/* Only for authorized users */
app.use(auth);

app.use('/add', addRoutes);
app.use('/all', allRoutes);
app.use('/image', imageRoutes);
app.use('/delete', removeRoutes);
app.use('/image/info', imageRoutes);
app.use('/image/last/info', imageRoutes);
app.use('/image/logs', imageRoutes);

const PORT = process.env.PORT || 3050;
/*  connect database part */
async function start() {
    try {
        await mongoose.connect(process.env.DATABASE_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        });

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    }catch (e){
        console.log('Error:', e);
    }
}

start();