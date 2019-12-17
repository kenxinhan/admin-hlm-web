import Main from '@/components/Main'

let routers = [
	// 登录页
	{
		path: '/login',
		name: '登录',
		component: () => import('@/views/Login/Login')
	},
	{
		path: '/',
		component: Main,
		children:
			[
				// 今日工作
				{
					path: '/',
					name: '今日工作',
					component: () => import('@/views/WorkToday/WorkToday')
				},


				// 抢客户
				{
					path: '/RobCustomers',
					name: '抢客户',
					component: () => import('@/views/RobCustomers/RobCustomers'),
				},
				{
					path: '/RobCustomers/:code',
					name: '客户资料',
					component: () => import('@/views/RobCustomers/Customdetail')
				},
				{
					path: '/PatientManage',
					name: '/PatientManage',
					component: () => import('@/views/PatientManage/PatientManage'),
				},

				//服务管理
				{
					path: '/ServerManage',
					name: '服务管理',
					component: () => import('@/views/ServerManage/ServerManage'),
				},

				//订单管理
				{
					path: '/OrderManage',
					name: '订单管理',
					component: () => import('@/views/OrderManage/OrderManage'),
				},

				// 患者管理
				{
					path: '/AddPatient',
					name: '新增患者',
					component: () => import('@/views/PatientManage/AddPatient'),
				},
				{
					path: '/PatientDetail/:code',
					name: '/PatientDetail',
					component: () => import('@/views/PatientManage/PatientDetail'),
					props:true
				},

				// 排班管理
				{
					path: '/ClassManage',
					name: '排班管理',
					component: () => import('@/views/ClassManage/ClassManage'),
				},


				// 预约排班
				{
					path: '/BookingManage',
					name: '预约管理',
					component: () => import('@/views/BookingManage/BookingManage'),
				},

				// 收费报表
				{
					path: '/ChargeReport',
					name: '收费报表',
					component: () => import('@/views/Statement/ChargeReport'),
				},


				// 收费配置
				{
					path: '/SystemSetting',
					name: '收费配置',
					component: () => import('@/views/SystemSetting/SystemSetting'),
				},

				// 病例配置
				{
					path: '/MedicalSetting',
					name: '病例配置',
					component: () => import('@/views/MedicalSetting/MedicalSetting'),
				},

				// 正畸配置
				{
					path: '/OrtRecordsSetting',
					name: '正畸配置',
					component: () => import('@/views/OrtRecordsSetting/Index'),
				},


			],
	},
	{
		path: '/Login',
		name: 'Login',
		component: () => import('@/components/Login')
	},
	{
		path: 'notFound',
		name: 'NotFound',
		component: () => import('@/components/Index/notFound')
	},
]
export default routers
