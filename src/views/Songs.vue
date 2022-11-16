<template>
    <div id="songs-view" @scroll="handleScroll">
        <div class="wrapper-header">
            <h1>SONGS</h1>
            <div class="wrapper-search">
                <input id="input-search" placeholder="Search by title..." v-model="search" />
            </div>
            <div class="wrapper-settings">
                <button id="btn-show-favorites" @click="toggleFavorites" :class="{active: isActive}">Show Favorites</button>
            </div>
        </div>
        <div class="wrapper-songs">
            <table cellspacing="0" cellpadding="0">
                <tr ref="header">
                    <th id="th-id" >#</th>
                    <th id="th-title" @click="sortBy" :class="{active: isSorted}">
                        Title
                        <IconCaretUp v-if="isSorted" :class="{'flip-vertical': isSorted && sortState == 2}" />
                    </th>
                    <th id="th-artist">Artist</th>
                    <th id="th-album">Album</th>
                    <th id="th-duration" @click="sortByLength" :class="{active: isSortedByLength}">
                        Duration
                        <IconCaretUp v-if="isSortedByLength" :class="{'flip-vertical': isSortedByLength && sortStateByLength == 2}" />
                    </th>
                </tr>
                <!-- Loop goes on this <tr> element -->
                <tr class="song" v-for="(song, index) in songsCopy" @click="selectSong(song)" :class="{active: nowPlayingSong(song)}">
                    <td id="td-index">
                        <IconPlay v-if="nowPlayingSong(song)" />
                        <span id="txt-index">{{index + 1}}</span>
                    </td>
                    <td id="td-title">
                        <img :src="song.album.images[1].url" />
                        {{song.name}}
                    </td>
                    <td id="td-artist">{{song.artists.map(artist => artist.name).join(', ')}}</td>
                    <td id="td-album">{{song.album.name}}</td>
                    <td id="td-duration">
                        {{getTime(song.duration_ms)}}
                        <IconHeart :class="{active: isInFavorites(song)}" @click="addToFavorites(song)"/>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>
<script>
    //Dienas beigās kaut kas sanāca
    import songs from '../data/songs'
    import IconCaretUp from '../components/icons/IconCaretUp.vue'
    import IconPlay from '../components/icons/IconPlay.vue'
    import IconHeart from '../components/icons/IconHeart.vue'
    import {player} from '../stores/player'
    import { auth } from '../stores/auth'
    import '../assets/main.scss'
    export default {
        components: {
            IconCaretUp,
            IconHeart,
            IconPlay
        },
        data() {
            let isSorted = false
            let isSortedByLength = false
            let sortStateByLength = 0
            let sortState = 0
            let isActive = JSON.parse(localStorage.getItem('isActive')) || false
            return {
                search: '',
                isActive,
                isSorted,
                isSortedByLength,
                sortStateByLength,
                sortState,
                songs,
                delay: 500,
                clicks: 0,
                timer: null
            }
        },
        methods: {
            handleScroll(event) {
                this.$refs.header.classList.value = event.target.scrollTop > 100 ? 'scrolled' : '';
            },

            toggleFavorites() {
                this.isActive = !this.isActive
                localStorage.setItem('isActive', JSON.stringify(this.isActive))
            },

            //Dziesmu kārtošana, līdz gaman nav bet nu neko darīt :()
            sortBy() {
                const originalData = songs
                if(!this.isSorted){
                    this.isSorted = true
                    this.sortState = 1
                    this.songsCopy.sort((a, b) => (a.name > b.name ? 1 : -1))
                }else if(this.isSorted && this.sortState == 1){
                    this.sortState = 2
                    this.songsCopy.sort((a, b) => (a.name > b.name ? -1 : 1))
                }else if(this.isSorted && this.sortState == 2){
                    this.isSorted = false
                    this.sortState = 0
                    this.songsCopy = originalData
                }
            },

            //Dziesmu kārtošana pēc laika
            sortByLength() {
                const originalData = songs
                if(!this.isSortedByLength){
                    this.isSortedByLength = true
                    this.sortStateByLength = 1
                    this.songsCopy.sort((a, b) => (a.duration_ms > b.duration_ms ? 1 : -1))
                }else if(this.isSortedByLength && this.sortStateByLength == 1){
                    this.sortStateByLength = 2
                    this.songsCopy.sort((a, b) => (a.duration_ms > b.duration_ms ? -1 : 1))
                }else if(this.isSortedByLength && this.sortStateByLength == 2){
                    this.isSortedByLength = false
                    this.sortStateByLength = 0
                    this.songsCopy = originalData
                }
            },

            //Dziesmas atskaņošana ar dubultklišķi
            selectSong(song) {
                this.clicks++
                if (this.clicks === 1) {
                    this.timer = setTimeout( () => {
                    this.clicks = 0
                }, this.delay);
                } else {
                    clearTimeout(this.timer);  
                    player.setNowPlaying(song)
                    this.clicks = 0;
                }  
            },

            nowPlayingSong(song){
                return player.getNowPlayingSongId() == song.id
            },

            isInFavorites(song){
                return auth.getFavoriteSongs().includes(song.id)
            },

            addToFavorites(song) {
                auth.toggleFavorite(song.id)
            },

            getTime(songLength) {
                var minutes = Math.floor(songLength / 60000);
                var seconds = ((songLength % 60000) / 1000).toFixed(0);
                return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
            }
        },

        computed: {
            //Dziesmu objekta apstrāde
            songsCopy() {
                let songs_copy = this.songs
                if(this.isActive){
                    songs_copy = songs_copy.filter(id => {return auth.getFavoriteSongs().includes(id.id)})
                    return songs_copy
                }
                songs_copy = songs_copy.filter(songName => {return songName.name.toLowerCase().includes(this.search.toLowerCase())} )
                return songs_copy
            },
        }
    }
</script>