import React from 'react'
import {Menu,Icon} from 'antd'
import {Link} from 'dva/router';
import {injectIntl} from 'react-intl'

const { SubMenu } = Menu;

function MenuComp(props){
    // console.log(props.intl);

    return (
        <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
        >
            <SubMenu
                key="sub1"
                title={
                <span>
                    <Icon type="user" />
                    {props.intl.formatMessage({id: 'router.questions'})}
                   {/* 试题管理 */}
                </span>
                }
            >
                <Menu.Item key="1">
                    <Link to="/home/questions/add">{props.intl.formatMessage({id: 'router.questions.add'})}</Link>
                </Menu.Item>
                <Menu.Item key="2">
                    <Link to="/home/questions/type">{props.intl.formatMessage({id: 'router.questions.type'})}</Link>
                </Menu.Item>
                <Menu.Item key="3">
                    <Link to="/home/questions/view">{props.intl.formatMessage({id: 'router.questions.view'})}</Link>  
                </Menu.Item>
            
            </SubMenu>
            <SubMenu
                key="sub2"
                title={
                <span>
                    <Icon type="laptop" />
                    用户管理
                </span>
                }
            >
                <Menu.Item key="5">
                    <Link to="/home/userGuan/addUser"> 添加用户</Link>
                </Menu.Item>
                <Menu.Item key="6">
                    <Link to="/home/userGuan/UserShow"> 用户展示</Link>
                </Menu.Item>
            </SubMenu>
            <SubMenu
                key="sub3"
                title={
                <span>
                    <Icon type="notification" />
                    考试管理
                </span>
                }
            >
                <Menu.Item key="9">
                    <Link to="/home/exam/addexam"> 添加考试</Link>
                </Menu.Item>
                <Menu.Item key="10">
                    <Link to="/home/exam/listExam"> 试卷列表</Link>
                </Menu.Item>
            
            </SubMenu>
            <SubMenu
                key="sub4"
                title={
                <span>
                    <Icon type="notification" />
                    班级管理
                </span>
                }
            >
                <Menu.Item key="13">班级管理</Menu.Item>
                <Menu.Item key="14">教室管理</Menu.Item>
                <Menu.Item key="15">学生管理</Menu.Item>
        
            </SubMenu>
            <SubMenu
                key="sub5"
                title={
                <span>
                    <Icon type="notification" />
                    阅卷管理
                </span>
                }
            >
                <Menu.Item key="17">
                    <Link to="/home/papers/Awaiting"> 待批班级</Link>

                </Menu.Item>
                
            </SubMenu>
    </Menu>
    )
}
export default injectIntl(MenuComp)