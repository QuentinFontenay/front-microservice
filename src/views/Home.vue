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
    clickInscription (event) {
      event.preventDefault()
      this.$router.push('/inscription')
    },
    clickAccueil (event) {
      event.preventDefault()
      this.$router.push('/accueil')
    }
  }
}
</script>
