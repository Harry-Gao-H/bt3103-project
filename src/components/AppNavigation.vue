<template>
    <span>
        <v-navigation-drawer
            app
            v-model="drawer"
            class="brown lighten-2"
            dark
            disable-resize-watcher
        >
            <v-list>
                <template v-for="(item, index) in items">
                    <v-list :key="index" :to="item.url">
                        <v-list-item-content>
                            {{ item.title }}
                        </v-list-item-content>
                    </v-list>
                    <v-divider :key="`divider-${index}`"></v-divider>
                </template>
            </v-list>
        </v-navigation-drawer>
        <v-app-bar app color="teal lighten-2" dark> 
            <v-app-bar-nav-icon 
                class="hidden-md-and-up"
                @click="drawer = !drawer"
            ></v-app-bar-nav-icon >
            <v-spacer class="hidden-md-and-up"></v-spacer>
            <router-link to="/">
                <v-toolbar-title data-cy="titleBtn">{{
                    appTitle
                }}</v-toolbar-title>
            </router-link>
            <v-btn
                text
                class="hidden-sm-and-down nav-menu"
                to="/menu"
                data-cy="menuBtn"
                >Order Your Takeaway</v-btn
            >
            <v-spacer class="hidden-sm-and-down"></v-spacer>
            
            <v-btn text to="/sign-in" data-cy="signinBtn" v-on:click="logout()">Sign out</v-btn>
            <v-btn
                color="teal lighten-1"
                to="/join"
                class="nav-join"
                data-cy="joinBtn"
                >Checkout</v-btn
            >
        </v-app-bar>
    </span>
</template>

<script>
import firebase from "firebase"

export default {
    name: 'AppNavigation',
    data() {
        return {
            appTitle: 'HOME',
            drawer: false,
            items: [
                { title: 'Menu', url: '/menu' },
                { title: 'Profile', url: '/about' },
                { title: 'Sign Out', url: '/sign-in' },
                { title: 'Checkout', url: '/join' }
            ]
        };
    },
    methods: {
        logout() {
        this.$router.push('/');
        firebase
            .auth()
            .signOut()
            .then(() => {
            alert('Successfully logged out');
            
            })
            .catch(error => {
            alert(error.message);
            this.$router.push('/');
            });
        },
    }
};
</script>

<style scoped>
a {
    color: white;
    text-decoration: none;
}
</style>