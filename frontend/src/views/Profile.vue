<template>
  <div class="profile">
    <div class="container my-3">
      <div class="row">     
          <div class="col-12">
              <MyProfile
              :directionToUseForAxiosGetUser="directionToUseForAxiosGetUser"
              />
              <Post
              :msg="msg"
              :directionToUseForAxiosGetPostOneUser="directionToUseForAxiosGetPostOneUser"
              />
          </div>             
      </div>
    </div>
  </div>
</template>

<script>
import MyProfile from '../components/MyProfile.vue'
import Post from '@/components/Post.vue'

export default {
  name :"Profile",
  components: {
    MyProfile, 
    Post
  }, 
  data () {
      return {
          directionToUseForAxiosGetUser: 'http://localhost:3000/api/users/user/' +localStorage.getItem('userId'), // Variable for URI in function to get user from API
          directionToUseForAxiosGetPostOneUser: 'http://localhost:3000/api/posts/' +localStorage.getItem('userId')
      }
  }
}
</script>