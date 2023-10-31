<template>
  <tr>
    <td>
      <router-link :to="`/validation/${format}/${version}/${customization}/`">{{
        name
      }}</router-link>
    </td>
    <td>{{ version }}</td>
    <td>{{ customization }}</td>
  </tr>
</template>

<script setup>
const props = defineProps({
  format: String,
  version: String,
  customization: String,
  name: String,
});
</script>
