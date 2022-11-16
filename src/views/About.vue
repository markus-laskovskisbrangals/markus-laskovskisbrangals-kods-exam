<template>
    <div id="about-view">
        <div class="wrapper-header">
            <h1>ABOUT ME</h1>
            <div class="settings">
                <button id="btn-edit" @click="editForm">{{buttonText}}</button>
                <button id="btn-save" v-if="isEditing" @click="saveData">Save Form</button>
            </div>
        </div>
        <form>
            <div class="wrapper-input">
                <label >NAME</label>
                <input id="input-name" v-if="isEditing" v-model="firstName"/>
                <p id="txt-name" v-if="!isEditing">{{auth.user.name}}</p>
            </div>
            <div class="wrapper-input">
                <label>SURNAME</label>
                <input id="input-surname" v-if="isEditing" v-model="lastName"/>
                <p id="txt-surname" v-if="!isEditing">{{auth.user.surname}}</p>
            </div>
            <div class="wrapper-input">
                <label>STUDENT CODE</label>
                <input id="input-code" v-if="isEditing" v-model="code"/>
                <p id="txt-code" v-if="!isEditing">{{auth.user.code}}</p>
            </div>
            <div class="wrapper-songs">
                <label>FAVORITE SONGS</label>
                <ul v-if="auth.getFavoriteSongs().length > 0" v-for="song in getFavorites">
                    <li>
                        <img id="img-album" :src="song.album.images[0].url" />
                        <div class="song-info">
                            <p id="txt-song" class="song-name">{{song.name}}</p>
                            <p id="txt-artist" class="song-artists">{{song.artists.map(artist => artist.name).join(', ')}}</p>
                        </div>
                    </li>
                </ul>
                <div id="txt-empty" class="empty" v-if="auth.getFavoriteSongs().length < 1">NO SONGS FOUND</div>
            </div>
        </form>
    </div>
</template>

<script>
    import {auth} from '../stores/auth'
    import songs from '../data/songs'
    export default {
        data() {
            return {
                isEditing: false,
                auth,
                buttonText: 'Edit Form',
                firstName: auth.user.name,
                lastName: auth.user.surname,
                code: auth.user.code,
                songs
            }
        },

        methods: {
            editForm(){
                this.isEditing = !this.isEditing
                this.buttonText = this.isEditing ? 'Cancel' : 'Edit Form'
            },

            saveData() {
                auth.setUserData(this.firstName, this.lastName, this.code)
                this.isEditing = false
            }
        },

        computed: {
            getFavorites() {
                let songs_copy = songs
                songs_copy = songs_copy.filter(song => auth.getFavoriteSongs().includes(song.id))
                return songs_copy
            }
        }
    }
</script>