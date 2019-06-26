import React,{useState,useEffect} from 'react'
import { Form,Breadcrumb,Table, Modal, Button,Input } from 'antd'
import { connect } from 'dva'

import './classroom.scss'
function Class(props) {
    //table列表信息
    const columns = [
        {
          title: '教室号',
          dataIndex: 'room_text',
          key: 'room_text',
        },
        {
          title: '操作',
          key: 'room_id',
          render: (text,record,ind) => (
            <span>
              <a onClick={()=>delGrage(ind)}>删除</a>
            </span>
          ),
        },
      ];
      let deleteRoom
     let delGrage = (ind) =>{
         console.log(ind)
          deleteRoom = getAllClass.filter((item,index)=>{
             if(index===ind) {
                 return item
             }
         })
         console.log(deleteRoom)
        props.DelClass({
            room_id:deleteRoom[0].room_id
        })
     }
    //弹框
    const [visible,newvisible] = useState(false)
    const [confirmLoading] = useState(false)
    let showModal = () => {
        newvisible(true)
      };
    let handleCancel = () => {
        newvisible(false)
    }
   //Form表单
    let handleSubmit = e => {
        e.preventDefault();
        props.form.validateFields((err, values) => {
        if (!err) {
            console.log(values);
            props.AddnewClass({
                room_text: values.grade
            })
            newvisible(false)
        }
        });
    };
    
    
    const {getFieldDecorator} = props.form
    //请求数据
    useEffect(() => {
        props.getAllGrade()
    },[])
    //获取数据
    const {getAllClass} = props
    return <div>
        <Breadcrumb style={{ margin: '16px 0',fontSize: 22 }}>
            <Breadcrumb.Item>教室管理</Breadcrumb.Item>
        </Breadcrumb>
        <div className='class-wrap'>
            
                <div>
                    <Button type="primary" onClick={showModal}>
                    添加教室
                    </Button>
                    
                    <Modal
                    title="添加班级"
                    visible={visible}
                    footer={null}
                    onCancel={handleCancel}
                    confirmLoading={confirmLoading}
                    >
                <Form onSubmit={handleSubmit}>
                    <Form.Item label="教室号">
                    {getFieldDecorator('grade', {
                            rules: [{ required: true, message: '请输入教室号' }],
                            
                        })(
                            <Input placeholder='教室号'/>,
                    )}
                    </Form.Item>
                        <Button onClick={handleCancel}>取消</Button>
                        <Button type="primary" htmlType='submit'>提交</Button>
                    </Form>
                    </Modal>
                </div>
            <Table columns={columns} dataSource={getAllClass} rowKey={item=>item.room_id} />
        </div>
    </div>
}
const mapState = state => {
    return state.class
}
const mapDispatch = dispatch => {
    return {
        //获取所有教室
        getAllGrade() {
            dispatch({
                type: 'class/Allclass'
            })
        },
        //添加教室
        AddnewClass(payload) {
            dispatch({
                type: 'class/Addclassroom',
                payload
            })
        },
        //删除教室
        DelClass(payload) {
            dispatch({
                type: 'class/Delclassroom',
                payload
            })
        }
    }
}
export default connect(mapState,mapDispatch)(Form.create()(Class))