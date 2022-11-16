<template>
    <nav id="nav-main" class="wrapper-navigation">
        <ol>
            <router-link v-for="item in navItems" :to="item.path">{{item.name}}</router-link>
        </ol>
    </nav>
</template>
<script>
    export default {
        data() {
            return{
                navItems: [
                    {
                        path: '/',
                        name: 'SONGS'
                    },
                    {
                        path: '/albums',
                        name: 'SONGS'
                    },
                    {
                        path: '/about',
                        name: 'SONGS'
                    }
                ]
            }
        }
    }
</script>