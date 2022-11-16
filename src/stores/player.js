import { reactive } from 'vue'

export const player = reactive({
    playlist   : [],
    now_playing: {}, // SONG OBJECT
    setPlaylist(songs) {
        this.playlist.push(songs)
    },
    setNowPlaying(song) {
        this.now_playing = song
    },
    getNowPlayingSongId() {
        return this.now_playing?.id;
    },
    getNowPlaying() {
        return this.now_playing
    },
    getNowPlayingAlbumID() {
        return this.now_playing?.album?.id ?? null;
    },
    getNowPlayingSongName() {
        return this.now_playing?.name ?? '';
    },
    getNowPlayingSongImage() {
        return this.now_playing?.album?.images[1].url ?? '';
    },
    getNowPlayingArtists() {
        return this.now_playing?.artists?.map(artist => artist.name).join(', ');
    },
    getNowPlayingSongPreview() {
        return this.now_playing?.preview_url;
    },
    getNextSong(){
        return this.playlist[this.playlist.indexOf(this.getNowPlaying()) + 1]
    },
    getPreviousSong() {
        return this.playlist[this.playlist.indexOf(this.getNowPlaying()) - 1]
    },
    resetNowPlaying() {
        this.now_playing = {};
    }
})