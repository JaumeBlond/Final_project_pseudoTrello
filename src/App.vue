<template>
  <div id="main">
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'App',
}
</script>

<style>
#app {
  font-family: Arial, sans-serif;
  display: flex;
  flex-direction: column;
  width: 90%;
  align-items: flex-start;
  padding-top: 30px;
  margin: auto;
}

#main {
  font-family: Arial, sans-serif;
  display: flex;
  width: 100%;
  align-items: flex-start;
  padding-top: 30px;
  margin: auto;
}

#main div {
  width: 100%;
}

.task-board {
  padding-top: 30px;
  width: 100%;
}

.navbar {
  width: 100%;
}

* {
  margin: 0;
  padding: 0;
}

.task-list {
  flex: 1;
  margin: 20px;
}
</style>
