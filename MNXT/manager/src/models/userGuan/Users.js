import {
  usersShow,USerIdentity,api_authority,identity_api_authority_relation,
  view_authority,identity_view_authority_relation,user_Add,user_UpData,
  Add_identity,Add_authorityApi,authorityViewEdit,userSetIdentityApi,userSetIdentityView

} from '../../services/UserGuan/Users';
// console.log(authorityViewEdit)
export default {
    // 命名空间
    namespace: 'users',
  
    // 模块内部的状态
    state: {
      userAll:[],//用户数据
      identity:[],//身份数据
      apiAuthorityAll:[],//api接口权限
      identApiAuthorAll:[],//身份和api接口关系
      viewAuthorsAll:[],//视图权限
      viewRelatesALL:[],//身份和视图权限关系
      Add_user:{},//添加用户
      up_Users:{},//更改用户
      identityAdd:{},//添加身份
      AddApi:{},//添加api接口权限
      ViewEditAdd:{},//添加视图接口权限
      SetApi:{},//给身份设定api接口权限
      SetView:{}//给身份设定视图权限
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
         yield put({ type: 'identitys',action:data.data });
      },
      *apiAuthority({ payload }, { call, put }) {  // eslint-disable-line
        const data= yield call(api_authority)
        // console.log(data)
         yield put({ type: 'apiAuthoritys',action:data.data });
      },
      *identApiAuthor({ payload }, { call, put }) {  // eslint-disable-line
        const data= yield call(identity_api_authority_relation)
        // console.log(data)
         yield put({ type: 'identApiAuthors',action:data.data });
      },
      *viewAuthor({ payload }, { call, put }) {  // eslint-disable-line
        const data= yield call(view_authority)
        // console.log(data)
         yield put({ type: 'viewAuthors',action:data.data });
      },
      *viewRelate({ payload }, { call, put }) {  // eslint-disable-line
        const data= yield call(identity_view_authority_relation)
        // console.log(data)
         yield put({ type: 'viewRelates',action:data.data });
      },
      //添加数据
      *userA({ payload }, { call, put }) {  // eslint-disable-line
      
         const data= yield call(user_Add,payload)
        
        yield put({ type: 'add_user',action:data})
      },
      //更新用户
      *upData_User({ payload }, { call, put }) {  // eslint-disable-line
      
        const data= yield call(user_UpData,payload)
       
       yield put({ type: 'user_Up',action:data})
      
     },
     //添加身份
     *identityEdit({ payload }, { call, put }) {  // eslint-disable-line
        const data= yield call(Add_identity,payload)
        yield put({ type: 'AddIdentity',action:data})
      },
      //添加api接口权限
      *authorityApiEdit({ payload }, { call, put }) {  // eslint-disable-line
         const data= yield call(Add_authorityApi,payload)
         yield put({ type: 'authorityApi',action:data})
      },
      //添加视图接口权限
      *AddAuthorityView({ payload }, { call, put }) { 
        
        const data=yield call(authorityViewEdit,payload)
        yield put({ type: 'ViewEdit',action:data})

     },
     //给身份设定api接口权限
     *SetIdentityApi({ payload }, { call, put }) { 
      const data=yield call(userSetIdentityApi,payload)
     
      yield put({ type: 'SetentityApi',action:data})

      },
      //给身份设定视图权限
      *SetIdentityView({ payload }, { call, put }) { 
        const data=yield call(userSetIdentityView,payload)
        // console.log(data)
        yield put({ type: 'SetentityView',action:data})
  
        },
    },
  
    // 同步操作
    reducers: {
      userAll(state, {action}) {
        return { ...state,userAll:action };
      },
      identitys(state, {action}) {
        return { ...state,identity:action };
      },
      apiAuthoritys(state, {action}) {
        return { ...state,apiAuthorityAll:action };
      },
      identApiAuthors(state, {action}) {
        return { ...state,identApiAuthorAll:action };
      },
      viewAuthors(state, {action}) {
        return { ...state,viewAuthorsAll:action };
      },
      viewRelates(state, {action}) {
        return { ...state,viewRelatesALL:action };
      },
      add_user(state,{action}){
        return {...state,Add_user:action}
      },
      user_Up(state,{action}){
         return {...state,up_Users:action}
      },
      AddIdentity(state,{action}){
        return {...state,identityAdd:action}
     },
     authorityApi(state,{action}){
        return {...state,AddApi:action}
      },
      ViewEdit(state,{action}){
        return {...state,ViewEditAdd:action}
      },
      SetentityApi(state,{action}){
        return {...state,SetApi:action}
      },
      SetentityView(state,{action}){
        return {...state,SetView:action}
      },
    },
  
  };
  