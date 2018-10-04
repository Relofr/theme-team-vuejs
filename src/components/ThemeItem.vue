<template>
  <div class="theme-item">
    <div class="theme-item-left">
      <input type="checkbox" v-model="completed" @change="doneEdit">
        <form>
          <label>
            <input type="checkbox" class="filled-in" checked="checked" v-model="completed" @change="doneEdit"/>
            <span></span>
          </label>
        </form>
      <div v-if="!editing" @dblclick="editTheme" class="theme-item-label">{{ title }}</div>
      <input v-else class="theme-item-edit" type="text" v-model="title" @blur="doneEdit" @keyup.enter="doneEdit" @keyup.esc="cancelEdit" v-focus>
    </div>
    
    <div @click="removeTheme(theme.id)">
      <img src="../assets/delete.svg" class="delete-icon">
    </div>
  </div>
</template>

<script>
export default {
  name: 'theme-item',
  props: {
    theme: {
      type: Object,
      required: true,
    },
    checkAll: {
      type: Boolean,
      required: true,
    }
  },
  data() {
    return {
      'id': this.theme.id,
      'title': this.theme.title,
      'completed': this.theme.completed,
      'editing': this.theme.editing,
      'beforeEditCache': '',
    }
  },
  watch: {
    checkAll() {
      this.completed = this.checkAll ? true : this.theme.completed
    }
  },
  directives: {
    focus: {
      inserted: function (el) {
        el.focus()
      }
    }
  },
  methods: {
    removeTheme(id) {
      this.$store.dispatch('deleteTheme', id)
    },
    editTheme() {
      this.beforeEditCache = this.title
      this.editing = true
    },
    doneEdit() {
      if (this.title.trim() == '') {
        this.title = this.beforeEditCache
      }
      this.editing = false
      this.$store.dispatch('updateTheme', {
        'id': this.id,
        'title': this.title,
        'completed': this.completed,
        'editing': this.editing
      })
    },
    cancelEdit() {
      this.title = this.beforeEditCache
      this.editing = false
    },
  }
}
</script>

<style lang='scss'>

.remove-item {
  cursor: pointer;
  margin-left: 14px;
  display: block;
}

[type="checkbox"]:checked+span:not(.lever):before {
    top: -4px;
    left: -5px;
    width: 12px;
    height: 22px;
    border-top: 2px solid transparent;
    border-left: 2px solid transparent;
    border-right: 2px solid #70B04A !important;
    border-bottom: 2px solid #70B04A !important;
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
    border-right: 2px solid #70B04A !important;
    border-bottom: 2px solid #70B04A !important;
    -webkit-transform: rotateZ(37deg);
    transform: rotateZ(37deg);
    -webkit-transform-origin: 100% 100%;
    transform-origin: 100% 100%;
}

[type="checkbox"].filled-in:checked+span:not(.lever):after {
    top: 0;
    width: 20px;
    height: 20px;
    border: 2px solid #fff !important;
    background-color: #fff !important;
    z-index: 0;
}
</style>