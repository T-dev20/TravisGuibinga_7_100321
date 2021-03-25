<template>
  <div class="connexion">
    <div class="container my-3">
      <Welcome/>
      <ConnexionToApp/>      
    </div>
  </div>
</template>

<script>
import ConnexionToApp from '@/components/ConnexionToApp.vue'
import Welcome from '@/components/Welcome.vue'

export default {
  name :"Connexion",
  components: {
    Welcome,
    ConnexionToApp
  },
}

</script>