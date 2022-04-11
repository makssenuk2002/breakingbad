<template>
    <div  >
        <input v-model="search" placeholder="Enter character name">
        <button @click="searchHandler">Search</button>
        <characters
            v-if="searchChar"
            :in-main = true
            :search-char = searchChar
        ></characters>
    </div>

</template>

<script>
import {apiService} from "@/api/api";
import Characters from "@/components/Characters";

export default {
    name: "Main",
    components: {Characters},
    data(){
        return{
            search:'',
            searchChar:null
        }
    },
    methods:{
        searchHandler(){
            this.searchChar = null;
            apiService.getCharactersByName(this.search).then(res => {
                this.searchChar = res;
            })
        }
    }
}
</script>

<style scoped>

</style>