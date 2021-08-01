const express = require('express');
const router = express.Router();
const { Favorite } = require('../models/Favorite');


router.post('/favoriteNumber', (req, res) => {    

    // mongoDB 에서 favorite 숫자를 가져오기

    console.log("favoriteNumber function")

    Favorite.find({"movieId": req.body.movieId})
        .exec((err, info) => {
           
            if(err) return res.status(400).send(err)

            res.status(200).json({success:true,  favoriteNumber:info.length})
        })


    // 그다음에 프론트에 다시 숫자 정보를 보내주기

})

router.post('/favorited', (req, res) => {    

    // 내가 이 영화를 Favorite 리스트에 넣었는지 정보를 DB 에서 가져오기

    console.log("favorited function")

    Favorite.find({"movieId": req.body.movieId, "userFrom":req.body.userFrom})
        .exec((err, info) => {
           
            if(err) return res.status(400).send(err)

            let result = false;
            if(info.length !== 0)
            {
                result = true;
            }

            res.status(200).json({success:true,  favorited:result})
        })
    // 그다음에 프론트에 다시 숫자 정보를 보내주기

})


router.post('/removeFromFavorite', (req, res) => {    

    console.log('removeFromFavorite function')
    Favorite.findOneAndDelete({ movieId:req.body.movieId, userFrom:req.body.userFrom })
        .exec((err, doc) => {
            if(err) return res.status(400).send(err)

            return res.status(200).json({success:true, doc})
        })
})

router.post('/addToFavorite', (req, res) => {    

    console.log('addToFavorite function')

    const favorite = new Favorite(req.body)
    favorite.save((err, doc) => {
        if(err) return res.status(400).send(err)

        return res.status(200).json({success:true})
    })
})

router.post('/getFavoriteMovie', (req, res) => {    

    console.log('getFavoriteMovie function')

    Favorite.find({"userFrom":req.body.userFrom})
        .exec((err, favorites) => {
           
            if(err) return res.status(400).send(err)

            return res.status(200).json({success:true, favorites })
        })
})

module.exports = router;