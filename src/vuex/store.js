import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import Cookies from 'js-cookie';
import axios from 'axios';
import router from '../router';
import {Message} from 'element-ui';

axios.defaults.withCredentials = true; //cookie设置
Vue.use(Vuex);

let defaultUserInfo={
	"nickname": "evanliu",
	"org": "",
	"tel": "",
	"email": "",
	"qq": "",
	"contacts": "",
	"uuid": "",
	"role":"admin",
	"avatar":"static/images/user.jpg",
	"username": "evanliu2968",
	"password1": "",
	"expireon": "",
	"cevtid": "",
	"uevtid": ""
};
// 应用初始状态
const state = {
	userInfo:defaultUserInfo,
	login:false
}

// 定义所需的 mutations
//改变store的唯一方法：$store.commit('loginIn', {name: 'admin'});
const mutations = {
	updateUserinfo(state){
		//模拟登录
		state.login=true;
		let cache_path=sessionStorage.getItem('cache_path');
		if(cache_path){
			router.push(cache_path);
		}else{
			router.push('/');
		}
		return;
		//更新用户信息，判断登录状态
		axios.get('api/v1/portal/oauth2/userinfo').then((res)=>{
			console.log(res);
			if(res.data.status==200){
				state.userInfo=res.data.data;
				state.login=true;
				let cache_path=sessionStorage.getItem('cache_path');
				if(cache_path){
					router.push(cache_path);
				}else{
					router.push('/');
				}
				
			}else{
				Message.error(res.data.statustext);
				window.location.href="/oauth2/login";
			}
		}).catch((err)=>{
			console.log(err);
			Message.error('获取用户信息失败！');
			window.location.href="/oauth2/login";
			//router.push('/login');
		});
	},
	logout(state) {
		state.login=false;
		router.push('/login');
	},
	addAttr(state,obj) {
		state={...state,obj};
	}
}

// 创建 store 实例
export default new Vuex.Store({
	actions,
	getters,
	state,
	mutations
})