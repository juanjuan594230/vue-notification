<template>
  <transition name="fade" @after-enter="afterEnter" @after-leave="afterLeave">
    <div class="notification"
        :style="styles"
        v-show="visible"
        @mouseenter="clearTimer"
        @mouseleave="createTimer">
      <span class="content">{{content}}</span>
      <a class="btn" @click="handleClose">{{btn}}</a>
    </div>
  </transition>

</template>

<script>
export default {
  name: 'Notification',
  props: {
    content: {
      type: String,
      required: true
    },
    btn: {
      type: String,
      default: "close"
    },
    autoClose: {
      type: Number,
      default: 3000
    }
  },
  data () {
    return {
      visible: false,
      verticalOffset: 0
    }
  },
  methods: {
    handleClose (e) {
      e.preventDefault();
      this.visible = false;
    },
    createTimer () {
      this.timer = setTimeout(() => {
        this.visible = false;
      }, this.autoClose)
    },
    clearTimer () {
      if (this.timer) {
        clearTimeout(this.timer);
      }
    },
    afterEnter () {
      this.height = this.$el.offsetHeight;
    },
    afterLeave () {
      this.$emit('close');
    }
  },
  computed: {
    // styles是需要根据verticalOffset属性值进行计算的
    styles () {
      return {
        position: "fixed",
        right: "20px",
        bottom: `${this.verticalOffset}px`,
        'z-index': 99
      }
    }
  },
  mounted () {
    this.createTimer();
  },
  beforeDestroy () {
    this.clearTimer();
  }
}
</script>

<style lang="scss">
  .notification{
    display: inline-flex;
    background: #303030;
    color: rgba(255, 255, 255, 1);
    align-items: center;
    padding: 20px;
    min-width: 280px;
    box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12);
    flex-wrap: wrap;
    transition: all .3s;
    .content {
      padding: 0;
    }
    .btn {
      color: #ff4081;
      padding-left: 24px;
      margin-left: auto;
    }
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>


