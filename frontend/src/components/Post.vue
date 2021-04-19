<template>
    <div class="my-4 py-4">
        <PostCreation
        @updatePost="getAllPosts"/>

        <h2 class="h4"> {{msg}} </h2>
        <!-- Generation of posts with a loop -->
        <div :id="'post-number'+item.id" class="cardGroupomania card shadow my-4 py-2 px-2 mx-3" v-for="item in previousPostContent.slice(0, postsToSee)" :key="item.content + index">

            <!-- Post header with profile image -->        
            <div class="displayFlexRow font-italic text-left font-weight-light">            
                <a :href="item.user.imageUrl"> 
                    <img class="img-fluid roundedBorders" width="90px" :src="item.user.imageUrl" :alt="'Image de profil de '+item.user.name"> 
                </a> 
                <div class="mx-2"> 
                    <em class="font-weight-bold"> {{item.user.name}} </em>
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
            <div v-if="item.imageUrl !== null" class="text-center-sm text-left">
                <a :id="'postImageLink-number'+item.id" :href="item.imageUrl">
                    <img :id="'postImage-number'+item.id" :src="item.imageUrl" class="postImage roundedBordersLight" >
                </a>            
            </div>

            <br :id="'postFooter-number'+item.id">

            <!-- Post modification -->
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
        <hr class="separationBar" align=center>
        <button @click="seeMorePosts" class="btn font-weight-bold toClick btnBgApp">Voir plus de posts</button>              
    </div>
</template>