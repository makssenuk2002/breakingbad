<template>
    <selected-episode
        :season="season"
        :episodes="episodes"
    ></selected-episode>
</template>

<script>
import {apiService} from "@/api/api";
import SelectedEpisode from "@/components/ui/SeasonContent";
export default {
    name: 'SecondSeason',
    components: {SelectedEpisode},
    props: {
        msg: String
    },
    data (){
        return{
            episodes:[],
            season: '3',
        }
    },
    mounted() {
        apiService.getEpisodes().then(res =>{
            if(res){
                this.episodes = res.filter(e => e.season === this.season);
            }
        })
    }
}
</script>

<style scoped lang="less">

</style>
