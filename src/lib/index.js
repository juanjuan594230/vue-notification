import notify from './notify.js';

export default {
  install (Vue) {
    Vue.prototype.$notify = notify;
  }
}

