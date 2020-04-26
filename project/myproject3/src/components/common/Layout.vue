<template>
  <div class="layout_con">
    <div>
      <router-view />
    </div>
    <mt-tabbar v-model="selected">
      <mt-tab-item v-for="v of tabbar" :key="v.id" :id="v.id" @click.native="tabClick(v.path)">
        <i slot="icon" class="yo-ico" v-html="v.icon"></i>
        {{v.name}}
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
export default {
  name: 'Layout',
  data(){
    return {
      selected: 'board',
      tabbar: [
        {
          id: 'board',
          name: '榜单',
          icon: '&#xe612;',
          path: '/index/board'
        },
        {
          id: 'search',
          name: '搜索',
          icon: '&#xe7da;',
          path: '/index/search'
        },
        {
          id: 'my',
          name: '我的',
          icon: '&#xe7d5;',
          path: '/index/my'
        }
      ]
    }
  },
  methods: {
    tabClick(path){
      this.$router.push({path: path});
    }
  }

}
</script>

<style lang="scss" scoped>
  @import '@/style/usage/core/reset.scss';
  @font-face {
    font-family: 'yofont';
    src: 
      url('../../assets/iconfont/iconfont.woff') format('woff'),
      url('../../assets/iconfont/iconfont.ttf') format('truetype'),
  }
  .layout_con{
    width: 100%;
    height: 100%;
    @include flexbox();
    @include flex-direction(column);
    >div:first-child{
      @include flex();
      width: 100%;
    }
    >div:last-child{
      position: static;
    }
    a{
      color: #666666;
    }
    i{
      font-size: .2rem;
    }
  }
</style>
