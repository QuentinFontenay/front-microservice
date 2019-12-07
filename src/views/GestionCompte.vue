<template>
    <div>
        <v-toolbar dark>
            <v-toolbar-title>
                <router-link to="/accueil" class="toolbar-title">LOCASPORT</router-link>
            </v-toolbar-title>

            <v-spacer></v-spacer>

            <v-toolbar-items>
                <v-btn text>Mes Informations</v-btn>
                <v-btn text>Mes Commandes</v-btn>
            </v-toolbar-items>

            <template v-if="$vuetify.breakpoint.smAndUp">
                <v-btn icon>
                    <v-icon>mdi-logout</v-icon>
                </v-btn>
            </template>
        </v-toolbar>
        <v-content>
            <v-container>
                <v-simple-table>
                    <template v-slot:default>
                        <thead>
                        <tr>
                            <th class="text-left">Date de commande</th>
                            <th class="text-left">Nom de l'equipement</th>
                            <th class="text-left">Sport</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="item in equipement" :key="item._id">
                            <td>{{ item.dateCommande}}</td>
                            <td>{{ item.name }}</td>
                            <td>{{ item.sport }}</td>
                        </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </v-container>
        </v-content>
    </div>
</template>

<script>

    export default {
        name: "GestionCompte",
        data: () => ({
            item: 0,
            commande: [],
            equipement: [],
            displayEquip: [],
            url: ""
        }),
        mounted() {
            this.axios.get('http://localhost:8080/commande/'
            )
                .then((response) => {
                    this.commande = response.data
                    for (let i = 0; i < this.commande.length; i++) {
                        this.axios.get('http://localhost:8080/equipement/'+ this.commande[i].idEquipement)
                            .then((response) => {
                                Object.assign(response.data, {
                                    dateCommande: this.commande[i].dateCommande
                                });
                                this.equipement.push(response.data)
                            }, (error) => {
                                console.log(error);
                            });
                    }
                }, (error) => {
                    console.log(error);
                });
        },
    }
</script>

<style scoped>
    .toolbar-title {
        color: white;
        text-decoration: none;
    }
</style>
