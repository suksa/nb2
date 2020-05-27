const express = require('express')
const db = require('../models')

const router = express.Router()

router.get('/', async (req, res, next) => { // GET /api/posts
    try {
        const posts = await db.Post.findAll({
        include: [{
            model: db.User,
            attributes: ['id', 'nickname']
        }, {
            model: db.Image,
        }, {
            model: db.User,
            through: 'Like',
            as: 'Likers',
            attributes: ['id']
        }],
        order: [['createdAt', 'DESC']] // desc 내림차순, asc 오름차순 (default)
    })
    res.json(posts)
    } catch (e) {
        console.error(e)
        next(e)
    }
})

module.exports = router

