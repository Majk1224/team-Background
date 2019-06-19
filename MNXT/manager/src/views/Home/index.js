import style from './Home.scss';
import React from 'react';
import Menus from '../../components/Menu'
import { Route,Redirect,Switch } from 'dva/router';
import { Layout,Dropdown,Avatar,Menu} from 'antd';
import { QuestionsAdd,QuestionsType,QuestionsView,QuestionViewEdit,QuestionsDetail} from "./Questins";
import { AddUser,UserShow } from "./UserGuan";
import { AddExam ,ListExam,createNew,ExamDetail} from "./Exam";
import {Awaiting } from "./papers";

import {connect} from 'dva';
const { Header, Content, Sider } = Layout;



function Home(props){
      const menu = (
            <Menu>
                <Menu.Item>
                    <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
                    1st menu item
                    </a>
                </Menu.Item>
                <Menu.Item>
                    <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
                    2nd menu item
                    </a>
                </Menu.Item>
                <Menu.Item>
                    <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
                    3rd menu item
                    </a>
                </Menu.Item>
            </Menu>
        );
    return(
        <Layout className={style.Home}>
            <Header className={style.header}>
                <div className={style.header_img}>
                    <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1551624718911&di=4a7004f8d71bd8da84d4eadf1b59e689&imgtype=0&src=http%3A%2F%2Fimg105.job1001.com%2Fupload%2Falbum%2F2014-10-15%2F1413365052_95IE3msH.jpg" alt=""/>
                </div>
                <button onClick={()=>props.changeLocal(props.locale==='zh'?'en':'zh')}>{props.locale==='zh'?'中文':'英文'}</button>
                <div className={style.header_user}>
                    <Dropdown overlay={menu}>
                        <a className="ant-dropdown-link" href="">
                            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" className={style.Avatar}/>
                            <span className={style.user_name}>kkkkk</span>
                        </a>
                    </Dropdown>
                </div>
            </Header>
            <Layout>
                <Sider width={200} style={{ background: '#fff' }}>
                    <Menus/>
                </Sider>
                <Layout style={{ padding: '0 24px 24px' }}>
                    
                    <Content
                        style={{
                            // background: '#fff',
                            // padding: 24,
                            margin: 0,
                            minHeight: 280,
                        }}
                        >
                       <Switch>
                            <Route path="/home/questions/add" exact component={QuestionsAdd}></Route>
                            <Route path="/home/questions/type" component={QuestionsType}></Route>
                            <Route path="/home/questions/view" component={QuestionsView}></Route>
                            <Route path='/home/questions/Edit' component={QuestionViewEdit}></Route>
                            <Route path='/home/questions/Detail' component={QuestionsDetail}/>
                            <Route path='/home/userGuan/addUser' component={AddUser}/>
                            <Route path='/home/userGuan/UserShow' component={UserShow}/>
                            <Route path='/home/exam/addexam' component={AddExam}/>
                            <Route path='/home/exam/listExam' component={ListExam}/>
                            <Route path='/home/exam/edit' component={createNew}/>
                            <Route path='/home/exam/Detail' component={ExamDetail}/>
                            <Route path='/home/papers/Awaiting' component={Awaiting}/>
                            <Redirect from="/home" to="/home/questions/add"></Redirect>
                       </Switch>
                        
                    </Content>
                </Layout>
            </Layout>
        </Layout>
      
    )
}
const mapStateToProps = state=>{
    // console.log('state..', state);
    return {
    //   loading: state.loading.global,
      locale: state.global.locale
    }
  }
  
  const mapDispatchToProps = dispatch=>{
    return {
      changeLocal: payload=>{
        dispatch({
          type: 'global/changeLocale',
          payload
        })
      }
    }
  }
export default connect(mapStateToProps,mapDispatchToProps)(Home)