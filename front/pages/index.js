import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PostForm from '../components/PostForm'
import PostCard from '../components/PostCard'
import { LOAD_MAIN_POSTS_REQUEST } from '../reducers/post'

// rafce
const Home = () => {
    const { me } = useSelector(state => state.user)
    const { mainPosts } = useSelector(state => state.post)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch({
            type: LOAD_MAIN_POSTS_REQUEST
        })
    }, [])

    return (
        <>
            {me && <PostForm />}
            {mainPosts.map(c => <PostCard key={c.id} post={c} />)}
        </>
    )
}

export default Home