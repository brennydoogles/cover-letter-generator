<script setup>
import NavBarComponent from './components/NavBarComponent.vue'
</script>

<template>
  <div id="main-app" class="container-fluid">
    <div class="row">
      <div class="col">
        <NavBarComponent />
      </div>
    </div>
    <div class="row">
      <div class="col">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<!--<style>-->
<!--#main-app {-->
<!--  width: 90vw;-->
<!--  height: 70vh;-->
<!--}-->
<!--</style>-->
