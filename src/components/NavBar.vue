<template>
    <v-toolbar dark>
        <v-toolbar-title>
            <router-link to="/accueil" class="toolbar-title">LOCASPORT</router-link>
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <v-toolbar-items>
            <v-btn text>Mes Informations</v-btn>
            <v-btn  @click="clickHistorique" text>Mes Commandes</v-btn>
        </v-toolbar-items>

        <template v-if="$vuetify.breakpoint.smAndUp">
            <v-btn v-if="isLoggedIn" @click="clickDisconnect" icon>
                <v-icon>mdi-logout</v-icon>
            </v-btn>
        </template>
    </v-toolbar>
</template>

<script>
    export default {
        name: "NavBar",
        methods: {
            clickHistorique () {
                this.$router.push({ name: 'HistoriqueCommande'})
            },
            clickDisconnect () {
                this.$store.dispatch('logout');
                localStorage.clear();
                this.$router.push('/')
            }
        },
        computed: {
            isLoggedIn() {
                return this.$store.getters.isLoggedIn;
            }
        }
    }
</script>

<style scoped>
    .toolbar-title {
        color: white;
        text-decoration: none;
    }
</style>
