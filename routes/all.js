const {Router} = require('express');
const Images = require('../models/images');
const router = Router();

router.get('/',  async (req, res) => {
    const images = await Images.find();
    res.json({status: 1, data: images});
});

module.exports = router;