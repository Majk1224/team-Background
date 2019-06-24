import { 
    Allclass,
    Delclassroom,
    Addclassroom,
    Delclass,
    Addclass,
    studentInfo,
    alloCation,
    studentMsg,
    subjectMsg
} from '../services/classManage'

export default {
    // 命名空间
    namespace: 'class',
  
    // 模块内部的状态
    state: {
        getAllClass: null,
        getAddroom: null,
        getDelroom: null,
        getAddClass: null,
        getDelClass: null,
        getstudentData: null,
        getMessage: null,
        getAllStudent: null,
        getSubjectData:null
    },
  
    subscriptions: {
      setup({ dispatch, history }) {  // eslint-disable-line
      },
    },
  
    // 异步操作
    effects: {
      //获取全部教室
      *Allclass({payload},{call, put}) {
          const getAllgrade = yield call(Allclass)
        //   console.log('getAllgrade...',getAllgrade)
          yield put({
              type: 'getAll',
              getAllgrade
          })
      },
      //删除教室
      *Delclassroom({payload},{call,put}) {
        //   console.log('payload...',payload)
          const DelMsg = yield call(Delclassroom,payload)
        //   console.log('DelMsg...',DelMsg)
          yield put({
              type:'deleteroom',
              DelMsg
          })
      },
      //添加教室
      *Addclassroom({payload},{call,put}) {
          const newroom = yield call(Addclassroom,payload)
        //   console.log('newroom...',newroom)
          yield put({
              type: 'Addnewroom',
              newroom
          })
      },
      //添加班级
      *Addclass({payload},{call,put}) {
          const newClass = yield call(Addclass,payload)
        //   console.log('newClass...',newClass)
          yield put({
              type: 'Addnew',
              newClass
          })
      },
      //删除班级
      *Delclass({payload},{call,put}) {
          const delMsg = yield call(Delclass,payload)
        //   console.log('delMsg...',delMsg)
          yield put({
              type: 'DEL',
              delMsg
          })
      },
      //获取学生信息
      *studentInfo({payload},{call,put}) {
          const studentData = yield call(studentInfo)
        //   console.log('studentData...',studentData)
          yield put({
              type: 'GetInfo',
              studentData
          })
      },
      //获取已经分配教室的班级
      *allocation({payload}, {call,put}) {
          const getMsg = yield call(alloCation)
        //   console.log('getMsg...',getMsg)
          yield put({
              type: 'message',
              getMsg
          })
      },
      //学生管理
      *studentMsg({paylaod},{call,put}) {
          const studentData = yield call(studentMsg)
        //   console.log('studentData...',studentData)
          yield put({
              type: 'Student',
              studentData
          })
      },
      //获取所有的课程
      *subjectMsg({payload},{call,put}) {
          const subjectData = yield call(subjectMsg)
          yield put({
              type: 'Subject',
              subjectData
          })
      }
    },
  
    // 同步操作
    reducers: {
        //获取全部教室
        getAll(state,{getAllgrade}) {
            return {...state, getAllClass:getAllgrade.data}
        },
        //删除教室
        deleteroom(state,{DelMsg}) {
            return {...state,getDelroom:DelMsg}
        },
        //添加教室
        Addnewroom(state,{newroom}) {
            return {...state,getAddroom:newroom}
        },
        //添加班级
        Addnew(state,{newClass}) {
            return {...state,getAddClass:newClass}
        },
        //删除班级
        DEL(state,{delMsg}) {
            return {...state,getDelClass:delMsg}
        },
        //获取学生信息
        GetInfo(state,{studentData}) {
            return {...state,getstudentData:studentData}
        },
        //获取已经分配的教室
        message(state, {getMsg}) {
            return {...state,getMessage:getMsg.data}
        },
        //学生管理
        Student(state, {studentData}) {
            return {...state,getAllStudent:studentData.data}
        },
        //获取所有的课程
        Subject(state, {subjectData}) {
            return {...state,getSubjectData:subjectData.data}
        }
    },
  
  };
  