<template>
  <div class="register">
    <div class="container my-3">
      <Welcome/>
      <!-- <RegisterToApp/> -->
    </div>
  </div>
</template>

<script>
//import RegisterToApp from '@/components/RegisterToApp.vue'
import Welcome from '@/components/Welcome.vue'

export default {
  name :"Register",
  components: {
    Welcome,
   // RegisterToApp
  },
}

</script>