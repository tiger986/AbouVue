<template>
    <div class="movieDetail_con">
        <my-header class="myHeader" :isShowBack="true"></my-header>
        <div class="movieDetail_con_bg" :style="{'background-image': bgUrl, 'background-size': 'cover'}"></div>
        <div class="movieDetail_con_box">
            <div v-if="isShowInfo">
                <section>
                    <figure>
                        <img :src="detailData.images.large" />
                        <figcaption>{{detailData.title}}</figcaption>
                    </figure>
                    <p>评分：{{detailData.rating.average}}</p>
                    <p>
                        导演：
                        <span v-for="v of detailData.directors" :key="v.id">
                            {{v.name}}
                        </span>
                    </p>
                    <p>
                        主演：
                        <span v-for="v of detailData.casts" :key="v.id">
                            {{v.name}}
                        </span>
                    </p>
                </section>
                <section>
                    <h2>摘要：</h2>
                    <p>{{detailData.summary}}</p>
                </section>
            </div>
        </div>
    </div>
</template>

<script>
    import MyHeader from '../common/MyHeader.vue'
    import BScroll from 'better-scroll'
    import $ from 'axios'
    import {Indicator} from 'mint-ui'
    import {mapMutations} from 'vuex'
    import {CHANGEHEADERTITLE} from '../../store/mutation-types.js'
    export default {
        name: 'MovieDetail',
        data(){
            return {
                bgUrl: 'url()',
                detailData: {},
                isShowInfo: false
            }
        },
        methods: {
            //...mapMutations([''changeHeaderTitle])
            ...mapMutations([CHANGEHEADERTITLE])
        },
        components: {
            MyHeader
        },
        // mounted(){
        //     Indicator.open();
        //     $.get('/v2/movie/subject/' + this.$route.query.id + '?apikey=0df993c66c0c636e29ecbb5344252a4a')
        //         .then((res) => {
        //             this[CHANGEHEADERTITLE](res.data.title);
        //             this.detailData = res.data;
        //             this.bgUrl = 'url(' + res.data.images.large + ')';
        //             this.isShowInfo = true;
        //             this.$nextTick(() => { //因为this.isShowInfo=true后v-if="isShowInfo"的DOM才开始渲染,要等其渲染完成
        //                 new BScroll('.movieDetail_con_box', {
        //                     scrollY: true
        //                 });
        //             });
        //             Indicator.close();
        //         })
        // },

        //当(只有)组件在 <keep-alive> 内被切换，它的 activated 和 deactivated 这两个生命周期钩子函数将会被对应执行。
        activated(){ //切换进来时触发(进来后再刷新也会再触发)
            Indicator.open();
            $.get('/v2/movie/subject/' + this.$route.query.id + '?apikey=0df993c66c0c636e29ecbb5344252a4a')
                .then((res) => {
                    this[CHANGEHEADERTITLE](res.data.title);
                    this.detailData = res.data;
                    this.bgUrl = 'url(' + res.data.images.large + ')';
                    this.isShowInfo = true;
                    this.$nextTick(() => { //因为this.isShowInfo=true后v-if="isShowInfo"的DOM才开始渲染,要等其渲染完成
                        new BScroll('.movieDetail_con_box', {
                            scrollY: true
                        });
                    });
                    Indicator.close();
                })
        },
        deactivated(){ //切换离开时触发
            this.isShowInfo = false;
            this.bgUrl = 'url()';
            this[CHANGEHEADERTITLE]('');
        },
    }
</script>

<style lang="scss" scoped>
    @import '@/style/usage/core/reset.scss';
    .movieDetail_con{
        height: 100%;
        position: relative;
        .movieDetail_con_bg{
            width: 100%;
            height: 100%;
            opacity: 0.1;
        }
        .myHeader{
            width: 100%;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 100;
        }
        .movieDetail_con_box{
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            div{
                padding: .7rem .2rem .4rem;
                section:first-child{
                    figure{
                        img{
                            width: 3.35rem;
                            height: 4rem;
                        }
                        figcaption{
                            font-size: .2rem;
                            color: #444;
                            margin: .2rem 0;
                            text-align: center;
                        }
                    }
                    p{
                        font-size: .12rem;
                        color: #888;
                        line-height: .26rem;
                        @include ellipsis();
                    }
                }
                section:last-child{
                    h2{
                        font-size: .16rem;
                        line-height: .6rem;
                    }
                    p{
                        font-size: .12rem;
                        color: #666;
                        padding: 0 .2rem .2rem;
                    }
                }
            }
        }
    }
</style>