<template>
  <div class="profileConsulting">
    <div class="container my-3">
      <div class="row">     
          <div class="col-12">
              <MyProfile
              :directionToUseForAxiosGetUser="directionToUseForAxiosGetUser"
              />
          </div>             
      </div>
    </div>
  </div>
</template>

<script>
import MyProfile from '../components/MyProfile.vue'

export default {
  name :"Profile",
  components: {
    MyProfile
  }, 
  data () {
      return {
          directionToUseForAxiosGetUser: 'http://localhost:3000/api/users/user/' +localStorage.getItem('userIdToSee'), // Variable for URI in function to get user from API
      }
  }
}
</script>