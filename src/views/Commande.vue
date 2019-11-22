<template>
    <v-container>
    <v-stepper v-model="e1">
        <v-stepper-header>
            <v-stepper-step :complete="e1 > 1" step="1">Coordonnées</v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step :complete="e1 > 2" step="2">Paiement</v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step step="3">Chier dans le bus</v-stepper-step>
        </v-stepper-header>

        <v-stepper-items>
            <v-stepper-content step="1">
                <form>
                    <v-text-field
                            v-model="name"
                            :error-messages="nameErrors"
                            label="Nom"
                            required
                            @input="$v.name.$touch()"
                            @blur="$v.name.$touch()"
                    ></v-text-field>
                    <v-text-field
                            v-model="email"
                            :error-messages="emailErrors"
                            label="E-mail"
                            required
                            @input="$v.email.$touch()"
                            @blur="$v.email.$touch()"
                    ></v-text-field>
                    <v-text-field
                            v-model="adresse"
                            :error-messages="emailErrors"
                            label="Adresse"
                            required
                            @input="$v.email.$touch()"
                            @blur="$v.email.$touch()"
                    ></v-text-field>
                    <v-text-field
                            v-model="telephone"
                            :error-messages="emailErrors"
                            label="Téléphone"
                            required
                            @input="$v.email.$touch()"
                            @blur="$v.email.$touch()"
                    ></v-text-field>
<!--                    <v-select-->
<!--                            v-model="select"-->
<!--                            :items="items"-->
<!--                            :error-messages="selectErrors"-->
<!--                            label="Item"-->
<!--                            required-->
<!--                            @change="$v.select.$touch()"-->
<!--                            @blur="$v.select.$touch()"-->
<!--                    ></v-select>-->
                </form>

                <v-btn
                        color="primary"
                        @click="e1 = 2"
                >
                    Continue
                </v-btn>

                <v-btn text>Cancel</v-btn>
            </v-stepper-content>

            <v-stepper-content step="2">
                <v-row align="center">
                    <v-row justify="space-around">
                        <v-switch v-model="valid" class="ma-4" label="Valid" readonly></v-switch>
                        <v-switch v-model="lazy" class="ma-4" label="Lazy"></v-switch>
                    </v-row>
                    <v-form
                            ref="form"
                            v-model="valid"
                            :lazy-validation="lazy"
                    >
                        <v-text-field
                                v-model="name"
                                :counter="10"
                                :rules="nameRules"
                                label="Name"
                                required
                        ></v-text-field>

                        <v-text-field
                                v-model="email"
                                :rules="emailRules"
                                label="E-mail"
                                required
                        ></v-text-field>

                        <v-select
                                v-model="select"
                                :items="items"
                                :rules="[v => !!v || 'Item is required']"
                                label="Item"
                                required
                        ></v-select>

                        <v-checkbox
                                v-model="checkbox"
                                :rules="[v => !!v || 'You must agree to continue!']"
                                label="Do you agree?"
                                required
                        ></v-checkbox>

                        <v-btn
                                :disabled="!valid"
                                color="success"
                                class="mr-4"
                                @click="validate"
                        >
                            Validate
                        </v-btn>

                        <v-btn
                                color="error"
                                class="mr-4"
                                @click="reset"
                        >
                            Reset Form
                        </v-btn>

                        <v-btn
                                color="warning"
                                @click="resetValidation"
                        >
                            Reset Validation
                        </v-btn>
                    </v-form>
                </v-row>

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
            </v-stepper-content>

            <v-stepper-content step="3">
                <v-card
                        class="mb-12"
                        color="grey lighten-1"
                        height="200px"
                ></v-card>

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
    var postClient = 'http://localhost:8080/client/';
    var getProduit = 'http://localhost:8080/produit/' + this.$route.params.idProduit;

    import {validationMixin} from 'vuelidate'
    import {email, maxLength, required} from 'vuelidate/lib/validators'

    export default {
        mixins: [validationMixin],

        validations: {
            name: { required, maxLength: maxLength(10) },
            email: { required, email },
            select: { required },
            checkbox: {
                checked (val) {
                    return val
                },
            },
        },

        $_veeValidate: {
            validator: 'new',
        },

        name: "Commande",

        data () {
            return {
                e1: 0,
                name: '',
                email: '',
                adresse: '',
                telephone: '',
                select: null,
                items: [
                    'Item 1',
                    'Item 2',
                    'Item 3',
                    'Item 4',
                ],
                checkbox: false,
            }
        },

        created: function () {
            this.recupUser()
        },

        computed: {
            // selectErrors () {
            //     const errors = []
            //     if (!this.$v.select.$dirty) return errors
            //     !this.$v.select.required && errors.push('Item is required')
            //     return errors
            // },
            nameErrors () {
                const errors = []
                if (!this.$v.name.$dirty) return errors
                !this.$v.name.required && errors.push('Name is required.')
                return errors
            },
            emailErrors () {
                const errors = []
                if (!this.$v.email.$dirty) return errors
                !this.$v.email.email && errors.push('Must be valid e-mail')
                !this.$v.email.required && errors.push('E-mail is required')
                return errors
            },
        },

        methods: {
            postClient: function () {
                this.axios.post(postClient, {
                    name: this.name,
                    email: this.email,
                    adresse: this.adresse,
                    telephone: this.telephone
                })
            },

            recupUser() {
                this.axios.get(getProduit)
                    .then(response => (this.records = response.data.records))
            }
        },
    }
</script>

<style scoped>

</style>
