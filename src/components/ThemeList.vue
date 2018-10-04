<template>
  <div>
    <input type="text" class="theme-input" placeholder="Add a theme" v-model="newTheme" @keyup.enter="addTheme" autofocus>
    <div class="extra-container buttons">
      <theme-filter />
      <div>
        <transition name="fade">
          <clear-completed />
        </transition>
      </div>
    </div>

    <transition-group 
      name="fade" 
      enter-active-class="animated fadeInUp" 
      leave-active-class="animated fadeOutDown">
      <theme-item
        v-for="(theme, index) in themesFiltered" :key="theme.id" :theme="theme" 
        :index="index"
        :checkAll="!anyRemaining"
        :class="{ completed : theme.completed }"
      />
    </transition-group>
    
    <div class="extra-container">
      <theme-check-all />
      <theme-items-remaining />
    </div>
  </div>
</template>


<script>
import ThemeItem from "./ThemeItem";
import ThemeItemsRemaining from "./ThemeItemsRemaining";
import ThemeCheckAll from "./ThemeCheckAll";
import ThemeFilter from "./ThemeFilter";
import ClearCompleted from "./ClearCompleted";

export default {
  name: "theme-list",
  components: {
    ThemeItem,
    ThemeItemsRemaining,
    ThemeCheckAll,
    ThemeFilter,
    ClearCompleted
  },
  data() {
    return {
      newTheme: "",
      idForTheme: 3,
    };
  },
  computed: {
    anyRemaining() {
      return this.$store.getters.anyRemaining
    },
    themesFiltered() {
      return this.$store.getters.themesFiltered
    }
  },
  methods: {
    addTheme() {
      if (this.newTheme.trim().length == 0) {
        return;
      }

      this.$store.dispatch('addTheme', {
        id: this.idForTheme,
        title: this.newTheme,
      })

      this.newTheme = "";
      this.idForTheme++;
    }
  }
};
</script>

<style lang="scss">
.theme-input {
  width: 100%;
  color: #a52a2a;
}
::placeholder {
  color: #cccccc;
}
.theme-item {
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  animation-duration: 0.3s;
  border-radius: 10px;
  padding: 5px 15px;
  transition: ease-in-out 0.3s;
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
  background: #a52a2a;
  transition: ease-in-out 0.3s;
}
.extra-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  padding-top: 14px;
  margin-bottom: 14px;
  padding-left: 15px;
}

.btn {
  background-color: #4682b4;
  &:focus {
    background-color: #a52a2a;
  }
  &:hover {
    background-color: #a52a2a;
  }
}
.active {
  background: #a52a2a;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

[type="checkbox"] + span:not(.lever) {
  position: relative;
  padding-left: 35px;
  cursor: pointer;
  display: inline-block;
  height: 20px;
  line-height: 25px;
  font-size: 1rem;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

[type="checkbox"].filled-in:checked + span:not(.lever):after {
  top: 0;
  width: 20px;
  height: 20px;
  border: 2px solid white;
  background-color: white;
  z-index: 0;
}

[type="checkbox"].filled-in:checked + span:not(.lever):before {
  top: 0;
  left: 1px;
  width: 8px;
  height: 13px;
  border-top: 2px solid transparent;
  border-left: 2px solid transparent;
  border-right: 2px solid #a52a2a;
  border-bottom: 2px solid #a52a2a;
  -webkit-transform: rotateZ(37deg);
  transform: rotateZ(37deg);
  -webkit-transform-origin: 100% 100%;
  transform-origin: 100% 100%;
}

input:not([type]):focus:not([readonly]),
input[type="text"]:not(.browser-default):focus:not([readonly]),
input[type="password"]:not(.browser-default):focus:not([readonly]),
input[type="email"]:not(.browser-default):focus:not([readonly]),
input[type="url"]:not(.browser-default):focus:not([readonly]),
input[type="time"]:not(.browser-default):focus:not([readonly]),
input[type="date"]:not(.browser-default):focus:not([readonly]),
input[type="datetime"]:not(.browser-default):focus:not([readonly]),
input[type="datetime-local"]:not(.browser-default):focus:not([readonly]),
input[type="tel"]:not(.browser-default):focus:not([readonly]),
input[type="number"]:not(.browser-default):focus:not([readonly]),
input[type="search"]:not(.browser-default):focus:not([readonly]),
textarea.materialize-textarea:focus:not([readonly]) {
  border-bottom: 1px solid #a52a2a;
  -webkit-box-shadow: 0 1px 0 0 #a52a2a;
  box-shadow: 0 1px 0 0 #a52a2a;
}
</style>