import React, { useState, useCallback, useEffect } from 'react'
import { Button, Card, Avatar, Icon, Form, Input, List, Comment } from 'antd'
import Link from 'next/link'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { ADD_COMMENT_REQUEST, LOAD_COMMENTS_REQUEST, UNLIKE_POST_REQUEST, LIKE_POST_REQUEST } from '../reducers/post'
import PostImage from './PostImages'

const PostCard = ({ post }) => {
    const [commentFormOpened, setCommentFormOpened] = useState(false)
    const [commentText, setCommentText] = useState('')
    const { me } = useSelector(state => state.user)
    const { commentAdded, isAddingComment } = useSelector(state => state.post)
    const dispatch = useDispatch()

    const liked = me && post.Likers && post.Likers.find(v => v.id === me.id)

    const onToggleComment = useCallback(() => {
        setCommentFormOpened(prev => !prev)
        if (!commentFormOpened) {
            dispatch({
                type: LOAD_COMMENTS_REQUEST,
                data: post.id,
            })
        }
    }, [])

    const onSubmitComment = useCallback(e => {
        e.preventDefault()
        if (!me) {
            return alert('로그인이 필요합니다.')
        }
        dispatch({
            type: ADD_COMMENT_REQUEST,
            data: {
                postId: post.id,
                content: commentText,
            }
        })
    }, [me && me.id, commentText])

    useEffect(() => {
        setCommentText('')
    }, [commentAdded === true])

    const onChangeCommentText = useCallback(e => {
        setCommentText(e.target.value)
    }, [])

    const onToggleLike = useCallback(() => {
        if (!me) {
            return alert('로그인이 필요합니다!')
        }
        if (liked) { // 좋아요 누른 상태
            return dispatch({
                type: UNLIKE_POST_REQUEST,
                data: post.id,
            })
        } else { // 좋아요 안 누른 상태
            dispatch({
                type: LIKE_POST_REQUEST,
                data: post.id,
            })
        }
    }, [me && me.id, post && post.id, liked])

    return (
        <>
            <Card
                cover={post.Images[0] && <PostImage images={post.Images} />}
                actions={[
                    <Icon type="retweet" key="retweet" />,
                    <Icon type="heart" key="heart" onClick={onToggleLike} theme={liked ? 'twoTone' : ''} twoToneColor="#eb2f96" />,
                    <Icon type="message" key="message" onClick={onToggleComment} />,
                    <Icon type="ellipsis" key="ellipsis" />
                ]}
                extra={<Button>팔로우</Button>}
                style={{ marginBottom: 15 }}
            >
                <Card.Meta
                    avatar={<Link href={{ pathname: '/user', query: { id: post.User.id } }} as={`/user/${post.User.id}`}><a><Avatar>{post.User.nickname[0]}</Avatar></a></Link>}
                    title={post.User.nickname}
                    description={<div>{post.content.split(/(#[^\s]+)/g).map((v, i) => {
                        if (v.match(/#[^\s]+/)) {
                            return (
                                <Link key={i} href={{ pathname: '/hashtag', query: {tag: v.slice(1)} }} as={`/hashtag/${v.slice(1)}`}><a>{v}</a></Link>
                            )
                        }
                        return v
                    })}</div>}
                />
            </Card>
            {commentFormOpened && (
                <>
                    <Form onSubmit={onSubmitComment}>
                        <Form.Item>
                            <Input.TextArea row={4} value={commentText} onChange={onChangeCommentText} />
                        </Form.Item>
                        <Button type="primary" htmlType="submit" loading={isAddingComment}>삐약</Button>
                    </Form>
                    <List 
                        header={`${post.Comments ? post.Comments.length : 0} 댓글`}
                        itemLayout="horizontal"
                        dataSource={post.Comments || []}
                        renderItem={item => (
                            <li>
                                <Comment
                                    author={item.User.nickname}
                                    avatar={<Link href={{ pathname: '/user', query: { id: post.User.id } }} as={`/user/${item.User.id}`}><a><Avatar>{item.User.nickname[0]}</Avatar></a></Link>}
                                    content={item.content}
                                    // datetime={item.createdAt}
                                />
                            </li>
                        )}
                    />
                </>
            )}
        </>
    )
}

PostCard.propTypes = {
    post: PropTypes.shape({
        User: PropTypes.object,
        content: PropTypes.string,
        img: PropTypes.string,
        createdAt: PropTypes.string,
    })
}

export default PostCard
