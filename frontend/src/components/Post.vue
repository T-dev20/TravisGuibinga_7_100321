<template>
    <div class="my-4 py-4">
        <PostCreation
        @updatePost="getAllPosts"/>

        
        <h2 class="h4"> {{msg}} </h2>
        <!-- Generation of posts with a loop -->
        <div :id="'post-number'+item.id" class="cardGroupomania card shadow my-4 py-2 px-2 mx-3" v-for="item in previousPostContent" :key="item.content + index">
            
            
            <!-- Post header with profile image -->        
            <div class="displayFlexRow__post font-italic text-left font-weight-light">            
               
                <div class="mx-2">
                    <div>
                        <a :href="item.User.image_profil">
                            <img class="img-fluid roundedBorders" width="60px" :src="item.User.image_profil" :alt="'Image de profil de '+item.User.name"> 
                        </a> 
                    </div>
                    <em class="font-weight-bold"> {{item.User.name}} </em>
                    <br> {{item.createdAt}} 
                </div>
                <!-- Post modification -->
                <PostModification
                :postUserId="item.UserId"
                :postId="item.id"
                :userId="userId"
                :role="role"
                :postContent="item.content"
                @updatePost="getAllPosts"
                />
            </div>
            <br>
            

             <!-- Post text content -->
            <div v-if="item.content !== null" class="text-left">
                <p :id="'postContent-number'+item.id" class="h5 text-center-sm text-left">{{item.content}}</p> 
            </div>
            <br>

            <div :id="'postMiddle-number'+item.id"></div>

            <!-- Post image content  -->
            <div v-if="item.image !== null" class="text-center-sm text-left">
                <a :id="'postImageLink-number'+item.id" :href="item.image">
                    <img :id="'postImage-number'+item.id" :src="item.image" class="postImage roundedBordersLight" >
                </a>            
            </div>

            <br :id="'postFooter-number'+item.id">

            <hr class="separationBar">

            <!-- Detailed list for Comments -->         
            <Comment
            :tableComments="tableComments"
            :postId="item.id"
            :userId="userId"
            :role="role"
            @updateComment="getAllComments"
            @decreaseCommentNumber="decreaseCommentNumber"
            />

            <!-- Comment creation(for the current user)  -->
            <div class="text-left">            
                <div class="card-text inline displayFlexSpacebetween align-center">
                    <!-- Comment creation button -->
                    <div>        
                        <button @click="cacheDisplay('comment-creation'+item.id)" class="btn font-italic toClick" type="submit">Rédiger un commentaire</button>
                    </div>
                    <!-- Modify/Delete post buttons for the current user -->
                    <div v-if="item.userId === userId || role == 'admin'" class="displayFlexSpacebetween align-center">                    
                        <button  @click="cacheDisplay('modificationEnabledPost'+item.id)" class="roundedBorders btn postModificationEnabled mx-2 marginButtonModifyPostResponsive">...</button>
                        <div :id="'modificationEnabledPost'+item.id" class="displayFlexSpacebetween align-center" style="display:none">                      
                            <button @click="cacheDisplay('modify-post'+item.id)" class="btn btn-warning p-0 mx-2" type="submit"> 🖊️ </button>Modifier ce post
                            <button @click="deletePost(item.id, item.userId)" class="btn btn-danger py-0 px-1 mx-2" type="submit"> <strong> X </strong> </button>Supprimer ce post   
                        </div>
                    </div>
                </div>
                <br>

                <!-- Comment creation -->
                <CommentCreation
                :tableComments="tableComments"
                :postId="item.id"
                :userId="userId"
                @updateComment="getAllComments"
                @increaseCommentNumber="increaseCommentNumber"
                />
            </div>   
        </div>
        <hr class="separationBar" align=center>        
    </div>
</template>


<script>
import axios from 'axios'
import PostCreation from '@/components/PostCreation.vue'
import PostModification from '@/components/PostModification.vue'
import Comment from '@/components/Comment.vue'
//import CommentCreation from '@/components/CommentCreation.vue'

export default {
  name: 'Post',
  components: {
    PostCreation,
    PostModification,
    Comment,
    //CommentCreation
  },
  props: {
    msg: String,
    directionToUseForAxiosGetPost: String
  },
  data() {
    return { 
    userId: parseInt(localStorage.getItem("userId")), // Needs to be parseInt for the auth process that compares UserId from the req.body and the one with the token
    role: localStorage.getItem("role"),
    index: 0,
    previousPostContent: [],
    tableComments: []
    }
  },
  mounted() {      
    this.getAllPosts();
    this.getAllComments();
    },    
  methods : {
    getAllPosts(){
        axios.get('http://localhost:3000/api/posts/', {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
        .then((response) => {
            response.data.forEach(element => {
                // Change data from API in proper date format 
                element.createdAt = new Intl.DateTimeFormat('fr-FR', { dateStyle: 'full', timeStyle: 'short' }).format(new Date(element.createdAt));
            }); 
            this.previousPostContent = response.data;
            this.index++;
        })
        .catch(error => console.log(error))
    },
    getAllComments() {
            axios.get('http://localhost:3000/api/posts/comment', {
                headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
                },
            })
            .then((response) => {
                response.data.forEach(element => {
                    // Change data from API in proper date format
                    element.createdAt = new Intl.DateTimeFormat('fr-FR', { dateStyle: 'short', timeStyle: 'short' }).format(new Date(element.createdAt));
                });
                this.tableComments = response.data;
            })
            .catch(error => console.log(error))
        },
    // Functions to display or hide elements  
    cacheDisplay(id){
        if(document.getElementById(id).style.display=='none'){
            document.getElementById(id).style.display='initial';
        } else {
            document.getElementById(id).style.display='none';
        }
    },
  }
}
</script>