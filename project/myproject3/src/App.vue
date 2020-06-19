<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import * as actionTypes from './store/action-types.js'
  import {mapActions} from 'vuex'
  export default {
    created(){
      //this.$store.dispatch(actionTypes.GETDATA);
      this[actionTypes.GETDATA]();
    },
    methods: {
      ...mapActions([actionTypes.GETDATA])
    }
  }
</script>

<style lang="scss">
  @import './style/usage/core/reset.scss';
  #app{
    height: 100%;
  }
</style>
