import request from '../utils/request';
//登录接口
export function login(params) {
  return request({
    url:"/user/login",
    method:"POST",
    data:params
  });
}
//获取当前用户信息
export function UserInfo() {
  return request({
    url:"/user/userInfo",
  });
}

// 获取用户权限
export function getViewAuthority(user_id){
  return request({
    url: '/user/new?user_id='+user_id
  })
}