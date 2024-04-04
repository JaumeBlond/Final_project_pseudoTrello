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

* {
  margin: 0;
  padding: 0;
}

.task-list {
  flex: 1;
  margin: 0 10px;
}
</style>
