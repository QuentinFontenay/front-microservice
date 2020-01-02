<template>
    <div>
        <NavBar></NavBar>
        <v-container class="grey lighten-5">
            <v-row no-gutters>
                <v-col
                        cols="12"
                        sm="6"
                        md="4"
                >
                    <h1>{{ records.name}}</h1>
                    <p>{{records.description}}</p>
                    <img class="rounded-image" :src="getImgUrl(records.image)" alt="image">

                </v-col>
                <v-col
                        cols="12"
                        sm="6"
                        md="4"
                >
                    <h1>{{ records.prix}}€/jour</h1>
                </v-col>
                <v-col
                        cols="6"
                        md="4"
                >
                    <v-card
                            class="mx-auto"
                            max-width="400"
                    >
                        <v-list-item two-line>
                            <v-list-item-content>
                                <v-list-item-title class="headline">Votre commande</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                        <v-divider class="mx-4"></v-divider>
                        <v-card-title>Dates de réservation</v-card-title>
                        <v-card-text>
                            <v-menu
                                    v-model="menu2"
                                    :close-on-content-click="false"
                                    :nudge-right="40"
                                    transition="scale-transition"
                                    offset-y
                                    min-width="290px"
                            >
                                <template v-slot:activator="{ on }">
                                    <v-text-field
                                            v-model="date"
                                            label="Picker without buttons"
                                            prepend-icon="mdi-event"
                                            readonly
                                            v-on="on"
                                    ></v-text-field>
                                </template>
                                <v-date-picker v-model="date" @input="menu2 = false"></v-date-picker>
                            </v-menu>
                        </v-card-text>
                        <v-divider class="mx-4"></v-divider>
                        <v-list-item>
                            <v-list-item-title>Prix de la location: {{records.prix}}€ x 0 jours</v-list-item-title>
                        </v-list-item>

                        <v-list-item>
                            <v-list-item-subtitle>Frais de service LOCASPORT: 0€</v-list-item-subtitle>
                        </v-list-item>
                        <v-divider></v-divider>

                        <v-card-actions>
                            <v-btn text>Commander</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
    import NavBar from "../components/NavBar";
    const API_EQUIPEMENT = 'http://localhost:8080/equipement/';

    export default {
        name: 'DetailProduct',
        components: {NavBar},
        data() {
            return {
                date: new Date().toISOString().substr(0, 10),
                menu: false,
                modal: false,
                menu2: false,
                records: [],
            }
        },
        methods: {
            getImgUrl(iconName) {
                return iconName ? require(`../assets/${iconName}`) : ''
            }
        },
        mounted() {
            this.axios.get(API_EQUIPEMENT + this.$route.params.idProduit)
                .then(response => (this.records = response.data))
        },
    }
</script>

<style scoped>
    .rounded-image {
        border-image: 50% !important;
        border-color: brown !important;
    }
</style>
