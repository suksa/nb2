const express = require('express')
const bcrypt = require('bcrypt')
const passport = require('passport')
const db = require('../models')
const { isLoggedIn } = require('./middleware')

const router = express.Router()

router.get('/', isLoggedIn, (req, res) => { // /api/user/
    const user = Object.assign({}, req.user.toJSON())
    delete user.password
    return res.json(user)
})
router.post('/', async (req, res, next) => { // POST /api/user 회원가입
    try {
        const exUser = await db.User.findOne({
            where: {    // where: 무엇을 찾고 싶은지
                userId: req.body.userId
            }
        })
        if (exUser) {
            return res.status(403).send('이미 사용중인 아이디입니다.')
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 12) //salt는 10~13 사이
        const newUser = await db.User.create({
            nickname: req.body.nickname,
            userId: req.body.userId,
            password: hashedPassword
        })
        console.log(newUser)
        return res.status(200).json(newUser)
    } catch (e) {
        console.error(e)
        return next(e) // 그냥 프론트로 넘겨버림
    }
})
router.get('/:id', async (req, res, next) => { // 남의 정보 가져오는것  ex) /api/user/3  id가 3인 유저가져옴
    try {
        const user = await db.User.findOne({
            where: { id: parseInt(req.params.id, 10) },
            include: [{
                model: db.Post,
                as: 'Posts',
                attributes: ['id'],
            }, {
                model: db.User,
                as: 'Followings',
                attributes: ['id'],
            }, {
                model: db.User,
                as: 'Followers',
                attributes: ['id'],
            }],
            attributes: ['id', 'nickname']
        })
        const jsonUser = user.toJSON()
        jsonUser.Posts = jsonUser.Posts ? jsonUser.Posts.length : 0
        jsonUser.Followings = jsonUser.Followings ? jsonUser.Followings.length : 0
        jsonUser.Followers = jsonUser.Followers ? jsonUser.Followers.length : 0
        res.json(jsonUser)
    } catch(e) {
        console.error(e)
        next(e)
    }
})
router.post('/logout', (req, res) => {
    req.logout()
    req.session.destroy()
    res.send('logout 성공')
})
router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => { // 서버에러, 성공, 로직상에러
        if (err) {
            console.error(err)
            return next(err)
        }
        if (info) {
            return res.status(401).send(info.reason)
        }
        return req.login(user, async (loginErr) => {
            try {
                if (loginErr) {
                    return next(loginErr)
                }
                const fullUser = await db.User.findOne({
                    where: { id: user.id },
                    include: [{
                        model: db.Post,
                        as: 'Posts',
                        attributes: ['id'],
                    }, {
                        model: db.User,
                        as: 'Followings',
                        attributes: ['id'],
                    }, {
                        model: db.User,
                        as: 'Followers',
                        attributes: ['id'],
                    }],
                    attributes: ['id', 'nickname', 'userId'],
                  });
                console.log(fullUser)
                return res.json(fullUser)
            } catch (e) {
                next(e)
            }
        })
    })(req, res, next)
})
router.get('/:id/follow', (req, res) => {

})
router.post('/:id/follow', (req, res) => {

})
router.delete('/:id/follow', (req, res) => {

})
router.delete('/:id/follower', (req, res) => {

})
router.get('/:id/posts', async (req, res, next) => {
    try {
        const posts = await db.Post.findAll({
            where: {
                UserId: parseInt(req.params.id, 10),
                RetweetId: null,
            },
            include: [{
                model: db.User,
                attributes: ['id', 'nickname']
            }, {
                model: db.Image
            }, {
                model: db.User,
                through: 'Like',
                as: 'Likers',
                attributes: ['id']
            }]
        })
        res.json(posts)
    } catch (e) {
        console.error(e)
        next(e)
    }
})

module.exports = router
