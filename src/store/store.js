import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
axios.defaults.baseURL = 'http://theme-team-laravel.test/api'

export const store = new Vuex.Store({
  state: {
    filter: "",
    themes: [
      
    ]
  },
  getters: {
    remaining(state) {
      return state.themes.filter(theme => !theme.completed).length;
    },
    anyRemaining(state, getters) {
      return getters.remaining != 0;
    },
    themesFiltered(state) {
      if (state.filter == "all") {
        return state.themes;
      } else if (state.filter == "active") {
        return state.themes.filter(theme => !theme.completed);
      } else if (state.filter == "completed") {
        return state.themes.filter(theme => theme.completed);
      }

      return state.themes;
    },
    showClearCompletedButton(state) {
      return state.themes.filter(theme => theme.completed).length > 0;
    }
  },
  mutations: {
    addTheme(state, theme) {
      state.themes.push({
        id: theme.id,
        title: theme.title,
        completed: false,
        editing: false
      })
    },
    clearCompleted(state) {
      state.themes = state.themes.filter(theme => !theme.completed);
    },
    updateFilter(state, filter) {
      state.filter = filter
    },
    checkAll(state, checked) {
      state.themes.forEach(theme => (theme.completed = checked));
    },
    deleteTheme(state, id) {
      const index = state.themes.findIndex(item => item.id == id);
      state.themes.splice(index, 1);
    },
    updateTheme(state, theme) {
      const index = state.themes.findIndex(item => item.id == theme.id);
      state.themes.splice(index, 1, {
        'id': theme.id,
        'title': theme.title,
        'completed': theme.completed,
        'editing': theme.editing
      });
    },
    retreiveThemes(state, themes) {
      state.themes = themes
    }
  },
  actions: {
    retreiveThemes(context) {
      axios.get('/themes')
        .then(response => {
          context.commit('retreiveThemes', response.data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    addTheme(context, theme) {
      axios.post('/themes', {
        title: theme.title,
        completed: false
      })
        .then(response => {
          context.commit('addTheme', response.data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    clearCompleted(context) {
      setTimeout(() => {
        context.commit('clearCompleted')
      })
    },
    updateFilter(context, filter) {
      setTimeout(() => {
        context.commit('updateFilter', filter)
      })
    },
    checkAll(context, checked) {
      setTimeout(() => {
        context.commit('checkAll', checked)
      })
    },
    deleteTheme(context, id) {
      setTimeout(() => {
        context.commit('deleteTheme', id)
      })
    },
    updateTheme(context, theme) {
      setTimeout(() => {
        context.commit('updateTheme', theme)
      })
    }
  }
})