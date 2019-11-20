<template>
    <div>
        <v-toolbar dark>
            <v-toolbar-title>LOCASPORT</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-toolbar-items>
                <v-btn text>Link 1</v-btn>
                <v-btn text>Link 2</v-btn>
                <v-btn text>Link 3</v-btn>
            </v-toolbar-items>

            <template v-if="$vuetify.breakpoint.smAndUp">
                <v-btn icon>
                    <v-icon>mdi-export-variant</v-icon>
                </v-btn>
                <v-btn icon>
                    <v-icon>mdi-delete-circle</v-icon>
                </v-btn>
                <v-btn icon>
                    <v-icon>mdi-plus-circle</v-icon>
                </v-btn>
            </template>
        </v-toolbar>
        <v-container class="my-5">
            <v-layout row wrap>
                <v-flex xs12 sm6 md4 lg3 v-for="equip in equipement" v-bind:key="equip">
                    <v-card hover class="mx-auto ma-6" max-width="300">
                        <v-img class="white--text align-end" height="200px" :src="require('../assets/ballonBasket.jpg')"></v-img>

                        <v-card-subtitle class="pb-0">{{equip.name}} de {{equip.sport}}</v-card-subtitle>

                        <v-card-text class="text--primary">
                            <div>{{equip.description}}</div>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn color="orange">Réserver</v-btn>
                        </v-card-actions>
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
            selection: 1,
        }),
        methods: {
            reserve() {
                this.loading = true
                setTimeout(() => (this.loading = false), 2000)
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
