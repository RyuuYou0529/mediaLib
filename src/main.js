import Vue from 'vue'
import {
  Layout,
  Icon,
  Menu,
  Row,
  Col,
  Button,
  Upload,
  message
} from 'ant-design-vue'
import App from './App'
// import router from './router'

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
Vue.prototype.$message = message

Vue.config.productionTip = false

new Vue({
  // router,
  render: h => h(App)
}).$mount('#app')
