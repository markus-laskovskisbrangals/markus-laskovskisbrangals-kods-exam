<template>
    <div id="main-header" class="active">
        <div class="wrapper-logo">
            <img src="@/assets/logo.svg"/>
            <h2>KRAKEN.FM</h2>
        </div>
        <div class="wrapper-profile">
            <div class="section-user">
                <span class="avatar"></span>
                <h3 id="txt-full-name">{{getData}}</h3>
            </div>
            <button id="btn-logout" @click="logOut">LOGOUT</button>
        </div>
    </div>
</template>
<script>
    import {auth} from '../stores/auth'
    let fullName = ''
    export default {
        data() {
            return {
                fullName
            }
        },

        methods: {
            logOut() {
                auth.logout()
            }
        },

        computed: {
            getData() {
                fullName = auth.user.name.toUpperCase() + ' ' + auth.user.surname.toUpperCase()
                return fullName
            }
        }
    }
</script>