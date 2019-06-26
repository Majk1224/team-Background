import React,{useState,useEffect} from 'react'
import {connect} from 'dva'
import {Breadcrumb,Button,Slider,Modal} from 'antd'
import "./Awaiting/class.scss"
import ReactMarkdown from 'react-markdown'

const exam_StudentDetail=JSON.parse(window.sessionStorage.getItem("exam_StudentDetail"))||null
function PaperSExamDetail(props){
    console.log(exam_StudentDetail)
    const [num,setNum]=useState(exam_StudentDetail.score)
    const SlideronChange=(e)=>{
        setNum(e)
    }
 
   const { confirm } = Modal;
    function showConfirm() {
        confirm({
        title: '确定提交阅卷结果?',
        content: '分数值是'+num,
        onOk() {
            // return new Promise((resolve, reject) => {
            // setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
            // }).catch(() => console.log('Oops errors!'));
            console.log(111)
        },
        onCancel() {},
        });
    }
    return (
        <div >
            <Breadcrumb style={{ margin: '16px 0',fontSize:22 }}>
                <Breadcrumb.Item>阅卷</Breadcrumb.Item>
            </Breadcrumb>
            <div className="wrapper">
                <div className="wrap-left">
                    {
                        exam_StudentDetail.questions&&exam_StudentDetail.questions.map((item,index)=>{
                            
                            return <div key={item.questions_id} className="left-count">
                                        <h4>{index+1}.{item.title}
                                            <span className="left-icon">{item.questions_type_text}</span>
                                        </h4>
                                        
                                            <ReactMarkdown
                                                className="left-markdown"
                                                source={item.questions_stem}
                                                escapeHtml={false}
                                            />
                                       <div className="answer">
                                           <div className="answer-student">
                                               <p>学生答案</p>
                                               <ReactMarkdown
                                                // className="left-markdown" 
                                                source={item.student_answer}
                                                escapeHtml={false}
                                            />
                                           </div>
                                           <div className="answer-student">
                                               <p>标准答案</p>
                                               <div className="answer-biao">
                                               <ReactMarkdown
                                                // className="left-markdown" student_answer
                                                source={item.questions_answer}
                                                escapeHtml={false}
                                            />
                                               </div>
                                           </div>
                                       </div>
                                       
                                </div>
                        })
                    }
                </div>
                <div className="wrap-right">
                    <h2>{exam_StudentDetail.student_name}</h2>
                    <h2>得分：<span>{num}</span></h2>
                    <Slider defaultValue={exam_StudentDetail.score} tooltipVisible onChange={(e)=>SlideronChange(e)}/>
                    <Button type="primary" onClick={showConfirm}>确定</Button>
                </div>
            
                
            </div>
        </div>
    )
}
const mapState = state => {
    return state.exammanage
}   
const mapDispatch = dispatch => {
    return {
       
       
    }
}
export default connect(mapState,null)(PaperSExamDetail)
