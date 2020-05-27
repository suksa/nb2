const passport = require('passport')
const db = require('../models')
const local = require('./local')

module.exports = () => {
    // 1. 프론트에서 쿠키를 보냄
    // 2. 서버쪽은 메모리 검색 쿠키와 연관된 id 찾음
    // 3. id를 가지고 db불러옴
    passport.serializeUser((user, done) => { // 서버쪽에 [{id:3, cookie: 'asdf'}]
        return done(null, user.id)
    })

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await db.User.findOne({
                where: { id },
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
              });
              return done(null, user); // req.user
        } catch (e) {
            console.error(e)
            return done(e)
        }
    })

    local()
}