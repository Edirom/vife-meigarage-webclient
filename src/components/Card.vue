<template>
  <div :id="id" class="card">
    <div class="card-header">
      <div class="card-title h5">{{ title }}</div>
      <div class="card-subtitle text-gray">{{ subtitle }}</div>
    </div>
    <div class="card-body">
      <table class="table table-striped table-hover">
        <thead>
          <tr>
            <th>{{ description }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="entry in firstFew" :entry="entry" :key="entry.name">
            <td>
              <router-link v-if="entry.link" :to="entry.link">{{
                entry.name
              }}</router-link>
              <span v-if="!entry.link && !entry.href">{{ entry.name }}</span>
              <a v-if="entry.href" :href="entry.href" target="_blank">{{
                entry.name
              }}</a>
              <span v-if="entry.additionalText">
                ({{ entry.additionalText }})
              </span>
            </td>
          </tr>
        </tbody>
      </table>
      <router-link :to="link" class="btn btn-sm float-right seeAllButton">{{
        linkText
      }}</router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: "home-card",
  props: {
    id: String,
    title: String,
    subtitle: String,
    description: String,
    link: String,
    linkText: String,
    contents: Array,
  },
  computed: {
    firstFew: function () {
      if (this.contents.length < 5) {
        return this.contents;
      }
      return this.contents.slice(0, 4);
    },
  },
};
</script>
<style lang="scss">
.seeAllButton {
  margin-top: 0.5rem;
}
</style>
