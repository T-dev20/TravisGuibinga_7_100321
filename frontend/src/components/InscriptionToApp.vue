<template>
    <div class="row">     
        <div class="col-12">
            <div class="card cardGroupomania shadow my-4 py-4"> 
                <div class="card-text">                    
                    <form class="form-group text-left mx-5">
                        <h2 class="h4 text-left inline">
                            Première inscription :                    
                        </h2>
                        <br>

                        <label for="name">Nom complet</label>
                        <input id="name" v-bind:style="border" v-model="name" name="name" type="text" placeholder="Pierre DEBREUILLNE" class="form-control" required>     
                        <br>

                        <label for="email-inscription">Adresse e-mail</label>
                        <input id="email-inscription" v-bind:style="border" v-model="email" name="email" type="email" placeholder="email@gmail.com" class="form-control" required>  
                        <br>

                        <label for="mpasse-inscription">Mot de passe</label>
                        <p v-if="!this.validPassword(this.password) || !this.password" class="font-italic font-weight-light text-white-50">Doit contenir entre 8 et 15 caractères, des minuscules et majuscules, au moins un chiffre et un caractère spécial </p>
                        <input id="mpasse-inscription" v-bind:style="border" v-model="password" name="password" type="password" placeholder="Motdepasse!1" class="form-control" required>  
                        <br>

                        <label for="job">Fonction</label>
                        <input id="job" v-bind:style="border" v-model="job" name="job" type="text" placeholder="RH" class="form-control" required>  
                        <br>

                        <!-- Register button -->
                        <p class="card-text text-center inline">
                            <button @click="checkForm" id="contact_button-inscription" class="btn toClick font-weight-bold" type="submit"><div class="h4">S'inscrire</div></button>
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
name: 'InscriptionToApp',
    data() {
        return {
            name: null,
            email: null,
            password: null,
            job: null,
            border: null
        }       
    },
    methods: {
    // Function to register
    checkForm(event) {
      event.preventDefault();
      // On vérifie que l'user à renseigner tous les champs
      if (!this.name || !this.email || !this.password || !this.job) {
        alert("Veuillez renseigner tous les champs pour vous inscrire !"); 
      // Vérifie que l'email est correcte 
      } else if(!this.validEmail(this.email)) {
        alert("Veuillez renseigner un email valide !");
      // Vérifie que le mot de passe est correcte   
      } else if(!this.validPassword(this.password)) {
        alert("Veuillez renseigner un mot de passe valide !");
      } else {
        // Envoie des données à l'API
        axios.post('http://localhost:3000/api/auth/signup', {
            name: this.name,
            email: this.email,
            password: this.password,
            job: this.job,
      })
        .then((response) => {
          console.log(response)
          alert('Félicitations, vous êtes inscrit ! Connectez-vous pour accéder au réseau.');
          this.$router.push({ name: "Connexion" });
        })
        .catch( (error)=> {          
          alert('Oups une erreur est survenue.');
          console.log(error);
        })
      }
    },
    validEmail: function (email) {
      var re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      return re.test(email);
    },
    validPassword: function (password) {
    var re = /^(?=.{8,15}$)(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?\W).*$/;
    return re.test(password);
    }
    }
}
</script>
