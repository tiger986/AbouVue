<template>
    <div class="list">
        <ul>
            <li v-for="(v, i) of list" :key="i">
                <router-link active-class="active" :to="{name: 'list', params: {id: i+1}}">{{v}}</router-link>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'List',
    data: () => ({
        list: ['aaa', 'bbb', 'ccc', 'ddd'],
    })
}
</script>

<style lang="scss" scoped>
    .active{
        color: green;
    }
</style>
