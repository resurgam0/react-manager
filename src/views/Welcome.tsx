import { Spin } from 'antd'
import { formatMoney, toLocalData } from '@/utils'
export default function Welcome() {
  const test = () => {
    console.log(formatMoney('77766.980'))
    console.log(toLocalData(new Date(), 'yyyy-MM-dd'))
  }
  return (
    <div>
      <button onClick={test}>点击</button>
      <Spin tip='加载中'>
        <p>welcome</p>
      </Spin>
    </div>
  )
}
