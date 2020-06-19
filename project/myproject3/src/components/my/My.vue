<template>
    <div class="my">
        my
    </div>
</template>

<script>
    import {CHANGEHEADERTITLE} from '../../store/mutation-types.js'
    export default {
        name: 'My',
        data(){
            return {

            }
        },
        created(){
            //this.$store.commit('changeHeaderTitle', '我的');
            this.$store.commit(CHANGEHEADERTITLE, '我的');

        }
    }
</script>