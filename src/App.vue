<template>
  <div id="app" class="container">
    <div class="image-container">
      <!-- <img src="./assets/dota2.svg" class="logo"> -->
      <img src="./assets/dota2tiny.jpg" class="logo">
    </div>
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

body {
  background-color: #2a3a4a;
}

.container {
  min-width: 600px;
  margin: 0 auto;
  background: #fff;
  padding: 1em;
  border-radius: 10px;
}

#app {
  font-family: 'Montserrat', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
  font-size: 24px;
  margin-bottom: 2em;
}

.delete-icon {
  cursor: pointer;
  float: right;
  width: 24px;
  height: 24px;
  margin: 0px -3px 5px;
}

[type="checkbox"]+span:not(.lever) {
  position: relative;
  padding-left: 35px;
  cursor: pointer;
  display: inline-block;
  top: 5px;
  height: 25px;
  line-height: 22px;
  font-size: 1rem;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.image-container {
  background-size: cover;
  width: 100%;
  height: 275px;
  resize: both;
  overflow: hidden;
  border-radius: 10px;
  margin: 0px 0px 15px;
}

img {
  width: 100%;
}
</style>
