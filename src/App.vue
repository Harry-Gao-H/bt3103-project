<template>
    <v-app id="app">
        <app-navigation v-if="$route.meta.header !== 1"></app-navigation>

        <v-main transition="slide-x-transition">
            <router-view></router-view>
        </v-main>
    </v-app>
</template>

<script>
import AppNavigation from '@/components/AppNavigation';
export default {
    name: 'App',
    components: {
        AppNavigation
    },
};
</script>

<style>
@import './assets/styles/style.css';

#app {
  font-family: 'Oswald', Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  text-shadow: 3px 4px rgba(black, .1);
  color: #2c3e50;
}


h1 {
  color: #f1eeee;
  font-family: 'Raleway',sans-serif;
  font-size: 50px;
  font-weight: 800;
  text-align: left;
  text-transform: uppercase;
  text-shadow: 2px 2px lightslategray;

}

.logo{
    width:250px;;
    cursor:pointer;
}


</style>