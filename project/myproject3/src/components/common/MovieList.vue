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
    import {CHANGEHEADERTITLE} from '../../store/mutation-types.js'
    export default {
        name: 'MovieList',
        data(){
            return {
                newMovieList: [],
                newMovieList2: [],
                start: 21,
                allLoaded: false,
                startHeight: {
                    'min-height': window.innerHeight + 'px'
                },
                isGet: true,
                title: ''
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
                $.get('/v2/movie/' + this.movieType + '?apikey=0df993c66c0c636e29ecbb5344252a4a&start=' + this.start + '&count=2')
                    .then((result) => {
                        this.newMovieList.unshift(...result.data.subjects); //将数组展开后再将其元素一个个插入到movieList中，和循环插入的结果一样
                        this.$refs.loadmore.onTopLoaded(); //加载完成后将加载中字样隐藏
                        this.start += 2;
                        this.isGet = true;
                    })
            },
            loadBottom(){ //上拉加载
                if(!this.isGet){
                    return false;
                }
                this.isGet = false;
                $.get('/v2/movie/' + this.movieType + '?apikey=0df993c66c0c636e29ecbb5344252a4a&start=' + this.start + '&count=2')
                    .then((result) => {
                        this.newMovieList2.push(...result.data.subjects); //将数组展开后再将其元素一个个插入到movieList中，和循环插入的结果一样
                        this.$refs.loadmore.onBottomLoaded(); //加载完成后将加载中字样隐藏
                        this.start += 2;
                        this.isGet = true;
                    })
            },
            toDetail(movieId){
                let scrollTop = document.querySelector('.mint-loadmore').scrollTop;
                this.scrollTop = scrollTop;

                this.$router.push({
                    name: 'detail',
                    query: {
                        id: movieId
                    }
                });
            },
            ...mapMutations([CHANGEHEADERTITLE])
        },
        computed:{
            movieList(){
                let data = this.$store.state.movieList[this.movieType];
                let res = Object.keys(data).length > 0 ? data.subjects : [];
                if(res.length > 0){
                    Indicator.close();
                }else{
                    Indicator.open();
                }
                this.title = data.title;
                this[CHANGEHEADERTITLE](data.title);
                return [...this.newMovieList, ...res, ...this.newMovieList2];
            }
        },
        created(){
            this.movieType = this.$route.query.uri;
        },
        mounted(){
            // Indicator.open();
            // this.movieType = this.$route.query.uri;
            // $.get('/v2/movie/' + this.movieType)
            //     .then((result) => {
            //         //console.log(result);
            //         this.changeHeaderTitle(result.data.title);
            //         this.movieList = result.data.subjects;
            //         Indicator.close();
            //     })
            //     .catch((e) => {
            //         //
            //     })

            // this.movieType = this.$route.query.uri;
            // let result = this.$store.state.movieList[this.movieType]
            // this.changeHeaderTitle(result.title);
            // this.movieList = result.subjects;
        },
        //当(只有)组件在 <keep-alive> 内被切换，它的 activated 和 deactivated 这两个生命周期钩子函数将会被对应执行。
        activated(){ //切换进来时触发(进来后再刷新也会再触发)
            this[CHANGEHEADERTITLE](this.title);
            //console.log(this.scrollTop)
            document.querySelector('.mint-loadmore').scrollTop = this.scrollTop || 0;
        },
        deactivated(){ //切换离开时触发
            this[CHANGEHEADERTITLE]('');
        },
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