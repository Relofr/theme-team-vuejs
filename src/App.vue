<template>
  <div id="app" class="container">
    <img src="./assets/dota2.svg" class="logo">
    <theme-list />
  </div>
</template>

<script>
import ThemeItem from './components/ThemeItem'
import ThemeList from './components/ThemeList'

export default {
  name: 'App',
  components: {
    ThemeItem, 
    ThemeList
  }
}
</script>

<style>

* {
  box-sizing: border-box;
}

.container {
  max-width: 600px;
  margin: 0 auto;

}

#app {
  font-family: 'Montserrat', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
  font-size: 24px;
}

.logo {
  display: block;
  margin: 20px auto;
  height: 100px;
}

.delete-icon {
  display: block;
  margin: 20px auto;
  height: .8em;
}
</style>
