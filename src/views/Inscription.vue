<template style="background-color: white">
<div style="background-color: white; color: black; margin: 300px; margin-top:200px">
    <form @submit="validInscription" style="padding: 50px">
        <h2 style="position: center">Inscription</h2><br>
        <input type="text" class="champ" name="identif" id="identif" v-model="identif" required placeholder="Identifiant" style="border: 1px solid cornflowerblue;padding: 2px; border-radius: 3px;"><br><br>

        <input type="password" class="champ" name="mdp" id="mdp" v-model="mdp" required placeholder="Mot de passe" style="border: 1px solid cornflowerblue;padding: 2px; border-radius: 3px;"><br><br>
        <input type="password" class="champ" name="mdp_check" id="mdp_check" v-model="mdp_check" required placeholder="Confirmation" style="border: 1px solid cornflowerblue;padding: 2px; border-radius: 3px;"><br><br>

        <input type="text" class="champ" name="prenom" id="prenom" v-model="prenom" required placeholder="Prénom" style="border: 1px solid cornflowerblue;padding: 2px; border-radius: 3px;"><br><br>
        <input type="text" class="champ" name="nom" id="nom" v-model="nom" required placeholder="Nom" style="border: 1px solid cornflowerblue;padding: 2px; border-radius: 3px;"><br><br>
        <input type="email" class="champ" name="email" id="email" v-model="email" required placeholder="Email" style="border: 1px solid cornflowerblue;padding: 2px; border-radius: 3px;"><br><br>
        <button type="submit" value="Valider" id="contact-submit" style="border:1px solid cornflowerblue; padding: 15px; padding-top: 5px; padding-bottom: 5px; border-radius:10px; background-color: cornflowerblue;color: white">Valider</button>
    </form>
</div>
</template>
<script>
    var apiUrl='http://localhost:3000/users';

    export default {
        name: "Inscription",
        data () {
            return {
                identif: null,
                mdp: null,
                mdp_check: null,
                prenom: null,
                nom: null,
                email: null
            }
        },
        methods: {
            validInscription(event) {
                event.preventDefault()
                var confirm_password = document.getElementById("mdp_check");
                if (this.mdp!= this.mdp_check){
                    confirm_password.setCustomValidity("Les mots de passe doivent correspondre");
                }
                else {
                    try{
                        var jsonContent = JSON.stringify({"login": this.identif, "password": this.mdp, "prenom": this.prenom, "nom": this.nom, "email" :this.email});
                        console.log(jsonContent);
                        const Http = new XMLHttpRequest();
                        Http.open("POST", apiUrl);
                        Http.setRequestHeader("Content-Type", "application/json");
                        Http.send(jsonContent);
                        //this.$router.push('/')
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
