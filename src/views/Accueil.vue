<template>
    <div>
        <NavBar></NavBar>
        <v-container class="my-5">
            <v-layout row wrap>
                <v-flex xs12 sm6 md4 lg3 v-for="equip in equipement" v-bind:key="equip._id">
                    <v-card @click="clickDetailProduct(equip._id)" hover class="mx-auto ma-6" max-width="300">
                        <v-img class="white--text align-end" height="200px" src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"></v-img>

                        <v-card-title>
                            {{equip.name}} de {{equip.sport}}
                        </v-card-title>
                        <v-card-subtitle>
                            {{equip.prix}}€/jour
                        </v-card-subtitle>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
    import NavBar from "../components/NavBar";
    export default {
        name: "Accueil",
        components: {NavBar},
        data: () => ({
            equipement: [],
            loading: false,
            selected: [],
            show: false,
            selection: 1,
            idClient: '',
            id: 1
        }),
        methods: {
            clickDetailProduct(id) {
                this.$router.push({ name: 'detailProduct', params: { idProduit: id } })
            },
        },
        mounted() {
            this.axios.get('http://localhost:8080/equipement/'
            )
                .then((response) => {
                    this.equipement = response.data
                }, (error) => {
                    console.log(error);
                });
            this.axios.get('http://localhost:8080/client/?idUser=' + localStorage.getItem('idUser')
            )
                .then((response) => {
                    localStorage.setItem('idClient', response.data[0]._id);
                }, (error) => {
                    console.log(error);
                });
        },
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
