import React from 'react'
import { Form, Button, Input } from 'antd'

const NickNameEditForm = () => {
    return (
        <>
            <Form style={{ marginBottom: 20, border: '1px solid #d9d9d9', padding: 20 }} >
                <Input addonBefore="닉네임" />
                <Button type="primary">수정</Button>
            </Form> 
        </>
    )
}

export default NickNameEditForm
