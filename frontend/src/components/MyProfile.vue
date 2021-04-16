<template>   
<div class="card cardGroupomania shadow my-4 py-4">
    <div class="card-text">        
        <form class="form-group text-center mx-5">

            <!--Profile elements  -->
            <div class="displayFlexSpacearound displayFlexSpacearoundResponsiveForProfile" style="align-items:center">
                <div>
                    <p>Numéro d'identifiant : {{ userId }}</p>                                                 
                    <p>Nom : {{name}} </p>
                    <p>Rôle : {{role}}</p>
                    <!-- <p>{{email}}</p> -->
                    <hr class="separationBar">
                    <div class="displayFlexSpacebetween align-center" v-if="userId === currentUserId || currentUserRole == 'admin'">
                        <button @click="cacheDisplay('modify-user'); getUser()" class="btn btn-warning py-0 mx-2"> 🖊️ </button> Modifier mon profil
                        <button @click="deleteProfile" id="contact_button-delete" class="btn btn-danger py-0 mx-2"> <strong> X </strong> </button> Supprimer mon profil
                    </div>
                </div>
                <div>
                    <div>
                        <a :href="imageUrl"><img class="profileImage roundedBorders" :src="imageUrl" :alt="'photo de profil de '+name"></a>
                    </div>
                </div>
            </div>

            <!-- Profile modification -->
            <div id="modify-user" style="display:none" v-if="userId === currentUserId || currentUserRole == 'admin'">
                <br>
                <br>

                <hr class="separationBar">


                <label for="lastName">Nom : {{name}} </label>
                <p class="font-italic font-weight-light text-white-50"> Modifiez ci-dessous votre Nom </p>
                <input id="lastName" v-bind:style="border" v-model="name" type="text" placeholder="Pierre DEBREUILLNE" class="form-control" required>  
                <br>

                <label for="photo-inscription">Photo de profil : </label>
                <p class="font-italic font-weight-light text-white-50"> Téléchargez ci-dessous votre Photo de profil </p>
                <p>
                    <input id="photo-inscription" type="file" @change="imageUpload" class="input">  
                </p>
                <br>

                <label for="mpasse-inscription">Mot de passe : </label>
                <p class="font-italic font-weight-light text-white-50"> Veuillez d'abord renseigner votre ancien mot de passe pour le modifier ci-dessous</p>
                <input id="mpasse-verification" v-bind:style="border" v-model="oldPassword" type="password" placeholder="Ancien Motdepasse!1" class="form-control" >  
                <br>
                <p v-if="!this.validPassword(this.password) || !this.password" class="font-italic font-weight-light text-white-50">Doit contenir entre 8 et 15 caractères, des minuscules et majuscules, au moins un chiffre et un caractère spécial </p>
                <input id="mpasse-inscription" v-bind:style="border" v-model="password" type="password" placeholder="Nouveau Motdepasse!1" class="form-control" >  
                <br>
                <br>

                <!-- Confirm modification button -->
                <p class="card-text inline">
                    <button @click="modifyProfile" id="contact_button-inscription" class="btn font-weight-bold btn-warning" type="submit">Confirmer la modification</button>   
                </p>      
            </div>                            
        </form>        
    </div>
</div>
</template>


<script>
import axios from 'axios'

export default {
    name: 'MyProfile',  
    props: {
        directionToUseForAxiosGetUser: String
    },
    data () {
        return {
            currentUserId: parseInt(localStorage.getItem('userId')),
            currentUserRole: localStorage.getItem('role'),
            name: null,
            imageUrl: null,
            // email: null,
            role: null,
            password: null,
            border: null,
            userId: null, 
            oldPassword: null
        }
    },
    // Get all user's elements from API
    mounted() {
        this.getUser()
    },
    methods: {   
        getUser() {
            axios.get(this.directionToUseForAxiosGetUser, {
                headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
                },
            })
            .then((response) => {
                this.userId = parseInt(response.data.id), // Needs to be parseInt for the auth process that compares UserId from the req.body and the one with the token
                this.name = response.data.name,
                this.imageUrl = response.data.image_profil,
                // this.email = response.data.email,
                this.role = response.data.role
            })
            .catch(error => console.log(error))
        },
        // Transform image into a file
        imageUpload (event) {      
        this.imageUrl = event.target.files[0];
        },
        // Function to display and hide an element
        cacheDisplay(id){
            if(document.getElementById(id).style.display=='none'){
                document.getElementById(id).style.display='initial';
            } else {
                document.getElementById(id).style.display='none';
            }
        },
        // Function to verify that email typo is correct
        validEmail: function (email) {
            var re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            return re.test(email);
        },
        // Function to verify that password typo is correct
        validPassword: function (password) {
            var re = /^(?=.{8,15}$)(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?\W).*$/;
            return re.test(password);
        },
        // Function to send user's modifications on his profile to API
        modifyUser(dataToModify) {
            axios.put('http://localhost:3000/api/users/monprofil' , dataToModify,
                {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                    }
                }
            )
            .then((response) => {
                console.log(response)
                alert('Vos modifications sont bien enregistrées !');
                this.getUser();
                document.getElementById('modify-user').style.display='none';
            })
            .catch( ()=> {
                alert('Oups, Vérifiez votre ancien mot de passe !');
                console.log('Une erreur est survenue');
            })
        },    
        // Function to modify profile
        modifyProfile() {      
            if(confirm("Êtes-vous sûr(e) de vos modification à apporter ?")) {       
                // Create a formData to send the data with the image (in file format)    
                const formData = new FormData();
                if(this.imageUrl) {
                formData.append('image', this.imageUrl);
                }
                formData.append('name', this.name);
                // formData.append('email', this.email);
                formData.append('userId', this.userId);
                // Send the data to API if there is no new password to send
                if(this.password==null || this.password=='' ) { 
                    this.modifyUser(formData)                     
                } else {
                    // If a new password is to be sent
                    // Check that password typo is correct 
                    if(!this.validPassword(this.password)) {
                        alert("Veuillez renseigner un mot de passe valide !");
                    } else {
                        // Send old password for security purposes to API
                        // Send new password to update profile elements
                        formData.append('oldPassword', this.oldPassword);
                        formData.append('password', this.password);
                        this.modifyUser(formData);                      
                    }
                }
            }
        },
        // Function to delete profile and send this deletion to API
        deleteProfile(event) {
            event.preventDefault();
            if(confirm("Vous vous apprêtez à supprimer votre profil. Confirmez-vous la suppression ?")) {
                axios.delete('http://localhost:3000/api/users/monprofil' ,
                    {   
                        data: {
                            userId: this.userId
                        },
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem("token"),
                        }
                    }
                )
                // Clear the local storage (userId and token deleted) and redirection to register page
                .then((response) => {
                    console.log(response);
                    if( this.currentUserId == this.userId || this.currentUserRole == 'Admin') { /* Special message and redirection to Home page if the deleter is the admin who is not on his profile */
                        alert('Le profil a bien été supprimé !');
                        this.$router.push({ name: "Groupomania" });
                        window.location.reload('../App.vue');
                    } else {
                        localStorage.clear();
                        alert('Votre profil a bien été supprimé !');
                        this.$router.push({ name: "Inscription" });
                        window.location.reload('../App.vue');
                    }
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