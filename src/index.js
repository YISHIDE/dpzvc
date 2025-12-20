/**
 * Created by admin on 2025/12/15.
 */

/* ========= 组件引入（保持你原有结构） ========= */

import VButton from './components/button'
import CheckBox from './components/checkBox'
import Header from './components/Header'
import Message from './components/message'
import Modal from './components/modal'
import Picker from './components/picker'
import Radio from './components/radioBox'
import Swipe from './components/swipe'
import Tab from './components/tab'
import Prompt from './components/prompt'
import SlideBar from './components/slideBar'
import TextBar from './components/Text'
import Upload from './components/upload'
import ActionSheet from './components/action-sheet'
import SwitchBar from './components/switchbar'
import Rater from './components/rater'
import Spinner from './components/spinner'
import LoadMore from './components/loadMore'
import Popup from './components/popup'
import Indicator from './components/Indicator'
import Progress from './components/progress'
import ToTop from './components/toTop'
import Cell from './components/cell'
import CellSwipe from './components/cell-swipe'
import Badge from './components/badge'
import Card from './components/card'

/* ========= 组件集合（用于全量注册） ========= */

const components = {
  VButton,
  CheckBox,
  CheckBoxGroup: CheckBox.group,
  Radio,
  RadioGroup: Radio.group,
  DpHeader: Header,
  Picker,
  Swipe,
  Tab,
  SlideBar,
  TextBar,
  Number: TextBar.Number,
  Upload,
  ActionSheet,
  SwitchBar,
  Rater,
  Spinner,
  LoadMore,
  Popup,
  DpProgress: Progress,
  ToTop,
  Cell,
  CellSwipe,
  Badge,
  Card
}

/* ========= 服务组件 ========= */

const services = {
  Message,
  Modal,
  Prompt,
  Indicator
}

/* ========= 给“单个组件”补 install（关键） ========= */

Object.keys(components).forEach(key => {
  const component = components[key]
  if (!component.install) {
    component.install = function (Vue) {
      Vue.component(key, component)
    }
  }
})

Object.keys(services).forEach(key => {
  const service = services[key]
  if (!service.install) {
    service.install = function (Vue) {
      Vue.prototype[`$${key}`] = service
    }
  }
})

/* ========= 全量 install ========= */

const install = function (Vue) {
  if (install.installed) return
  install.installed = true

  // 注册组件
  Object.keys(components).forEach(key => {
    Vue.component(key, components[key])
  })

  // 注册服务
  Object.keys(services).forEach(key => {
    Vue.prototype[`$${key}`] = services[key]
  })
}

/* ========= 自动安装（script 方式） ========= */

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

/* ========= 按需导出 + 默认导出 ========= */

export {
  VButton,
  CheckBox,
  Header,
  Message,
  Modal,
  Prompt,
  Picker,
  Radio,
  Swipe,
  Tab,
  SlideBar,
  TextBar,
  Upload,
  ActionSheet,
  SwitchBar,
  Rater,
  Spinner,
  LoadMore,
  Popup,
  Indicator,
  Progress,
  ToTop,
  Cell,
  CellSwipe,
  Badge,
  Card
}

export default {
  install
}