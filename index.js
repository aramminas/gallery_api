require('dotenv').config();
const mongoose = require('mongoose');

// const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const addRoutes = require('./routes/add');
const allRoutes = require('./routes/all');
const removeRoutes = require('./routes/remove');
const imageRoutes = require('./routes/image');
const Image = require('./models/images');

/* Routes part */
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

        // const image = await Image.findOne();
        // if(!image){
        //     const image = new Image({
        //         id: '2feff233-7d1f-4661-a48f-45ca07ffd5b6',
        //         url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTapsczAOf7_g-ZzXikO78qCP9Ytw1eKwoLgQ&usqp=CAU',
        //     });
        //     await image.save();
        // }

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    }catch (e){
        console.log('Error:', e);
    }
}

start();