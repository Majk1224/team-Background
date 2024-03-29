import {login,UserInfo,getViewAuthority} from '../services'
import { setToken,getToken,removeToken } from "../utils/user";
import {routerRedux} from 'dva/router';
import allView from "../router/config";

export default {
    // 命名空间
    namespace: 'user',
    // 模块内部的状态
    state: {
      isUser:{},
      userInfo:{},
      viewAuthority: [],  // 用户所拥有的视图权限
      myView: [],  // 拥有权限的前端路由
      forbiddenView: [] //没有权限访问的路由
    },
    subscriptions: {
      setup({ dispatch, history }) { 
         // eslint-disable-line
         return history.listen(({pathname})=>{
       
            if(pathname.indexOf("/login")===-1){
              
             // 不去登陆页面做token检测
              if (!getToken()){
                // 利用redux做路由跳转
                dispatch(routerRedux.replace({
                  pathname: `/login`,            
                  search: `?redirect=${encodeURIComponent(pathname)}`
                }))
              }else{
           
                // 1.1.2 有登录态，请求用户信息,请求用户权限
                dispatch({
                  type: 'getUserInfo'
                })
              }
            }else{
              if(getToken()){
               // 利用redux做路由跳转
                dispatch(routerRedux.replace({
                  pathname:"/"
                }))
              }
            }
        })
      },
    },
  
    // 异步操作
    effects: {
        *login({ payload }, { call, put }) {  // eslint-disable-line
          //1.调用登录接口
            let data=yield call(login,payload)
            //2.设置登录态到Cookie里
            if(data.code===1){
              setToken(data.token);
            }
            //3.更新redux的登录信息
            yield put({type:"save",action:data})
           
          },
          *getUserInfo({ payload }, { call, put,select }){
            let myView = yield select(state=>state.user.myView);
            if (myView.length){
              return;
            }
     
            // 2.获取用户信息
            let data=yield call(UserInfo,payload)
            yield put({
              type: 'updateUserInfo',
              payload: data.data
            })
             // 3.根据id获取视图权限
              let viewAuthority = yield call(getViewAuthority, data.data.user_id);
              //  console.log('viewAuthority...', viewAuthority);
                yield put({
                  type: 'updateViewAuthority',
                  payload: viewAuthority.data
                })
          },
          //退出登录
          *logoutFn({payload},{call,put}){
              yield put({
                type:"logout"
              })
          }
    },
  
    // 同步操作
    reducers: {
      save(state, {action}) {
        return {...state,isUser:action}
      },
      updateUserInfo(state, {payload}){
 
        return {...state, userInfo: payload}
      },
      updateViewAuthority(state, {payload}){
       
        // 筛选出我所有的前端路由权限
        let myView = allView.routes,
            //没有权限访问的路由
            forbiddenView = []; 
           
        myView.forEach(item=>{
          
          item.children =item.children? item.children.filter(value=>{
         
            if (payload.findIndex(id=>id.view_id===value.id) !== -1){
              
              return true;
            }else{
              forbiddenView.push(value.path);
              
              return false;
            }
          }):null
        })
   
        return {...state, viewAuthority: payload, myView, forbiddenView}
      },
      //退出登录
      logout(state){
        //清除登录态
        removeToken()
        //清除权限
        return {...state,userInfo:{},myView:[],viewAuthority:[],forbiddenView:[]}
      }
    },
  
  };
  