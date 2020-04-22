<template>
  <div class="header">
    {{title}}
  </div>
</template>

<script>
export default {
  name: 'MyHeader',
  props: ['title']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" scoped>
  .header{
    height: 30px;
    background-color: #f5f5f5;
    font-size: 16px;
    color: #333333;
    line-height: 30px;
    text-align: center;
  }
</style>
