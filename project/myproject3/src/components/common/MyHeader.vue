<template>
    <div class="myHeader">
        <div class="yo-header">
            <h2 class="title">{{headerTitle}}</h2>
            <span class="regret yo-ico" v-show="isShowBack" @click="goBack">&#xf07d;</span>
            <span class="affirm"></span>
        </div>
    </div>
</template>

<script>
    import {mapState, mapMutations} from 'vuex'
    export default {
        name: 'MyHeader',
        props: {
            isShowBack: {
                type: Boolean,
                required: true
            }
        },
        methods:{
            ...mapMutations(['changeHeaderTitle']),
            goBack(){
                this.$router.back();
            }
        },
        computed: {
            ...mapState(['headerTitle'])
        },
        created(){
            this.changeHeaderTitle('');
        }
    }
</script>

<style lang="scss" scoped>
    @import '@/style/usage/core/reset.scss';
    @import '@/style/usage/fragment/yo-header.scss';
    @include yo-header(
        $bgcolor: #40586d,
        $border-color: #40586d,
        $color: #fff,
        $item-ico-color: #fff
    )
</style>