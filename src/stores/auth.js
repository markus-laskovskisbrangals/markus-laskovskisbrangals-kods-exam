// TE DEFINĒT USER OBJEKTU
import { reactive } from "vue";
import router from "../router";

export const auth = reactive({
    user : {
        name: 'Markus',
        surname: 'Ļaskovskis-Brangals',
        code: 'IT20005',
        favoriteSongs: localStorage.favoriteSongs ? JSON.parse(localStorage.favoriteSongs) : []
    },

    is_authenticated: JSON.parse(localStorage.is_authenticated) ?? false,

    setUserData(name, surname, code) {
        this.user.name = name
        this.user.surname = surname
        this.user.code = code
    },

    authenticate(email, password) {
        if(email === 'markus.laskovskisbrangals@va.lv' && password === '123456'){
            localStorage.is_authenticated = true
            this.is_authenticated = true
            router.replace('/')
        }
    },

    logout() {
        localStorage.clear();
        this.is_authenticated = false
        router.replace('/login')
    },

    toggleFavorite(songID) {
        let favorites = this.getFavoriteSongs()
        if(favorites.includes(songID)){
            const position = favorites.indexOf(songID)
            favorites.splice(position, 1)
            localStorage.favoriteSongs = JSON.stringify(favorites)
            console.log(0)
        }else if(!favorites.includes(songID)){
            favorites.push(songID)
            localStorage.favoriteSongs = JSON.stringify(favorites)
            console.log(1)
            console.log(this.user.favoriteSongs)
        } 
        console.log(songID)
    },

    getFavoriteSongs() {
        return this.user.favoriteSongs
    }
})
