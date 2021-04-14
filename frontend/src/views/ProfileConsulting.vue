<template>
  <div class="profileConsulting">
    <div class="container my-3">
      <div class="row">     
          <div class="col-12">
              <MyProfile
              :directionToUseForAxiosGetAuth="directionToUseForAxiosGetAuth"
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
          msg: "Posts de l'utilisateur sur le Réseau Social",
          directionToUseForAxiosGetAuth: 'http://localhost:3000/api/users/user/' +localStorage.getItem('userIdToSee'), // Variable for URI in function to get user from API
          directionToUseForAxiosGetPost: 'http://localhost:3000/api/posts/' +localStorage.getItem('userIdToSee') // Variable for URI in function to get all posts from API
      }
  }
}
</script>