import React, { useEffect, useState } from 'react'
import { Layout, theme, Watermark } from 'antd'
import NavHeader from '@/components/NavHeader'
import NavFooter from '@/components/NavFooter'
import Menu from '@/components/Menu'
import styles from './index.module.less'
import api from '@/api'
import { Outlet } from 'react-router-dom'
import { useStore } from '@/store'
const { Header, Content, Footer, Sider } = Layout

const App: React.FC = () => {
	const { updateUserInfo, userInfo, collapsed, updateCollapsed } = useStore()
	useEffect(()=>{
		getUserInfo()
	},[])
	const getUserInfo = async()=>{
		const data = await api.getUserInfo()
		updateUserInfo(data)
	}
  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken()

  return (
    <Watermark content='React'>
      <Layout>
        <Sider collapsed={collapsed}>
          <Menu />
        </Sider>

        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer }}>
            <NavHeader />
          </Header>
					<div className={styles.content}>
						<div className={styles.wrapper}>
							<Outlet></Outlet>
						</div>
						<NavFooter />
					</div>
        </Layout>
      </Layout>
    </Watermark>
  )
}

export default App
