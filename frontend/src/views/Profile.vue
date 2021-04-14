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
              :directionToUseForAxiosGetPost="directionToUseForAxiosGetPost"
              />
          </div>             
      </div>
    </div>
  </div>
</template>

<script>
import Post from '@/components/Post.vue'
import MyProfile from '../components/MyProfile.vue'

export default {
  name :"Profile",
  components: {
    Post,
    MyProfile
  }, 
  data () {
      return {
          msg: 'Vos posts sur le Réseau Social',
          directionToUseForAxiosGetUser: 'http://localhost:3000/api/users/user' +localStorage.getItem('userId'), // Variable for URI in function to get user from API
          directionToUseForAxiosGetPost: 'http://localhost:3000/api/post/' +localStorage.getItem('userId') // Variable for URI in function to get all posts from API
      }
  }
}
</script>