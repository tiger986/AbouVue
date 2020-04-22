<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script>
export default {
  name: 'About',
  beforeRouteEnter(to, from, next){
    alert('对不起，您没有权限进入！');
    //next();
  }
}
</script>