<template>
    <div id="album-view">
    <div class="wrapper-header">
        <h1>ALBUMS</h1>
        <div class="settings">
            <button id="btn-grid" @click="showGridView" :class="{active: isGridView}"><IconGrid /></button>
            <button id="btn-list" @click="showListView" :class="{active: isListView}"><IconList /></button>
        </div>
        </div>
        <ul id="list-albums" :class="{grid: isGridView}" v-for="album in albums">
            <li class="album">
                <img id="img-album" :src="album.album.images[0].url" />
                <div class="album-info">
                    <h4 id="txt-album-name">{{album.album.name}}</h4>
                    <p id="txt-album-artists">{{album.album.artists.map(artist => artist.name).join(', ')}}</p>
                    <div class="album-year">
                        <p id="txt-album-year">{{album.album.release_date.split('-')[0]}}</p>
                        <p id="txt-album-tracks">{{album.name}}</p>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
    import IconGrid from '../components/icons/IconGrid.vue'
    import IconList from '../components/icons/IconList.vue'
    import songs from '../data/songs'
    export default {
        components: {
            IconGrid,
            IconList
        },
        data() {
            return {
                isGridView: false,
                isListView: true,
                songCopy: songs
            }
        },
        methods: {
            showGridView() {
                
                this.isGridView = !this.isGridView
                this.isListView = !this.isListView
            },

            showListView() {
                this.isListView = !this.isListView
                this.isGridView = !this.isGridView
            }
        },

        computed: {
            albums() {
                return this.songCopy
            }
        }
    }
</script>