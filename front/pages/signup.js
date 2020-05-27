import React, { useState, useCallback, useEffect } from 'react'
import { Form, Input, Checkbox, Button } from "antd"
import { useDispatch, useSelector } from 'react-redux'
import Router from 'next/router'
import { SIGN_UP_REQUEST } from '../reducers/user'

// useCallback 함수 내부에서 쓰는 state를 deps 배열로 넣음

const Signup = () => {
    const useInput = (initValue = null) => {
        const [value, setter] = useState(initValue)
        const handler = useCallback(e => {
            setter(e.target.value)
        }, [])
        return [value, handler]
    }
    
    const [id, onChangeId] = useInput('')
    const [nick, onChangeNick] = useInput('')
    const [password, onChangePassword] = useInput('')
    const [passwordCheck, setPasswordCheck] = useState('')
    const [term, setTerm] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [termError, setTermError] = useState(false)

    const dispatch = useDispatch()
    const { isSigningUp, me } = useSelector(state => state.user)

    useEffect(() => {
        if (me) {
            alert('메인페이지로 이동합니다')
            Router.push('/')
        }
    }, [me && me.id]) // me.id가 undefined 인걸 방지

    const onSubmit = useCallback(e => {
        e.preventDefault()
        if (password !== passwordCheck) {
            return setPasswordError(true)
        }
        if (!term) {
            return setTermError(true)
        }
        dispatch({
            type: SIGN_UP_REQUEST,
            data: {
                userId: id,
                password,
                nickname: nick,
            }
        })
    }, [id, nick, password, passwordCheck, term]) // useCallback 안에서 쓰는 state는 꼭 써야 바뀜

    const onChangePasswordCheck = useCallback(e => {
        setPasswordError(e.target.value !== password)
        setPasswordCheck(e.target.value)
    }, [password])

    const onChangeTerm = useCallback(e => {
        setTermError(false)
        setTerm(e.target.checked)
    }, [])

    return (
        <Form onSubmit={onSubmit} style={{ padding: 10 }} autoComplete="off">
            <div>
                <label htmlFor="user-id">아이디</label>
                <br />
                <Input name="user-id" value={id} required onChange={onChangeId} />
            </div>
            <div>
                <label htmlFor="user-nick">닉네임</label>
                <br />
                <Input name="user-nick" value={nick} required onChange={onChangeNick} />
            </div>
            <div>
                <label htmlFor="user-password">비밀번호</label>
                <br />
                <Input name="user-password" value={password} type="password" required onChange={onChangePassword} />
            </div>
            <div>
                <label htmlFor="user-password-check">비밀번호체크</label>
                <br />
                <Input name="user-password-check" value={passwordCheck} type="password" required onChange={onChangePasswordCheck} />
                {passwordError && <div>비밀번호가 일치하지 않습니다.</div>}
            </div>
            <div>
                <Checkbox name="user-term" onChange={onChangeTerm}>동의합니다</Checkbox>
                {termError && <div>약관에 동의하셔야 합니다.</div>}
            </div>
            <div style={{ marginTop: 10 }}>
                <Button type="primary" htmlType="submit" loading={isSigningUp}>가입하기</Button>
            </div>
        </Form>
    )
}

export default Signup
