<template>
    <div>
        <v-toolbar dark>
            <v-toolbar-title>LOCASPORT</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-toolbar-items>
                <v-btn text>Mes Informations</v-btn>
                <v-btn  @click="clickHistorique" text>Mes Commandes</v-btn>
            </v-toolbar-items>

            <template v-if="$vuetify.breakpoint.smAndUp">
                <v-btn @click="clickDisconnect" icon>
                    <v-icon>mdi-logout</v-icon>
                </v-btn>
            </template>
        </v-toolbar>
        <v-container class="my-5">
            <p>{{idUser}}</p>
            <v-layout row wrap>
                <v-flex xs12 sm6 md4 lg3 v-for="equip in equipement" v-bind:key="equip._id">
                    <v-card hover class="mx-auto ma-6" max-width="300">
                        <v-img class="white--text align-end" height="200px" src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"></v-img>

                        <v-card-title>
                            {{equip.name}} de {{equip.sport}}
                        </v-card-title>
                        <v-card-subtitle>
                            {{equip.prix}}€ la journée
                        </v-card-subtitle>
                        <v-card-actions>
                            <v-btn color="orange" @click="clickCommande(equip._id)">Réserver</v-btn>
                            <v-spacer></v-spacer>
                            <v-btn icon @click="show = !show">
                                <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                            </v-btn>
                        </v-card-actions>
                            <v-expand-transition>
                            <div v-show="show">
                                <v-divider></v-divider>

                                <v-card-text>
                                    {{equip.description}}
                                </v-card-text>
                            </div>
                        </v-expand-transition>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
    export default {
        name: "Accueil",
        data: () => ({
            equipement: [],
            loading: false,
            selected: [],
            show: false,
            selection: 1,
            idClient: '',
            idUser:'',
            id: 1
        }),
        methods: {
            clickCommande (id) {
                console.log(id)
                this.$router.push({ name: 'commande', params: { idProduit: id, idUser: this.idUser } })
            },
            clickHistorique () {
                this.$router.push({ name: 'HistoriqueCommande', params: {idClient: this.idClient}})
            },
            clickDisconnect () {
                this.$router.push('/')
            }
        },
        mounted() {
            this.axios.get('http://localhost:8080/equipement/'
            )
                .then((response) => {
                    this.equipement = response.data
                }, (error) => {
                    console.log(error);
                });
            this.axios.get('http://localhost:8080/client/?idUser=' + this.idUser
            )
                .then((response) => {
                    this.idClient = response.data[0]._id;
                }, (error) => {
                    console.log(error);
                });
        },
        created () {
            this.idUser = this.$route.params.idUser;
        }
    }
</script>

<style scoped>
    #cardSwag {
        font-family: 'Open Sans', sans-serif;

        margin-left: 20px;
        margin-right: 20px;

        display: flex;
        flex-direction: row;
    }
</style>
