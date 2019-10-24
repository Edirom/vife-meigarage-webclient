<template>
  <div class="att">
    <div class="name">@{{att.name}}</div>
    <div class="desc">{{att.desc}}</div>
  </div>
</template>

<script>
export default {
  name: "ProfilerAttribute",
  props: {
    att: Object
  },
  computed: {

  },
  methods: {

  }
};
</script>

<style scoped lang="scss">

  .att {
    margin: 0 0 0 2.5em;
    padding: 0 .5rem 0;

    .name {
      font-weight: 400;
      font-size: .9rem;
      display: table-cell;
      min-width: 6rem;
      margin-right: .3rem;
    }

    .desc {
      font-weight: 300;
      display: table-cell;
    }

  }
</style>
