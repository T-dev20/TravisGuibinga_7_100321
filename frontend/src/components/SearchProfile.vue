<template>
<div class="row">     
    <div class="col-12">
        <div class="form-inline displayFlexCenter">
            <img alt="Groupomania logo" src="../assets/logo2.png">
            <form class="form-group mt-2 mt-sm-0">            
                <select v-model="idProfileToSee" class="form-control textColorApp">
                    <option value= null>Consulter un profil...</option>
                    <option v-for="user in tableUsers" :key="user.id" :value="user.id">{{user.name}} id n°{{user.id}}</option>
                </select>
                <button @click="getToProfile" class="btn btn-dark m-1 btnBgApp"> Accéder au profil</button>
            </form>
        </div>
    </div>
</div>
</template>