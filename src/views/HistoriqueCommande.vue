<template>
    <div>
        <NavBar></NavBar>
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
    import NavBar from "../components/NavBar";
    const API_COMMANDE = "http://localhost:8080/commande/?idClient=";
    const API_EQUIPEMENT = "http://localhost:8080/equipement/";
    export default {
        name: "GestionCompte",
        components: {NavBar},
        data: () => ({
            item: 0,
            commande: [],
            equipement: [],
            displayEquip: [],
            url: ""
        }),
        mounted() {
            this.axios.get(API_COMMANDE + localStorage.getItem('idClient')
            )
                .then((response) => {
                    this.commande = response.data
                    for (let i = 0; i < this.commande.length; i++) {
                        this.axios.get(API_EQUIPEMENT + this.commande[i].idEquipement)
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
</style>
