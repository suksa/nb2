module.exports = (sequelize, DataTypes) => {
    const Hashtag = sequelize.define('Hashtag', {
        name: {
            type: DataTypes.STRING(20), // 20글자 이하
            allowNull: false,   // 필수
        },
    }, {
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
    })

    Hashtag.associate = (db) => {
        db.Hashtag.belongsToMany(db.Post, { through: 'PostHashtag' })
    }

    return Hashtag
}