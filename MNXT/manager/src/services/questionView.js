import request from '../utils/request';
// 所选类型
export function getExamClass(){
    return request({
      url:"/exam/examType",
      method:"GET"
    })
  }
  
//获取所有课程
export function GetAllCourse(){
    return request({
    url:"/exam/subject",
    method:"GET"
    })
}
        
//获取所有试题
export function getshitic(){
    return request({
        url:"/exam/questions/new",
        method:"GET"
    })
}

// 获取所有课题类型

export function Getleixing(){
    return request({
        url:"/exam/getQuestionsType",
        method:"GET"
    })
}
//条件查询借口
export function ConditionT(params){
    return request({
        url:"/exam/questions/condition",
        method:"GET",
        params
    })
}
//更新试题
export function updatequestion(params) {
    return request({
      url: '/exam/questions/update',
      method: 'PUT',
      data: params
    })
  }