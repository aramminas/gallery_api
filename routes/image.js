const {Router} = require('express');
const Images = require('../models/images');
const ImagesHistory = require('../models/images_history');
const router = Router();

router.get('/',  async (req, res) => {
    const {id} = req.query;
    const image = await Images.find({id});
    res.json({status: 1, image});
});

router.get('/last/info', async(req, res) => {
    const {id, type} = req.query;
    const image = await Images.find({id});
    imageId = image[0]._id;
    const imageHistory = await ImagesHistory.find({imageId, type}).sort({_id: -1});
    if(imageHistory.length > 0){
        res.json({status: 1, data: imageHistory[0]});
        return;
    }
    res.json( {status: 0, message: 'image history not found'});
});

router.post('/info', async (req, res) => {
    const id = req.body.imageId;
    const image = await Images.find({id});
    const History = new ImagesHistory({
        id: req.body.id,
        type: req.body.type,
        height: req.body.height,
        width: req.body.width,
        x: req.body.x,
        y: req.body.y,
        percentage: req.body.percentage,
        imageId: image[0]._id,
    });

    try {
        await History.save();
        res.json({status: 1, message: "info added successfully"});

    }catch (e){
        console.log('Error: ', e);
        res.json({status: 0, message: "Error:" + e});
    }
});

router.get('/logs', async(req, res) => {
    const {id, limit, offset} = req.query;
    const image = await Images.find({id});
    imageId = image[0]._id;
    const imageHistory = await ImagesHistory.find({imageId}).skip( +offset).limit( +limit);
    const count = await ImagesHistory.find({imageId}).countDocuments();
    if(imageHistory.length > 0){
        res.json({status: 1, logs: imageHistory, count, image: image[0]});
        return;
    }
    res.json( {status: 0, image: image[0], message: 'Image logs is empty'});
});

module.exports = router;