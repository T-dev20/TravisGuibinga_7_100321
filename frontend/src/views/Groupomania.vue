<template>
  <div class="groupomania">    
    <div class="container my-3">
      <div class="row">
          <div class="col-12">
            <SearchProfile/>            
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
// @ is an alias to /src
import Post from '@/components/Post.vue'

import SearchProfile from '@/components/SearchProfile.vue'

export default {
  name :"Groupomania",
  components: {
    Post,
    SearchProfile
  },
  data() {
    return {   
    msg: 'Posts du Réseau Social',
    directionToUseForAxiosGetPost: 'http://localhost:3000/api/posts/' // Variable for URI in function to get all posts from API
    }
  }
}
</script>

<style lang="scss" scoped>


</style>