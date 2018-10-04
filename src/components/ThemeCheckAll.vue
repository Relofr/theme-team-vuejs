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
  computed: {
    anyRemaining() {
      return this.$store.getters.anyRemaining
    }
  },
  methods: {
    allChecked() {
      this.$store.dispatch('checkAll', event.target.checked)
    }
  }
}
</script>