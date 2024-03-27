// copy of ValidationOptionItem to implement modification options
<template>
  <tr>
    <td>
      <router-link
        :to="{
          name: 'modification',
          params: {
            id,
          },
        }"
        >{{ name }}</router-link
      >
    </td>
    <td>{{ id }}</td>
  </tr>
</template>

<script setup>
import ValidationOptionItem from "@/components/ValidationOptionItem.vue";

const props = defineProps({
  name: String,
  id: String,
});
</script>
