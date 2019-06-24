import React from 'react';
import styles from './403.scss'
import { Button } from 'antd';
export default (props)=>{
  return <div className={styles.box}>
          <img src="http://s6.sinaimg.cn/bmiddle/003Qfs1Xgy6JxwDVpf775&690" alt=""/>
          <Button type="primary" className={styles.btn} onClick={()=>props.history.go(-1)}>返回上一页</Button>
        </div>
}
