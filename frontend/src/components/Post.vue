<template>
    <div class="my-4 py-4">
        <PostCreation
        @updatePost="getAllPosts"/>

        <h2 class="h4"> {{msg}} </h2>
        <!-- Generation of posts with a loop -->
        <div :id="'post-number'+item.id" class="cardGroupomania card shadow my-4 py-2 px-2 mx-3" v-for="item in previousPostContent" :key="item.content + index">

            <!-- Post header with profile image -->        
            <div class="displayFlexRow font-italic text-left font-weight-light">            
                <a :href="item.User.image_profil">
                    <img class="img-fluid roundedBorders" width="90px" :src="item.User.image_profil" :alt="'Image de profil de '+item.User.name"> 
                </a> 
                <div class="mx-2"> 
                    <em class="font-weight-bold"> {{item.User.name}} </em>
                    <br> {{item.createdAt}} 
                </div>
            </div>
            <br>

            <!-- Post text content -->
            <div v-if="item.content !== null" class="text-left">
                <p :id="'postContent-number'+item.id" class="h5 text-center-sm text-left">{{item.content}}</p> 
            </div>    

            <div :id="'postMiddle-number'+item.id"></div>

            <!-- Post image content -->
            <div v-if="item.image !== null" class="text-center-sm text-left">
                <a :id="'postImageLink-number'+item.id" :href="item.image">
                    <img :id="'postImage-number'+item.id" :src="item.image" class="postImage roundedBordersLight" >
                </a>            
            </div>

            <br :id="'postFooter-number'+item.id">

            Post modification
            <PostModification
            :postUserId="item.userId"
            :postId="item.id"
            :userId="userId"
            :role="role"
            :postContent="item.content"
            @updatePost="getAllPosts"
            />
            
            <!-- Like/Dislike & Comments buttons -->       
            <div class="displayFlexSpacebetween align-center">            
                <LikePost
                :userId="userId"
                :postId="item.id"
                :postCurrentUserLike="item.currentUserLike"
                :postCurrentUserDislike="item.currentUserDislike"
                :postLikeNumber="item.likeNumber"
                :postDislikeNumber="item.dislikeNumber"
                @updateLike="getAllLikes"      
                @updatePost="getAllPosts"      
                />
                <!-- Comments button -->
                <div>
                    <button @click="cacheDisplay('comment-display'+item.id)" class="btn font-italic toClick"> <em :id="'commentNumber'+item.id">{{item.comments.length}}</em> Commentaires </button>
                </div>
            </div>
            
            <!-- Detailed list for Likes/Dislikes -->
            <div :id="'details-likes'+item.id" style="display:none" class="text-left">
                <br>

                <!-- Like reactions -->
                <div v-for="likes in tableLikes" :key="likes.createdAt"> 
                    <div v-if="item.id == likes.postId">
                        <p v-if="likes.likeReaction == true" class="likeReaction"> 👍 {{likes.user.firstName}} {{likes.user.lastName}}</p>
                    </div>                      
                </div>
                <!-- Dislike reactions -->
                <div v-for="likes in tableLikes" :key="likes.id"> 
                    <div v-if="item.id == likes.postId">
                        <p v-if="likes.dislikeReaction == true" class="dislikeReaction"> 👎 {{likes.user.firstName}} {{likes.user.lastName}}</p> 
                    </div>                      
                </div>
            </div>
            
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

            <!-- Comment creation & Post modification and deletion buttons (for the current user)  -->
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
    </div>
</template>


<script>
import axios from 'axios'
import PostCreation from '@/components/PostCreation.vue'
import Comment from '@/components/Comment.vue'
import CommentCreation from '@/components/CommentCreation.vue'
import PostModification from '@/components/PostModification.vue'
import LikePost from '@/components/LikePost.vue'

export default {
  name: 'Post',
  components: {
    Comment,
    CommentCreation,
    PostModification,
    LikePost,
    PostCreation
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
    tableLikes: [],
    tableComments: []
    }
  },
  mounted() {      
    // Get all posts from API, URI is a variable
    this.getAllPosts();
    // Get all likes/dislikes from API 
    this.getAllLikes();
    // Get all comments from API
    this.getAllComments();   
    },    
  methods : {
    decreaseCommentNumber(payload){
        document.getElementById('commentNumber'+payload).innerHTML--;        
    },
    increaseCommentNumber(payload){
        document.getElementById('commentNumber'+payload).innerHTML++;
        document.getElementById('comment-creation'+payload).style.display='none';
    },
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
    // Get all likes/dislikes from API 
    getAllLikes() {
        axios.get('http://localhost:3000/api/like/', {
            headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
        .then((response) => {
            this.tableLikes = response.data; 
        })
        .catch(error => console.log(error))
    },
    // Get all comments from API
    getAllComments() {
        axios.get('http://localhost:3000/api/:id/comments', {
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
    // Function to delete one post sent to API
    deletePost(idPostToDelete, userIdPostToDelete) {
        if(confirm("Vous vous apprêtez à supprimer ce post. Confirmez-vous que vous souhaitez supprimer ?")) {
            axios.delete('http://localhost:3000/api/posts/' + idPostToDelete,
                {
                    data: {
                        userId:userIdPostToDelete /* for middleware adminVerif, to check that userId who created the post is the same that deletes */
                    },
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                    }
                }
            )
            .then((response) => {
                console.log(response);
                this.getAllPosts();
                alert('Votre post a bien été supprimé !');
            })
            .catch( ()=> {
                alert('Oups, une erreur est survenue');
                console.log('Une erreur est survenue');
            }) 
        }
    }
  }
}
</script>