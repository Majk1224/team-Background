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
export function studentPaper() {
    return request({
        url: '/exam/student',
        type: 'GET'
    })
}