<template>
  <div class="pageHeader float-left">
    <h1>MEI Garage</h1>
    <ul class="breadcrumb">
      <li class="breadcrumb-item">
        <router-link to="/">Home</router-link>
      </li>
      <li
        v-if="$route.path.indexOf('/conversions') == 0"
        class="breadcrumb-item"
      >
        <router-link to="/conversions">Conversions</router-link>
      </li>
      <li v-if="$route.params.inputFormat" class="breadcrumb-item">
        <router-link to="/conversions/input">{{
          $route.params.inputFormat
        }}</router-link>
      </li>
      <li v-if="$route.params.outputFormat" class="breadcrumb-item">
        <router-link to="/conversions/output">{{
          $route.params.outputFormat
        }}</router-link>
      </li>
      <li
        v-if="$route.path.indexOf('/validation') == 0"
        class="breadcrumb-item"
      >
        <router-link to="/validation">Validation</router-link>
      </li>
      <li v-if="$route.params.format" class="breadcrumb-item">
        <router-link to="/validation/format/version"
          >{{ $route.params.format }} {{ $route.params.version }}</router-link
        >
      </li>
      <li
        v-if="
          $route.path ==
          '/validation/mei/4.0.1/47edf1ec-bc4e-46bd-8be3-292fc270d8f7'
        "
        class="breadcrumb-item"
      >
        47edf1ec-bc4e-46bd-8be3-292fc270d8f7
      </li>
      <li
        v-if="
          $route.path ==
          '/validation/mei/4.0.1/50ea0681-85dd-4242-995f-c8008ed04917'
        "
        class="breadcrumb-item"
      >
        50ea0681-85dd-4242-995f-c8008ed04917
      </li>
      <li v-if="$route.path == '/customization'" class="breadcrumb-item">
        <router-link to="/customization">Customization</router-link>
      </li>
      <li v-if="$route.path == '/configuration'" class="breadcrumb-item">
        <router-link to="/configuration">Data Configuration</router-link>
      </li>
      <li v-if="$route.path == '/profiler'" class="breadcrumb-item">
        <router-link to="/profiler">MEI ProfileDrafter</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Breadcrumb",
  props: {
    msg: String,
  },
};
</script>

<style scoped lang="scss">
.pageHeader h1 {
  margin: 0;
  font-size: 1.1rem;
  text-align: left;
}
</style>
