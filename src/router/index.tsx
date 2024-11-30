import { Navigate, createBrowserRouter, useRoutes } from "react-router-dom";
import Login from "@/views/login/Login";
import Layout from "@/layout";
import Welcome from "@/views/welcome";
import Error403 from '@/views/403'
import Error404 from '@/views/404'
const router = [
	{
		path: '/',
		element: <Navigate to='/welcome'/>
	},
	{
		path: '/login',
		element: <Login/>
	},
	{
		element: <Layout/>,
		children:[
			{
				path: '/welcome',
				element: <Welcome/>
			}
		]
	},
	{
		path: '*',
		element: <Navigate to='/404'/>
	},
	{
		path: '/403',
		element: <Error403/>
	},
	{
		path: '/404',
		element: <Error404/>
	}
]
export default createBrowserRouter(router)
