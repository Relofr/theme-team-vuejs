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

<style lang='scss' scoped>
[type="checkbox"]:checked+span:not(.lever):before {
    top: -4px;
    left: -5px;
    width: 12px;
    height: 22px;
    border-top: 2px solid transparent;
    border-left: 2px solid transparent;
    border-right: 2px solid #4682b4 !important;
    border-bottom: 2px solid #4682b4 !important;
    -webkit-transform: rotate(40deg);
    transform: rotate(40deg);
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    -webkit-transform-origin: 100% 100%;
    transform-origin: 100% 100%;
}

[type="checkbox"].filled-in:checked+span:not(.lever):before {
    top: 0;
    left: 1px;
    width: 8px;
    height: 13px;
    border-top: 2px solid transparent;
    border-left: 2px solid transparent;
    border-right: 2px solid #fff !important;
    border-bottom: 2px solid #fff !important;
    -webkit-transform: rotateZ(37deg);
    transform: rotateZ(37deg);
    -webkit-transform-origin: 100% 100%;
    transform-origin: 100% 100%;
}

[type="checkbox"].filled-in:checked+span:not(.lever):after {
    top: 0;
    width: 20px;
    height: 20px;
    border: 2px solid #4682b4 !important;
    background-color: #4682b4 !important;
    z-index: 0;
}
</style>