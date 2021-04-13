<template>
    <div class="row">     
        <div class="col-12">
            <div class="card cardGroupomania shadow my-4 py-4"> 
                <div class="card-text">                    
                    <form class="form-group text-left mx-5">
                        <h2 class="h4 text-left inline">
                            Se connecter :                    
                        </h2>
                        <div class="font-italic">Pas encore de compte ? <a style="color:#5ef1af" href="http://localhost:8080/#/inscription">Cliquez ici pour vous inscrire</a></div>
                        
                        <br>
                        <label for="email-connexion">Adresse e-mail</label>
                        <input id="email-connexion" v-bind:style="border" v-model="email" type="email" placeholder="email@gmail.com" class="form-control" required>  
                        <br>

                        <label for="mpasse-connexion">Mot de passe</label>
                        <input id="mpasse-connexion" v-bind:style="border" v-model="password" type="password" placeholder="Motdepasse!1" class="form-control" required>  
                        <br>

                        <!-- Connexion button -->
                        <p class="card-text text-center inline">
                            <button @click="checkForm" id="contact_button-connexion" class="btn font-weight-bold toClick" type="submit"><div class="h4">Se connecter</div></button>
                        </p>                         
                    </form>                    
                </div>
            </div>
        </div>             
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'ConnexionToApp',
    data() {
        return {
        email: null,
        password: null,
        border: null
        }
    },
    methods: {
        // Function at the click of the connexion button
        checkForm(event) {
            event.preventDefault();
            // Check if email and password have been provided
            if (!this.email || !this.password) {
                alert("Veuillez renseigner tous les champs pour vous connecter !");
                this.border= 'border: 2px solid #FF0000' 
            } else {
                axios.post('http://localhost:3000/api/auth/login', {
                    email: this.email,
                    password: this.password          
                })
                // Set a token and userId in localStorage & redirection to the main page with posts and refresh this page
                .then((response) => {
                    console.log(response);
                    localStorage.setItem("token", response.data.token);
                    localStorage.setItem("userId", response.data.userId);  
                    localStorage.setItem("role", response.data.role);  
                    this.$router.push({ name: "Groupomania" }); 
                    window.location.reload('../App.vue'); 
                })
                .catch( (error)=> {
                    if(JSON.stringify(error.message)=='"Request failed with status code 401"') {
                        alert('Utilisateur inconnu ou mot de passe incorrect.');
                    } else {
                        alert('Oups une erreur est survenue.');
                    }
                    console.log(error);
                })
            }
        }
    }
}
</script>