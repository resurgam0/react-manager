import request from '@/utils/request'
import { useEffect, useState } from 'react'
import { Button, Form, Input, message } from 'antd'
import styles from './index.module.less'
import api from '@/api'
import { Login } from '@/types/api'
import storage from '@/utils/storage'
import { useStore } from '@/store'
export default function LoginFc() {
  const [loading, setLoading] = useState(false)
	const updateToken = useStore(state=>state.updateToken)
  const onFinish = async (values: Login.params) => {
    try {
      setLoading(true)
      console.log('Success:', values)
      const data: any = await api.login(values)
      setLoading(false)
      storage.set('token', data)
			updateToken(data)
      message.success('登录成功')
      const params = new URLSearchParams(location.search)
      setTimeout(() => {
        location.href = params.get('callback') || '/'
      })
    } catch (error) {
      setLoading(false)
    }
  }
  return (
    <div className={styles.login}>
      <div className={styles.loginWrapper}>
        <div className={styles.loginTitle}>系统登录</div>
        <Form name='basic' initialValues={{ remember: true, userName: 'JackMa', userPwd: '123456' }} onFinish={onFinish} autoComplete='off'>
          <Form.Item name='userName' rules={[{ required: true, message: 'Please input your username!' }]}>
            <Input />
          </Form.Item>

          <Form.Item name='userPwd' rules={[{ required: true, message: 'Please input your password!' }]}>
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type='primary' block htmlType='submit' loading={loading}>
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
