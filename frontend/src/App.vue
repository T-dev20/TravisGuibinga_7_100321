<template>
  <div id="app">
    <div id="nav">
      <!-- Navigation links if user not connected-->
      <div id="navUnconnected">
      <router-link to="/inscription">Inscription</router-link> |
      <router-link to="/">Connexion</router-link>
     </div> 
    </div>    
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
