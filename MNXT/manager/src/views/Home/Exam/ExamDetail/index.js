import React, {useEffect} from 'react'
import { connect } from 'dva'
import { Breadcrumb } from 'antd';

// import './detail.scss'
function ExamDetail(props) {
    useEffect(()=>{
        props.getList()
    },[])
    const {ListPaper} = props
   
    const detailID = props.history.location.search.slice(1)
    let detailPaper
    let detail
    if(ListPaper) {
        detail = ListPaper.filter(item=>{
            if(item.subject_id===detailID) {
                return item
            } else {
                return null
            }
         })
    }
    if(detail) {
        detailPaper = {
            title: detail[0].title,
        }
    }
    console.log(detailPaper)
    return <div>
        <Breadcrumb style={{ margin: '16px 0',fontSize: 22 }}>
            <Breadcrumb.Item>试题详情</Breadcrumb.Item>
        </Breadcrumb> 
        <div className='detail-wrap'>
            <div className="detail">
                <h4>{detailPaper?detailPaper.title:null}</h4>
                <p className="cont"></p>
                <code></code>
            </div>
        </div>
    </div>
}
const mapState = state => {
    return state.exammanage
}
const mapDispatch = dispatch => {
    return {
          //获取试卷详情
          getList() {
              dispatch({
                  type:'exammanage/getList'
              })
          }
    }
}
export default connect(mapState,mapDispatch)(ExamDetail)