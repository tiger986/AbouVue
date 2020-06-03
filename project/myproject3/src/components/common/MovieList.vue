<template>
    <div class="movieList_con">
        <my-header :isShowBack="true"></my-header>
        <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
            <div :style="startHeight">
                <section v-for="v of movieList" :key="v.id" class="movieList_con_box">
                    <div class="movieList_con_box_img">
                        <img :src="v.images.small" />
                    </div>
                    <div class="movieList_con_box_title" @click="toDetail(v.id)">
                        <h1>{{v.title}}</h1>
                        <h5>{{v.original_title}}</h5>
                        <h3>
                            <span v-for="w of v.directors" :key="w.id">导演：{{w.name}}</span>
                        </h3>
                    </div>
                    <div class="movieList_con_box_fen">
                        <mt-badge type="error">{{v.rating.average}}</mt-badge>
                    </div>
                </section>
            </div>
        </mt-loadmore>
    </div>
</template>

<script>
    import {Badge, Indicator, Loadmore} from 'mint-ui'
    import $ from 'axios'
    import MyHeader from './MyHeader.vue'
    import {mapMutations} from 'vuex'
    export default {
        name: 'MovieList',
        data(){
            return {
                movieList: [],
                allLoaded: false,
                startHeight: {
                    'min-height': window.innerHeight + 'px'
                },
                isGet: true
            }
        },
        components: {
            [Badge.name]: Badge,
            [Loadmore.name]: Loadmore,
            MyHeader
        },
        methods: {
            loadTop(){ //下拉刷新
                if(!this.isGet){
                    return false;
                }
                this.isGet = false;
                $.get('/v2/movie/' + this.movieType + '?start=' + (this.movieList.length + 1) + '&count=2')
                    .then((result) => {
                        this.movieList.unshift(...result.data.subjects); //将数组展开后再将其元素一个个插入到movieList中，和循环插入的结果一样
                        this.$refs.loadmore.onTopLoaded(); //加载完成后将加载中字样隐藏
                        this.isGet = true;
                    })
            },
            loadBottom(){ //上拉加载
                if(!this.isGet){
                    return false;
                }
                this.isGet = false;
                $.get('/v2/movie/' + this.movieType + '?start=' + (this.movieList.length + 1) + '&count=2')
                    .then((result) => {
                        this.movieList.push(...result.data.subjects); //将数组展开后再将其元素一个个插入到movieList中，和循环插入的结果一样
                        this.$refs.loadmore.onBottomLoaded(); //加载完成后将加载中字样隐藏
                        this.isGet = true;
                    })
            },
            toDetail(movieId){
                this.$router.push({
                    name: 'detail',
                    query: {
                        id: movieId
                    }
                });
            },
            ...mapMutations(['changeHeaderTitle'])
        },
        mounted(){
            Indicator.open();
            this.movieType = this.$route.query.uri;
            $.get('/v2/movie/' + this.movieType)
                .then((result) => {
                    //console.log(result);
                    this.changeHeaderTitle(result.data.title);
                    this.movieList = result.data.subjects;
                    Indicator.close();
                })
                .catch((e) => {
                    //
                })
        }
    }
</script>

<style lang="scss" scoped>
    @import '@/style/usage/core/reset.scss';
    .movieList_con{
        height: 100%;
        background-color: #fff;
        @include flexbox();
        @include flex-direction(column);
        .mint-loadmore{
            @include flex();
            width: 100%;
             overflow-y: scroll;
            .movieList_con_box{
                height: 1.05rem;
                padding: .1rem .2rem;
                @include border(0 0 1px 0);
                @include flexbox();
                @include justify-content(space-between);
                .movieList_con_box_img{
                    width: .7rem;
                    img{
                        width: .64rem;
                        height: 0.84rem;
                    }
                }
                .movieList_con_box_title{
                    @include flex();
                    h1{
                        font-size: .18rem;
                        font-weight: normal;
                        @include ellipsis();
                    }
                    h5{
                        font-size: .12rem;
                        font-weight: normal;
                        color: #666666;
                        @include ellipsis();
                    }
                    h3{
                        font-size: .14rem;
                        font-weight: normal;
                        color: #999999;
                        @include ellipsis();
                    }
                }
                .movieList_con_box_fen{
                    width: .35rem;
                }
            }
        }
    }
</style>