<template>
<div>

    <div class ="navbar">
        <ul>
            <li><router-link to="/cart">Cart</router-link></li>
            <li><router-link to="/menu">Menu</router-link></li>
            <li class="navbarstyle" v-on:click="logout()">Logout</li>       
        </ul>
    </div>

    <div class="sidenav">
        <div class="profile">
            <img src="https://i.pinimg.com/originals/0c/3b/3a/0c3b3adb1a7530892e55ef36d3be6cb8.png" alt="" width="100" height="100">

            <div class="name">
                {{userInfo}}
                {{userInfo.name}}
                
                
            </div>
            <div class="title">
                Student
            </div>
        </div>
    </div>

    <div class = "main">
        <h3> PROFILE </h3>
        <button v:on-click="refresh()"> refresh </button>
        <div class = "card">
            
        <table>
                <tbody>
                    <tr>
                        <td>Name</td>
                        <td>:</td>
                        <td>{{userInfo.name}} </td>
                    </tr>
                    <tr>
                        <td>Email</td>
                        <td>:</td>
                        <td>{{userInfo.email}}</td>
                    </tr>
                    <tr>
                        <td>Hostel</td>
                        <td>:</td>
                        <td>{{userInfo.hostel}}</td>
                    </tr>
                    <tr>
                        <td>Available Credits</td>
                        <td>:</td>
                        <td>{{userInfo.credit}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

</div>

</template>

<script>
import { mapGetters } from "vuex";
import firebase from "firebase";
import database from "../firebase.js"

export default {
    data(){
        return {
            name:"" ,
            email:"",
            hostel:"",
            credits:0,
            userInfo:{}
        }
    },
    created() {
        console.log("Email")
        firebase.auth().onAuthStateChanged(user =>  {
        
            if (user) {
                
                database.collection("UserInfo").doc(user.email).get()
                    .then(snapshot=> {
                        this.userInfo = snapshot.data()
                        this.userInfo.email = user.email
                    })
            }
            
        })
    },
    methods:{
        logout() {
            firebase
                .auth()
                .signOut()
                .then(() => {
                alert('Successfully logged out');
                this.$router.push('/');
                })
                .catch(error => {
                alert(error.message);
                this.$router.push('/');
            });
        },

        refresh() {
            database.collection("UserInfo").doc(this.user.data.email).get()
            .then(snapshot=> {
                this.userInfo = snapshot.data()
            })
        }
    },
    computed: {
        ...mapGetters({
    // map `this.user` to `this.$store.getters.user`
        user: "user"
        })
    }
}
</script>

<style scoped>


body {
    background-color: #e8f5ff;
    font-family: Arial;
    overflow: hidden;
}

.sidenav {
    color: white;
    border-bottom-right-radius: 25px;
    left: 0;
    overflow-x: hidden;
    padding-top: 50px;
    padding-left: 60px;
    position: absolute;
    width: 250px;

}

.profile {
    margin-bottom: 20px;
    margin-top: -12px;
    text-align: center;
}

.profile img {
    border-radius: 50%;
    box-shadow: 0px 0px 5px 1px grey;
}

.name {
    font-size: 25px;
    font-weight: bold;
    padding-top: 20px;
}

.title {
    font-size: 20px;
    padding-top: 10px;
}

/* profile content */

.main {
    margin-top: 2%;
    margin-left: 29%;
    font-size: 28px;
    padding: 0 10px;
    width: 58%;
}

.main h3 {
    color: white;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 24px;
    margin-bottom: 10px;
}

.main .card {
    background-color: #fff;
    border-radius: 18px;
    box-shadow: 1px 1px 8px 0 black;
    height: auto;
    margin-bottom: 20px;
    padding: 20px 0 20px 50px;
}

.main .card table {
    border: none;
    font-size: 20px;
    height: 270px;
    width: 80%;
}

.navbarstyle {
  text-decoration:none;
  color:#fff;
  text-transform:uppercase;
}

</style>