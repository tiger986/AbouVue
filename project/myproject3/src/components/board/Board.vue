<template>
    <div class="board_con">
        <swiper :isAuto="4000" :isContinuous="true" :imgCount="6" :isImgExpand="false" :isButtonShow="false"></swiper>
    </div>
</template>

<script>
    import Swiper from '@/components/common/Swiper.vue'
    export default {
        name: 'Board',
        components: {
            Swiper
        },
        data(){
            return {

            }
        }
    }
</script>

<style lang="scss" scoped>
    .board_con{
        width: 100%;
        height: 2.4rem;
    }
</style>