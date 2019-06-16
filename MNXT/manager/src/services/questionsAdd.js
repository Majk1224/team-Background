import request from '../utils/request';

//添加试卷接口
export function questionsAdd(params) {
  return request({
    url:"/exam/questions",
    method:"POST",
    data:params
  });
}
//获取所有课程类型
export function getsubject() {
  return request({
    url:"/exam/subject",
    method:"GET"
  });
}
//获取所有考试类型
export function getExamType() {
  return request({
    url:"/exam/examType",
    method:"GET"
  });
}
//获取所有课题类型
export function getQuestionsTypes() {
  return request({
    url:"/exam/getQuestionsType",
    method:"GET"
  });
}