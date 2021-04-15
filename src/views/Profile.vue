<template>
<div>
    <div class = "main">
        <h3> MY PROFILE </h3>
        <div class = "card">
            <img style="float: left; margin: 0px 25px 15px 0px;" src="../assets/profile.png" width="100" />
            
        <table>
                <tbody>
                    <tr>
                        <td><span style="font-weight:bold"> Name </span></td>
                        <td>:</td>
                        <td>{{userInfo.name}} </td>
                    </tr>

                    <tr>
                        <td><span style="font-weight:bold"> Status </span></td>
                        <td>:</td>
                        <td> Student </td>
                    </tr>

                    <tr>
                        <td><span style="font-weight:bold"> Email </span></td>
                        <td>:</td>
                        <td>{{userInfo.email}}</td>
                    </tr>
                    <tr>
                        <td><span style="font-weight:bold"> Accomodation </span></td>
                        <td>:</td>
                        <td>{{userInfo.hostel}}</td>
                    </tr>
                    <tr>
                        <td><span style="font-weight:bold"> Credits Left </span></td>
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

/* profile content */

.main {
    margin-top: 2%;
    margin-left: 15%;
    font-size: 28px;
    padding: 0 10px;
    width: 58%;
}

.main h3 {
    color: white;
    font-family: sans-serif;
    font-size: 24px;
    margin-bottom: 10px;
}

.main .card {
    background-color: white;
    box-shadow: 1px 1px 8px 0 black;
    border-radius: 10px;
    height: auto;
    margin-bottom: 20px;
    padding: 20px 0 20px 50px;
}
   

.main .card table {
    border: none;
    font-size: 20px;
    height: 300px;
    width: 80%;
 
}

.navbarstyle {
  text-decoration:none;
  color:#fff;
  text-transform:uppercase;
}

</style>