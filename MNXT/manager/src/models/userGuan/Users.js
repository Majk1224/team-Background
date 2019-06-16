import {
  usersShow,USerIdentity,api_authority,identity_api_authority_relation,
  view_authority,identity_view_authority_relation

} from '../../services/UserGuan/Users';
// console.log(usersShow)
export default {
    // 命名空间
    namespace: 'users',
  
    // 模块内部的状态
    state: {
      userAll:[]
    },
  
    subscriptions: {
      setup({ dispatch, history }) {  // eslint-disable-line
      },
    },
  
    // 异步操作
    effects: {
      *showUser({ payload }, { call, put }) {  // eslint-disable-line
        const data= yield call(usersShow)
        // console.log(data)
         yield put({ type: 'userAll',action:data.data });
      },
      *identity({ payload }, { call, put }) {  // eslint-disable-line
        const data= yield call(USerIdentity)
        // console.log(data)
         yield put({ type: 'userAll',action:data.data });
      },
      *apiAuthority({ payload }, { call, put }) {  // eslint-disable-line
        const data= yield call(api_authority)
        // console.log(data)
         yield put({ type: 'userAll',action:data.data });
      },
      *identApiAuthor({ payload }, { call, put }) {  // eslint-disable-line
        const data= yield call(identity_api_authority_relation)
        // console.log(data)
         yield put({ type: 'userAll',action:data.data });
      },
      *viewAuthor({ payload }, { call, put }) {  // eslint-disable-line
        const data= yield call(view_authority)
        // console.log(data)
         yield put({ type: 'userAll',action:data.data });
      },
      *viewRelate({ payload }, { call, put }) {  // eslint-disable-line
        const data= yield call(identity_view_authority_relation)
        // console.log(data)
         yield put({ type: 'userAll',action:data.data });
      },
    },
  
    // 同步操作
    reducers: {
      userAll(state, {action}) {
        return { ...state,userAll:action };
      },
    },
  
  };
  