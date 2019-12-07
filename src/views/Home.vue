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
                    <v-btn color="success" class="mr-4" @click="clickAccueil">Accueil</v-btn>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    // @ is an alias to /src
    var apiUrl='http://localhost:3000/users/connexion';

    export default {
        data() {
            return {
                firstName: '',
                firstNameRules: [
                    v => !!v || 'Login is required',
                    v => (v && v.length <= 10) || 'First Name must be less than 10 characters',
                ],
                Password: '',
                PasswordRules: [
                    v => !!v || 'Password is required'
                ],

                show: true,
                valid: true,
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
                var con = false;


                event.preventDefault()
                if (this.$refs.form.validate()) {
                    this.snackbar = true
                    //var context = this
                    console.log(this.form.firstName)
                    console.log(this.form.Password)
                }

                apiUrl = apiUrl + '/' + this.form.firstName + '/' + this.form.Password;
                //var jsonContent = JSON.stringify({"login": this.form.firstName, "password": this.form.Password});
                /*const Http = new XMLHttpRequest();
                console.log(apiUrl);
                Http.open("GET", apiUrl);
                Http.setRequestHeader("Content-Type", "application/json");
                //Http.responseType = 'json';
                Http.send(null);
                console.log(Http.status);
                console.log(Http.response);
                if(Http.readyState==0){
                    console.log('fuck')
                }
                if(Http.readyState==4){
                    console.log("Requête terminé");
                }*/
                this.axios.get(apiUrl).then(response =>(console.log(response.data)));
                if (con == true){
                    this.$router.push('/accueil')
                }


            }

        }
    }


</script>
