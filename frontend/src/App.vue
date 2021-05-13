<template>
  <div id="app">
    <div id="nav">
      <!-- Navigation links if userId present in localStorage (user connected) -->
      <div id="navConnected" v-if="connectStatus == 'connected'">
        <div>
          <router-link to="/groupomania">Groupomania</router-link> |
          <router-link to="/profile">Mon profil</router-link> |
          <router-link to="/"> <span @click="deconnexion()"> Se déconnecter </span> </router-link>
        </div>        
      </div>
      <!-- Navigation links if userId absent from localStorage (user not connected yet) -->
      <div id="navUnconnected" v-else>
      <router-link to="/inscription">Inscription</router-link> |
      <router-link to="/connexion">Connexion</router-link>
     </div> 
    </div>    
    <router-view/>
  </div>
</template>


<script>
  export default {
    name: 'App',
    data() {
      return {
        token: localStorage.getItem("token"),  
        connectStatus: null, 
      }
    },
    beforeMount() {
      this.connexionVerif();
    },
    methods: {
      connexionVerif() {
        if(this.token){
          this.connectStatus = 'connected';
        } else {
          this.connectStatus = 'notConnected';
        }
      },
      // Function to disconnect the user by clearing the localSorage (clearing the userId and the token)
      deconnexion() {
        localStorage.clear();
        this.$router.push({ name: "Connexion" });
        window.location.reload();
      }
   }
}
</script>

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

.toClick {
    color: white;
}

.cardGroupomania {
  background: linear-gradient(135deg, $cardGroupomania-bgColor 0%, lighten($cardGroupomania-bgColor, 20) 100%);  
  border-radius:40px; 
  color:white
}


.displayFlexRow {
  display:flex; 
  flex-direction:row;
}

.displayFlexRow__post {
  display:flex; 
  flex-direction:row;
  justify-content: space-between;
}

.btn_post {
    margin-right: 25px;
}

.displayFlexCenter {
  display:flex; 
  justify-content:center;
}

.separationBar {
  background-color:$separationBar-bgColor;
}


.displayFlexSpacearound {
  display:flex; 
  flex-direction:row; 
  justify-content:space-around;
}

.displayFlexSpacebetween {
  display:flex; 
  flex-direction:row; 
  justify-content:space-between;
}

.align-center {
  align-content: center;
  align-items: center;
}

.profileImage {
  width: 150px;
  height: 150px;
  object-fit: cover;
}

.img-fluid {
  width: 50px;
  height: 50px;
  object-fit: cover;
}

.roundedBorders {
  border-radius:50%;
}

@media (max-width: 780px) {

  .displayFlexSpacearoundResponsiveForProfile {
    display:flex; 
    flex-direction:column-reverse; 
    justify-content:space-around;
  }
}

@media (max-width: 780px) {

  .displayFlexSpacearoundResponsiveForProfile {
    display:flex; 
    flex-direction:column-reverse; 
    justify-content:space-around;
  }
}

.postImage {
    width: 80%;
}

.text-center-sm {
    text-align: center!important;
}

.btnAddComment {
  margin-left: 25px;
}

.likeContainer {
  margin-right: 5px;
  width: 10%;
  text-align: center;
  cursor: pointer;
  &:hover > .twoFar {
    color: #f50057;
    transition: .4s;
}
}

.fa-thumbs-up {
  font-size: 2rem;
  transition: .4s;
}

@media (max-width: 500px) {

  .displayFlexSpacebetween {
    display:flex; 
    flex-direction:column; 
    justify-content:space-between;
  }

  .marginButtonModifyPostResponsive {
    margin-bottom: 1rem;
  }

  .postImage {
    width: 50%;
  }

  .btnAddComment {
    margin-left: 0px;
  }

  .likeContainer {
    width: 35%;
  }
}

.div-icon {
  cursor: pointer;
  &:hover > .oneFar {
      color: #f50057;
    }
}


</style>
