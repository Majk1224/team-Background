import React,{useEffect} from 'react';
import { connect } from 'dva';
function AddUser(){
    return (
        <div>添加用户</div>
    )
}
const mapStateToProps=state=>{
    return state.Users
}
const mapDispatchToProps=dispatch=>{
    return {
       
        
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(AddUser)