import  {typeQuestion} from '../services'
  // import {setToken, getToken} from '@/utils/user'
  export default {
      // 命名空间
      namespace: 'ExamType',
    
      // 模块内部的状态
      state: {
        typeData:{}
      },
    
      subscriptions: {
        setup({ dispatch, history }) {  // eslint-disable-line
        },
      },
    
      // 异步操作
      effects: {
      
        *typeQuestion({payload},{call,put}) {
          let typeData = yield call(typeQuestion,payload)
            yield put({type: 'Type',typeData})
        },
      },
      // 同步操作
      reducers: {
        Type(state, {typeData}) {
          return {...state,typeData:typeData}
        },
        
      },
    
    };
    