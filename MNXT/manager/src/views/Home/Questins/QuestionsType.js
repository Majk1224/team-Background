import React, { Component } from 'react';
import {connect} from 'dva'
import { Table,Button,Modal,Input,Breadcrumb } from 'antd';

class QuestionsType extends Component {
  constructor(){
    super()
    this.state = { 
      visible: false,
      typeData: []
    }
  }
   
     showModal = () => {
       this.setState({
         visible: true
       })
     }
     handleOk = e => {
       this.setState({
         visible: false
       })
     }
     handleCancel = e => {
  
       this.setState({
         visible: false
       })
     }
     componentDidMount() {
      
        this.props.getType()
        
        this.handleValue = e => {
          const value = e.target.value
            let obj = {
              questions_type_text: value,
              questions_type_id: +new Date(),
              questions_type_sort: this.props.typeData.data.length +1
            }
            this.props.typeData?this.props.typeData.data.push(obj):{}
        }
    }
    render() {
        const {typeData} = this.props
          const columns = [
            {
              title: '类型ID',
              dataIndex: 'questions_type_sort',
              key: 'questions_type_sort',
            },
            {
              title: '类型名称',
              dataIndex: 'questions_type_text',
              key: 'questions_type_text',
            },
            {
              title: '操作',
              dataIndex: '',
              key: '',
            },
          ];
        return (
        <div>
          <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>查看分类</Breadcrumb.Item>
          </Breadcrumb>
          <Button type="primary" onClick={this.showModal}>添加类型</Button>
          <Modal
            title="创建新类型"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <Input placeholder="请输入类型名称" onBlur={(e)=>this.handleValue(e)}/>
          </Modal>
          <Table  columns={columns} dataSource={typeData?typeData.data:null} />
        </div>
         );
    }
    
}

const mapState = state => {
    return state.ExamType
}
const mapDispatch = dispatch => {
    return {
        getType() {
            dispatch({
                type: 'ExamType/typeQuestion'
            })
        }
    }
}
export default connect(mapState,mapDispatch)(QuestionsType);