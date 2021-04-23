<template>
    <div class="text-left" v-if="postUserId === userId || role == 'admin'">        
        <div :id="'modify-post'+postId" style="display:none">
            <label :for="'postContent'+postId">Texte de votre post : </label>
            <textarea :id="'postContent'+postId" rows="5" v-model="postContentToModify"  type="text" placeholder="Contenu de mon post" class="form-control" required>                
            </textarea>
            <br>

            <label :for="'postImage'+postId" class="text-left">Image : </label>
            <p>
                <input id="postImage" type="file" @change="postImageToModifyUpload" class="input"> 
            </p>
            <br>
            
            <p class="card-text inline">
                <button @click="modifyPost(postId, postUserId)" v-if="postUserId === userId || role == 'admin'" class="btn font-weight-bold btn-warning" type="submit">Confirmer la modification</button>
            </p>
            <br>

        </div>
    </div>   
</template>

<script>
import axios from 'axios'

export default {
    name: 'PostModification',
    props: {
        postId: Number,
        postUserId: Number,
        userId: Number,
        role: String,
        postContent: String
    },
    data() {
        return {    
        postContentToModify: this.postContent,
        postImageToModify: null
        }
    },
    methods: {
        // Transform image into a file
        postImageToModifyUpload (event) {      
            this.postImageToModify= event.target.files[0];
        },
        // Function to modify one post sent to API
        modifyPost(idPostToModify, userIdPost) {
            if(confirm("Vous vous apprêtez à modifier ce post. Confirmez-vous la modification ?")) {
                const formData = new FormData();                
                formData.append('postContent', this.postContentToModify);
                if(this.postImageToModify) {
                    formData.append('image', this.postImageToModify);  
                }                 
                formData.append('userId', userIdPost); /* for middleware adminVerif, to check that userId who created the post is the same that modifies */
                axios.put('http://localhost:3000/api/post/' + idPostToModify, formData,
                    { 
                        headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                        }
                    }
                )
                .then((response) => {
                    console.log(response);
                    alert('Votre post a bien été modifié !');
                    this.$emit('updatePost',true);
                    document.getElementById('modify-post'+idPostToModify).style.display='none';
                })
                .catch( ()=> {
                    alert('Oops, une erreur est survenue');
                    console.log('Une erreur est survenue');
                })
            } 
        }
        
    }
}
</script>