<template>
    
    <v-container fluid fill-height class="home-hero" style="max-height: 100vh;">
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        
        <v-layout justify-center align-center column pa-5>
            <div class="display-3 font-weight-thin white--text text-xs-center">
                With NUS FoodChope
            </div>
            <br>
            <div
                class="display-3 font-weight-black white--text text-xs-center mb-3"
            >
                <vue-typed-js :strings="['save meals', 'save food waste', 'save time']" :loop="true" :typeSpeed="75" :backSpeed="30" :smartBackspace="true">
                <h3>You can <span class="typing"></span></h3>
                </vue-typed-js>
            </div>
            <div class="display-1 font-weight-regular white--text text-xs-center">
                By taking ownership of your food at RCs.
            </div>
            <v-btn fab class="mt-5 teal lighten-2">
                <span class="material-icons md-dark md-inactive">arrow_downward</span>
            </v-btn>
        </v-layout>
    </v-container>

</template>

<script>
export default {
    name: 'MenuHero'
};
</script>

<style scoped>

.home-hero {
    background-image: linear-gradient(to bottom,rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.75)), url('http://source.unsplash.com/0BhSKStVtdM');
    background-size: cover;
    width: 100%;
    height: 100%;
}

.material-icons.md-dark.md-inactive { 
    color: rgba(255, 255, 255, 0.911); 
    }

.typing {
    color: rgb(82, 218, 143);
    text-decoration: underline;
}
</style>