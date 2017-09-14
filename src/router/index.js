import Vue from 'vue';
import Router from 'vue-router';

import Layout from '../views/layout/Layout.vue';
const Login= resolve => require(['../views/layout/Login.vue'], resolve);
const ChangePwd= resolve => require(['../views/layout/ChangePwd.vue'], resolve);
const NotFound= resolve => require(['../views/layout/404.vue'], resolve); //放在路由最后面
const Home= resolve => require(['../views/layout/Home.vue'], resolve); //放在路由最后面

const Echarts= resolve => require(['../views/demo/Echarts.vue'], resolve);

const UserManage= resolve => require(['../views/system/UserManage.vue'], resolve);
const RoleManage= resolve => require(['../views/system/RoleManage.vue'], resolve);
const LogManage= resolve => require(['../views/system/LogManage.vue'], resolve);
const MenuManage= resolve => require(['../views/system/MenuManage.vue'], resolve);


let routes=[
	{
		path: '/',redirect: '/home',
		meta:{
			isMenu:false
		}
	},
	{
		path: '/login',
		component: Login,
		name:'登录',
		meta:{
			role:['admin','ordinary'], //数组中有角色名则表示对该角色开放权限
			isMenu:false, //是否作为菜单显示
			isParent:false, //是否为下拉菜单，否则为路由菜单
			icon:'' //菜单及导航栏图标的class
		}
	},
	{
		path: '/',
		component:Layout,
		name: '',
		meta:{
			isMenu:false
		},
		children: [
			{ path: '/changepwd', component: ChangePwd, name: '修改密码',
				meta:{
					role:['admin','ordinary'],
					isMenu:false,
					isParent:false,
					icon:'iconfont icon-password'
				}
			}
		]
	},
	{
		path: '/',
		component:Layout,
		name: '',
		meta:{
			role:['admin','ordinary'],
			isMenu:true,
			isParent:false,
			icon:''
		},
		children: [
			{ path: '/home', component: Home, name: '首页',
				meta:{
					role:['admin','ordinary'],
					isMenu:true,
					isParent:false,
					icon:'iconfont icon-home7'
				}
			}
		]
	},
	{
		path: '/',
		component:Layout,
		name: '示例',
		meta:{
			role:['admin','ordinary'],
			isMenu:true,
			isParent:true,
			icon:'el-icon-menu'
		},
		children: [
			{ path: '/echarts', component: Echarts, name: '图表',
				meta:{
					role:['admin','ordinary'],
					isMenu:true,
					isParent:false,
					icon:''
				}
			}
		]
	},
	{
		path: '/',
		component:Layout,
		name: '系统管理',
		meta:{
			role:['admin','ordinary'],
			isMenu:true,
			isParent:true,
			icon:'el-icon-setting'
		},
		children: [
			{ path: '/usermanage', component: UserManage, name: '用户管理',
				meta:{
					role:['admin','ordinary'],
					isMenu:true,
					isParent:false
				}
			},
			{ path: '/rolemanage', component: RoleManage, name: '角色管理',
				meta:{
					role:['admin','ordinary'],
					isMenu:true,
					isParent:false
				}
			},
			{ path: '/menumanage', component: MenuManage, name: '菜单管理',
				meta:{
					role:['admin','ordinary'],
					isMenu:true,
					isParent:false
				}
			},
			{ path: '/logmanage', component: LogManage, name: '日志管理',
				meta:{
					role:['admin','ordinary'],
					isMenu:true,
					isParent:false
				}
			}
		]
	},
	{
		path: '/404',
		component: NotFound,
		name:'404',
		meta:{
			role:['admin','ordinary'],
			isMenu:false,
			isParent:false
		}
	}
];

Vue.use(Router);
export default new Router({
	// mode: 'history', //去掉#字符hash，后端支持可开
	scrollBehavior: () => ({ y: 0 }), //每次路由后scroll置为0
	routes: routes
})
