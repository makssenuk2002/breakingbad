<template>
    <div class="container">
        <div class="season">
            <h2>Episodes</h2>
            <div class="episode"  v-for="s in episodes" @click="onSelectEpisode(s)" :key="s.episode_id">{{ s.title }}</div>
        </div>
        <div class="ep" v-if="selectedEpisode" >
            <h2>Episode Info</h2>
            <div class="name ">
                <span class="bold">Title: </span>
                <span>{{selectedEpisode.title}}</span>
            </div>
            <div class="air-date">
                <span class="bold">Air date: </span>
                <span>{{selectedEpisode.air_date}}</span>
            </div>
            <div class="name">
                <span class="bold">Characters: </span>
                <span v-for="(characters,i) in selectedEpisode.characters" :key="i"> {{characters}},</span>
            </div>
            <div class="deathInSelectedEpisode" v-if="deathInSelectedEpisode">
                <span class="bold">death: </span>
                <span v-for="(d,i) in deathInSelectedEpisode" :key="i"> {{d.death}},</span>
            </div>
            <button  @click="showEpisodeInfo">More info</button>
        </div>
    </div>

</template>

<script>
import {apiService} from "@/api/api";

export default {
    name: "SelectedEpisode",
    props:{
        episodes:{
            type:Array,
            require:true
        },
        season:{
            type:String,
            require:true
        }
    },
    data(){
        return{
            deathInSelectedEpisode:null,
            selectedEpisode: null,
        }
    },
    methods:{
        showEpisodeInfo(){
            apiService.getDeathInEpisode( ).then(res =>{
                this.deathInSelectedEpisode = res.filter(el => el.episode === this.selectedEpisode.episode_id && el.season.toString()  === this.season);
                if(this.deathInSelectedEpisode.length === 0){
                    this.deathInSelectedEpisode = [{death: 'no death'}];
                }
            });
        },
        onSelectEpisode(e){
            this.deathInSelectedEpisode = null;
            this.selectedEpisode = e;
        },
    }
}
</script>

<style scoped>
.container{
    display: flex;
    flex-wrap: wrap;
}
.season{
    width: 300px;
    min-height: 400px;
    border: 1px solid black;
}
</style>