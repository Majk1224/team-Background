import request from '../../utils/request';
//用户数据
export function usersShow() {
 
  return request({
    url:"/user/user",
    method:"GET"
  });
}
//身份数据 /user/identity
export function USerIdentity() {
 
  return request({
    url:"/user/identity",
    method:"GET"
  });
}
//展示api /user/api_authority
export function api_authority() {
 
  return request({
    url:"/user/api_authority",
    method:"GET"
  });
}
//展示身份和api权限关系 /user/identity_api_authority_relation
export function identity_api_authority_relation() {
 
  return request({
    url:"/user/identity_api_authority_relation",
    method:"GET"
  });
}
//获取视图权限数据 /user/view_authority
export function view_authority() {
 
  return request({
    url:"/user/view_authority",
    method:"GET"
  });
}
//展示身份和视图权限关系 /user/identity_view_authority_relation
export function identity_view_authority_relation() {
 
  return request({
    url:"/user/identity_view_authority_relation",
    method:"GET"
  });
}
//添加用户
export function user_Add(params) {
//  console.log(params)
  return request({
    url:"/user",
    method:"POST",
    data:params
  });
}
//更新用户
export function user_UpData(params) {

  return request({
    url:"/user/user",
    method:"PUT",
    data:params
  });
}
//添加身份/user/identity/edit
export function Add_identity(params) {
  
  return request({
    url:"/user/identity/edit",
    method:"GET",
   params
  });
}
//添加api接口权限
export function Add_authorityApi(params) {
  return request({
    url:"/user/authorityApi/edit",
    method:"GET",
    params
  });
}
//添加视图接口权限
export function authorityViewEdit(params) {
  return request({
    url:"/user/authorityView/edit",
    method:"GET",
    params
  });
}
//给身份设定api接口权限
export function userSetIdentityApi(params) {
  return request({
    url:"/user/setIdentityApi",
    method:"POST",
    data:params
  });
}
//给身份设定视图权限
export function userSetIdentityView(params) {
  return request({
    url:"/user/setIdentityView",
    method:"POST",
    data:params
  });
}