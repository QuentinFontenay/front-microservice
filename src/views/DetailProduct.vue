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
                                    v-model="menu1"
                                    :close-on-content-click="false"
                                    :nudge-right="40"
                                    transition="scale-transition"
                                    offset-y
                                    min-width="290px"
                            >
                                <template v-slot:activator="{ on }">
                                    <v-text-field
                                            v-model="maCommande.dateDebut"
                                            label="Début"
                                            prepend-icon="mdi-calendar"
                                            readonly
                                            v-on="on"
                                    ></v-text-field>
                                </template>
                                <v-date-picker locale="fr-fr" v-model="maCommande.dateDebut" @input="menu1 = false"></v-date-picker>
                            </v-menu>
                        </v-card-text>
                        <v-icon class="iconFleche">mdi-arrow-down</v-icon>
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
                                            v-model="maCommande.dateFin"
                                            label="Fin"
                                            prepend-icon="mdi-calendar"
                                            readonly
                                            v-on="on"
                                    ></v-text-field>
                                </template>
                                <div v-if="maCommande.dateDebut === null">
                                    <span>Veuillez d'abord selectionner une date de début</span>
                                </div>
                                <div v-else>
                                    <v-date-picker :min="getDateMin(maCommande.dateDebut)" locale="fr-fr" v-model="maCommande.dateFin" @input="menu2 = false"></v-date-picker>
                                </div>
                            </v-menu>
                        </v-card-text>
                        <v-divider class="mx-4"></v-divider>
                        <v-list-item>
                            <v-list-item-title>Prix de la location: {{records.prix}}€ x {{getDateDiff()}} jours</v-list-item-title>
                        </v-list-item>

                        <v-list-item>
                            <v-list-item-subtitle>Frais de service LOCASPORT: {{getFraisService()}}€</v-list-item-subtitle>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-title>TOTAL A PAYER: {{getTotal()}}€</v-list-item-title>
                        </v-list-item>
                        <v-divider></v-divider>

                        <v-card-actions>
                            <v-btn @click="clickCommande()" text>Commander</v-btn>
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
                modal: false,
                menu2: false,
                menu1: false,
                records: [],
                maCommande: {
                    nbJour: 0,
                    fraisService: 0,
                    dateDebut: null,
                    dateFin: null
                },
            }
        },
        methods: {
            getImgUrl(iconName) {
                return iconName ? require(`../assets/${iconName}`) : ''
            },
            getDateDiff() {
                if (this.maCommande.dateDebut === null || this.maCommande.dateFin === null) {
                    return this.maCommande.nbJour;
                }
                else {
                    let d1 = this.$moment(this.maCommande.dateDebut);
                    let d2 = this.$moment(this.maCommande.dateFin);
                    this.maCommande.nbJour = d2.diff(d1, 'days');
                    return this.maCommande.nbJour
                }
            },
            getFraisService() {
                this.maCommande.fraisService = (this.maCommande.nbJour * this.records.prix) * 0.05;
                return this.maCommande.fraisService
            },
            getTotal() {
                return this.maCommande.fraisService + (this.maCommande.nbJour * this.records.prix)
            },
            getDateMin(dateDebut) {
                let date = this.$moment(dateDebut);
                return date.add(1, 'days').format('YYYY-MM-DD')
            },
            clickCommande () {
                if (this.maCommande.dateDebut === null || this.maCommande.dateFin === null) {
                    alert("Selectionnez les dates de début et de fin de location")
                }
                else {
                    this.$router.push({ name: 'commande', params: { idProduit: this.records._id, maCommande: this.maCommande } })
                }
            },
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
    .iconFleche {
        margin-left: 44%;
    }
</style>
