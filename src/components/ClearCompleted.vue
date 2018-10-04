<template>
  <a class="waves-effect waves-light btn" v-if="showClearCompletedButton" @click="clearCompleted">Clear Completed Themes</a>
</template>

<script>
export default {
  name: 'theme-clear-completed',
  props: {
    showClearCompletedButton: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    clearCompleted() {
      eventBus.$emit('clearCompletedTheme')
    }
  }
}
</script>