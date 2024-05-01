<template>
  <div id="main" class="w-screen mt-0 items-center bg-gray-100 h-screen">
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
  height: 100%;
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
