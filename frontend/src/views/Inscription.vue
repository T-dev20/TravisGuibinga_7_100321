<template>
  <div class="inscription">
    <div class="container my-3">
      <Welcome/>
      <InscriptionToApp/>
    </div>
  </div>
</template>

<script>
import InscriptionToApp from '@/components/InscriptionToApp.vue'
import Welcome from '@/components/Welcome.vue'

export default {
  name :"Inscription",
  components: {
    Welcome,
    InscriptionToApp
  },
}

</script>