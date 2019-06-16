import React, { Component } from 'react';
import Editor from 'for-editor'
import {connect} from 'dva'
import {Button,Select, Input,Form,message} from 'antd';
const { Option } = Select;


 class QuestionViewEdit extends Component {
   constructor(){
     super()
     this.state={
       value:""
     }
   }
   componentDidMount(){
      this.props.getQuectionsAll()
      this.props.getsubjects()
      this.props.getExamType()
      this.props.QuestionsTypeEs()
      this.props.userInfo()
      
   }
   componentDidUpdate(){
    if(this.props.Success.code === 1) {
      message.success('试题编辑成功')
    } else if(this.props.Success.code ===0) {
      message.error('试题编辑失败')
    }
   }
   handleChange(value) {
    this.setState({
      value
    })
    console.log(value)
  }
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, value)=>{
      if(!err) {
        this.props.questionsAdd({
            questions_type_id:value.questionText,//试题ID
            questions_stem:value.theme,//题干/主题
            subject_id:value.subjectText,//课程ID
            exam_id:value.examText,//考试类型ID
            user_id:this.props.UserInfoID.data.user_id,//当前用户ID
            questions_answer:value.answer,//答案
            title:value.title//标题
        })
      }
    })
    
    
  }
 
  render() {
    // Getsubject 获取课程
    // GetExamType 获取考试类型
    // GetQuestionsType 获取题目类型


    const {getShiTiAll,Getsubject,GetExamType,GetQuestionsType}=this.props
  //  console.log(UserInfoID)
 
        const { getFieldDecorator } = this.props.form;
        const questionID = this.props.history.location.search.slice(1)
        const detail = getShiTiAll?getShiTiAll.filter(item=>{
            if(item.questions_id===questionID){
                return item
            } else {
                return null
            }
        }):null
      
            let detailquestion
          
            if(detail[0]) {
            
                detailquestion = {
                    title: detail[0].title,
                    theme: detail[0].questions_stem,
                    examTexts: detail[0].exam_name,
                    subjectTexts: detail[0].subject_text,
                    questionTexts: detail[0].questions_type_text,
                    answer: detail[0].questions_answer
                }
            } else {
                return null
            }
            return (
              <Form onSubmit={this.handleSubmit} >
                  <h3>题目信息</h3>
                  <div>
                    <div><label>题干</label></div>
                    <div>
                      <Form.Item>
                      {getFieldDecorator('title', {
                          rules: [{ required: true, message: '请输入标题' }],
                          initialValue:detailquestion.title
                        })(
                          <Input placeholder="请输入题目标题,不超过20个字" />,
                        )}
                      </Form.Item>
                    </div>
                    <div>
                    <div><label>题目主题</label></div>
                    <Form.Item>
                    {getFieldDecorator('theme', {
                        rules: [{ required: true }],
                        initialValue:detailquestion.theme
                      })(
                        <Editor/>,
                      )}
                    </Form.Item>
                  </div>
                  </div>
                  <div>
                    <div><label>请选择考试类型:</label></div>
                    <div>
                      <Form.Item>
                        {getFieldDecorator('examText', {
                          rules: [{ required: true }],
                          initialValue:detailquestion.examTexts
                        })(
                          <Select  style={{ width: 220 }}>
                          {
                            GetExamType?GetExamType.data.map(item=>(
                              <Option value={item.exam_id} 
                              key={item.exam_id}>{item.exam_name}</Option>
                            )):[]
                          }
                        </Select>,
                        )}
                      </Form.Item>
                      
                    </div>
                  </div>
                  <br/>
                    <div>
                      <div><label>请选择课程类型:</label></div>
                      <div>
                        <Form.Item>
                        {getFieldDecorator('subjectText', {
                            rules: [{ required: true }],
                            initialValue:detailquestion.subjectTexts
                          })(
                            <Select style={{ width: 220 }}>
                          {
                            Getsubject?Getsubject.data.map(item=>(
                                <Option value={item.subject_id}
                                key={item.subject_id}>{item.subject_text}</Option>
                            )):[]
                          }
                        </Select>,
                          )}
                        </Form.Item>
                      </div>
                    </div>
                  <br/>
                  <div>
                    <div><label>请选择题目类型:</label></div>
                    <div>
                      <Form.Item>
                      {getFieldDecorator('questionText', {
                        rules: [{ required: true }],
                        initialValue:detailquestion.questionTexts
                      })(
                        <Select style={{ width: 220 }}>
                        {
                          GetQuestionsType?GetQuestionsType.data.map(item=>(
                            <Option value={item.questions_type_id}
                            key={item.questions_type_id}>{item.questions_type_text}</Option>
                          )):[]
                        }
                      </Select>
                      )}
                      </Form.Item>
                      
                    </div>
                  </div>
                  <div>
                    <div><label>答案信息:</label></div>
                    <Form.Item>
                    {getFieldDecorator('answer', {
                        rules: [{ required: true }],
                        initialValue: detailquestion.answer
                      })(
                        <Editor />,
                      )}
                    </Form.Item>
                  </div>
                  <Button htmlType="submit" type="primary">提交</Button>
              </Form>
    
            )
  }
}
const mapState = state => {
  return state.exam
}
const mapDispatch = dispatch => {
  return {
    //获取所有试题接口
      getQuectionsAll(){
        dispatch({
          type:'exam/getallshiti'
        })
      },
       //添加试题接口
       questionsAdd(payload){
        dispatch({
            type: 'exam/questions',
            payload
        })
        
    },
  
    //获取所有考试类型 /exam/examType
    getExamType(){
        dispatch({
            type:"exam/examType"
        })
    },
    //获取所有的课程 exam/subject
    getsubjects(){
        dispatch({
            type:"exam/subject"
        })
    },
    //获取所有课题类型
    QuestionsTypeEs(){
        dispatch({
            type:"exam/getQuestionsType"
        })
    },
     //获取当前用户ID
     userInfo(){
        dispatch({
            type: 'exam/userInfo',
        })
    }
  }
}
export default connect(mapState,mapDispatch)(Form.create()(QuestionViewEdit));