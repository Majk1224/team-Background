import {login} from '../services'
import { setToken,getToken } from "../utils/user";
import {routerRedux} from 'dva/router';

export default {
    // 命名空间
    namespace: 'user',
    // 模块内部的状态
    state: {
      isUser:{},
      UserInfo:""
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
                }))
              }
            }else{
              if(getToken()){
               // 利用redux做路由跳转
                dispatch(routerRedux.replace({
                  pathname:"/home"
                }))
              }
            }
        })
      },
    },
  
    // 异步操作
    effects: {
        *login({ payload }, { call, put }) {  // eslint-disable-line
          
            let data=yield call(login,payload)
            if(data.code===1){
              setToken(data.token);
            }
            yield put({type:"save",action:data})
          },
          
    },
  
    // 同步操作
    reducers: {
      save(state, {action}) {
      
        return state.isUser=action
        // return { ...state, ...action };
      },
      
    },
  
  };
  