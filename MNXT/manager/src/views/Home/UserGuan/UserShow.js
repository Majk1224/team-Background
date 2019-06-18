import React, { useState, useEffect } from "react";
import { Layout, Breadcrumb, Card, Table } from "antd";
import { connect } from "dva";

function UserShow(props) {
  const [key, updataKey] = useState("tab1");
 
  const tabList = [
    {
      key: "tab1",
      tab: "用户数据"
    },
    {
      key: "tab2",
      tab: "身份数据"
    },
    {
      key: "tab3",
      tab: "api接口权限"
    },
    {
      key: "tab4",
      tab: "身份和api接口关系"
    },
    {
      key: "tab5",
      tab: "视图接口权限"
    },
    {
      key: "tab6",
      tab: "身份和视图权限关系"
    }
  ];

  useEffect(() => {
    props.usersShow();
    props.userIdentity();
    props.apiAuthority();
    props.identApiAuthor();
    props.viewAuthor();
    props.viewRelate();
  }, []);
 
 
  const contentList = {
    tab1: (
      <div>
        <h2>用户数据</h2>
        <Table
          columns={[
            {
              title: "用户名",
              key:"name",
              render: text => <>{text.user_name}</>
            },
            {
              title: "密码",
              key:"pwd",
              render: text => <>{text.user_pwd}</>
            },
            {
              title: "身份",
              key:"text",
              render: text => <>{text.identity_text}</>
            }
          ]}
          dataSource={props.userAll}
          rowKey={record => `${record.user_id}`}
        />
      </div>
    ),
    tab2: (
      <div>
        <h2>身份数据</h2>
        <Table
          columns={[
            {
              title: "身份名称",
              key:"identTexts",
              render: text => <>{text.identity_text}</>
            }
          ]}
          dataSource={props.identity}
          rowKey={record => `${record.identity_id}`}
        />
      </div>
    ),
    tab3: (
      <div>
        <h2>api接口权限</h2>
        <Table
          columns={[
            {
              title: "api权限名称",
              key:"apiText",
              render: text => <>{text.api_authority_text}</>
            },
            {
              title: "api权限url",
              key:"apiUrl",
              render: text => <>{text.api_authority_url}</>
            },{
              title: "api权限方法",
              key:"apiMrthod",
              render: text => <>{text.api_authority_method}</>
            }
          ]}
          dataSource={props.apiAuthorityAll}
          rowKey={record => `${record.api_authority_id}`}
        />
      </div>
    ),
    tab4:(
      <div>
        <h2>身份和api接口关系</h2>
        <Table
          columns={[
            {
              title: "身份名称",
              key:"textIdent",
              render: text => <>{text.identity_text}</>
            },{
              title: "api权限名称",
              key:"textAuth",
              render: text => <>{text.api_authority_text}</>
            },{
              title: "api权限url",
              key:"textUrl",
              render: text => <>{text.api_authority_url}</>
            },{
              title: "api权限方法",
              key:"textMethod",
              render: text => <>{text.api_authority_method}</>
            }
          ]}
          dataSource={props.identApiAuthorAll}
          rowKey={record => `${record.identity_api_authority_relation_id}`}
        />
      </div>
    ),
    tab5:(
      <div>
        <h2>视图接口权限</h2>
        <Table
          columns={[
            {
              title: "视图权限名称",
              key:"viewText",
              render: text => <>{text.view_authority_text}</>
            },
            {
              title: "视图id",
              key:"viewId",
              render: text => <>{text.view_id}</>
            }
          ]}
          dataSource={props.viewAuthorsAll}
          rowKey={record => `${record.view_authority_id}`}
        />
      </div>
    ),
    tab6: (
      <div>
        <h2>身份和视图权限关系</h2>
        <Table
          columns={[
            {
              title: "身份",
              key:"identText",
              render: text => <>{text.identity_text}</>
            },
            {
              title: "视图名称",
              key:"viewAuther",
              render: text => <>{text.view_authority_text}</>
            },
            {
              title: "视图id",
              key:"textView",
              render: text => <>{text.view_id}</>
            }
          ]}
          dataSource={props.viewRelatesALL}
          rowKey={record => `${record.identity_view_authority_relation_id}`}
        />
      </div>
    )
  };


  const onTabChange = key => {
    updataKey(key);
  };

  return (
    <Layout>
      <Layout>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>
              <h2>用户展示</h2>

              <Card
                style={{ width: "100%" }}
                tabList={tabList}
                activeTabKey={key}
                onTabChange={key => {
                  onTabChange(key);
                }}
              >
                {contentList[key]}
              </Card>
            </Breadcrumb.Item>
          </Breadcrumb>
        </Layout>
      </Layout>
    </Layout>
  );
}

const mapStateToProps = state => {
  return state.users;
};

const mapDispatchToProps = dispatch => {
  return {
    //用户数据
    usersShow() {
      dispatch({
        type: "users/showUser"
      });
    },
    //身份数据
    userIdentity() {
      dispatch({
        type: "users/identity"
      });
    },
    apiAuthority() {
      dispatch({
        type: "users/apiAuthority"
      });
    },
    identApiAuthor() {
      dispatch({
        type: "users/identApiAuthor"
      });
    },
    viewAuthor() {
      dispatch({
        type: "users/viewAuthor"
      });
    },
    viewRelate() {
      dispatch({
        type: "users/viewRelate"
      });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserShow);
