<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <div>
      <btn @click="clickInscription">Inscription</btn>
      <btn @click="clickAccueil">Accueil</btn>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  },
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
