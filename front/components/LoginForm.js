import React, { useState, useCallback } from 'react'
import Link from 'next/link'
import { Input, Button, Form } from "antd";
import { useDispatch, useSelector } from 'react-redux';
import { LOG_IN_REQUEST } from '../reducers/user'

const LoginForm = () => {
    const useInput = (initValue = null) => {
        const [value, setter] = useState(initValue)
        const handler = useCallback(e => {
            setter(e.target.value)
        }, [])
        return [value, handler]
    }

    const [id, onChangeId] = useInput('')
    const [password, onChangePassword] = useInput('')
    const { isLoggingIn } = useSelector(state => state.user)
    const dispatch = useDispatch()

    const onSubmitForm = useCallback(e => {
        e.preventDefault()
        dispatch({
            type: LOG_IN_REQUEST,
            data: {
                userId: id,
                password
            }
        })
    }, [id, password])

    return (
        <>
            <Form onSubmit={onSubmitForm} style={{ marginBottom: 10 }} autoComplete="off">
                <div>
                    <label htmlFor="user-id">아이디</label>
                    <br />
                    <Input name="user-id" value={id} onChange={onChangeId} required />
                </div>
                <div>
                    <label htmlFor="user-password">비밀번호</label>
                    <br />
                    <Input name="user-password" value={password} onChange={onChangePassword} required />
                </div>
                <div style={{ marginTop: 10 }}>
                    <Button type="primary" htmlType="submit" loading={isLoggingIn}>로그인</Button>
                    <Link href="/signup"><a><Button>회원가입</Button></a></Link>
                </div>
            </Form>
        </>
    )
}

export default LoginForm
