<template>
    <div class="list_con">
        <div v-show="!isLoading">
            <h3 @click="toLists">
                <span>{{boardList.title}}</span>
                <span class="yo-ico">&#xf07f;</span>
            </h3>
            <div :id="`list_scroll-${scrollId}`">
                <div>
                    <figure v-for="(v, i) of boardList.subjects" :key="v.id" @click="toDetail(v.id)">
                        <img :src="v.images.large" width="90" height="125" />
                        <figcaption>{{v.title}}</figcaption>
                    </figure>
                </div>
            </div>
        </div>
        <div v-if="isLoading" class="spinner">
            <mt-spinner type="fading-circle"></mt-spinner>
        </div>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'
    import {Spinner} from 'mint-ui'
    import $ from 'axios'
    import {mapState} from 'vuex'
    export default {
        name: 'BoardList',
        props: {
            movieType: {
                type: String,
                required: true
            }
        },
        data(){
            return {
                //boardList: [],
                //title: '',
                scrollId: '',
                isLoading: true
            }
        },
        components: {
            [Spinner.name]: Spinner
        },
        methods: {
            genRandom(){
                this.scrollId = new Date().getTime() + Math.ceil(Math.random() * 1000);
                //console.log(this.scrollId);
            },
            toLists(){
                this.$router.push({
                    name: 'lists',
                    query: {
                        uri: this.movieType
                    }
                });
            },
            toDetail(movieId){
                this.$router.push({
                    name: 'detail',
                    query: {
                        id: movieId
                    }
                });
            }
        },
        computed:{
            ...mapState(['movieList']),
            boardList(){
                //let res = this.$store.state.movieList[this.movieType]
                let ml = this.movieList[this.movieType];
                let res = Object.keys(ml).length > 0 ? ml : {};
                //console.log(res)
                this.isLoading = res.subjects ? false : true;
                this.genRandom();
                //$nextTick(将回调延迟到下次DOM更新循环之后执行，在修改数据之后立即调用它，然后等待DOM更新)
                this.$nextTick(function(){
                    new BScroll('#list_scroll-' + this.scrollId, {
                        scrollX: true,
                        click: true
                    });
                });
                return res;
            }
        },
        mounted(){
            // $.get('/v2/movie/' + this.movieType)
            //     .then((result) => {
            //         //console.log(result);
            //         this.BoardList = result.data.subjects;
            //         this.title = result.data.title;
            //         this.isLoading = false;
            //     })
            //     .catch((e) => {
            //         //
            //     })

            // let res = this.$store.state.movieList[this.movieType]; //刷新后会没有数据，正确的做法写在计算属性里
            // this.BoardList = res.subjects;
            // this.title = res.title;
        },
        watch: {
            // isLoading(newval){
            //     this.genRandom();
            //     //$nextTick(将回调延迟到下次DOM更新循环之后执行，在修改数据之后立即调用它，然后等待DOM更新)
            //     this.$nextTick(function(){
            //         new BScroll('#list_scroll-' + this.scrollId, {
            //             scrollX: true,
            //             click: true
            //         });
            //     });
            // }
        }
    }
</script>

<style lang="scss" scoped>
    @import '@/style/usage/core/reset.scss';
    .list_con{
        padding: .1rem;
        background-color: #ffffff;
        margin-top: .2rem;
        height: 1.9rem;
        > div{
            h3{
                font-size: 12px;
                transform: font scale(0.86);
                @include flexbox();
                @include justify-content(space-between);
            }
            > div{
                overflow: hidden;
                > div{
                    @include flexbox();
                    width: max-content;
                    figure{
                        width: .9rem;
                        margin: .05rem;
                        figcaption{
                            font-size: 12px;
                            transform: font scale(0.86);
                            @include ellipsis();
                        }
                    }
                }
            }
        }
        .spinner{
            height: 100%;
            @include flexbox();
            @include align-items(center);
            @include justify-content(center);
        }
    }
</style>