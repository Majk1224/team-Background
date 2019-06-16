import React from 'react'
import {Menu,Icon} from 'antd'
import {Link} from 'dva/router';
const { SubMenu } = Menu;

function MenuComp(){
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
                   
                   试题管理
                </span>
                }
            >
                <Menu.Item key="1">
                    <Link to="/home/questions/add">添加试题</Link>
                </Menu.Item>
                <Menu.Item key="2">
                    <Link to="/home/questions/type">试题分类</Link>
                </Menu.Item>
                <Menu.Item key="3">
                    <Link to="/home/questions/view">查看试题</Link>  
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
                <Menu.Item key="5">添加用户</Menu.Item>
                <Menu.Item key="6">用户展示</Menu.Item>
            
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
                <Menu.Item key="9">添加考试</Menu.Item>
                <Menu.Item key="10">试卷列表</Menu.Item>
            
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
                <Menu.Item key="17">待批班级</Menu.Item>
                
            </SubMenu>
    </Menu>
    )
}
export default MenuComp