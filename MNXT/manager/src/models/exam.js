import { examType,getSubject,getList,createItem,detailExam,studentPaper } from '../services/examManage'
export default {
    // 命名空间
    namespace: 'exammanage',
  
    // 模块内部的状态
    state: {
       examType: null,
       Subject: null,
       ListPaper: null,
       CreateItem: null,
       getDetaildata: null,
       ClassData: null
    },
  
    subscriptions: {
      setup({ dispatch, history }) {  // eslint-disable-line
      },
    },
  
    // 异步操作
    effects: {
      //获取试卷类型
      *examType({payload},{call,put}) {
          const getExamType = yield call(examType)
          yield put({
              type: 'getType',
              getExamType
          })
      },
      //获取课程接口
      *getSubject({payload},{call,put}) {
          const SubjectData = yield call(getSubject)
          yield put({
              type:'getSub',
              SubjectData
          })
      },
      //获取试卷列表
      *getList({payload},{call,put}) {
        const ListData = yield call(getList)
        yield put({
            type:'GetData',
            ListData
        })
      },
      //创建试卷
      *createItem({payload},{call,put}) {
        const ItemCont = yield call(createItem,payload)
        console.log('ItemCont...',ItemCont)
        yield put({
          type: 'getItem',
          payload
        })
      },
      //获取试卷详情
      *detailExam({payload},{call,put}) {
        const detail = yield call(detailExam)
        // console.log('detail...',detail)
        yield put({
          type:'getDetail',
          detail
        })
      },
      //获取学生试卷列表
      *studentPaper({payload},{call,put}) {
        const getStudent = yield call(studentPaper)
        console.log('getStudent...',getStudent)
        yield put({
          type:'getStudents',
          getStudent
        })
      }
    },
  
    // 同步操作
    reducers: {
      //获取试卷类型
      getType(state,{getExamType}) {
          return {...state, examType:getExamType.data}
      },
      //获取课程接口
      getSub(state,{SubjectData}) {
          return {...state, Subject:SubjectData.data}
      },
      //获取试卷列表
      GetData(state,{ListData}) {
        return {...state,ListPaper:ListData.exam}
      },
      //创建试卷
      getItem(state,{payload}) {
        return {...state,CreateItem:payload}
      },
      //获取试卷详情
      getDetail(state,{detail}) {
        return {...state,getDetaildata:detail.data} 
      },
       //获取学生试卷列表
       getStudents(state,{getStudent}) {
         return {...state,ClassData:getStudent.exam}
       }
    },
  
  };
  