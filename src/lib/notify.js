import Notification from './notification.vue'
import Vue from 'vue';

const NotificationConstructor = Vue.extend(Notification);
const instances = [];
let seed = 1;

const remove = (instance) => {
  if (!instance) {
    return;
  }
  const index = instances.findIndex((item) => {
    return item.id === instance.id;
  })
  instances.splice(index, 1);

  const len = instances.length;
  if (len <= 0) {
    return;
  }
  const removeHeight = instance.vm.height;
  for (let i = index; i < len; i++) {
    instances[i].verticalOffset = parseInt(instances[i].verticalOffset - removeHeight - 16);
  }
}

const destory = (instance) => {
  remove(instance);
  document.body.removeChild(instance.vm.$el);
  instance.vm.$destroy();
}

export default (options) => {
  const {autoClose, style, ...rest} = options;
  const instance = new NotificationConstructor({
    propsData: {
      ...options
    }
  });
  const id = `notification_${seed++}`;
  instance.id = id;

  instance.vm = instance.$mount();
  document.body.appendChild(instance.vm.$el);
  instance.vm.visible = true;

  let verticalOffset = 0;
  instances.forEach((item) => {
    verticalOffset += item.vm.$el.offsetHeight + 16;
  });
  verticalOffset += 16;
  instance.verticalOffset = verticalOffset;
  instances.push(instance);
  // 监听关闭事件
  instance.vm.$on('close', () => {
    destory(instance);
  })
  return instance.vm;
}
