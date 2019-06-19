import React,{useState,useEffect} from 'react'
import {connect} from 'dva'
import {Table,Breadcrumb,Divider} from 'antd'

import './class.scss'
function AwaitGrade(props) {
    //请求数据
    useEffect(()=>{
        props.getClass()
    },[])
    //获取数据
    const {ClassData} = props
    console.log(ClassData)
    //table表格数据
    const columns = [
        {
          title: '班级名',
          dataIndex: 'grade_id',
          key: 'grade_id',
        },
        {
          title: '课程名称',
          dataIndex: 'student_name',
          key: 'student_name',
        },
        {
          title: '阅卷状态',
          dataIndex: 'status',
          key: 'status',
        },
        {
            title: '课程名称',
            dataIndex: 'exam_exam_id',
            key: 'exam_exam_id',
        },
        {
            title: '成材率',
            dataIndex: 'exam_student_id',
            key: 'exam_student_id',
        },
        {
          title: '操作',
          key: 'action',
          render: (text, record) => (
            <span>
              <a>批卷</a>
            </span>
          ),
        },
      ];
    return <div>
        <Breadcrumb style={{ margin: '16px 0',fontSize:22 }}>
            <Breadcrumb.Item>待批班级</Breadcrumb.Item>
        </Breadcrumb> 
        <div className='class-list'>
            <Table columns={columns} dataSource={ClassData}  rowKey={item=>item.student_id} />
        </div>
    </div>
}
const mapState = state => {
    return state.exammanage
}   
const mapDispatch = dispatch => {
    return {
        getClass() {
            dispatch({
                type:'exammanage/studentPaper'
            }) 
        }
    }
}
export default connect(mapState,mapDispatch)(AwaitGrade)