<template>
    <div class="swiper_con">
        <mt-swipe :auto="isAuto" :continuous="isContinuous">
            <mt-swipe-item v-for="(v, i) of items" :key='i'>
                <img :src="v.images.large" :class="{imgHeight: isImgExpand}">
                <mt-button :plain="true" v-if="isButtonShow && (i == items.length - 1)" @click="gotoIndex">开始体验</mt-button>
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>

<script>
import $ from 'axios'
export default {
    name: 'Swiper',
    props: {
        isAuto: {
            type: Number,
            default: 0
        },
        isContinuous: {
            type: Boolean,
            default: false
        },
        imgCount: {
            type: Number,
            default: 5
        },
        isImgExpand: {
            type: Boolean,
            required: true
        },
        isButtonShow: {
            type: Boolean,
            required: true
        }
    },
    data(){
        return {
            items: []
        }
    },
    methods: {
        gotoIndex(){
            // this.$router.push({
            //   name: 'index'
            // })
            this.$router.replace({  //跳转后不可回退(上一个路由不会保存在浏览器历史记录里)
                name: 'index'
            })
        }
    },
    mounted(){
        $.get('/v2/movie/in_theaters?count=' + this.imgCount)
            .then((result) => {
            //console.log(result);
            this.items = result.data.subjects;
        })
    }
}
</script>

<style lang="scss" scoped>
    .swiper_con{
        width: 100%;
        height: 100%;
        position: relative;
        img{
            width: 100%;
        }
        .imgHeight{
            height: 100%;
        }
        button{
            position: absolute;
            left: 50%;
            bottom: 20%;
            transform: translate(-50%,0);
            color: #ffffff;
        }
    }
</style>