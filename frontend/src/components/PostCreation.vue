<template>
<div class="card cardGroupomania shadow my-4 py-4"> 
    <div class="card-text">
        <button @click="cacheDisplay('create-post')" class="btn toClick"> <h2 class="h5">Rédigez un post en cliquant ici !</h2></button>
        <div id="create-post" style="display:none">
            <form class="form-group text-left mx-5">
                <!-- Post text content -->
                <label for="postContent">Texte de votre post : </label>
                <textarea id="postContent" rows="5" v-model="content" type="text" placeholder="Contenu de mon post" class="form-control">     
                </textarea>
                <br>

                <!-- Post image content -->
                <label for="postImage">Image : </label>
                <p>
                <input id="postImage" type="file" @change="imageUpload" class="input"> 
                </p>

                <!-- Publication button -->
                <p class="card-text text-center inline">
                <button @click="postContentFunction" class="btn font-weight-bold toClick" type="submit">Publier mon post</button>
                </p>
            </form>   
        </div>        
    </div>              
</div>
    
</template>

<script>
import axios from 'axios'

export default {
  name: 'PostCreation',
  props: {
    msg: String
  },
  data() { 
    return {  
    UserId: parseInt(localStorage.getItem("userId")), // Needs to be parseInt for the auth process that compares UserId from the req.body and the one with the token
    content: null,
    image: null
    }
  },
  methods : {
    // Transform image into a file
    imageUpload (event) {      
        this.image = event.target.files[0];
    },
    // Function to display and hide an element
    cacheDisplay(id){
        if(document.getElementById(id).style.display=='none'){
            document.getElementById(id).style.display='initial';
        } else {
            document.getElementById(id).style.display='none';
        }
    },
    // Send post to API
    postContentFunction() {      
        // Create a formData to send the data with the image (in file format) 
        const formData = new FormData();
        if(this.image) {
            formData.append('image', this.image);
        }
        if(this.content) {
            formData.append('content', this.content);
        }
        formData.append('userId', this.UserId);        
        axios.post('http://localhost:3000/api/posts/', formData,
            {
                headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
        .then((response) => {
            console.log(response)
            alert('Félicitations, votre post a été publié !');
            this.$emit('updatePost', true);
            document.getElementById('create-post').style.display='none';
            this.content = null;
            this.image = null;
        })
        .catch( ()=> {
            alert('Oups, une erreur est survenue');
            console.log('Une erreur est survenue');
        })
    }
  }
}
</script>