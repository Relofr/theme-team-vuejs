<template>
  <div>
    <a class="waves-effect waves-light btn" 
      :class="{ active: filter == 'all' }" 
      @click="changeFilter('all')">
      All
    </a>

    <a class="waves-effect waves-light btn" 
      :class="{ active: filter == 'active' }" 
      @click="changeFilter('active')">
      Active
    </a>

    <a class="waves-effect waves-light btn" 
      :class="{ active: filter == 'completed' }" 
      @click="changeFilter('completed')">
      Completed
    </a>
  </div>
</template>

<script>
export default {
  name: 'theme-filter',
  computed: {
    filter() {
      return this.$store.state.filter
    }
  },
  methods: {
    changeFilter(filter) {
      this.$store.dispatch('updateFilter', filter)
    }
  }
}
</script>