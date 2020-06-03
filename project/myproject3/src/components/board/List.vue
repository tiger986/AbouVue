<template>
    <div>
        <board-list movieType="in_theaters"></board-list>
        <board-list movieType="coming_soon"></board-list>
        <board-list movieType="new_movies"></board-list>
        <board-list movieType="top250"></board-list>
    </div>
</template>

<script>
    import BoardList from '@/components/common/BoardList'
    export default {
        name: 'List',
        components: {
            BoardList
        }
    }
</script>

<style lang="scss" scoped>
    @import '@/style/usage/core/reset.scss';
</style>