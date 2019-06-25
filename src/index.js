import Vue from 'vue';
import App from "./App.vue";
import router from './router';
import store from './store'
import axios from 'axios';
import moment from 'moment';

Vue.prototype.$moment = moment;
moment.locale('zh-cn');

Vue.prototype.$http= axios.create({
  baseURL: 'http://47.111.115.126/api/'
});

import {Tabbar, TabbarItem,Pagination, Field, Button,Popup, Cell, CellGroup,Row, Col,NavBar,Icon,
Image,Tab,Tabs,Uploader,ActionSheet,Picker,Collapse,CollapseItem} from 'vant';
Vue.use(Tabbar).use(TabbarItem).use(Pagination).use(Field).use(Button).use(Popup).use(Cell).use(CellGroup)
.use(Row).use(Col).use(NavBar).use(Icon).use(Image).use(Tab).use(Tabs).use(Uploader).use(ActionSheet)
.use(Picker).use(Collapse).use(CollapseItem);


new Vue({
  el: "#app",
  render: h => h(App),
  router,
  store,
});
