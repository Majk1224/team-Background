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