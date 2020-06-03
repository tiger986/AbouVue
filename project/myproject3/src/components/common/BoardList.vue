<template>
    <div class="list_con">
        <div v-if="!isLoading">
            <h3 @click="toLists">
                <span>{{title}}</span>
                <span class="yo-ico">&#xf07f;</span>
            </h3>
            <div :id="`list_scroll-${scrollId}`">
                <div>
                    <figure v-for="(v, i) of BoardList" :key="v.id" @click="toDetail(v.id)">
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
                BoardList: [],
                title: '',
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
        mounted(){
            $.get('/v2/movie/' + this.movieType)
                .then((result) => {
                    //console.log(result);
                    this.BoardList = result.data.subjects;
                    this.title = result.data.title;
                    this.isLoading = false;
                })
                .catch((e) => {
                    //
                })
        },
        watch: {
            isLoading(newval){
                this.genRandom();
                //$nextTick(将回调延迟到下次DOM更新循环之后执行，在修改数据之后立即调用它，然后等待DOM更新)
                this.$nextTick(function(){
                    new BScroll('#list_scroll-' + this.scrollId, {
                        scrollX: true,
                        click: true
                    });
                });
            }
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