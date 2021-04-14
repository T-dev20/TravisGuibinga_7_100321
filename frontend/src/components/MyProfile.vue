<template>   
<div class="card cardGroupomania shadow my-4 py-4">
    <div class="card-text">        
        <form class="form-group text-center mx-5">

            <!--Profile elements  -->
            <div class="displayFlexSpacearound displayFlexSpacearoundResponsiveForProfile" style="align-items:center">
                <div>
                    <p>Mon numéro d'identifiant : {{ userId }}</p>                                                 
                    <p> {{name}} </p>
                    <p>Rôle : {{role}}</p>
                    <!-- <p>{{email}}</p> -->
                    <hr class="separationBar">
                    <div class="displayFlexSpacebetween align-center" v-if="userId === currentUserId || currentUserRole == 'admin'">
                        <button @click="cacheDisplay('modify-user'); getUser()" class="btn btn-warning py-0 mx-2"> 🖊️ </button> Modifier mon profil
                        <button @click="deleteProfile" id="contact_button-delete" class="btn btn-danger py-0 mx-2"> <strong> X </strong> </button> Supprimer mon profil
                    </div>
                </div>
                <div>
                    <div v-if="this.imageUrl !==null">
                        <a :href="imageUrl"><img class="profileImage roundedBorders" :src="imageUrl" :alt="'photo de profil de '+name"></a>
                    </div> 
                </div>
            </div>

            <!-- Profile modification -->
            <div id="modify-user" style="display:none" v-if="userId === currentUserId || currentUserRole == 'admin'">
                <br>
                <br>

                <hr class="separationBar">

                <label for="firstName">Prénom : {{firstName}} </label>
                <p class="font-italic font-weight-light text-white-50"> Modifiez ci-dessous votre Prénom </p>
                <input id="firstName" v-bind:style="border" v-model="firstName" type="text" placeholder="Pierre" class="form-control" required>     
                <br>

                <label for="lastName">Nom : {{lastName}} </label>
                <p class="font-italic font-weight-light text-white-50"> Modifiez ci-dessous votre Nom </p>
                <input id="lastName" v-bind:style="border" v-model="lastName" type="text" placeholder="Dupont" class="form-control" required>  
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