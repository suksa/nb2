const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const expressSession = require('express-session')
const dotenv = require('dotenv')
const passport = require('passport')

const passportConfig = require('./passport')
const db = require('./models')
const userAPIRouter = require('./routes/user')
const postAPIRouter = require('./routes/post')
const postsAPIRouter = require('./routes/posts')
const hashtagAPIRouter = require('./routes/hashtag')

dotenv.config()
const app = express()
db.sequelize.sync()
passportConfig()

app.use(morgan('dev')) // 기록
app.use('/', express.static('uploads')) // 프론트에서 이미지 가져갈수있게해줌
app.use(cors({
    origin: true,
    credentials: true,
}))
app.use(express.json()) // json데이터처리 (req.body 쓰려면 필요)
app.use(express.urlencoded({ extended: true })) // form데이터처리 (req.body 쓰려면 필요)
app.use(cookieParser(process.env.COOKIE_SECRET)) // 쿠키분석
app.use(expressSession({  // 세션사용
    resave: false,  // 매번 새션 강제저장
    saveUninitialized: false, // 빈 값도 저장
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true, // 보안 - 자바스크립트로 쿠키에 접근못함
        secure: false, // https를 쓸 때 true
    },
    name: 'rnbck' // 쿠키이름 (뭔지모르게작성)
}))
app.use(passport.initialize()) // express세션 후에 passport 세션 실행되야 해서 뒤에써야함
app.use(passport.session())

app.use('/api/user', userAPIRouter)
app.use('/api/post', postAPIRouter)
app.use('/api/posts', postsAPIRouter)
app.use('/api/hashtag', hashtagAPIRouter)

app.listen(3065, () => {
    console.log('server is running on localhost:3065')
}) 