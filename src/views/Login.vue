<template>
    <div id="login-view">
        <router-view></router-view>
        <form class="login-form">
            <div class="wrapper-logo">
                <img src="@/assets/logo.svg" />
                <div>KRAKEN.FM</div>
            </div>
            <input id="input-email" placeholder="E-mail" v-model="email" />
            <input type="password" id="input-password" placeholder="Password" v-model="password" />
            <button id="btn-submit" :disabled="hasData" @click="auth">LOGIN</button>
        </form>
    </div>
</template>
<script>
    import { auth } from '../stores/auth';

    export default {
        data() {
            return {
                email: '',
                password: ''
            }
        },
        computed: {
            hasData: function() {
                return this.email.length < 1 || this.password.length < 6
            }
        },
        methods: {
            auth() {
                auth.authenticate(this.email, this.password)
            }
        }
    }
</script>