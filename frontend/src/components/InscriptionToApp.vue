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

                        <label for="fullName">Nom complet</label>
                        <input id="fullName" v-bind:style="border" v-model="fullName" type="text" placeholder="Pierre" class="form-control" required>     
                        <br>

                        <label for="email-inscription">Adresse e-mail</label>
                        <input id="email-inscription" v-bind:style="border" v-model="email" type="email" placeholder="email@gmail.com" class="form-control" required>  
                        <br>

                        <label for="mpasse-inscription">Mot de passe</label>
                        <!-- <p v-if="!this.validPassword(this.password) || !this.password" class="font-italic font-weight-light text-white-50">Doit contenir entre 8 et 15 caractères, des minuscules et majuscules, au moins un chiffre et un caractère spécial </p> -->
                        <input id="mpasse-inscription" v-bind:style="border" v-model="password" type="password" placeholder="Motdepasse!1" class="form-control" required>  
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