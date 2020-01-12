<template>
    <v-container>
        <v-row>
            <v-col :cols="12" lg="5" md="5" offset-lg="3" offset-md="3">
                <h1 class="pb-5">Login</h1>
                <v-alert v-if="errorLogin" class="error" type="error">
                    {{erreurMessage}}
                </v-alert>
                <v-form ref="form" @submit.prevent="validate" lazy-validation v-model="valid">
                    <v-text-field
                            class="login-input"
                            v-model="firstName"
                            required
                            filled
                            rounded
                            label="Enter first name"
                            :rules="firstNameRules"
                    ></v-text-field>
                    <v-text-field
                            class="password-input"
                            v-model="Password"
                            rounded
                            required
                            filled
                            label="Password"
                            :type="'password'"
                            :rules="PasswordRules"
                    ></v-text-field>
                    <v-btn
                            type="submit"
                            :disabled="!valid"
                            color="success"
                            class="mr-4 tefr"
                    >
                        Validate
                    </v-btn>
                </v-form>
              <br>
                <div class="home">
                    <v-btn color="success" class="mr-4" @click="clickInscription">Inscription</v-btn>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>

    const API_LOGIN ='http://localhost:3000/users';

    export default {
        data() {
            return {
                erreurMessage: 'Le login ou le mot de passe est incorrect',
                firstName: '',
                firstNameRules: [
                    v => !!v || 'Login is required'
                ],
                Password: '',
                PasswordRules: [
                    v => !!v || 'Password is required'
                ],
                user: [],
                show: true,
                valid: true,
                errorLogin: false
            };
        },
        methods: {
            clickInscription(){
                this.$router.push('/inscription')
            },

            validate() {
                var apiUrl = API_LOGIN + '?login=' + this.firstName + '&password=' + this.Password;
                this.axios.get(apiUrl
                )
                    .then(response => {
                        this.user = response.data;
                        if (response.status === 200) {
                            this.$store.dispatch("login", {
                                email: this.firstName,
                                password: this.password
                            }).then(() => {
                                localStorage.setItem('idUser', response.data[0].userId);
                                this.$router.push({name: 'accueil'})
                            });
                        }
                        else {
                            this.errorLogin = true
                        }
                    }, (error) => {
                        console.log(error);
                    });
            }
        }
    }


</script>
