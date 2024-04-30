<template>
  <div id="main" class="w-screen mt-0 place-content-center items-center">
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'App',
}
</script>

<style>
@import './style.css';

#app {
  font-family: Arial, sans-serif;
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: flex-start;
  margin: auto;
}

#main {
  font-family: Arial, sans-serif;
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
