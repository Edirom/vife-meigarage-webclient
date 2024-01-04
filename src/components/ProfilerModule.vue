<template>
  <div class="module" v-bind:class="{ inactive: inactive }">
    <span class="form-group customSwitch"
      ><label class="form-checkbox form-inline input-sm"
        ><input
          v-on:click="toggleModule()"
          type="checkbox"
          v-bind:checked="!inactive" /><i class="form-icon"></i></label
    ></span>
    <button
      v-on:click="setCurrentModule()"
      v-bind:disabled="inactive"
      class="btn btn-sm"
    >
      customize
    </button>
    <div class="name">{{ module.name }}</div>
    <div class="desc">
      {{ module.desc }} (elements:&nbsp;<span class="number">{{
        module.elementCount
      }}</span
      >, attribute&nbsp;classes:&nbsp;<span class="number">{{
        module.attClassCount
      }}</span
      >)
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfilerModule",
  props: {
    module: Object,
  },
  computed: {
    inactive: function () {
      return (
        this.$store.getters.profilerInactiveModules.indexOf(
          this.module.name,
        ) !== -1
      );
    },
    active: function () {
      return (
        this.$store.getters.profilerInactiveModules.indexOf(
          this.module.name,
        ) === -1
      );
    },
  },
  methods: {
    deactivateModule: function () {
      this.$store.dispatch("profilerDeActivateModule", this.module.name);
    },
    activateModule: function () {
      this.$store.dispatch("profilerActivateModule", this.module.name);
    },
    toggleModule: function () {
      if (this.inactive) {
        this.activateModule();
      } else {
        this.deactivateModule();
      }
    },
    setCurrentModule: function () {
      this.$store.dispatch("profilerSetCurrentModule", this.module.name);
    },
  },
};
</script>

<style scoped lang="scss">
.module {
  margin: 0 0 0.8em 0.5em;
  border: 0.5px solid #999999;
  border-radius: 3px;
  background-color: #f5f5f5;
  padding: 0.3rem 0.5rem 0.5rem;

  &.inactive {
    color: #999999;
    background-color: #cccccc;
  }

  .customSwitch {
    display: inline-block;
    float: left;
  }

  button {
    float: right;
    margin-top: 0.2rem;
  }

  .name {
    font-weight: 700;
    font-size: 0.9rem;
  }

  .desc {
    font-weight: 300;
    margin-left: 1.6rem;
    .number {
      font-weight: 500;
    }
  }
}
</style>
