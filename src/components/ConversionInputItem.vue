<template>
  <tr>
    <td><router-link :to="'/conversions/' + id">{{label}}</router-link></td>
    <td></td>
    <td><router-link :to="'/conversions/' + id"><i class="icon icon-forward"></i></router-link></td>
  </tr>
</template>

<script>
  export default {
    name: "ConversionInputItem",
    props: {
      id: String,
      label: String,
      input: Object
    }
  };
</script>