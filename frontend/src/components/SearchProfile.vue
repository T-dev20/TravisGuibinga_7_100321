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

<script>
import axios from 'axios'

export default {
name: 'SearchProfile',
    data() {
        return {
            tableUsers: [],
            idProfileToSee: null
        }
    },    
    mounted() {
        // Get all users from API
        axios.get('http://localhost:3000/api/auth/', {
            headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
        .then((response) => {
            this.tableUsers = response.data; 
        })
        .catch(error => console.log(error)) 
    },
    methods: {
        getToProfile (event) {
            event.preventDefault();  
            if(this.idProfileToSee){  
                localStorage.setItem("userIdToSee", this.idProfileToSee);
                this.$router.push({ name: "ProfileConsulting" });
            } else {
                alert("Vous n'avez pas sélectionné d'utilisateur à consulter !")
            }
        }
    }   
}
</script>