<template>
  <a class="waves-effect waves-light btn" v-if="showClearCompletedButton" @click="clearCompleted">Clear Completed Themes</a>
</template>

<script>
export default {
  name: 'theme-clear-completed',
  computed: {
    showClearCompletedButton() {
      return this.$store.getters.showClearCompletedButton
    }
  },
  methods: {
    clearCompleted() {
      this.$store.dispatch('clearCompleted')
    }
  }
}
</script>