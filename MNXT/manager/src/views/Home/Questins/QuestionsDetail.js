import React, { Component } from 'react'
import { connect} from 'dva';
import styles from './detail.scss'
import {Breadcrumb} from 'antd';
 class QuestionsDetail extends Component {
constructor(){
    super()
    this.state={
        detailData:[]
    }
}
  componentDidMount(){
        let id = this.props.location.search.split('=')[1];
        let detail = this.props.getshiTiall.filter(item=>item.questions_id === id);
        this.setState({
            detailData:detail
        })
  }
    render() {
        return ( 
            <div className={styles.wrap}> 
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>试题详情</Breadcrumb.Item>
            </Breadcrumb>
                {
               this.state.detailData && this.state.detailData.map((item,key)=><div key={key} className={styles.section}>
                  
                    <div className={styles.left}>
                           <div>
                               <p>出题人：</p>
                               <p>{item.user_name}</p>
                           </div>
                           <div>
                               <p>题目信息:</p>
                               <p className={styles.act}>
                                   <span>{item.questions_type_text}</span>
                                   <span>{item.subject_text}</span>
                                   <span>{item.exam_name}</span>
                              </p>
                           </div>
                           <div>
                               <p>{item.title}</p>
                               <p>{item.questions_stem}</p>
                           </div>
                                     
                         </div>
                  
                         <div className={styles.right}>
                          <div>
                               <p>答案：</p>
                               <p>{item.questions_answer}</p>
                           </div>
                         </div>
                </div>)
                }
                  
            </div>

            
        )
    }
}

const mapStateToProps = state => {
    return {...state.examView}
}

const mapDisaptchToProps = dispatch => {
    return {
    }
}

export default connect(mapStateToProps,mapDisaptchToProps)(QuestionsDetail)