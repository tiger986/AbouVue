<template>
  <swiper :imgCount="4" :isImgExpand="true" :isButtonShow="true"></swiper>
</template>

<script>
import Swiper from '@/components/common/Swiper.vue'
export default {
  name: 'Swipe',
  components: {
    Swiper
  },
  data(){
    return {
        
    }
  }
}
</script>

<style lang="scss" scoped>
</style>