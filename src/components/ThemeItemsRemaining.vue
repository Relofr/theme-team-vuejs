<template>
  <div>{{ remaining }} items left</div>
</template>

<script>
export default {
  name: 'theme-remaining',
  props: {
    remaining: {
      type: Number,
      required: true
    }
  }
}
</script>