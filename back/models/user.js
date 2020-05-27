module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', { // 앞자리 대문자사용하면 테이블명은 users로 바뀜
        nickname: {
            type: DataTypes.STRING(20), // 20글자 이하
            allowNull: false,   // 필수
        },
        userId: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: true,   // 고유값
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
    }, {
        charset: 'utf8',
        collate: 'utf8_general_ci',
    })

    User.associate = (db) => {
        db.User.hasMany(db.Post, { as: 'Posts' })
        db.User.hasMany(db.Comment)
        db.User.belongsToMany(db.Post, { through: 'Like', as: 'Liked' })
        db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followers', foreignKey: 'followingId' })
        db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followings', foreignKey: 'followerId' })
    }

    return User
}