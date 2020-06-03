<template>
    <div class="board_con" id="board_scroll">
        <div>
            <div class="swiperBox">
                <swiper :isAuto="4000" :isContinuous="true" :imgCount="6" :isImgExpand="false" :isButtonShow="false" :isClick="true"></swiper>
            </div>
            <list />
        </div>
    </div>
</template>

<script>
    import Swiper from '@/components/common/Swiper.vue'
    import List from './List.vue'
    import BScroll from 'better-scroll'
    import {mapMutations} from 'vuex'
    export default {
        name: 'Board',
        components: {
            Swiper,
            List
        },
        data(){
            return {

            }
        },
        methods: {
            ...mapMutations(['changeHeaderTitle']) //...mapMutations()返回的是一个函数，所以要放到methods里
        },
        beforeCreate() {
            //this.$store.commit('changeHeaderTitle', '榜单'); 
            //也可以在methods中用...mapMutations将$store中mutations中的changeHeaderTitle绑到this上，然后再调用
        },
        created() {
            this.changeHeaderTitle('榜单'); //放到前一个钩子里会报错，调用不了this.changeHeaderTitle
        },
        mounted(){
            new BScroll('#board_scroll', {
                scrollY: true,
                click: true
            });
        }
    }
</script>

<style lang="scss" scoped>
    .board_con{
        width: 100%;
        height: 100%;
        overflow: hidden;
        .swiperBox{
            height: 2.4rem;
        }
    }
</style>