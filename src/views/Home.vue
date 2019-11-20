<template>
  <div class="home">
    <v-btn color="success" class="mr-4" @click="clickInscription">Inscription</v-btn>
    <v-btn color="success" class="mr-4" @click="clickAccueil">Accueil</v-btn>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'home',
  methods: {
    clickInscription () {
      this.$router.push({ name: 'Inscription' })
    },
    clickAccueil () {
      this.$router.push({ name: 'Accueil' })
    }
  }
}
</script>
