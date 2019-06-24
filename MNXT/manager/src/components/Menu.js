import React from 'react'
import {Menu,Icon} from 'antd'
import {Link} from 'dva/router';
import {injectIntl} from 'react-intl'
import {connect} from 'dva';

const { SubMenu } = Menu;

function MenuComp(props){
    return (
        <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            defaultOpenKeys={['router.questions']}
            style={{ height: '100%', borderRight: 0 }}
        >
            {props.myView.map((item, index)=>{
                return <SubMenu key={item.name} title={
                    <span>
                    <Icon type="user" />
                        {props.intl.formatMessage({id: item.name})}
                    </span>
                }>{
                    item.children.map((value, key)=>{
                        
                    return value.name?<Menu.Item key={value.id}>
                            {
                                <Link to={value.path}> {props.intl.formatMessage({id:value.name})}</Link>
                            }
                        </Menu.Item>:null
                    })
                }
                </SubMenu>
    })}
    </Menu>
    )
}
const mapStateToProps = state=>{
    return {
      myView: state.user.myView
    }
  }
export default injectIntl(connect(mapStateToProps)(MenuComp));