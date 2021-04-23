<template>
    <div class="text-left" v-if="this.postUserId === userId || this.role == 'Admin'">        
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
                <button @click="modifyPost(postId, postUserId)" v-if="postUserId === userId || role == 'Admin'" class="btn font-weight-bold btn-warning" type="submit">Confirmer la modification</button>
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
        modifyPost() {
            if(confirm("Vous vous apprêtez à modifier ce post. Confirmez-vous la modification ?")) {
                const formData = new FormData();                
                formData.append('postContent', this.postContentToModify);
                if(this.postImageToModify) {
                    formData.append('image', this.postImageToModify);  
                }                 
                formData.append('userId', this.userId); /* for middleware adminVerif, to check that userId who created the post is the same that modifies */
                axios.put('http://localhost:3000/api/posts/' +this.postId, formData,
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
                    document.getElementById('modify-post').style.display='none';
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