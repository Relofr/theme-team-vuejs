<template>
  <div>
    <form>
      <label>
        <input type="checkbox" class="filled-in" :checked="!anyRemaining" @change="allChecked" />
        <span>Select All</span>
      </label>
    </form>
  </div>
</template>

<script>
export default {
  name: 'theme-check-all',
  props: {
    anyRemaining: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    allChecked() {
      eventBus.$emit('checkAllChanged', this.anyRemaining)
    }
  }
}
</script>