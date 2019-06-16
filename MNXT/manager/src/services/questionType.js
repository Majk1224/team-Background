import request from '../utils/request';
//试题分类
export function typeQuestion() {
    return request({
      url: '/exam/getQuestionsType',
      method:"GET"
    })
  }
  