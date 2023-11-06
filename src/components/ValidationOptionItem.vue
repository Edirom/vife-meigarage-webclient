<template>
  <tr>
    <td>
      <router-link
        :to="{
          name: 'validation',
          params: {
            id,
          },
        }"
        >{{ name }}</router-link
      >
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
  id: String,
});
</script>
