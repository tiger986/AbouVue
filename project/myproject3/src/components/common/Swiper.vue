<template>
    <div class="swiper_con">
        <mt-swipe :auto="isAuto" :continuous="isContinuous" v-if="!isLoading">
            <mt-swipe-item v-for="(v, i) of items" :key='v.id' @click.native="toDetail(v.id)">
                <img :src="v.images.large" :class="{imgHeight: isImgExpand}">
                <mt-button :plain="true" v-if="isButtonShow && (i == items.length - 1)" @click="gotoIndex">开始体验</mt-button>
            </mt-swipe-item>
        </mt-swipe>
        <div v-if="isLoading" class="spinner">
            <mt-spinner type="fading-circle"></mt-spinner>
        </div>
    </div>
</template>

<script>
import {Swipe, SwipeItem, Button, Spinner} from 'mint-ui'
import $ from 'axios'
export default {
    name: 'Swiper',
    props: {
        isAuto: { //轮播时间间隔(为0时不轮播，只能手动滑动)
            type: Number,
            default: 0
        },
        isContinuous: { //是否循环
            type: Boolean,
            default: false
        },
        imgCount: { //项目数量
            type: Number,
            default: 5
        },
        isImgExpand: { //是否全屏
            type: Boolean,
            required: true
        },
        isButtonShow: { //是否显示按钮
            type: Boolean,
            required: true
        },
        isClick: { //是否允许点击
            type: Boolean,
            required: true
        }
    },
    data(){
        return {
            items: [],
            isLoading: true
        }
    },
    components:{
        [Swipe.name]: Swipe,
        [SwipeItem.name]: SwipeItem,
        [Button.name]: Button,
        [Spinner.name]: Spinner
    },
    methods: {
        gotoIndex(){
            // this.$router.push({
            //   name: 'index'
            // })
            this.$router.replace({  //跳转后不可回退(上一个路由不会保存在浏览器历史记录里)
                name: 'index'
            })
        },
        toDetail(id){
            if(!this.isClick){
                return false;
            }
            this.$router.push({
                name: 'detail',
                query: {
                    id
                }
            });
        }
    },
    mounted(){
        $.get('/v2/movie/in_theaters?count=' + this.imgCount)
            .then((result) => {
                //console.log(result);
                this.items = result.data.subjects;
                this.isLoading = false;
            })
            .catch((e) => {
                //
            })
    }
}
</script>

<style lang="scss" scoped>
    @import '@/style/usage/core/reset.scss';
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
        .spinner{
            height: 100%;
            @include flexbox();
            @include align-items(center);
            @include justify-content(center);
        }
    }
</style>