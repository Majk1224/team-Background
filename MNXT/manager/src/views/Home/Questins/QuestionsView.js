import React, { Component } from 'react'
import style from './QuestionsView.scss'
import { Select, Button ,Breadcrumb,Radio,Form,Pagination } from 'antd';
import { connect } from 'dva';
class QuestionsView extends Component {
  constructor(){
      super()
      this.state={
        examViewGetshiTiall:[]
      }
  }

    componentDidMount() {
        let { getExamClassa, getAllCourseS, getshitia, getleixingac } = this.props;
        
        getExamClassa()
        getAllCourseS()
        getshitia()
        getleixingac()
        
        setTimeout(() => {

            // console.log(this.props)
        }, 2000)


    }
    
    inquireSubmit = e => {
        const _this=this;
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            _this.props.getCondition({
                questions_type_id:values.questionsType,
                 subject_id:values.subjectType,
                 exam_id:values.ExamType
             })
          }
        });
      };
      editquestion = (e,item) => {
        e.stopPropagation()
        console.log("编辑")
        // console.log(this.props.history)
        this.props.history.replace('/questions/Edit?'+item.questions_id)
      }
      questionsDetail=(e,item)=>{
          e.stopPropagation()
        console.log("详情")

          this.props.history.push("/questions/Detail?id="+item.questions_id)
            // console.log()
      }
       onShowSizeChange(current, pageSize) {
        console.log(current, pageSize);
      }
    render() {
        const { Option } = Select;
        const { getFieldDecorator } = this.props.form;
        function handleChange(value) {
            // console.log(`selected ${value}`);
        }
        // this.setState({
        //     examViewGetshiTiall:this.props.examView.getshiTiall
        // })
        // console.log(this.state.examViewGetshiTiall)
        return (
            <div className={style.wrap}>
                 <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>查看试题</Breadcrumb.Item>
                </Breadcrumb>
                <div className={style.wrapper}>
                    <Form onSubmit={this.inquireSubmit}>
                        <div className={style.leiXing}>
                            <div>课程类型:</div>
                            <Form.Item>
                                {getFieldDecorator('subjectType', {
                                    rules: [{ required: false, message: '' }],
                                })(
                                    <Radio.Group  buttonStyle="solid">
                                    {
                                    this.props.examView.getsetion && this.props.examView.getsetion.map((item) =>
                                            <Radio.Button className={style.getsetion} key={item.subject_id} value={item.subject_id}>{item.subject_text}</Radio.Button>
                                        )
                                    }
                                </Radio.Group>
                                )}
 
                            </Form.Item>
                            
                        </div>

                        <div className={style.kaoShi}>
                            <div className={style.shi}>
                                <div>考试类型：</div>
                                <Form.Item>
                                    {getFieldDecorator('ExamType', {
                                        rules: [{ required: false, message: '' }],
                                        initialValue:"请选择考试类型" 
                                    })(
                                        <Select style={{ width: 180 }}>
                                    
                                            {
                                                this.props.examView.getquestion && this.props.examView.getquestion.map((item) =>
                                                        <Option key={item.exam_id} value={item.exam_id}>{item.exam_name}</Option>
                                                    )
                                            }
                                        </Select>
                                    )}
    
                                </Form.Item>
                            </div>
                            <div className={style.shi}>
                                <div>题目类型：</div>
                                <Form.Item>
                                    {getFieldDecorator('questionsType', {
                                        rules: [{ required: false, message: '' }],
                                        initialValue:"请选择题目类型" 
                                    })(
                                        <Select style={{ width: 180 }} onChange={handleChange}>
                                            {
                                                this.props.examView.getleixingc && this.props.examView.getleixingc.map((item) =>
                                                <Option key={item.questions_type_id} value={item.questions_type_id} >{item.questions_type_text}</Option>
                                                    )
                                            }
                                        </Select>
                                    )}
                                </Form.Item>
                               
                            </div>
                            <Button type="primary" htmlType="submit">查询</Button>
                        </div>
                    </Form>
 

                </div>

                <div className={style.footer}>
                    {
                        this.props.examView.getshiTiall.map((item) => 
                            <div key={item.questions_id} className={style.dl} onClick={(e)=>this.questionsDetail(e,item)}>
                                <div className={style.dt}>
                                    <div className={style.titles}>{item.title}</div>
                                    <div className={style.spans}>
                                        <span key={item.questions_type_id}>{item.questions_type_text}</span>
                                        <span key={item.subject_id}>{item.subject_text}</span>
                                        <span key={item.exam_id}>{item.exam_name}</span>
                                    </div>
                                    <div className={style.namea} key={item.user_id}>{item.user_name}发布</div>
                                </div>
                                <div className={style.dd} onClick={(e)=>this.editquestion(e,item)}>编辑</div>
                            </div>
                        )
                    }
                    <Pagination
                        showSizeChanger
                        onShowSizeChange={this.onShowSizeChange}
                        defaultCurrent={1}
                        total={50}
                    />
                </div>
            </div>
        )
    }
}
// // props的类型检查
// LoginPage.propTypes = {

// }
// // props的默认值
// LoginPage.defaultProps = {
// }

const mapStateToProps = state => {
    return state
}

const mapDisaptchToProps = dispatch => {
    return {
        getExamClassa(payload) {
            dispatch({
                type: 'examView/getExamClass',
                payload
            })
        },
        getAllCourseS(payload) {
            dispatch({
                type: 'examView/getAllCourse',
                payload
            })
        },
        getshitia(payload) {
            dispatch({
                type: 'examView/getallshiti',
                payload
            })
        },
        getleixingac(payload) {
            dispatch({
                type: 'examView/getleixing',
                payload
            })
        },
        //按条件获取试题查询借口 /exam/questions/condition
        getCondition(payload){
            dispatch({
                type:"examView/condition",
                payload
            })
        }

    }
}

export default connect(mapStateToProps, mapDisaptchToProps)(Form.create()(QuestionsView))


