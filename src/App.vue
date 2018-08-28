<template>
  <div id="app">
    <div @click="addNotify">发起通知</div>
  </div>
</template>

<script>
export default {
  name: 'app',
  methods: {
    addNotify () {
      this.$notify({
        content: "hello notification"
      })
    }
  }
}
</script>

<style lang="scss">
</style>
