import React,{useState,useEffect} from 'react'
import {connect} from 'dva'
import {Table,Breadcrumb,Divider,Form,Select,Button} from 'antd'


import './Awaiting/class.scss'
import { get } from 'https';
function ExamStudent(props) {
    //请求数据
    useEffect(()=>{
        
    },[])
    //获取数据
    const {GradeList,ClassData} = props
  console.log(GradeList)
  //处理数据
  let GradeData=[]
 
  // if(ClassData){//grade_name file.grade_id
  //   ClassData.map(file=>{
     
  //    return GradeData= GradeList?GradeList.filter(item=>
  //     console.log(item)
  //       // {
  //       //   if(file.grade_id===item.grade_id){
  //       //      item.grade_name=file.grade_name
  //       //     // console.log(item)
  //       //   }
  //       // }
  //         // item.status===1?item.status="已阅":"未阅"
  //       ):[]
  //   })
  // }
  GradeData= GradeList?GradeList.filter(item=>
      item.status===1?item.status="已阅":"未阅"
    ):[]
    if(ClassData){
      GradeData.filter(item=>{
       return ClassData.filter(file=>{
            if(item.grade_id===file.grade_id){
              item.grade_name=file.grade_name
              return item
            }
        })
      })
    }
    console.log(GradeData)
   let handleSubmit = e => {
        e.preventDefault();
        props.form.validateFields((err, values) => {
            if (!err) {
            console.log(values);
            }
        });
    };
    const correctPaper=(text)=>{
  
        // props.getClassMate(text.grade_id)
    }
    //table表格数据
    const columns = [
        {
          title: '班级名',
          dataIndex: 'grade_name',
          key: 'grade_name',
        
        },
        {
          title: '姓名',
          dataIndex: 'student_name',
          key: 'student_name',
        },
        {
          title: '阅卷状态',
          dataIndex: 'status',
          key: 'status',
        },
        {
            title: '开始时间',
            dataIndex: 'start_time',
            key: 'start_time',
        },
        {
            title: '结束时间',
            dataIndex: 'end_time',
            key: 'end_time',
        },
        {
            title: '成才率',
            dataIndex: 'score',
            key: 'score',
        },
        {
          title: '操作',
          key: 'action',
          render: (text, record,index) => (
            
            <span>
              <a>批卷</a>
            </span>
          ),
        },
      ];
      const {getFieldDecorator} = props.form
      const { Option } = Select;
    return <div>
              <div className='searchNav'>
                <Form onSubmit={handleSubmit}>
                  <Form.Item label="状态">
                      {getFieldDecorator('examType', {rules: [{required: true,message: '请选择类型!',},],
                      initialValue: '请选择状态'
                      })(
                          <Select style={{ width: 120 }}>
                            {
                              GradeList?GradeList.map(item=>
                                <Option key={item.grade_id} value={item.grade_id}>{item.grade_name}</Option>
                              ):null
                            }
                              
                          </Select>
                      )}
                  </Form.Item>
                  <Form.Item label="班级">
                      {getFieldDecorator('examTest', {rules: [{required: true,message: '请选择课程!',},],
                      initialValue: '请选择班级'
                      })(
                          <Select style={{ width: 120 }}>
                            {
                              ClassData?ClassData.map(item=>
                                <Option key={item.grade_id} value={item.grade_id}>{item.grade_name}</Option>
                              ):null
                            }
                              
                          </Select>
                      )}
                  </Form.Item>
                  <Button icon="search" type="primary" htmlType="submit" style={{ width: 120,marginTop:-26 }}>查询</Button>          
              </Form>
            </div>
            <div className='class-list'>
                <Table columns={columns} dataSource={GradeData}  rowKey={item=>item.student_id} />
            </div>
        </div>
}
//
const mapState = state => {
    return state.exammanage
}   
const mapDispatch = dispatch => {
    return {
       
        // getClassMate(payload){
        //   dispatch({
        //    type:'exammanage/paperClassMate',
        //    payload
        // }) 
        // }
    }
}
export default connect(mapState,null)(Form.create()(ExamStudent))