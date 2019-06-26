import request from '../utils/request';



//获取试卷类型接口
export function examType() {
    return request({
        url: '/exam/examType',
        type: 'GET'
    })
}

//获取课程接口
export function getSubject() {
    return request({
        url: '/exam/subject',
        type: 'GET'
    })
}

//获取试卷列表
export function getList() {
    return request({
        url: '/exam/exam',
        type: 'GET'
    })
}

//创建试题
export function createItem(params) {
    return request({
        url:'/exam/exam',
        type:'POST',
        data: params
    })
}

//获取试卷详情
export function detailExam() {
    return request({
        url:'/exam/exam/w5tcy-g2dts',
        type:'GET'
    })
}

//获取学生试卷列表
export function mangerGrade() {
    return request({
        url: '/manger/grade',
        type: 'GET'
    })
}
//获取学生试卷列表接口 grade_id=
export function studentDateil(params) {
   
    return request({
        url: '/exam/student?grade_id='+params,
        type: 'GET'

    })
}
  //获取学生试卷详情接口 *exam_Student
  export function exam_StudentDetail(params) {
   
    return request({
        url: '/exam/student/'+params,
        type: 'GET'

    })
}