<template>
  <div class="pageHeader float-left">
    <h1>MEI Garage</h1>
    <ul class="breadcrumb">
      <li class="breadcrumb-item">
        <router-link to="/">Home</router-link>
      </li>
      <li class="breadcrumb-item">
        <router-link to="/conversions">Conversions</router-link>
      </li>
      <li v-if="$route.params.inputFormat" class="breadcrumb-item">
        <router-link to="/conversions/input">{{$route.params.inputFormat}}</router-link>
      </li>
      <li v-if="$route.params.outputFormat" class="breadcrumb-item">
        <router-link to="/conversions/output">{{$route.params.outputFormat}}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Breadcrumb",
  props: {
    msg: String
  }
};
</script>

<style scoped lang="scss">
  .pageHeader h1 { 
    margin: 0;
    font-size: 1.1rem;
    text-align: left;
  }
</style>