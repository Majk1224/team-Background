import React, { useState, useEffect } from "react";
import { Tabs, Input, Select, Button } from "antd";
import { connect } from "dva";
import styles from './AddUser.scss'

function UserShow(props) {

    const { TabPane } = Tabs;
    const { Option } = Select;
    // 输入框的key
    function callback(key) {
        console.log(key);
    }

    // select的value
    function handleChange(value) {
        console.log(`selected ${value}`);
    }

    return (
        <div className={styles.wrap}>
            <div className={styles.section}>
                <Tabs className={styles.type} onChange={callback} type="card">
                    <TabPane tab="添加用户" key="1">

                        <Input placeholder="请输入用户名" />
                        <Input placeholder="请输入密码" />

                        <Select defaultValue="出题者" style={{ width: 180 }} onChange={handleChange}>
                            <Option value="Yiminghe">null</Option>
                        </Select>
                        <div>
                            <Button type="primary">确定</Button>
                            <Button>重置</Button>
                        </div>

                    </TabPane>
                    <TabPane tab="更新用户" key="2">

                        <Select defaultValue="出题者" style={{ width: 180 }} onChange={handleChange}>
                            <Option value="Yiminghe">null</Option>
                        </Select>

                        <Input placeholder="请输入用户名" />
                        <Input placeholder="请输入密码" />

                        <Select defaultValue="出题者" style={{ width: 180 }} onChange={handleChange}>
                            <Option value="Yiminghe">null</Option>
                        </Select>
                        <div>
                            <Button type="primary">确定</Button>

                        </div>

                    </TabPane>
                </Tabs>
            </div>

            <div className={styles.section}>
                <Button>添加身份</Button>
                <Input placeholder="请输入身份名称" />
                <div>
                    <Button type="primary">确定</Button>
                    <Button>重置</Button>
                </div>
            </div>

            <div className={styles.section}>
                <Button>添加api接口</Button>
                <Input placeholder="请输入api接口权限名称" />
                <Input placeholder="请输入api接口权限Url" />
                <Input placeholder="请输入api接口权限方法" />
                <div>
                    <Button type="primary">确定</Button>
                    <Button>重置</Button>
                </div>
            </div>

            <div className={styles.section}>
                <Button>添加视图接口权限</Button>
                <div>
                    <Select defaultValue="选择已有视图" style={{ width: 180 }} onChange={handleChange}>
                        <Option value="Yiminghe">null</Option>
                    </Select>
                </div>
                <div>
                    <Button type="primary">确定</Button>
                    <Button>重置</Button>
                </div>
            </div>

            <div className={styles.section}>
                <Button>给身份设置api接口权限</Button>
                <div>
                    <Select defaultValue="请选择身份id" style={{ width: 230 }} onChange={handleChange}>
                        <Option value="Yiminghe">null</Option>
                    </Select>
                </div>

                <div>
                    <Select defaultValue="请选择api接口权限id" style={{ width: 230 }} onChange={handleChange}>
                        <Option value="Yiminghe">null</Option>
                    </Select>
                </div>
                <div>
                    <Button type="primary">确定</Button>
                    <Button>重置</Button>
                </div>
            </div>

                        <div className={styles.section}>
                <Button>给身份设置视图权限</Button>
                <div>
                    <Select defaultValue="请选择身份id" style={{ width: 230 }} onChange={handleChange}>
                        <Option value="Yiminghe">null</Option>
                    </Select>
                </div>

                <div>
                    <Select defaultValue="请选择视图接口权限id" style={{ width: 230 }} onChange={handleChange}>
                        <Option value="Yiminghe">null</Option>
                    </Select>
                </div>
                <div>
                    <Button type="primary">确定</Button>
                    <Button>重置</Button>
                </div>
            </div>



        </div>


    );
}



export default UserShow;
