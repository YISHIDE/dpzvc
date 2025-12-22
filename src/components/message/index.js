/**
 * Created by admin on 2017/5/8.
 */

import MessageGroup from './confirm'
import { randomStr } from '../../utils/util'
let defualtDuration = 1
// const key = 1
let top = '0'

let MGInstance

let seed = 1

const time = Date.now()

function getName () {
  return 'dpzvc-message-group_' + time + '_' + (seed++) + '_' + randomStr()
}

const getNewInstance = function () {
  MGInstance = MGInstance || MessageGroup.newInstance({

    styles: {
      top,
      right: '0'
    }

  })

  return MGInstance
}

function message (props) {
  const [
    text,
    name,
    duration,
    showLeft,
    rightHide,
    loading,
    onClose,
    styles,
    type,
    position] =

     [
       props.text || '',
       props.name || getName(),
       (props.duration === 0) ? 0 : props.duration || defualtDuration,
       props.showLeft || false,
       props.rightHide || true,
       props.loading || false,
       props.onClose || function () {},
       props.styles || {},
       props.type || 'normal',
       props.position || 'center']

  const instance = getNewInstance()

  instance.add({
    name,
    text,
    duration,
    showLeft,
    rightHide,
    loading,
    onClose,
    styles,
    type,
    position
  })

  return (function () {
    const target = name

    return function () {
      instance.remove(`${target}`)
    }
  })()
}

export default {

  show (options) {
    return message(options)
  },

  error (options) {
    options.type = 'error'
    return message(options)
  },

  success (options) {
    options.type = 'success'
    return message(options)
  },
  loading (options) {
    options.type = 'loading'
    options.duration = 0
    options.showLeft = true
    return message(options)
  },
  config (options) {
    if (options.top) {
      top = options.top
    }

    if (options.duration) {
      defualtDuration = options.duration
    }
  },
  destroy () {
    if (!MGInstance) return false
    MGInstance = getNewInstance()
    MGInstance.destroy()
  }
}
