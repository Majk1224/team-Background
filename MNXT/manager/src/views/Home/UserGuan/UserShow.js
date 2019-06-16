import React,{useEffect} from 'react';
import { connect } from 'dva';
function UserShow(){
    return (
        <div>用户展示</div>
    )
}
const mapStateToProps=state=>{
    return state.userShow
}
const mapDispatchToProps=dispatch=>{
    return {
       
        
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(UserShow)