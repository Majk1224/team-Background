import React,{useEffect} from 'react';
import { Form, Icon, Input, Button, Checkbox,message } from 'antd';
import { connect } from 'dva';
import styles from './login.scss';
function Login(props){
      // 获取login
let {login,user} = props;

  useEffect(()=>{
   
    if(user.code===1){
        //1. 提示登录成功
        message.success('登陆成功');
        //2. 存储cookie
        //3. 跳转页面
        props.history.replace("/home");
    }else if(user.code===0){
        message.error(user.msg);
    }
  }, [user]);
     // 处理表单提交
  let handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        //console.log('Received values of form: ', values);
        // 调登录接口
        login({
          user_name: values.username,
          user_pwd: values.password
        })
      }
    });
    
  };
    // 表单校验
  const { getFieldDecorator } = props.form;
       return ( <div className={styles.wrap}>
            <div className={styles.fixed}>
                <Form onSubmit={handleSubmit} className={styles.login_form}>
                    <Form.Item>
                        {getFieldDecorator('username', {
                            rules: [{ pattern: /^[a-zA-Z\d]+$/, message: '账号输入错误' }],
                        })(
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="请输入用户名"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [{ pattern: /^(?:(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9])).*$/, message: '密码输入错误!' }],
                        })(
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="请输入密码"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })(<Checkbox>记住密码</Checkbox>)}
                        <a className={styles.login_form_forgot} href="">
                            忘记密码
                        </a>
                      
                        <Button type="primary" htmlType="submit" className={styles.login_form_button}>
                            登录
                       </Button> 
                    </Form.Item>
                </Form>
            </div>
        </div>)
}
// props的类型检查
Login.propTypes = {

}
// props的默认值
Login.defaultProps = {

}
const mapStateToProps=state=>{
   
    return state
}
const mapDispatchToProps=dispatch=>{
    return {
        //获取登录接口
        login(payload){
            dispatch({
                type: 'user/login',
                payload
            })
            
        }
        //获取用户接口
        // user(payload){
        //     dispatch({
        //         type: 'user/user',
        //         payload
        //     })
        // }
       

    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Form.create({name: 'normal_login'})(Login));