import Vue from 'vue'
import {
  Input,
  Radio,
  Checkbox,
  CheckboxGroup,
  Select,
  Option,
  Button,
  DatePicker,
  FormItem,
  Carousel,
  CarouselItem,
  Message,
  Popover,
  Dialog,
} from 'element-ui'
import 'element-ui/lib/theme-chalk/reset.css'
import 'element-ui/lib/theme-chalk/base.css'
import 'element-ui/lib/theme-chalk/main.css'
import 'element-ui/lib/theme-chalk/scrollbar.css'
import 'element-ui/lib/theme-chalk/form.css'
import 'element-ui/lib/theme-chalk/form-item.css'
import Form from './components/Form.vue'

Form.install = function install(vue) {
  vue.component(Form.name, Form)
}

Vue.use(Input)
Vue.use(Radio)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(Select)
Vue.use(Option)
Vue.use(Button)
Vue.use(DatePicker)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Popover)
Vue.use(Dialog)

Vue.prototype.$message = Message
