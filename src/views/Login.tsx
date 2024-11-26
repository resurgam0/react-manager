import request from '@/utils/request'
import { useEffect } from 'react'
export default function Login() {
  useEffect(() => {
    request
      .get('/users', {
        id: 12345
      })
      .catch(error => {
        console.log(error)
      })
  }, [])
  return <div>我是login</div>
}
