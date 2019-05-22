<template>
  <tr>
    <td><router-link :to="'/conversions/' + input + '/' + id">{{ label }}</router-link></td>
    <td></td>
    <td><router-link :to="'/conversions/' + input + '/' + id"><i class="icon icon-forward"></i></router-link></td>
  </tr>
</template>

<script>
export default {
  name: "ConversionOutputItem",
  props: {
    input: String,
    id: String,
    label: String
  },
  computed: {}
};
</script>
