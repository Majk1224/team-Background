
  import {getClassman} from '../../services'
  console.log(getClassman)

  export default {
      // 命名空间
      namespace: 'classManage',
      // 模块内部的状态
      state: {
        getMan:[]
      },
    
      subscriptions: {
        setup({ dispatch, history }) {  // eslint-disable-line
        },
      },
    
      // 异步操作
      effects: {
        *getClassman({payload},{call,put}){
          let data=yield call(getClassman)
          //  console.log(data)
          yield put({
            type:"getClass",
            data
          })
        },
      },
    
      // 同步操作
      reducers: {
       //添加试题接口
       getClass(state,{data}){
        return {...state,getMan:data.data}
      },
      },
    
    };
    