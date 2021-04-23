<template>
  <div class="bloc-modale">
    <div class="overlay" @click="toggleModifyModale"></div>
    <div class="modale card">
      <div @click="toggleModifyModale" class="btn-modale btn btn-danger">X</div>
      <form>
        <div class="form-group">
          <label :for="modifPost.idPost + 'inputNewMessage'">Entrez un nouveau texte <p v-show="false"></label>
          <textarea
            type="texte"
            class="form-control"
            rows="8"
            :id="modifPost.idPost + 'inputNewtexte'"
            v-model="newPost.newtexte"
          />
        </div>
        <label :for="modifPost.idPost + 'inputFile'" v-show="false">Entrez une nouvelle image :</label>
        <input
          name="inputFile"
          type="file"
          :id="modifPost.idPost + 'inputFile'"
          @change="onFileChange"
        />
        <button
          @click="modifyPost"
          type="button"
          class="p-2 m-2 btn btn-success w-50"
        >
          Valider
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";

export default {
  name: "ModaleModify",
  props: {
    modifPost: {
      type: Object,
      texte: String,
      image: String,
    },
  },
  data() {
    return {
      newPost: {
        type: Object,
        newtexte: this.modifPost.texte,
        newImage: this.modifPost.image,
      },
      msgError: "",
    };
  },
  computed: {
    ...mapState(["User"]),
  },
  methods: {
    modifyPost() {
      console.log(this.User.userID);

      const fd = new FormData();

      fd.append(
        "image",
        this.newPost.newImage
      );
      fd.append("newtexte", this.newPost.newtexte);
      fd.append("userOrder", this.User.userID);
      fd.append("userId", this.modifPost.userId);

      let userId = localStorage.getItem("userId");

      axios
        .put("http://localhost:3000/api/posts/" + userId, fd)

        .then((response) => {
          this.toggleModifyModale();
          console.log("reponse de modifyPost  " + response);
        })
        .catch((err) => {
          console.log("err modifyPost  " + err);
        });
    },
    toggleModifyModale() {
      let showModaleModify = false;
      console.log(showModaleModify);
      this.$emit("ModaleModify", showModaleModify);
    },

    onFileChange(event) {
      console.log(event);
      this.newPost.newImage = event.target.files[0];
      console.log(this.newPost.newImage);
    },
  },
};
</script>

<style scoped>
.card {
  min-width: 60% !important;
}
</style>