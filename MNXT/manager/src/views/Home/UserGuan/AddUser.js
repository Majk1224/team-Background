import React, { useEffect, useState } from "react";
import { Layout, Breadcrumb, Input, Radio, Select, Button, Form ,message} from "antd";
import styles from './AddUser.scss';
import { connect } from "dva";

    function onChange(e) {
        // console.log(`selected ${e}`);
    }
    
    function onBlur() {
        // console.log("blur");
    }
    
    function onFocus() {
        // console.log("focus");
    }
    
    function onSearch(val) {
        // console.log("search:", val);
    }
function AddUser(props){
  let {
    Add_user,userAll,up_Users,identityAdd,AddApi,
    viewAuthorsAll,ViewEditAdd,apiAuthorityAll,SetApi,SetView
  }=props
console.log()
  //添加用户
    if(Add_user.code===0){//message
      //msg
      Add_user.err?Add_user.err.errors.map((item)=>{
        return message.error(`${item.message}`)
      }):message.error(`${Add_user.msg}`)
      Add_user.code=-1
    }else if(Add_user.code===1){
      message.success(`${Add_user.msg}`)
      Add_user.code=-1
    }
    //更新用户
    if(up_Users.code===1){
      message.success(`${up_Users.msg}`)
      up_Users.code=-1
    }
    //添加身份
    if(identityAdd.code===1){
      message.success(`${identityAdd.msg}`)
      identityAdd.code=-1
    }
    //添加api接口权限
    if(AddApi.code===1){
      message.success(`${AddApi.msg}`)
      AddApi.code=-1
    }
    //添加视图权限接口
    if(ViewEditAdd.code===1){
      message.success(`${ViewEditAdd.msg}`)
      ViewEditAdd.code=-1
    }else if(ViewEditAdd.code===0){
      message.error(`${ViewEditAdd.msg}`)
      ViewEditAdd.code=-2
    }
    //给身份设置api接口权限
    if(SetApi.code===1){
      message.success(`${SetApi.msg}`)
      SetApi.code=-1
    }else if(SetApi.code===0){
      message.error(`${SetApi.msg}`)
      SetApi.code=-2
    }
    //给身份设定视图权限
    if(SetView.code===1){
      message.success(`${SetView.msg}`)
      SetView.code=-1
    }else if(SetView.code===0){
      message.error(`${SetView.msg}`)
      SetView.code=-2
    }
    const { Option } = Select;
    const { getFieldDecorator } = props.form;
    const [flag, updataFlag] = useState(false);
    useEffect(()=>{
        props.userIdentity()
        props.usersShow()
        props.viewAuthor()
        props.apiAuthority()
    },[])
    let handleSubmit = e => {
      e.preventDefault();
      props.form.validateFields((err, values) => {
        if (!err) {
          
          const {
            user_name,user_pwd,identity_id,user_id,identity_text,
            api_authority_text,api_authority_url,api_authority_method,
            view_id,fifth_identity_id,fifth_auth_id,sixth_ident_text,sixth_view_id
          }=values
         
          if(!flag){
            // 添加用户
            if(user_name&&user_pwd||identity_id){
              // console.log({user_name:user_name,user_pwd:user_pwd,identity_id:identity_id})
               props.userAddS({
                 user_name:user_name,user_pwd:user_pwd,identity_id:identity_id
               })
             }
          }else{
            //更新用户
            if(user_id||user_name||user_pwd){
              props.up_User({user_id:user_id,user_name:user_name,user_pwd:user_pwd,identity_id:identity_id})
            }else{
              // message.error("输入不能为空")
            }
             
          }
          //添加身份
          if(identity_text){
            props.ADDidentity({identity_text:identity_text})
          }else{
            // message.error("输入不能为空")
          }
          //添加api接口权限
          if(api_authority_text&&api_authority_method&&api_authority_url){
            props.AddAuthorityApi({api_authority_text,api_authority_method,api_authority_url})
          }
          //添加视图接口权限
          if(view_id){
           const view_authority_text= viewAuthorsAll.filter(item=>item.view_authority_id===view_id)[0].view_authority_text
              props.authorityView({view_id,view_authority_text})
          }
          //给身份设定api接口权限
          if(fifth_identity_id&&fifth_auth_id){
              props.setIdentityApi({identity_id:fifth_identity_id,api_authority_id:fifth_auth_id})
          }
          if(sixth_ident_text&&sixth_view_id){
            props.setIdentityView({identity_id:fifth_identity_id,view_authority_id:fifth_auth_id})
        }
        }
      });
      
    }
    return (
      
        <Layout>
        
          <Layout>
            <Layout style={{ padding: "0 24px 24px" }}>
              <Breadcrumb style={{ margin: "16px 0" }}>
                  <Breadcrumb.Item>
                
                    <h2>添加用户</h2>
                    <Form onSubmit={handleSubmit}>
                      <div className={styles.addMain}>
                        {/* 添加用户 */}
                        <div className={styles.addMain_sec}>
                          
                              <Radio.Group
                                defaultValue="a"
                                style={{ marginBottom: 25, marginTop: 25 }}
                              >
                                <Radio.Button
                                  value="a"
                                  onClick={() => {
                                    updataFlag(false);
                                  }}
                                >
                                  添加用户
                                </Radio.Button>
                                <Radio.Button
                                  value="b"
                                  onClick={() => {
                                    updataFlag(true);
                                  }}
                                >
                                  更新用户
                                </Radio.Button>
                              </Radio.Group>
                              {
                                flag?<Form.Item>
                                {getFieldDecorator("user_id", {})(
                                  <Select
                                    showSearch
                                    style={{ width: 150, marginBottom: 25 }}
                                    placeholder="请选择身份id"
                                    optionFilterProp="children"
                                    onChange={onChange}
                                    onFocus={onFocus}
                                    onBlur={onBlur}
                                    onSearch={onSearch}
                                    filterOption={(input, option) =>
                                      option.props.children
                                        .toLowerCase()
                                        .indexOf(input.toLowerCase()) >= 0
                                    }
                                  >
                                  {
                                    userAll?userAll.map(item=>(
                                      <Option
                                        value={item.user_id}
                                        key={item.user_id}
                                      >
                                        {item.user_name}
                                      </Option>
                                      
                                    )):null
                                    
                                  }
                                  
                                  </Select>
                                )}
                              </Form.Item>:null
                              }
                              
                              <Form.Item>
                                {getFieldDecorator("user_name", {
                                  
                                })(
                                  <Input
                                    placeholder="请输入用户名"
                                    style={{ marginBottom: 25 }}
                                  />
                                )}
                              </Form.Item>
        
                              <Form.Item>
                                {getFieldDecorator("user_pwd", {
                                  
                                })(
                                  <Input
                                    placeholder="请输入密码"
                                    style={{ marginBottom: 25 }}
                                  />
                                )}
                              </Form.Item>
        
                              <Form.Item>
                                {getFieldDecorator("identity_id")(
                                  <Select
                                    showSearch
                                    style={{ width: 150, marginBottom: 25 }}
                                    placeholder="请选择身份id"
                                    optionFilterProp="children"
                                    onChange={onChange}
                                    onFocus={onFocus}
                                    onBlur={onBlur}
                                    onSearch={onSearch}
                                    filterOption={(input, option) =>
                                      option.props.children
                                        .toLowerCase()
                                        .indexOf(input.toLowerCase()) >= 0
                                    }
                                  >
                                    {props.identity.map(item => (
                                      <Option
                                        value={item.identity_id}
                                        key={item.identity_id}
                                      >
                                        {item.identity_text}
                                      </Option>
                                    ))}
                                  </Select>
                                )}
                              </Form.Item>
                              <p style={{ marginBottom: 50 }}>
                                <Button
                                  type="primary"
                                  htmlType="submit"
                                  style={{ width: 120, marginRight: 25, height: 40 }}
                                >
                                  确定
                                </Button>
                                <Button
                                  onClick={e => {
                                    e.preventDefault();
                                    props.form.resetFields();
                                  }}
                                >
                                  重置
                                </Button>
                              </p>
                      
                            
                            
                        </div>
                        {/* 添加身份 */}
                        <div className={styles.addMain_sec}>
                          <Radio.Group
                            defaultValue="a"
                            style={{ marginBottom: 25, marginTop: 25 }}
                          >
                            <Radio.Button value="a">添加身份</Radio.Button>
                          </Radio.Group>
        
                          <Form.Item>
                            {getFieldDecorator("identity_text", {
                            
                            })(
                              <Input
                                placeholder="请输入身份名称"
                                style={{ marginBottom: 25 }}
                              />
                            )}
                          </Form.Item>
        
                          <p style={{ marginBottom: 50 }}>
                            <Button
                              type="primary"
                              htmlType="submit"
                              style={{ width: 120, marginRight: 25, height: 40 }}
                              
                            >
                              确定
                            </Button>
                            <Button onClick={e => {
                                    e.preventDefault();
                                    // props.form.setFieldsValue({second_person_name:''})//设置
                                    props.form.resetFields();
                                  }}>重置</Button>
                          </p>
                        </div>
                        {/* 添加api接口权限 */}
                        <div className={styles.addMain_sec}>
                          <Radio.Group
                            defaultValue="a"
                            style={{ marginBottom: 25, marginTop: 25 }}
                          >
                            <Radio.Button value="a">添加api接口权限</Radio.Button>
                          </Radio.Group>
                          <Form.Item>
                            {getFieldDecorator("api_authority_text", {})(
                              <Input
                                placeholder="请输入api接口权限名称"
                                style={{ marginBottom: 25 }}
                              />
                            )}
                          </Form.Item>
        
                          <Form.Item>
                            {getFieldDecorator("api_authority_url", {})(
                              <Input
                                placeholder="请输入api接口权限url"
                                style={{ marginBottom: 25 }}
                              />
                            )}
                          </Form.Item>
        
                          <Form.Item>
                            {getFieldDecorator("api_authority_method", {})(
                              <Input
                                placeholder="请输入api接口权限方法"
                                style={{ marginBottom: 25 }}
                              />
                            )}
                          </Form.Item>
        
                          <p style={{ marginBottom: 50 }}>
                            <Button
                              type="primary"
                              htmlType="submit"
                              style={{ width: 120, marginRight: 25, height: 40 }}
                            >
                              确定
                            </Button>
                            <Button onClick={e => {
                                    e.preventDefault();
                                    //props.form.setFieldsValue({third_api_name:'',third_api_url:'',third_api_method:''})
                                    props.form.resetFields();
                                  }}>重置</Button>
                          </p>
                        </div>
                        {/* 添加视图接口权限 */}
                        <div className={styles.addMain_sec}>
                          <div>
                            <Radio.Group
                              defaultValue="a"
                              style={{ marginBottom: 25, marginTop: 25 }}
                            >
                              <Radio.Button value="a">添加视图接口权限</Radio.Button>
                            </Radio.Group>
                          </div>
        
                          <Form.Item>
                            {getFieldDecorator("view_id", {})(
                              <Select
                                showSearch
                                style={{ width: 150, marginBottom: 25 }}
                                placeholder="请选择已有视图"
                                optionFilterProp="children"
                                onChange={(e)=>onChange(e)}
                                onFocus={onFocus}
                                onBlur={onBlur}
                                onSearch={onSearch}
                                filterOption={(input, option) =>
                                  option.props.children
                                    .toLowerCase()
                                    .indexOf(input.toLowerCase()) >= 0
                                }
                              >
                                {viewAuthorsAll.map(item => (
                                  <Option
                                    value={item.view_authority_id}
                                    key={item.view_authority_id}
                                  >
                                    {item.view_authority_text}
                                  </Option>
                                ))}
                              </Select>
                            )}
                          </Form.Item>
        
                          <p style={{ marginBottom: 50 }}>
                            <Button
                              type="primary"
                              htmlType="submit"
                              style={{ width: 120, marginRight: 25, height: 40 }}
                            
                            >
                              确定
                            </Button>
                            <Button onClick={e => {
                                    e.preventDefault();
                                    props.form.resetFields();
                                  }}>重置</Button>
                          </p>
                        </div>
                        {/* 给身份设置api接口权限 */}
                        <div className={styles.addMain_sec}>
                          <div>
                            <Radio.Group
                              defaultValue="a"
                              style={{ marginBottom: 25, marginTop: 25 }}
                            >
                              <Radio.Button value="a">
                                给身份设置api接口权限
                              </Radio.Button>
                            </Radio.Group>
                          </div>
                          <div>
                            <Form.Item>
                              {getFieldDecorator("fifth_identity_id", {})(
                                <Select
                                  showSearch
                                  style={{ width: 150, marginBottom: 25 }}
                                  placeholder="请选择身份id"
                                  optionFilterProp="children"
                                  onChange={onChange}
                                  onFocus={onFocus}
                                  onBlur={onBlur}
                                  onSearch={onSearch}
                                  filterOption={(input, option) =>
                                    option.props.children
                                      .toLowerCase()
                                      .indexOf(input.toLowerCase()) >= 0
                                  }
                                >
                                  {props.identity.map(item => (
                                      <Option
                                        value={item.identity_id}
                                        key={item.identity_id}
                                      >
                                        {item.identity_text}
                                      </Option>
                                    ))}
                                </Select>
                              )}
                            </Form.Item>
                          </div>
                          <div>
                            <Form.Item>
                              {getFieldDecorator("fifth_auth_id", {})(
                                <Select
                                  showSearch
                                  style={{ width: 150, marginBottom: 15 }}
                                  placeholder="请选择api接口权限"
                                  optionFilterProp="children"
                                  onChange={onChange}
                                  onFocus={onFocus}
                                  onBlur={onBlur}
                                  onSearch={onSearch}
                                  filterOption={(input, option) =>
                                    option.props.children
                                      .toLowerCase()
                                      .indexOf(input.toLowerCase()) >= 0
                                  }
                                >
                                  {apiAuthorityAll.map(item => (
                                    <Option
                                      value={item.api_authority_id}
                                      key={item.api_authority_id}
                                    >
                                      {item.api_authority_text}
                                    </Option>
                                  ))}
                                </Select>
                              )}
                            </Form.Item>
                          </div>
                          <p style={{ marginBottom: 50 }}>
                            <Button
                              type="primary"
                              htmlType="submit"
                              style={{ width: 120, marginRight: 25, height: 40 }}
                              
                            >
                              确定
                            </Button>
                            <Button onClick={e => {
                                    e.preventDefault();
                                    props.form.resetFields();
                                    
                                  }}>重置</Button>
                          </p>
                        </div>
                        {/* 给身份设置视图权限 */}
                        <div className={styles.addMain_sec}>
                          <div>
                            <Radio.Group
                              defaultValue="a"
                              style={{ marginBottom: 25, marginTop: 25 }}
                            >
                              <Radio.Button value="a">给身份设置视图权限</Radio.Button>
                            </Radio.Group>
                          </div>
                          <div>
                            <Form.Item>
                              {getFieldDecorator("sixth_ident_text", {})(
                                <Select
                                  showSearch
                                  style={{ width: 150, marginBottom: 25 }}
                                  placeholder="请选择身份id"
                                  optionFilterProp="children"
                                  onChange={onChange}
                                  onFocus={onFocus}
                                  onBlur={onBlur}
                                  onSearch={onSearch}
                                  filterOption={(input, option) =>
                                    option.props.children
                                      .toLowerCase()
                                      .indexOf(input.toLowerCase()) >= 0
                                  }
                                >
                                  {props.identity.map(item => (
                                      <Option
                                        value={item.identity_id}
                                        key={item.identity_id}
                                      >
                                        {item.identity_text}
                                      </Option>
                                    ))}
                                </Select>
                              )}
                            </Form.Item>
                          </div>
                          <div>
                            <Form.Item>
                              {getFieldDecorator("sixth_view_id", {})(
                                <Select
                                  showSearch
                                  style={{ width: 150, marginBottom: 25 }}
                                  placeholder="请选择视图权限id"
                                  optionFilterProp="children"
                                  onChange={onChange}
                                  onFocus={onFocus}
                                  onBlur={onBlur}
                                  onSearch={onSearch}
                                  filterOption={(input, option) =>
                                    option.props.children
                                      .toLowerCase()
                                      .indexOf(input.toLowerCase()) >= 0
                                  }
                                >
                                  {viewAuthorsAll.map(item => (
                                  <Option
                                    value={item.view_authority_id}
                                    key={item.view_authority_id}
                                  >
                                    {item.view_authority_text}
                                  </Option>
                                ))}
                                </Select>
                              )}
                            </Form.Item>
                          </div>
                          <p style={{ marginBottom: 50 }}>
                            <Button
                              type="primary"
                              htmlType="submit"
                              style={{ width: 120, marginRight: 25, height: 40 }}
                            
                            >
                              确定
                            </Button>
                            <Button onClick={e => {
                                    e.preventDefault();
                                    props.form.resetFields();
                                  }}>重置</Button>
                          </p>
                        </div>
                      </div>
                    </Form>
                  </Breadcrumb.Item>
              </Breadcrumb>
            </Layout>
          </Layout>
        </Layout>
      );
}
const mapStateToProps=state=>{
    return state.users
}
const mapDispatchToProps=dispatch=>{
    return {
      //身份数据
      userIdentity() {
        dispatch({
          type: "users/identity"
        });
      },
      //添加用户
      userAddS(payload){
      //  console.log(payload)
        dispatch({
          type:"users/userA",
          payload
        })
      },
       //用户数据
      usersShow() {
        dispatch({
          type: "users/showUser"
        });
      },
      //更新用户
      up_User(payload){
        dispatch({
          type: "users/upData_User",
          payload
        });
      },
      //添加身份
      ADDidentity(payload){
        dispatch({
          type: "users/identityEdit",
          payload
        });
      },
      //添加api接口权限
      AddAuthorityApi(payload){
        dispatch({
          type: "users/authorityApiEdit",
          payload
        });
      },
      //获取所有视图
      viewAuthor() {
        dispatch({
          type: "users/viewAuthor"
        });
      },
      //添加视图权限
      authorityView(payload){
        dispatch({
          type: "users/AddAuthorityView",
          payload
        });
      },
      //api数据
      apiAuthority() {
        dispatch({
          type: "users/apiAuthority"
        });
      },
      //给身份设定api接口权限
      setIdentityApi(){
        dispatch({
          type: "users/SetIdentityApi"
        });
      },
      //给身份设定视图权限
      setIdentityView(){
        dispatch({
          type: "users/SetIdentityView"
        });
      }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Form.create()(AddUser))