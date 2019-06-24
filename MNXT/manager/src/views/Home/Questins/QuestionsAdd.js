import React,{useEffect} from 'react';
import { connect } from 'dva';
import style from './QuestionsAdd.scss'

import { Input, Select,Button,Form,Breadcrumb,message } from 'antd';
import Editor from 'for-editor'
function QuestionsAdd(props){
 
    const {Getsubject,getsubjects,getExamType,
        GetExamType,QuestionsTypeEs,GetQuestionsType,userInfo,UserInfoID,questionsAdd} = props;
    const { Option } = Select;
    if(props.Success.code===1){
        message.success("添加成功")
        props.Success.code=2
        props.form.resetFields();
    }
    useEffect(()=>{
         getsubjects()
         getExamType()
         QuestionsTypeEs()
         userInfo()
         
    },[])
 
//    let visible=false;
 
    let handleSubmit = e => {
        e.preventDefault();
        props.form.validateFields((err, values) => {
          if (!err) {
            // {titleText: "体感", theme: "主题", ExamType: "8sc5d7-7p5f9e-cb2zii-ahe5i",
            //  subjectType: "fqtktr-1lq5u", questionsType: "774318-730z8m", …}
            
            questionsAdd({
                questions_type_id:values.questionsType,//试题ID
                questions_stem:values.theme,//题干/主题
                subject_id:values.subjectType,//课程ID
                exam_id:values.ExamType,//考试类型ID
                user_id:UserInfoID.data.user_id,//当前用户ID
                questions_answer:values.answer,//答案
                title:values.titleText//标题
            })
          }
        });
        
      };

      const { getFieldDecorator } =props.form;
    //   let showModal=(e)=>{
    //       console.log(e)
    //     // visible=true
    //   }
    //   const handleOk=()=>{
    //     visible=false
    //   }
    //   const handleCancel=()=>{
    //     visible=false
    //   }
    return (
        <div className={style.wrap}>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>添加试题</Breadcrumb.Item>
            </Breadcrumb>
            {/* <div>
                <Button type="primary" onClick={(e)=>showModal(e)}>
                Open Modal
                </Button>
                <Modal
                title="Basic Modal"
                visible
                onOk={()=>handleOk()}
                onCancel={()=>handleCancel()}
                >
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
                </Modal>
            </div> */}
            <Form onSubmit={handleSubmit}>
                <div className={style.tiMu}>
                    <div key='khkjgfdghf'>题目信息</div>
                    <div>题干</div>
                    <Form.Item>
                        {getFieldDecorator('titleText', {
                            rules: [{ required: true, message: '标题不能为空' }],
                        })(
                            <Input
                            placeholder="请输入题目标题，不能超过20字"
                            className={style.ipt}
                            />,
                        )}
                    </Form.Item>
                    <div className={style.zhuTi}>题目主题</div>
                    <Form.Item>
                        {getFieldDecorator('theme', {
                            rules: [{ required: true, message: "题目主题必填" }],
                            initialValue: '',
                        })(
                            <Editor height='auto'/>
                        )}
                    </Form.Item>
                    

                    <div>
                        <div>请选择考试类型</div>
                        <Form.Item>
                            {getFieldDecorator('ExamType', {
                                rules: [{ required: true, message: "考试类型必选" }],
                                initialValue: "请选择考试类型"
                            })(
                                <Select className={style.select} style={{ width: 180 }} >
                                    {
                                        GetExamType.data?GetExamType.data.map(item=>
                                            <Option value={item.exam_id} key={item.exam_id}>{item.exam_name}</Option>
                                        ):[]
                                    }
                                    
                                </Select>
                            )}
                        </Form.Item>
                    </div>

                    <div>
                        <div>请选择课程类型</div>
                        <Form.Item>
                            {getFieldDecorator('subjectType', {
                                rules: [{ required: true, message: "课程类型必选" }],
                                initialValue: "请选择课程类型"
                            })(
                                <Select className={style.select} style={{ width: 180 }}>
                        
                                    {
                                        Getsubject.data?
                                        Getsubject.data.map(item=><Option value={item.subject_id} key={item.subject_id}>
                                        {item.subject_text}</Option>):null
                                    }
                                </Select>
                            )}
                        </Form.Item>
                        
                    </div>

                    <div>
                        <div>请选择题目类型</div>
                        <Form.Item>
                            {getFieldDecorator('questionsType', {
                                rules: [{ required: true, message: "题目类型必选" }],
                                initialValue: "请选择题目类型"
                            })(
                                <Select className={style.select} style={{ width: 180 }} >
                                    {
                                        GetQuestionsType.data? 
                                        GetQuestionsType.data.map(item=><Option value={item.questions_type_id} 
                                        key={item.questions_type_id}>
                                        {item.questions_type_text}</Option>):null
                                    }
                                </Select>
                            )}
                        </Form.Item>
                        
                    </div>
                        <div className={style.xinXi}>答案信息</div>
                        <Form.Item>
                            {getFieldDecorator('answer', {
                                rules: [{ required: true, message: "答案信息必填" }],
                                initialValue: '',
                            })(
                                <Editor height='auto'/>
                            )}
                        </Form.Item>
                
                    <Button type="primary" className={style.submit} htmlType="submit">提交</Button>
                </div>
            </Form>
        </div>
    )
}
const mapStateToProps=state=>{
    return state.exam
}
const mapDispatchToProps=dispatch=>{
    return {
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
export default connect(mapStateToProps,mapDispatchToProps)(Form.create()(QuestionsAdd))