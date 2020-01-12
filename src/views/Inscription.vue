<template>
    <v-container>
        <v-row>
            <v-col :cols="12" lg="5" md="5" offset-lg="3" offset-md="3">
                <h1 class="pb-5">Inscription</h1>
                <v-alert v-if="errorInscription" class="error" type="error">
                    {{erreurMessage}}
                </v-alert>
                <v-form ref="form" @submit.prevent="validInscription">
                    <v-text-field
                            class="login-input"
                            v-model="identif"
                            required
                            filled
                            rounded
                            label="Pseudo"
                    ></v-text-field>
                    <v-text-field
                            class="password-input"
                            v-model="mdp"
                            rounded
                            required
                            filled
                            label="Password"
                            :type="'password'"
                    ></v-text-field>
                    <v-text-field
                            class="password-input"
                            v-model="mdp_check"
                            rounded
                            required
                            filled
                            label="Confirmation password"
                            :type="'password'"
                    ></v-text-field>
                    <v-text-field
                            class="login-input"
                            v-model="prenom"
                            required
                            filled
                            rounded
                            label="Prénom"
                    ></v-text-field>
                    <v-text-field
                            class="login-input"
                            v-model="nom"
                            required
                            filled
                            rounded
                            label="Nom"
                    ></v-text-field>
                    <v-text-field
                            class="login-input"
                            v-model="email"
                            required
                            filled
                            rounded
                            label="Email"
                            type="email"
                    ></v-text-field>
                    <v-btn
                            type="submit"
                            color="success"
                            class="mr-4 tefr"
                    >
                        S'inscrire
                    </v-btn>
                </v-form>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
    const API_USER = 'http://localhost:3000/users';

    export default {
        name: "Inscription",
        data () {
            return {
                erreurMessage: 'Les mots de passe doivent correspondre',
                identif: null,
                mdp: null,
                mdp_check: null,
                prenom: null,
                nom: null,
                email: null,
                errorInscription: false
            }
        },
        methods: {
            validInscription(event) {
                event.preventDefault();
                if (this.mdp !== this.mdp_check){
                    this.errorInscription = true;
                }
                else {
                    try{
                        this.axios.post(API_USER, {
                            login: this.identif,
                            password: this.mdp,
                            nom: this.nom,
                            prenom: this.prenom,
                            email: this.email,
                        });
                        this.$router.push('/')
                    }
                    catch {
                        console.log("erreur lors de la requete API")
                    }
                }
            },
        }
    }
</script>

<style scoped>

</style>
