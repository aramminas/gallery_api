const {Router} = require('express');
const Images = require('../models/images');
const router = Router();

router.get('/',  async (req, res) => {
    const {id} = req.query;
    const image = await Images.find({id});
    res.json({status: 1, image});
});

module.exports = router;