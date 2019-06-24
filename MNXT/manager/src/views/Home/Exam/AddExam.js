import React,{useState,useEffect} from 'react'
import {connect} from 'dva'
import { Form,Breadcrumb,Input,Select,DatePicker,InputNumber,Button } from 'antd'

import './AddExam.scss'
const { Option } = Select;
function AddExam(props) {
    const { getFieldDecorator } = props.form;
    const {examType,Subject} = props
    useEffect(()=>{
        props.getType()
        props.getSubjectType()
    },[])
    let [startValue,newStart] = useState(null)
    let [endValue,newEnd] = useState(null)
    let [endOpen,newOpen] = useState(false)
    let disabledStartDate = startValue => {
        if (!startValue || !endValue) {
          return false;
        }
        return startValue.valueOf() > endValue.valueOf();
      };
    
      let disabledEndDate = endValue => {
        if (!endValue || !startValue) {
          return false;
        }
        return endValue.valueOf() <= startValue.valueOf();
      };
    
      let onChange = (field, value) => {
        //   console.log(field)
        //   console.log(value)
          field === 'startValue'? newStart(value):newEnd(value)
      };
    
      let onStartChange = value => {
        onChange('startValue', value);
      };
    
      let onEndChange = value => {
        onChange('endValue', value);
      };
    
      let handleStartOpenChange = open => {
        if (!open) {
          newOpen(true)
        }
      };
    
      let handleEndOpenChange = open => {
       newOpen(open)
      };

      function validatePrimeNumber(number) {
        if (number >=3&&number<=10) {
          return {
            validateStatus: 'success',
            errorMsg: null,
          };
        }
        return {
          validateStatus: 'error',
          errorMsg: 'The prime between 3 and 10 is 11!',
        };
      }
      const formItemLayout = {
        labelCol: { span: 3 },
        wrapperCol: { span: 10 },
      };
      const [number,newNumber] = useState(11)
     let handleNumberChange = value => {
        newNumber({...validatePrimeNumber(value),
            value,})
          }
          //获取添加的值
    let handleSubmit = e => {
        e.preventDefault();
        props.form.validateFields((err, values) => {
            if (!err) {
            console.log(values);
            props.createItem({
                subject_id:values.examTest,
                exam_id:values.examType,
                title:values.text,
                number:values.count,
                start_time:values.startTime._d.toLocaleString(),
                end_time: values.endTime._d.toLocaleString()
            })
            let addItem = localStorage.setItem('exam',JSON.stringify({
                subject_id:values.examTest,
                exam_id:values.examType,
                title:values.text,
                number:values.count,
                start_time:values.startTime._d.toLocaleString(),
                end_time: values.endTime._d.toLocaleString()
            }))
            
            props.history.replace('/exam/edit')
            }
        });
    }
    return <div>
        <Breadcrumb style={{ margin: '16px 0',fontSize:22 }}>
          <Breadcrumb.Item>添加考试</Breadcrumb.Item>
        </Breadcrumb> 
        <div className="wrap">
            <Form onSubmit={handleSubmit}>
                <Form.Item label="试卷名称">
                    {getFieldDecorator('text', {
                        rules: [{
                            required: true,
                            message: '请输入试卷名称!',
                        },], initialValue: ''
                    })(<Input style={{ width: 300 }}/>)}
                </Form.Item>
                <Form.Item label="选择考试类型">
                    {getFieldDecorator('examType', {
                        rules: [{
                            required: true,
                            message: '请选择考试类型!',},
                        ],initialValue: ''
                    })(
                        <Select style={{ width: 120 }}>
                            {
                                examType?examType.map(item=>(
                                    <Option setfieldsvalue ={item.exam_name}
                                    key={item.exam_id}>{item.exam_name}</Option>
                                )):null
                            }
                            
                        </Select>
                    )}
                </Form.Item>
                <Form.Item label="选择课程">
                    {getFieldDecorator('examTest', {rules: [{required: true,message: '请选择课程!',},],
                     initialValue: ''
                    })(
                        <Select style={{ width: 120 }}>
                            {
                                Subject?Subject.map(item=>(
                                    <Option key={item.subject_id}
                                    setfieldsvalue ={item.subject_text}>{item.subject_text}</Option>
                                )):null
                            }
                            
                        </Select>
                    )}
                </Form.Item>
                <Form.Item label="题目数量"
                    {...formItemLayout}
                    validateStatus={number.validateStatus}
                    help={number.errorMsg }
                    >
                        {getFieldDecorator('count', {
                        rules: [{
                            required: true,
                            message: '请输入数量',},
                        ], initialValue: ''
                    })(
                        <InputNumber min={3} max={10} setfieldsvalue ={number} onChange={handleNumberChange} />
                    )}
                   
                </Form.Item>
                <Form.Item label="考试时间">
                {getFieldDecorator('startTime', {
                        rules: [{
                            required: true,
                            message: '请选择日期',},
                        ], initialValue: startValue
                    })(
                        <DatePicker
                        disabledDate={disabledStartDate}
                        showTime
                        format="YYYY-MM-DD HH:mm:ss"
                        setFieldsvalue={startValue}
                        placeholder="开始时间"
                        onChange={onStartChange}
                        onOpenChange={handleStartOpenChange}
                      />
                    )}-
                {getFieldDecorator('endTime', {
                    rules: [{
                        required: true,
                        message: '请选择日期',},
                    ], initialValue: endValue
                })(
                    <DatePicker
                    disabledDate={disabledEndDate}
                    showTime
                    format="YYYY-MM-DD HH:mm:ss"
                    setFieldsvalue={endValue}
                    placeholder="结束时间"
                    onChange={onEndChange}
                    open={endOpen}
                    onOpenChange={handleEndOpenChange}
                    />
                )}
                </Form.Item>
                <Button type="primary" htmlType="submit">创建试卷</Button>
            </Form>
        </div>
    </div>
}
const mapState = state => {
    // console.log(state.exammanage)
    return state.exammanage
}
const mapDispatch = dispatch => {
    return {
        getType() {
           dispatch({
               type:'exammanage/examType'
           })
        },
        getSubjectType() {
            dispatch({
                type:'exammanage/getSubject'
            })
        },
        //创建试卷
        createItem(payload) {
            dispatch({
                type:'exammanage/createItem',
                payload
            })
        }
    }
}
export default connect(mapState,mapDispatch)(Form.create()(AddExam))