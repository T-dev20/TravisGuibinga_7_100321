<template>
    <div class="text-left">           
        <div :id="'comment-display'+postId" style="display:none">
            <div v-for="comment in tableComments" :key="comment.id">
                <div :id="'comment-number'+comment.id" v-if="comment.PostId == postId">
                    <div> 
                        <em class="displayFlexSpacebetween">
                            <em class="font-italic"> {{comment.User.name}} dit :  </em> 
                            <!-- Modify & Delete comment buttons for the current user -->
                            <div v-if="comment.OwnerId == userId || role == 'Admin'">
                                <button @click="cacheDisplay('comment-modification'+comment.id); duplicateModifyComment(comment.id)" class="btn btn-warning py-0 px-0"> 🖊️ </button> 
                                <button @click="deleteComment(comment.id)" class="btn btn-danger mx-1 py-0 px-1"> <strong> X </strong> </button> 
                            </div>
                        </em>
                        <!-- Comment text content -->
                        <div v-if="comment.content !== null" class="text-left">
                            <strong :id="'commentContent-number'+comment.id" class="font-body">{{comment.content}} </strong>
                        </div>

                        <div :id="'commentMiddle-number'+comment.id" ></div>

                        <!-- Comment creation date -->
                        <em :id="'commentFooter-number'+comment.id" class="font-italic">{{comment.createdAt}}</em>                                
                    </div>                                  

                    <!-- Comment modification -->
                    <div :id="'comment-modification'+comment.id" style="display:none">
                        <br>

                        <label :for="'commentModifyContent'+comment.id">Texte de votre commentaire : </label>
                        <textarea :id="'commentModifyContent'+comment.id" rows="2" v-model="commentContentToModify"  type="text" placeholder="Contenu de mon commentaire" class="text-left form-control">  
                        </textarea>
                        <br>

                        <button @click="modifyComment(comment.id)" class="btn btn-warning font-weight-bold font-italic" type="submit">Modifier ce commentaire</button>
                        <br>
                        <br>
                    </div>

                    <hr class="separationBar" align=left width="30%">

                </div>
            </div>
        </div>  
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Comment',
    props: {
        postId: Number,
        userId: Number,
        role: String,
        tableComments: Array
    },
    data() {
        return {     
            commentContentToModify: null
        }
    },
    methods: {
        decreaseCommentNumber(payload){
        document.getElementById('commentNumber'+payload).innerHTML--;        
        },
        increaseCommentNumber(payload){
            document.getElementById('commentNumber'+payload).innerHTML++;
            document.getElementById('comment-creation'+payload).style.display='none';
        },
        cacheDisplay(id){
            if(document.getElementById(id).style.display=='none'){
                document.getElementById(id).style.display='initial';
            } else {
                document.getElementById(id).style.display='none';
            }
        },
        duplicateModifyComment (idCommentToModify) {
            if(document.getElementById('commentContent-number'+idCommentToModify)) {
                this.commentContentToModify = document.getElementById('commentContent-number'+idCommentToModify).innerHTML;
            }            
        },
        // Funtion to modify a comment sent to API
        modifyComment (idCommentToModify) {
            if(confirm("Vous vous apprêtez à modifier ce commentaire. Confirmez-vous la modification ?")) {
                axios.put('http://localhost:3000/api/comment/' + idCommentToModify, 
                    {
                            commentContent: this.commentContentToModify
                    },
                    { 
                        headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                        }
                    }
                )
                .then((response) => {
                    console.log(response);
                    document.getElementById('comment-modification'+idCommentToModify).style.display='none';
                    this.$emit('updateComment', true);           
                })
                .catch( ()=> {
                    alert('Oups, une erreur est survenue');
                    console.log('Une erreur est survenue');
                })
            } 
        },
        // Function to delete a comment sent to API
        deleteComment(idCommentToDelete) {
        if(confirm("Vous vous apprêtez à supprimer ce commentaire. Confirmez-vous la suppression ?")) {
            axios.delete('http://localhost:3000/api/comment/' + idCommentToDelete,            
                {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                    }
                }
            )
            .then((response) => {
                console.log(response);
                alert('Votre commentaire a bien été supprimé !');  
                this.$emit('updateComment', true);
                this.$emit('decreaseCommentNumber', this.postId);  
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