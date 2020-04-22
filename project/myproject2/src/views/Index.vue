<template>
  <div id="Index">
    <div id="nav">
      <router-link active-class="active" :to="{name: 'home'}">Home</router-link> |
      <router-link active-class="active" :to="{path: '/list'}">List</router-link> |
      <router-link active-class="active" :to="{name: 'about'}">About</router-link>
    </div>
    <my-header :title="title"></my-header>
    <router-view/>
  </div>
</template>

<script>
import MyHeader from '../components/MyHeader.vue'
export default {
  data: () => ({
    title: ''
  }),
  components: {
    MyHeader
  },
  methods: {
    changeHeader(){
      let name = this.$route.name;
      switch(name){
        case 'home':
          this.title = '首页';
          break;
        case 'list':
          this.title = '列表';
          break;
        case 'about':
          this.title = '关于';
          break;
        default:
      }
    }
  },
  mounted(){
    this.changeHeader();
    //console.log(this.$route);
  },
  updated(){
    this.changeHeader();
    //console.log(this.$route);
  },
}
</script>

<style lang="scss" scoped>
  #nav{
    margin-bottom: 20px;
    .active{
      color: red;
    }
  }
</style>
