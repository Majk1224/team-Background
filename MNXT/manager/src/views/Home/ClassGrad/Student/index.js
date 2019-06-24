import React,{useState,useEffect} from 'react'
import {Breadcrumb,Form,Input,Button,Select,Table} from 'antd'
import { connect } from 'dva';
import './student.scss'
const {Option} = Select
function Student(props) {

    const { getFieldDecorator } = props.form
    //Form表单
    let handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
        if (!err) {
            console.log('Received values of form: ', values);
        }
        });
    };
    //table表格
    const columns = [
        {
          title: '姓名',
          dataIndex: 'student_name',
          key: 'student_name',
        },
        {
          title: '学号',
          dataIndex: 'student_id',
          key: 'student_id',
        },
        {
          title: '班级',
          dataIndex: 'grade_name',
          key: 'grade_name',
        },
        {
            title: '教室',
            dataIndex: 'room_text',
            key: 'room_text',
        },
        {
            title: '密码',
            dataIndex: 'student_pwd',
            key: 'student_pwd',
        },
        {
          title: '操作',
          key: 'action',
          render: (text, record) => (
            <span>
              <a>删除</a>
            </span>
          ),
        },
      ];
      //请求数据
      useEffect(()=>{
          props.getgrade()
          props.getStudent()
          props.getClass()
      },[])
      //获取数据
      const { getMessage,getAllStudent,getAllClass } = props
      console.log(getMessage)
    return <div>
        <Breadcrumb style={{ margin: '16px 0',fontSize: 22 }}>
            <Breadcrumb.Item>学生管理</Breadcrumb.Item>
        </Breadcrumb>
        <div className="student-wrap">
            <div className="search">
            <Form onSubmit={handleSubmit}>
                <Form.Item>
                    {getFieldDecorator('name', {
                            
                        })(
                            <Input placeholder='输入学生姓名' style={{width:200}}/>,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('classroom', {
                            
                        })(
                            <Select style={{width:200}} placeholder="请选择班级号">
                                {
                                    getAllClass?getAllClass.map(item=>(
                                        <Option  key={item.room_id} value={item.room_text}>{item.room_text}</Option>
                                    )):null
                                }
                            </Select>
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('grade', {
                            
                        })(
                            <Select style={{width:200}} placeholder="班级名">
                                {
                                    getMessage?getMessage.map(item=>(
                                        <Option key={item.grade_id} value={item.grade_name}>{item.grade_name}</Option>
                                    )):null
                                }
                            </Select>
                    )}
                </Form.Item>
                <Form.Item>
                    <Button style={{width:120}} type="primary" htmlType='submit'>搜索</Button>
                </Form.Item>
                <Form.Item>
                    <Button style={{width:120}} type="primary">重置</Button>
                </Form.Item>
            </Form>
            </div>
            <Table columns={columns} dataSource={getAllStudent} rowKey={item=>item.student_id}/>
        </div>
    </div>
}
const mapState = state => {
    return state.class
}
const mapDispatch = dispatch => {
    return {
        getgrade() {
            dispatch({
                type:'class/allocation'
            })
        },
        getStudent() {
            dispatch({
                type:'class/studentMsg'
            })
        },
        getClass() {
            dispatch({
                type:'class/Allclass'
            })
        }
    }
}
export default connect(mapState,mapDispatch)(Form.create()(Student))