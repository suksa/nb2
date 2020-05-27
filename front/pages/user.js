import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Card, Avatar } from "antd";
import { LOAD_USER_POSTS_REQUEST } from '../reducers/post'
import { useDispatch, useSelector } from 'react-redux'
import { LOAD_USER_REQUEST } from '../reducers/user'
import PostCard from '../components/PostCard'


const User = ({ id }) => {
    const dispatch = useDispatch()
    const { mainPosts } = useSelector(state => state.post)
    const { userInfo } = useSelector(state => state.user)

    useEffect(() => {
        dispatch({
            type: LOAD_USER_REQUEST,
            data: id
        })
        dispatch({
            type: LOAD_USER_POSTS_REQUEST,
            data: id
        })
    }, [])

    return (
        <div>
            {userInfo
                ? (
                    <Card
                        actions={[
                            <div key="twit">
                                짹짹
                                <br />
                                {userInfo.Posts}
                            </div>,
                            <div key="twit">
                                팔로잉
                                <br />
                                {userInfo.Followings}
                            </div>,
                            <div key="twit">
                                팔로워
                                <br />
                                {userInfo.Followers}
                            </div>
                        ]}
                        style={{ marginBottom: 15 }}
                    >
                        <Card.Meta
                            avatar={<Avatar>{userInfo.nickname[0]}</Avatar>}
                            title={userInfo.nickname}
                        />
                    </Card>
                )
                : null}
            {mainPosts.map(c => (
                <PostCard key={c.id} post={c} />
            ))}
        </div>
    )
}

User.propType = {
    id: PropTypes.number.isRequired
}

User.getInitialProps = async (context) => {
    return { id: parseInt(context.query.id, 10) }
}

export default User