import { User } from '@/types/api'
import { create } from 'zustand'
export const useStore = create<{
  token: string
  userInfo: User.UserItem
	collapsed: boolean
  updateUserInfo: (userInfo: User.UserItem) => void
  updateToken: (token: string) => void
	updateCollapsed:()=>void
}>(set => ({
  token: '',
  userInfo: {
    _id: '',
    userId: 0,
    userName: '',
    userEmail: '',
    deptId: '',
    state: 0,
    mobile: '',
    job: '',
    role: 0,
    roleList: '',
    createId: 0,
    deptName: '',
    userImg: ''
  },
	collapsed: false,
  updateUserInfo(userInfo: User.UserItem) {
    set({
      userInfo
    })
  },
  updateToken(token: string) {
    set({
      token
    })
  },
	updateCollapsed:()=>set((state)=>({collapsed: !state.collapsed}))
}))
