<template>
  <div
    class="attClass"
    v-bind:title="attClass.name"
    v-bind:class="{ inactive: inactive, inactiveModule: inactiveModule }"
  >
    <span class="form-group customSwitch"
      ><label class="form-checkbox form-inline input-sm"
        ><input
          v-on:click="toggleAttClass()"
          type="checkbox"
          v-bind:checked="active" /><i class="form-icon"></i></label
    ></span>
    <div class="name">{{ attClass.name }}</div>
    <div class="desc">{{ moduleDesc }}{{ attClass.desc }}</div>
    <div v-if="hasAttributes">
      <ProfilerAttribute v-for="att in attClass.atts" v-bind:att="att" />
    </div>
    <div v-if="hasChildClasses">
      <ProfilerAttClass
        v-for="attClass in attClass.classes"
        v-bind:attClass="attClass"
      />
    </div>
  </div>
</template>

<script>
import ProfilerAttribute from "@/components/ProfilerAttribute.vue";

export default {
  name: "ProfilerAttClass",
  components: {
    ProfilerAttribute,
  },
  props: {
    attClass: Object,
  },
  computed: {
    inactive: function () {
      return (
        this.$store.getters.profilerInactiveAttClasses.indexOf(
          this.attClass.name,
        ) !== -1
      );
    },
    inactiveModule: function () {
      if (typeof this.attClass.module === "undefined") {
        return false;
      }
      return (
        this.$store.getters.profilerInactiveModules.indexOf(
          this.attClass.module,
        ) !== -1
      );
    },
    active: function () {
      return (
        this.$store.getters.profilerInactiveAttClasses.indexOf(
          this.attClass.name,
        ) === -1
      );
    },
    hasAttributes: function () {
      return (
        typeof this.attClass.atts !== "undefined" &&
        this.attClass.atts.length > 0
      );
    },
    hasChildClasses: function () {
      return (
        typeof this.attClass.classes !== "undefined" &&
        this.attClass.classes.length > 0
      );
    },
    moduleDesc: function () {
      if (typeof this.attClass.module === "undefined") {
        return "";
      }
      return "(" + this.attClass.module + ") ";
    },
  },
  methods: {
    deactivateAttClass: function () {
      this.$store.dispatch("profilerDeActivateAttClass", this.attClass.name);
    },
    activateAttClass: function () {
      this.$store.dispatch("profilerActivateAttClass", this.attClass.name);
    },
    toggleAttClass: function () {
      if (this.inactive) {
        this.activateAttClass();
      } else {
        this.deactivateAttClass();
      }
    },
  },
};
</script>

<style lang="scss">
$attClassColor: #c0f4ae66;

.attClass {
  margin: 0 0 0.8em 0.5em;
  border: 0.5px solid #999999;
  border-radius: 3px;
  background-color: $attClassColor;
  padding: 0.3rem 0.5rem 0.5rem;

  &.inactive,
  &.inactiveModule {
    color: #999999;
    background-color: #cccccc;

    .attClass {
      background: repeating-linear-gradient(
        -45deg,
        $attClassColor,
        $attClassColor 12px,
        #cb7d7d 12px,
        #cb7d7d 14px
      );
      color: #666666;

      &.inactive,
      &.inactiveModule {
        background: repeating-linear-gradient(
          -45deg,
          #dddddd,
          #dddddd 12px,
          #cfb0b0 12px,
          #cfb0b0 14px
        );
        color: #999999;
      }
    }

    .form-checkbox input:checked + .form-icon {
      background-color: #666666;
    }
  }

  &.inactiveModule .form-checkbox {
    display: none;
  }

  .customSwitch {
    display: inline-block;
    float: left;
    margin-bottom: 0;
  }

  button {
    float: right;
    margin-top: 0.2rem;
  }

  .name {
    font-weight: 700;
    font-size: 0.9rem;
    display: table-cell;
    padding-right: 0.5rem;
  }

  .desc {
    font-weight: 300;
    margin-left: 1.6rem;
    display: table-cell;
    .number {
      font-weight: 500;
    }
  }
}
</style>
