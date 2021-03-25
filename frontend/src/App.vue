<template>
  <div id="app">
    <div id="nav">
      <router-link to="/inscription">Inscription</router-link> |
      <router-link to="/connexion">Connexion</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
// Definition of Sass variables
$website-color: #4c8baf;
$link-color-spec: yellow;
$separationBar-bgColor:white;
$likeReaction-color:rgb(47, 255, 47);
$dislikeReaction-color:rgb(255, 123, 129);
$cardGroupomania-bgColor: darken($website-color, 20);
// 

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  // color: #2c3e50;
  color: white;
  background: linear-gradient(135deg, $website-color 0%, #c4e0e5 100%);
  padding-bottom: 2em;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    // color: #2c3e50;
    color: white;

    &.router-link-exact-active {
      color: $link-color-spec;
      // color: #ffdb3c;
    }
  }

  .navigationItem {
    font-weight: bold;
    // color: #2c3e50;
    color: white;
  }
}


</style>
