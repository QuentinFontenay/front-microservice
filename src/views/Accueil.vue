<template>
    <div>
        <NavBar></NavBar>
        <v-container class="my-5">
            <v-layout row wrap>
                <v-flex xs12 sm6 md4 lg3 v-for="equip in equipement" v-bind:key="equip._id">
                    <v-card @click="clickDetailProduct(equip._id)" hover class="mx-auto ma-6">
                        <v-img class="white--text align-end" aspect-ratio="1" max-height="200" contain :src="getImgUrl(equip.image)"></v-img>

                        <v-card-title class="equipName">
                            {{equip.name}}
                        </v-card-title>
                        <v-card-subtitle>
                            {{equip.sport}}
                        </v-card-subtitle>
                        <v-card-title>
                            {{equip.prix}}€/jour
                        </v-card-title>
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
            getImgUrl(iconName) {
                return iconName ? require(`../assets/${iconName}`) : ''
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
    .equipName {
        font-size: 14px;
    }
</style>
