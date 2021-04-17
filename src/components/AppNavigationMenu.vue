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
                    <v-list-item :key="index" :to="item.url" link>
                        <v-list-item-content>
                            {{ item.title }}
                        </v-list-item-content>
                    </v-list-item>
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

            <v-spacer class="hidden-md-and-up"></v-spacer>
            <v-btn
            class="hidden-sm-and-down"
            color="white"
            plain
            to="/history"
            data-cy="historyBtn"
            > 
                <p>History<i class="inline-icon material-icons">history</i></p>

            </v-btn>

            <v-spacer class="hidden-sm-and-down"></v-spacer>
            
            <v-btn text to="/" data-cy="signinBtn" v-on:click="logout()">Sign out</v-btn>
            <v-btn
                color="teal lighten-1"
                to="/cart"
                class="nav-join"
                data-cy="joinBtn"
                v-if="this.cart.length==0"
                >
                Checkout<i class="inline-icon material-icons">shopping_cart</i>
                </v-btn
            >
            <v-btn
                color="teal lighten-1"
                to="/cart"
                class="nav-join"
                data-cy="joinBtn"
                id="cart-pulse" 
                v-if="this.cart.length>0"
                >
                Checkout<i class="inline-icon material-icons">shopping_cart</i>
                </v-btn
            >
        </v-app-bar>
    </span>
</template>

<script>
import firebase from "firebase";

export default {
    name: 'AppNavigationMenu',
    props: ['cart'],
    data() {
        return {
            title: 'Menu',
            drawer: false,
            items: [
                { title: 'Menu', url: '/menu' },
                { title: 'Profile', url: '/profile' },
                { title: 'History', url: '/history' },
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
    },
    
};
</script>

<style scoped>

.inline-icon {
   vertical-align: text-bottom;
   font-size: -6px;
   margin-bottom: 0px;
   padding-bottom: 0px;
}

a {
    color: white;
    text-decoration: none;
}

#cart-pulse {
    box-shadow: 0 0 0 0 rgb(1, 160, 107);
    transform: scale(1);
    animation: pulse 2s infinite;
}

#cart-pulse:hover {
    animation: none
}

@keyframes pulse {
	0% {
		transform: scale(0.95);
		box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.7);
	}

	70% {
		transform: scale(1);
		box-shadow: 0 0 0 10px rgba(0, 0, 0, 0);
	}

	100% {
		transform: scale(0.95);
		box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
	}
}

</style>