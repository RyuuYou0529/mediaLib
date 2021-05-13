import Vue from 'vue'
import {
  Layout,
  Icon,
  Menu,
  Row,
  Col,
  Button,
  Upload,
  Card,
  message
} from 'ant-design-vue'
import App from './App'
import axios from 'axios'
import VueAxios from 'vue-axios'
// import router from './router'

Vue.use(VueAxios, axios)

Vue.component(Layout.name, Layout)
Vue.component(Layout.Header.name, Layout.Header)
Vue.component(Layout.Content.name, Layout.Content)
Vue.component(Layout.Footer.name, Layout.Footer)
Vue.component(Layout.Sider.name, Layout.Sider)
Vue.component(Icon.name, Icon)
Vue.component(Menu.name, Menu)
Vue.component(Menu.Item.name, Menu.Item)
Vue.component(Row.name, Row)
Vue.component(Col.name, Col)
Vue.component(Button.name, Button)
Vue.component(Upload.name, Upload)
Vue.component(Card.Meta.name, Card.Meta)
Vue.component(Card.name, Card)
Vue.prototype.$message = message

Vue.config.productionTip = false

new Vue({
  // router,
  render: h => h(App)
}).$mount('#app')
