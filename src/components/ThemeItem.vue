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
    
    <div class="remove-item" @click="removeTheme(theme.id)">
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
