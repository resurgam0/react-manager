import { Menu } from "antd"
import { DesktopOutlined } from '@ant-design/icons'
import styles from './index.module.less'
import { useNavigate } from "react-router-dom"
import { useStore } from '@/store'
const SideMenu = ()=>{
	const { collapsed } = useStore()
	const navigate = useNavigate()
	const items = [
		{
			key: 'sub1',
			label: 'Navigation One',
			icon: <DesktopOutlined />,
			children: [
				{ key: '5', label: 'Option 5' },
				// { key: '6', label: 'Option 6' },
				// { key: '7', label: 'Option 7' },
				// { key: '8', label: 'Option 8' },
			],
		}
	]
	const handleClickLogo = ()=>{
		navigate("/welcome")
	}
	return(
		<div className={styles.navSide}>
			<div className={styles.logo} onClick={handleClickLogo}>
				<img src='/imgs/logo.png' className={styles.img}/>
				{collapsed ? '' : <span>慕慕货运</span>}
			</div>
			{/* <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="dark"
				style={{width: collapsed ? 80 : 'auto', height: 'calc(100vh-50px)'}}
        items={items}
      /> */}
		</div>
	)
}
export default SideMenu
