import React,{useState,useEffect} from 'react'
import {connect} from 'dva'
import { Breadcrumb,Button,Drawer,Table, Tag } from 'antd'

import './createItem.scss'

function createNew(props) {
    const [visible,newVisible] = useState(false)
    let showDrawer = () => {
        newVisible(true)
    }
    
    let onClose = () => {
        newVisible(false)
    }
    //请求数据
    useEffect(()=> {
        props.getAll()
    },[])
    let data = JSON.parse(localStorage.getItem('exam'))
   
    //获取所有试题的数据
    const {AllData} = props
    console.log(AllData)
    //table表格数据
    const columns = [
        {
          dataIndex: 'title',
          key: 'title',
        },
        {
          key: 'exam_name',
          dataIndex: 'exam_name',
          render: exam_name => (
            <span>
                  <Tag>
                    {exam_name}
                  </Tag>
            </span>
          ),
        },
        {
            key: 'questions_type_text',
            dataIndex: 'questions_type_text',
            render: questions_type_text => (
              <span>
                    <Tag>
                      {questions_type_text}
                    </Tag>
              </span>
            ),
          },
          {
            key: 'subject_text',
            dataIndex: 'subject_text',
            render: subject_text => (
              <span>
                    <Tag>
                      {subject_text}
                    </Tag>
              </span>
            ),
          },
        {
            dataIndex: 'user_name',
            key: 'user_name',
            render: user_name=><div>
                <a>{user_name+'发布'}</a>
            </div>
          },
        {
          key: 'action',
          render: (text, record) => (
            <span>
              <a>详情</a>
            </span>
          ),
        },
      ];
    return <div>
        <Breadcrumb style={{ margin: '16px 0',fontSize:22 }}>
          <Breadcrumb.Item>创建试卷</Breadcrumb.Item>
        </Breadcrumb>
        <div className="addItem">
        <div>
        <Button onClick={showDrawer}>
           添加新题
        </Button>
        <Drawer
          title="所有题目"
          width={720}
          onClose={onClose}
          visible={visible}
        >
          <Table columns={columns} dataSource={AllData?AllData.data:null} 
          rowKey={item=>item.questions_id} showHeader={false} />
          <div
            style={{
              position: 'absolute',
              left: 0,
              bottom: 0,
              width: '100%',
              borderTop: '1px solid #e9e9e9',
              padding: '10px 16px',
              background: '#fff',
              textAlign: 'right',
            }}
          >
          </div>
        </Drawer>
      </div>
            <div className="create-exam">
                <h2>{data.title}</h2>
                <p>{'考试时间:'+(data.end_time-data.start_time).toLocaleString()*1+'监考人:爱豆  开始考试时间:'
                +data.start_time+'阅卷人: 撒旦'}</p>
                <Button type="primary" onClick={()=>props.history.replace('/exam/listExam')}>创建试卷</Button>
            </div>
        </div>
    </div>
}
const mapState = state => {
    return state.exam
}
const mapDispatch = dispatch => {
    return {
       getAll() {
           dispatch({
               type:'exam/allQuestion'
           })
       }
    }
}
export default connect(mapState,mapDispatch)(createNew)