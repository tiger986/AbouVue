<template>
    <div class="search">
        <div v-for="(v, i) of in_theaters" :key="v.id">
            {{i + 1}}. {{v.title}}
        </div>
    </div>
</template>

<script>
    import {CHANGEHEADERTITLE} from '../../store/mutation-types.js'
    export default {
        name: 'Search',
        data(){
            return {

            }
        },
        computed: {
            in_theaters(){
                return this.$store.state.movieList.in_theaters.subjects
            }
        },
        created(){
            //this.$store.commit('changeHeaderTitle', '搜索');
            this.$store.commit(CHANGEHEADERTITLE, '搜索');
        }
    }
</script>