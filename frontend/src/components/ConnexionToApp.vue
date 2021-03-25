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
                        <label for="email-inscription">Adresse e-mail</label>
                        <input id="email-inscription" v-bind:style="border" v-model="email" type="email" placeholder="email@gmail.com" class="form-control" required>  
                        <br>

                        <label for="mpasse-inscription">Mot de passe</label>
                        <input id="mpasse-inscription" v-bind:style="border" v-model="password" type="password" placeholder="Motdepasse!1" class="form-control" required>  
                        <br>

                        <!-- Connexion button -->
                        <p class="card-text text-center inline">
                            <button @click="checkForm" id="contact_button-inscription" class="btn font-weight-bold toClick" type="submit"><div class="h4">Se connecter</div></button>
                        </p>                         
                    </form>                    
                </div>
            </div>
        </div>             
    </div>
</template>