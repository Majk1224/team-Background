import React,{useEffect} from 'react'
import {connect} from 'dva'
import {Form,Breadcrumb,Select,Button,Radio,Divider,Table} from 'antd'

import './ListExam.scss'
const { Option } = Select;
function ListExam(props) {
    let handleSubmit = e => {
        e.preventDefault();
        props.form.validateFields((err, values) => {
            if (!err) {
            console.log(values);
            }
        });
    };
    useEffect(()=>{
        props.getType()
        props.getSubjectType()
        props.getPaperList()
    },[])
    const {getFieldDecorator} = props.form
    const {Subject,examType,ListPaper} = props
    console.log(ListPaper)
    //table表格columns
    const columns = [
        {
          title: '试卷信息',
          dataIndex: 'title',
          key: 'title',
        },
        {
          title: '班级',
          dataIndex: 'room_text',
          key: 'room_text',
          render: room_text=><div>
              {room_text.map((item,ind)=><span key={ind}
              style={{marginLeft:3}}>{item}</span>)}
          </div>
        },
        {
          title: '创建人',
          dataIndex: 'user_name',
          key: 'user_name',
        },
      
        {
            title: '开始时间',
            dataIndex: 'start_time',
            key: 'start_time',
            render:start_time=><span>
                {new Date(start_time*1000).toLocaleString()}
            </span>
        },
        {
            title: '结束时间',
            dataIndex: 'end_time',
            key: 'end_time',
            render:end_time=><span>
                {new Date(end_time*1000).toLocaleString()}
            </span>
        },
        {
          title: '操作',
          key: 'action',
          render: (text, record) => (
            <span>
              <a onClick={()=>props.history.replace('/exam/Detail?'+text.subject_id)}>详情</a>
            </span>
          ),
        },
      ];
    return <div className="managePage">
        <Breadcrumb style={{ margin: '16px 0',fontSize: 22 }}>
          <Breadcrumb.Item>试卷列表</Breadcrumb.Item>
        </Breadcrumb>
        <div className='searchNav'>
        <Form onSubmit={handleSubmit}>
            <Form.Item label="考试类型">
                {getFieldDecorator('examType', {rules: [{required: true,message: '请选择类型!',},],
                initialValue: '请选择'
                })(
                    <Select style={{ width: 120 }}>
                        {
                            examType?examType.map(item=>(
                                <Option key={item.exam_id}
                                value ={item.exam_name}>{item.exam_name}</Option>
                            )):null
                        }
                        
                    </Select>
                )}
            </Form.Item>
            <Form.Item label="课程">
                {getFieldDecorator('examTest', {rules: [{required: true,message: '请选择课程!',},],
                initialValue: '请选择'
                })(
                    <Select style={{ width: 120 }}>
                        {
                            Subject?Subject.map(item=>(
                                <Option key={item.subject_id}
                                value ={item.subject_text}>{item.subject_text}</Option>
                            )):null
                        }
                        
                    </Select>
                )}
            </Form.Item>
           <Button icon="search" type="primary" htmlType="submit">查询</Button>          
        </Form>
        </div>
        <div className="exam-list">
            <div className="title">
                <div>试卷列表</div>
                <Radio.Group  style={{ marginBottom: 16 }}>
                    <Radio.Button value="全部">全部</Radio.Button>
                    <Radio.Button value="进行中">进行中</Radio.Button>
                    <Radio.Button value="已结束">已结束</Radio.Button>
                </Radio.Group>
            </div>
            <Table columns={columns} rowKey={item=>item.end_time} dataSource={ListPaper} />     
        </div>
    </div>
}
const mapState = state => {
    // console.log(state.exammanage)
    return state.exammanage
}
const mapDispatch = dispatch => {
    return {
        getType() {
           dispatch({
               type:'exammanage/examType'
           })
        },
        getSubjectType() {
            dispatch({
                type:'exammanage/getSubject'
            })
        },
        //获取试卷列表
        getPaperList() {
            dispatch({
                type:'exammanage/getList'
            })
        }
    }
}
export default connect(mapState,mapDispatch)(Form.create()(ListExam))