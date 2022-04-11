<template>
    <div class="container">
        <div class="characters-list">
            <h2 v-if="loading">Loading...</h2>
            <div class="wrapp"  v-else>
                <button @click="changeCharsData">{{favoriteOrAllChars}}</button>
                <h2>{{titleFavoriteOrAllChars}}</h2>
            </div>
            <div class="character" v-for="ch in showFavoriteChars ? favoriteChars : characters" @click="selectChar(ch)" :key="ch.char_id">
                {{ch.name }}
            </div>
        </div>
        <div class="char-info" v-if="selectedChar ">
            <div class="wrapper" v-if="!charLoading">
                <button @click="addToFavorite" v-if="!showFavoriteChars">Добавить в избраные</button>
                <button @click="removeFromFavorite" v-else>Удалить из избраных</button>
                <h2>Character Info</h2>
                <img class="char-img" :src="selectedChar.img" alt="1">
                <div class="name">
                    <span class="bold">  name:  </span>
                    <span> {{ selectedChar.name }} </span>
                </div>
                <div class="nickname">
                    <span class="bold">nickname:  </span>
                    <span> {{ selectedChar.nickname }} </span>
                </div>
                <div class="birthday">
                    <span class="bold">birthday:  </span>
                    <span> {{ selectedChar.birthday }} </span>
                </div>
                <div class="occupation">
                    <span class="bold">occupation:  </span>
                    <span v-for="(o,i) in selectedChar.occupation" :key="i"> {{ o }}, </span>
                </div>
                <div class="status">
                    <span class="bold">status:  </span>
                    <span> {{ selectedChar.status }} </span>
                </div>
                <div class="Quote" v-if="quoteByAuthor">
                    <span class="bold">Quote:  </span>
                    <ul>
                        <li v-for="q in quoteByAuthor" :key="q.quote_id"> {{ q.quote }}</li>
                    </ul>
                </div>
                <div class="death" v-if="deathByAuthor">
                    <span class="bold">Death:  </span>
                    <ul>
                        <li>cause: {{ deathByAuthor.cause }}</li>
                        <li>responsible: {{ deathByAuthor.responsible }}</li>
                        <li>season: {{ deathByAuthor.season }}</li>
                        <li>episode: {{ deathByAuthor.episode }}</li>
                    </ul>
                </div>
                <div  v-if="responsibleDeath">
                    <span class="bold">Responsible for death:  </span>
                    <span v-for="d in responsibleDeath" :key="d.death_id"> {{ d.death }},</span>
                </div>
            </div>
            <h2 v-else>Loading...</h2>
        </div>
    </div>
</template>

<script>
import {apiService} from "@/api/api";

export default {
    name: "Characters",
    props: {
        inMain: {
            type: Boolean,
            default: false
        },
        searchChar: {
            type: Array,
        },
    },
    data() {
        return {
            characters: [],
            selectedChar: null,
            quoteByAuthor: null,
            deathByAuthor: null,
            responsibleDeath: null,
            loading: true,
            charLoading: true,
            favoriteChars:null,
            showFavoriteChars:false
        }
    },
    computed:{
        favoriteOrAllChars: function (){
            return this.showFavoriteChars ? 'All chars' : 'Favorite chars'
        },
        titleFavoriteOrAllChars: function (){
            return !this.showFavoriteChars ? 'All chars' : 'Favorite chars'
        }
    },
    mounted() {
        if (!this.inMain) {
            apiService.getCharacters().then(res => {
                this.characters = res;
                this.loading = false;
            })
        } else {
            this.characters = this.searchChar;
        }
        this.favoriteChars =  JSON.parse(localStorage.getItem('favoriteChars'));


    },
    methods: {
        selectChar(ch) {
            this.charLoading = true;
            this.quoteByAuthor = null;
            this.responsibleDeath = null;
            apiService.getQuoteByAuthor(ch.name).then(res => {
                if (res.length > 0){
                    this.quoteByAuthor = res;
                }
            });
            apiService.getDeathByAuthor(ch.name).then(res => {
                this.deathByAuthor = res[0];
            });
            apiService.getOneCharacters(ch.char_id).then(res => {
                this.selectedChar = res[0];
            });
            apiService.getAllDeath().then(res => {
                let respon =  res.filter(d => d.responsible === ch.name);
                if (respon.length > 0){
                    this.responsibleDeath = respon;
                }
            });
            this.charLoading = false;
        },
        changeCharsData(){
            this.showFavoriteChars = !this.showFavoriteChars;
            this.selectedChar = null;
        },
        addToFavorite(){
            let localStorageData =  JSON.parse(localStorage.getItem('favoriteChars'))
            if (localStorageData){
                this.favoriteChars = [this.selectedChar , ...localStorageData];
            }else {
                this.favoriteChars = [this.selectedChar]
            }
            const filteredArray = [];
            this.favoriteChars.filter((item) => {
                if (!filteredArray.some((element) => element.char_id === item.char_id)) {
                    filteredArray.push(item);
                }
            });
            this.favoriteChars = filteredArray;
            localStorage.setItem('favoriteChars', JSON.stringify( this.favoriteChars) );
        },
        removeFromFavorite(){
            let localStorageData =  JSON.parse(localStorage.getItem('favoriteChars')).filter(ch => ch.char_id !== this.selectedChar.char_id)
            this.favoriteChars = localStorageData;
            localStorage.setItem('favoriteChars', JSON.stringify( this.favoriteChars) );
            this.selectedChar = null
        }
    }
}
</script>

<style scoped>

</style>