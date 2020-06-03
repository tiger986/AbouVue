<template>
    <div class="my">
        my
    </div>
</template>

<script>
    export default {
        name: 'My',
        data(){
            return {

            }
        },
        created(){
            this.$store.commit('changeHeaderTitle', '我的');
        }
    }
</script>