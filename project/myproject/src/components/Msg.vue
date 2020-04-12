<template>
  <div>
    <div>
      <router-link to="/page1">page1</router-link>
      <router-link to="/page2">page2</router-link>
      <router-link to="/page3">page3</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  export default{
    name: 'Msg',
    data: function(){
      return {
        msg: 'bbb'
      }
    }
  }
</script>

<style>

</style>