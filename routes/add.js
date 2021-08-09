const {Router} = require('express');
const Images = require('../models/images');
const router = Router();

router.get('/',  (req, res) => {
    console.log('add get rout')
    res.redirect('/');
});

router.post('/',  async (req, res) => {

    const image = new Images({
        id: req.body.id,
        url: req.body.url,
    });

    try {
        await image.save();
        res.json({status: 1, message: "image added"});

    }catch (e){
        console.log('Error: ', e);
        res.json({status: 0, message: "Error:" + e});
    }
});

module.exports = router;