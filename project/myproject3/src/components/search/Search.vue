<template>
    <div class="search">
        search
    </div>
</template>

<script>
    export default {
        name: 'Search',
        data(){
            return {

            }
        },
        created(){
            this.$store.commit('changeHeaderTitle', '搜索');
        }
    }
</script>