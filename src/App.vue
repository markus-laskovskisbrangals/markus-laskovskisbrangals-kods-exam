<template>
    <Header v-if="auth.is_authenticated"></Header>
    <div id="section-body">
        <NavigationComponent v-if="auth.is_authenticated"/>
        <router-view class="section-router"></router-view>
    </div>
    <div id="section-player" v-if="auth.is_authenticated">
        <AudioPlayer />
    </div>
</template>
<script>
    import { auth } from './stores/auth';
    export default {
        data() {
            return {
                auth
            }
        }
    }
</script>