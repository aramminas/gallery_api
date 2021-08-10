const {Router} = require('express');
const Images = require('../models/images');
const router = Router();

router.get('/',  async (req, res) => {
    const {limit, offset} = req.query;
    const images = await Images.find().skip( +offset).limit( +limit);
    const count = await Images.countDocuments();
    res.json({status: 1, data: images, total: count});
});

module.exports = router;