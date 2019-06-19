import React, { Component } from 'react'

import { Table, Button, Modal, Input, Breadcrumb, Select, Divider, Tag } from 'antd';

const { Option } = Select;
const { Column, ColumnGroup } = Table;
function handleChange(value) {
    console.log(`selected ${value}`);
}

class ClassManage extends Component {
    constructor() {
        super()
        this.state = {
            visible: false,
            //   typeData: []
        }
    }
    showModal = () => {
        this.setState({
            visible: true
        })
    }

    handleOk = e => {
        this.setState({
            visible: false
        })
    }
    handleCancel = e => {

        this.setState({
            visible: false
        })
    }

    render() {
        const data = [
            {
                key: '1',
                firstName: 'John',
                lastName: 'Brown',
                address: 'New York No. 1 Lake Park',
                tags:''
            },
            {
                key: '2',
                firstName: 'Jim',
                lastName: 'Green',
                address: 'London No. 1 Lake Park',
                tags: ''
            },
            {
                key: '3',
                firstName: 'Joe',
                lastName: 'Black',
                address: 'Sidney No. 1 Lake Park',
                tags: ''
            },
        ];
        return (
            <div>
                <h2>班级管理</h2>
                <Button type="primary" onClick={this.showModal}>添加班级</Button>

                <Modal
                    title="添加班级"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    添加班级：<Input placeholder="添加班级" />
                    教师号： <br />  <Select defaultValue="请选择教师号" style={{ width: 470 }} onChange={handleChange}>
                        <Option value="jack">Jack</Option>
                    </Select>
                    课程名： <br />  <Select defaultValue="请选择课程名" style={{ width: 470 }} onChange={handleChange}>
                        <Option value="jack">Jack</Option>
                    </Select>
                </Modal>
                <Table dataSource={data}>

                    <Column title="班级名" dataIndex="lastName" key="lastName" />


                    <Column title="课程名" dataIndex="address" key="address" />
                    <Column
                        title="教师号"
                        dataIndex="tags"
                        key="tags"
                        render={tags => (
                            <span>     
                            
                            </span>
                        )}
                    />
                    <Column
                        title="Action"
                        key="action"
                        render={() => (
                            <span>
                                <a href="javascript:;">修改</a>
                                <a href="javascript:;">删除</a>
                            </span>
                        )}
                    />
                </Table>,
            </div>
        )
    }
}
export default ClassManage