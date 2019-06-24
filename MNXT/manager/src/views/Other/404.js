import React from 'react';
import styles from './403.scss'
import { Button } from 'antd';
export default (props)=>{
  return <div className={styles.box}>
          <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1561279939871&di=caef9bedd93cf63d3e13aef12fd62236&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F010b9055e68e9b6ac7251df87cd730.png" alt=""/>
          <Button type="primary" className={styles.btn} onClick={()=>props.history.go(-1)}>返回上一页</Button>
        </div>
}
