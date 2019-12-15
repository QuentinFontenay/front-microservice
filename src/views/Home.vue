<template>
    <v-container>
        <v-row>
            <v-col :cols="12" lg="5" md="5" offset-lg="3" offset-md="3">
                <h1 class="pb-5">Login</h1>
                <v-form ref="form" lazy-validation v-model="valid">
                    <v-text-field
                            v-model="form.firstName"
                            required
                            filled
                            rounded
                            label="Enter first name"
                            :rules="firstNameRules"
                    ></v-text-field>
                    <v-text-field
                            v-model="form.Password"
                            rounded
                            required
                            filled
                            label="Password"
                            :type="'password'"
                            :rules="PasswordRules"
                    ></v-text-field>
                    <v-btn
                            :disabled="!valid"
                            color="success"
                            class="mr-4"
                            @click="validate"
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
    // @ is an alias to /src
    var apiUrl='http://localhost:3000/users';

    export default {
        data() {
            return {
                t: 0,
                firstName: '',
                firstNameRules: [
                    v => !!v || 'Login is required',
                    v => (v && v.length <= 10) || 'First Name must be less than 10 characters',
                ],
                Password: '',
                PasswordRules: [
                    v => !!v || 'Password is required'
                ],
                user: [],
                show: true,
                valid: false,
                form: {
                    cookie: false,
                }
            };
        },
        methods: {
            clickInscription(){
                this.$router.push('/inscription')
            },

            validate(event) {
                event.preventDefault();

                if (this.$refs.form.validate()) {
                 //   var context = this;
                    console.log("esst");
                }

                apiUrl = apiUrl + '?login=' + this.form.firstName + '&password=' + this.form.Password;
                this.axios.get(apiUrl
                )
                    .then(response => {
                        this.user = response.data;
                        console.log(this.user[0].userId.length);
                        if (this.user[0].userId.length > 0) {
                            this.$router.push({name: 'accueil', params: {idUser: this.user[0].userId}})
                        }
                    }, (error) => {
                        console.log(error);
                    });
            }
        }
    }


</script>
