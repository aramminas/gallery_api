const {Router} = require('express');
const Images = require('../models/images');
const router = Router();

router.post('/', async (req, res) => {
    const image = await Images.find({id: req.body.id} );
    const result = await Images.deleteOne(image[0]);
    if(result){
        res.json({status: 1, message: "image deleted"});
    }else {
        res.json({status: 0, message: "an error occurred while deleting the picture"});
    }
});

module.exports = router;