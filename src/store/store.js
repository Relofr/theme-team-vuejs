import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    filter: "",
    themes: [
      {
        id: 1,
        title: "Theme Team 1",
        completed: false,
        editing: false
      },
      {
        id: 2,
        title: "Theme Team 2",
        completed: false,
        editing: false
      }
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
    }
  },
  actions: {
    addTheme(context, theme) {
      setTimeout(() => {
        context.commit('addTheme', theme)
      }, 1000)
    },
    clearCompleted(context) {
      setTimeout(() => {
        context.commit('clearCompleted')
      }, 1000)
    },
    updateFilter(context, filter) {
      setTimeout(() => {
        context.commit('updateFilter', filter)
      }, 1000)
    },
    checkAll(context, checked) {
      setTimeout(() => {
        context.commit('checkAll', checked)
      }, 1000)
    },
    deleteTheme(context, id) {
      setTimeout(() => {
        context.commit('deleteTheme', id)
      }, 1000)
    },
    updateTheme(context, theme) {
      setTimeout(() => {
        context.commit('updateTheme', theme)
      }, 1000)
    }
  }
})