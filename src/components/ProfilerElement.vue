<template>
  <div class="element" v-bind:class="{'inactive': inactive}">
    <span class="form-group customSwitch"><label class="form-checkbox form-inline input-sm"><input v-on:click="toggleElement()" type="checkbox" v-bind:checked="active"><i class="form-icon"></i></label></span>
    <button v-on:click="selectAttributes()" v-bind:disabled="inactive" class="btn btn-sm">set attributes</button>
    <div class="name">&lt;{{element.name}}&gt;</div>
    <div class="desc">{{element.desc}}</div>
  </div>
</template>

<script>
export default {
  name: "ProfilerElement",
  props: {
    element: Object
  },
  computed: {
    inactive: function() {
      return this.$store.getters.profilerInactiveElements.indexOf(this.element.name) !== -1
    },
    active: function() {
      return this.$store.getters.profilerInactiveElements.indexOf(this.element.name) === -1
    }
  },
  methods: {
    deactivateElement: function() {
      this.$store.dispatch('profilerDeActivateElement',this.element.name)
    },
    activateElement: function() {
      this.$store.dispatch('profilerActivateElement',this.element.name)
    },
    toggleElement: function() {
      if (this.inactive) {
        this.activateElement()
      } else {
        this.deactivateElement()
      }
    },
    selectAttributes: function() {
      this.$store.dispatch('profilerSetCurrentElement',this.element.name)
    }
  }
};
</script>

<style scoped lang="scss">

  .element {
    margin: 0 0 .8em .5em;
    border: .5px solid #999999;
    border-radius: 3px;
    background-color: #deeff5;
    padding: .3rem .5rem .5rem;

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
      margin-top: .2rem;
    }

    .name {
      font-weight: 700;
      font-size: .9rem;
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
