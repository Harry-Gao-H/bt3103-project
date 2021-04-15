<template>
    <span>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet">
        <v-navigation-drawer
            app
            v-model="drawer"
            class="teal darken-3"
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
        <v-app-bar app color="teal darken-3" dark> 
            <v-app-bar-nav-icon 
                class="hidden-md-and-up"
                @click="drawer = !drawer"
            ></v-app-bar-nav-icon >
            <v-spacer class="hidden-md-and-up"></v-spacer>
            <v-btn
            class="hidden-sm-and-down"
            color="white"
            plain
            to="/menu"
            data-cy="menuBtn"
            > 
                <p>Menu<i class="inline-icon material-icons">restaurant_menu</i></p>

            </v-btn>
            <v-spacer class="hidden-md-and-up"></v-spacer>
            <v-btn
            class="hidden-sm-and-down"
            color="white"
            plain
            to="/profile"
            data-cy="profileBtn"
            > 
                <p>Profile<i class="inline-icon material-icons">account_circle</i></p>

            </v-btn>
            <v-spacer class="hidden-sm-and-down"></v-spacer>
            
            <v-btn text to="/" data-cy="signinBtn" v-on:click="logout()">Sign out</v-btn>
            <v-btn
                color="teal lighten-1"
                to="/cart"
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
            title: 'Menu',
            drawer: false,
            items: [
                { title: 'Menu', url: '/menu' },
                { title: 'Profile', url: '/profile' },
                { title: 'Sign Out', url: '/' },
                { title: 'Checkout', url: '/cart'}
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

.inline-icon {
   vertical-align: bottom;
   font-size: -6px;
}

a {
    color: white;
    text-decoration: none;
}
</style>