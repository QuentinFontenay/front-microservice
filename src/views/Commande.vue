<template>
    <v-container>
        <v-stepper v-model="e1">
            <v-stepper-header>
                <v-stepper-step :complete="e1 > 1" step="1">Vos Coordonnées</v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step :complete="e1 > 2" step="2">Paiement</v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step step="3">Récapitulatif</v-stepper-step>
            </v-stepper-header>

            <v-stepper-items>
                <v-stepper-content step="1">
                    <v-form v-model="valid" lazy-validation ref="form">
                        <v-text-field
                                v-model="name"
                                label="Nom"
                                required
                                :rules="nameRules"

                        >Test</v-text-field>
                        <v-text-field
                                v-model="email"
                                label="E-mail"
                                required
                                :rules="mailRules"
                        ></v-text-field>
                        <v-text-field
                                v-model="adresse"
                                label="Adresse"
                                required
                                :rules="adresseRules"
                        ></v-text-field>
                        <v-text-field
                                v-model="telephone"
                                label="Téléphone"
                                required
                                :rules="telRules"
                        ></v-text-field>
                    </v-form>

                    <v-btn :disabled="!valid" color="primary" style="margin-top: 1%" @click="clickForm">
                        Continue
                    </v-btn>

                    <v-btn style="margin-top: 1%" text>Cancel</v-btn>
                </v-stepper-content>

                <v-stepper-content step="2">
                    <v-card>

                        <v-card-title
                                class="blue darken-1 white--text font-weight-black title"
                        >
                            DETAILS<br>
                            PAIEMENT
                            <v-spacer></v-spacer>

                            <v-img
                                    aspect-ratio="3.075" max-height="40" :src="URL_IMAGE" position="right" contain
                            />
                        </v-card-title>

                        <v-card-text class='pb-10'>
                            <v-row>
                                <v-col cols='6'>
                                    <v-subheader class="grey--text text--lighten-1 pl-0 subheader">TITULAIRE DE LA CARTE
                                    </v-subheader>
                                    <v-text-field
                                            single-line outlined label="Johny Relative" hide-details
                                    />
                                </v-col>

                                <v-col cols='6'>
                                    <v-subheader class="grey--text text--lighten-1 pl-0 subheader">NUMERO DE CARTE
                                    </v-subheader>
                                    <v-text-field
                                            single-line outlined mask="credit-card" v-model="valueOfCardNumber"
                                            hide-details
                                    />
                                </v-col>

                                <v-col col='4'>
                                    <v-subheader class="grey--text text--lighten-1 pl-0 subheader">DATE D'EXPIRATION
                                    </v-subheader>
                                    <v-select
                                            :items="MonthList" label="Mois" outlined
                                            append-icon='mdi-chevron-down' hide-details
                                    />
                                </v-col>

                                <v-col col='4'>
                                    <v-subheader class="grey--text text--lighten-1 pl-0 subheader"></v-subheader>
                                    <v-select
                                            :items="YearList" label="Année" outlined
                                            append-icon='mdi-chevron-down' hide-details
                                    />
                                </v-col>

                                <v-col col='4'>
                                    <v-subheader class="grey--text text--lighten-1 pl-0 subheader">CVV</v-subheader>
                                    <v-text-field single-line outlined hide-details/>
                                </v-col>

                            </v-row>
                        </v-card-text>

                    </v-card>
                    <div class="group-bouton">
                        <v-btn
                                color="primary"
                                @click="e1 = 3"
                        >
                            Continue
                        </v-btn>

                        <v-btn
                                color="error"
                                @click="e1 = 1"
                        >
                            Retour
                        </v-btn>

                        <v-btn text>Cancel</v-btn>
                    </div>
                </v-stepper-content>

                <v-stepper-content step="3">
                    <v-card
                            class="mb-12"
                            height="200px"
                    >
                        <v-card-title>Récapitulatif de votre commande</v-card-title>
                        <v-content>
                            <v-simple-table>
                                <template v-slot:default>
                                    <thead>
                                    <tr>
                                        <th class="text-left">Nom de l'equipement</th>
                                        <th class="text-left">Sport</th>
                                        <th class="text-left">Nombre de journée</th>
                                        <th class="text-left">Prix</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>{{ records.name}}</td>
                                        <td>{{ records.sport }}</td>
                                        <td>1</td>
                                        <td>{{ records.prix}}€</td>
                                    </tr>
                                    </tbody>
                                </template>
                            </v-simple-table>
                        </v-content>
                    </v-card>

                    <v-btn
                            color="primary"
                            @click="postClient"
                    >
                        Valider
                    </v-btn>

                    <v-btn
                            color="error"
                            @click="e1 = 2"
                    >
                        Retour
                    </v-btn>

                    <v-btn text>Cancel</v-btn>
                </v-stepper-content>
            </v-stepper-items>
        </v-stepper>
    </v-container>
</template>

<script>
    const URL_IMAGE = 'https://i.imgur.com/lY1wk82.png';
    const API_EQUIPEMENT = 'http://localhost:8080/equipement/';
    const API_CLIENT = 'http://localhost:8080/client/';
    const API_CLIENT2 = 'http://localhost:8080/client/?idUser=';
    const API_COMMANDE = 'http://localhost:8080/commande/';

    export default {
        name: "Commande",
        data () {
            return {
                URL_IMAGE: URL_IMAGE,
                YearList: ['2019', '2020', '2021', '2022', '2023', '2024', '2025'],
                valueOfCardNumber: '0000-0000-0000-0000',
                MonthList: [
                    "Janvier",
                    "Février",
                    "Mars",
                    "Avril",
                    "Mai",
                    "Juin",
                    "Juillet",
                    "Aout",
                    "Septembre",
                    "Octobre",
                    "Novembre",
                    "Decembre"
                ],
                e1: 0,
                records: [],
                client: [],
                valid: true,
                name: '',
                nameRules: [
                    v => !!v || 'Un nom est requis'
                ],
                email: '',
                mailRules: [
                    v => !!v || 'Un mail est requis'
                ],
                adresse: '',
                adresseRules: [
                    v => !!v || 'Une adresse est requis'
                ],
                telephone: '',
                telRules: [
                    v => !!v || 'Un télèphone est requis'
                ],
                select: null,
                items: [
                    'Item 1',
                    'Item 2',
                    'Item 3',
                    'Item 4',
                ],
                checkbox: false,
                idUser: '',
            }
        },
        created: function () {
            this.recupEquipement();
            this.recupClient();
        },
        methods: {
            clickForm() {
                if (this.$refs.form.validate()) {
                    this.e1 = 2
                }
            },
            postClient: function () {
                var today = new Date()
                var date = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();
                var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                var dateTime = date+' '+time;

                if (this.client != null) {

                    this.axios.put(API_CLIENT + this.client[0]._id, {
                        name: this.name,
                        email: this.email,
                        adresse: this.adresse,
                        telephone: this.telephone,
                        idUser: this.$route.params.idUser
                    })
                }
                else {
                    this.axios.post(API_CLIENT, {
                        name: this.name,
                        email: this.email,
                        adresse: this.adresse,
                        telephone: this.telephone,
                        idUser: this.$route.params.idUser
                    })
                    this.client = this.recupClient()
                }
                this.axios.post(API_COMMANDE, {
                    dateCommande: dateTime,
                    idClient: this.client[0]._id,
                    idEquipement: this.$route.params.idProduit
                })
                this.$router.push({ name: 'accueil'})
            },
            recupEquipement() {
                this.axios.get(API_EQUIPEMENT + this.$route.params.idProduit)
                    .then(response => (this.records = response.data))
            },
            recupClient() {
                console.log(this.$route.params.idUser);
                this.axios.get(API_CLIENT2 + this.$route.params.idUser
                )
                    .then(
                        response => {
                            this.client = response.data
                            if (this.client.length !== 0) {
                                this.name = this.client[0].name
                                this.email = this.client[0].email
                                this.telephone = this.client[0].telephone
                                this.adresse = this.client[0].adresse
                            }
                        }, (error) => {
                            console.log(error);
                        });
            },
        },
    }
</script>

<style scoped>
    .group-bouton {
        margin-top: 1%;
    }
</style>
