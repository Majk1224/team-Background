import React from 'react';
import Home from './views/Home'
import {connect} from 'dva'

import {Router, Route, Switch,Redirect} from 'dva/router';

import Login from './views/login/login';
import {forbidden,notFont} from './views/Other'
//引入国际化
import {IntlProvider, addLocaleData} from 'react-intl';
import en from 'react-intl/locale-data/en';
import zh from 'react-intl/locale-data/zh';
import zhCN from './lang/zh-CN';
import enUS from './lang/en-Us';
const localMap = {
  en: enUS,
  zh: zhCN
}
addLocaleData([...en, ...zh]);
const mapStateToProps = state=>{
  return {
    locale: state.global.locale
  }
}
const RouterView = connect(mapStateToProps)(({locale,history})=>{
  return <IntlProvider locale={locale} messages={localMap[locale]}>
            <Router history={history}>
              <Switch>
                  <Route path="/login" component={Login} />
                  <Route path='/403' component={forbidden}/>
                  <Route path='/404' component={notFont}/>
                  <Route path="/"  component={Home}></Route>
              </Switch>
            </Router>
        </IntlProvider>
})
function RouterConfig({ history }) {
  return (
      <RouterView history={history}></RouterView>
  );
}

export default RouterConfig;
