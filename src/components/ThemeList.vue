<template>
  <div>
    <input type="text" class="theme-input" placeholder="Add a theme" v-model="newTheme" @keyup.enter="addTheme">
    <transition-group name="fade" enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">
    <div v-for="(theme, index) in themesFiltered" :key="theme.id" class="theme-item" :class="{ completed : theme.completed }">
      <div class="theme-item-left">
        <input type="checkbox" v-model="theme.completed">
          <form>
              <label>
                <input id="indeterminate-checkbox" type="checkbox" v-model="theme.completed" />
                <span></span>
              </label>
          </form>
        <div v-if="!theme.editing" @dblclick="editTheme(theme)" class="theme-item-label">{{ theme.title }}</div>
        <input v-else class="theme-item-edit" type="text" v-model="theme.title" @blur="doneEdit(theme)" @keyup.enter="doneEdit(theme)" @keyup.esc="cancelEdit(theme)" v-focus>
      </div>
      <div class="remove-item" @click="removeTheme(index)">
        <img src="../assets/delete.svg" class="delete-icon">
      </div>
    </div>
    </transition-group>
    <div class="extra-container">
      <div>
        <form>
          <label>
            <input id="indeterminate-checkbox" type="checkbox" :checked="!anyRemaining" @change="checkAllThemes" />
            <span>Select All</span>
          </label>
        </form>
      </div>
      <div>{{ remaining }} items left</div>
    </div>

    <div class="extra-container buttons">
      <div>
        <a class="waves-effect waves-light btn" :class="{ active: filter == 'all' }" @click="filter = 'all'">All</a>
        <a class="waves-effect waves-light btn" :class="{ active: filter == 'active' }" @click="filter = 'active'">Active</a>
        <a class="waves-effect waves-light btn" :class="{ active: filter == 'completed' }" @click="filter = 'completed'">Completed</a>
      </div>

      <div>
        <transition name="fade">
        <a class="waves-effect waves-light btn" v-if="showClearCompletedButton" @click="clearCompleted">Clear Completed</a>
        </transition>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'theme-list',
  data () {
    return {
      newTheme: '',
      idForTheme: 3,
      beforeEditCache: '',
      filter: 'all',
      themes: [
        {
          'id': 1,
          'title': 'Theme Team 1',
          'heroes': 'Pudge, Invoker, Shadowfiend, Riki',
          'completed': false,
          'editing': false,
        },
        {
          'id': 2,
          'title': 'Theme Team 2',
          'heroes': 'Pudge, Invoker, Shadowfiend, Riki',
          'completed': false,
          'editing': false,
        },
        {
          'id': 3,
          'title': 'Theme Team 3',
          'heroes': 'Pudge, Invoker, Shadowfiend, Riki',
          'completed': false,
          'editing': false,
        },
      ]
    }
  },
  computed: {
    remaining() {
      return this.themes.filter(theme => !theme.completed).length
    },
    anyRemaining() {
      return this.remaining != 0
    },
    themesFiltered() {
      if (this.filter == 'all') {
        return this.themes
      } else if (this.filter == 'active') {
        return this.themes.filter(theme => !theme.completed)
      } else if (this.filter == 'completed') {
        return this.themes.filter(theme => theme.completed)
      }
      return this.themes
    },
    showClearCompletedButton() {
      return this.themes.filter(theme => theme.completed).length > 0
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
    addTheme() {
      if (this.newTheme.trim().length == 0) {
        return
      }
      this.themes.push({
        id: this.idForTheme,
        title: this.newTheme,
        completed: false,
      })
      this.newTheme = ''
      this.idForTheme++
    },
    editTheme(theme) {
      this.beforeEditCache = theme.title
      theme.editing = true
    },
    doneEdit(theme) {
      if (theme.title.trim() == '') {
        theme.title = this.beforeEditCache
      }
      theme.editing = false
    },
    cancelEdit(theme) {
      theme.title = this.beforeEditCache
      theme.editing = false
    },
    removeTheme(index) {
      this.themes.splice(index, 1)
    },
    checkAllThemes() {
      this.themes.forEach((theme) => theme.completed = event.target.checked)
    },
    clearCompleted() {
      this.themes = this.themes.filter(theme => !theme.completed)
    }
  }
}
</script>

<style lang="scss">
  .theme-input {
    width: 100%;
    padding: 10px 18px;
    font-size: 18px;
    margin-bottom: 16px;
    border: none;
    border-bottom: 2px solid #A52A2A;
    padding: 10px 0px;
    color: #A52A2A;
    &:focus {
      outline: 0;
      border-bottom: 2px solid #A52A2A;
    }
  }
  ::placeholder {
    color: #CCCCCC;
  }
  .theme-item {
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    animation-duration: 0.3s;
    border-radius: 10px;
    padding: 5px 15px;
  }
  .remove-item {
    cursor: pointer;
    margin-left: 14px;
    display: block;
  }

  .theme-item-left {
    display: flex;
    align-items: center;
  }
  .theme-item-label {
    padding: 10px;
    margin-left: 12px;
  }
  .theme-item-edit {
    font-size: 24px;
    color: #2c3e50;
    margin-left: 12px;
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    &:focus {
      outline: none;
    }
  }
  .completed {
    color: white;
    background: #A52A2A;
  }
  .extra-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 16px;
    border-top: 1px solid lightgrey;
    padding-top: 14px;
    margin-bottom: 14px;
  }

  .btn {
    background-color: #4682B4;
    &:focus {
      background-color: #A52A2A;
    }
    &:hover {
      background-color: #A52A2A;
    }
  }
  .active {
    background: #A52A2A;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .2s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

  [type="checkbox"]:checked+span:not(.lever):before {
    top: 0px;
    left: 0px;
    width: 12px;
    height: 22px;
    border-top: 2px solid transparent;
    border-left: 2px solid transparent;
    border-right: 2px solid #FFF;
    border-bottom: 2px solid #FFF;
    -webkit-transform: rotate(40deg);
    transform: rotate(40deg);
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    -webkit-transform-origin: 100% 100%;
    transform-origin: 100% 100%;
}

[type="checkbox"]+span:not(.lever):before, [type="checkbox"]:not(.filled-in)+span:not(.lever):after {
    content: '';
    position: absolute;
    top: 4px;
    left: 0px;
    width: 18px;
    height: 18px;
    z-index: 0;
    border: 2px solid #5a5a5a;
    border-radius: 1px;
    margin-top: 3px;
    -webkit-transition: .2s;
    transition: .2s;
}
</style>