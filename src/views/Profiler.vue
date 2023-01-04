<template>
  <div class="columns">
    <div class="column col-12">
      <Breadcrumb />
    </div>
    <div class="column col-12">
      <h1>MEI ProfileDrafter</h1>
      <p>
        Customize MEI to your specific needs with an ODD customization. At this
        point, customizations will always be based on MEI v4.0.1.
      </p>
    </div>
    <div class="optionsBox column col-2">
      <div class="stickyBox">
        <h1>Options</h1>
        <div class="dl">
          <div class="dt">Format</div>
          <div class="dd">{{ format }}</div>
          <div class="dt">Version</div>
          <div class="dd">{{ version }}</div>
        </div>
        <hr />
        <ProfilerODDHandler />
        <hr />
        <div class="displayOptions">
          <div class="showDesc">
            <span class="form-group customSwitch"
              ><label class="form-checkbox form-inline input-sm"
                ><input
                  v-on:click="toggleDesc()"
                  type="checkbox"
                  v-bind:checked="showDesc" /><i class="form-icon"></i></label
            ></span>
            show desc
          </div>
          <div class="showInactive">
            <span class="form-group customSwitch"
              ><label class="form-checkbox form-inline input-sm"
                ><input
                  v-on:click="toggleInactiveDisplay()"
                  type="checkbox"
                  v-bind:checked="showInactive" /><i
                  class="form-icon"
                ></i></label
            ></span>
            show inactive
          </div>
        </div>
      </div>
    </div>
    <div
      class="profileDrafter column col-10"
      v-bind:class="{ hideDesc: !showDesc, hideInactive: !showInactive }"
    >
      <div class="columns" style="margin-left: 0.5rem">
        <div
          v-if="level === 'modules'"
          class="column col-12"
          style="margin-top: 0"
        >
          <div v-for="module in modules">
            <ProfilerModule v-bind:module="module" />
          </div>
        </div>
        <div
          v-if="level === 'singleModule'"
          class="column col-12"
          style="margin-top: 0"
        >
          <div class="heading module stickyBox">
            <div>
              <button
                class="btn btn-link"
                title="show modules"
                v-on:click="showModuleSelection()"
              >
                <i class="icon icon-back"></i>
              </button>
              <span class="moduleName">{{ currentModule.name }}</span>
            </div>
            <div class="desc">
              {{ currentModule.desc }} (elements:&nbsp;<span class="number">{{
                currentModule.elementCount
              }}</span
              >, attribute&nbsp;classes:&nbsp;<span class="number">{{
                currentModule.attClassCount
              }}</span
              >)
            </div>
          </div>
          <div v-for="element in elements">
            <ProfilerElement v-bind:element="element" />
          </div>
          <div v-for="attClass in attClasses">
            <ProfilerAttClass v-bind:attClass="attClass" />
          </div>
        </div>
        <div
          v-if="level === 'element'"
          class="column col-12"
          style="margin-top: 0"
        >
          <div class="heading element stickyBox">
            <div>
              <button
                class="btn btn-link"
                title="show modules"
                v-on:click="goBack()"
              >
                <i class="icon icon-back"></i>
              </button>
              <span class="elementName">&lt;{{ currentElement.name }}&gt;</span>
            </div>
            <div class="desc">
              {{ currentElement.desc }}
            </div>
          </div>
          <ProfilerAttribute v-for="att in currentAtts.atts" v-bind:att="att" />
          <ProfilerAttClass
            v-for="attClass in currentAtts.classes"
            v-bind:attClass="attClass"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Breadcrumb from "@/components/Breadcrumb.vue";
import { download } from "@/util";
import Loading from "@/components/Loading";
import NotFound from "@/components/NotFound";
import ProfilerModule from "@/components/ProfilerModule.vue";
import ProfilerElement from "@/components/ProfilerElement.vue";
import ProfilerAttClass from "@/components/ProfilerAttClass.vue";
import ProfilerAttribute from "@/components/ProfilerAttribute.vue";
import ProfilerODDHandler from "@/components/ProfilerODDHandler.vue";

export default {
  name: "Profiler",
  components: {
    Breadcrumb,
    Loading,
    NotFound,
    ProfilerModule,
    ProfilerElement,
    ProfilerAttClass,
    ProfilerAttribute,
    ProfilerODDHandler,
  },
  methods: {
    showModuleSelection: function () {
      this.$store.dispatch("profilerSetCurrentModule", null);
    },
    toggleDesc: function () {
      this.$store.dispatch("profilerToggleShowDesc");
    },
    toggleInactiveDisplay: function () {
      this.$store.dispatch("profilerToggleShowInactive");
    },
    goBack: function () {
      this.$store.dispatch("profilerSetCurrentElement", null);
    },
  },
  computed: {
    format: function () {
      return this.$store.getters.profilerFormat;
    },
    version: function () {
      return this.$store.getters.profilerVersion;
    },
    modules: function () {
      return this.$store.getters.profilerModules;
    },
    level: function () {
      return this.$store.getters.profilerLevel;
    },
    currentModule: function () {
      return this.$store.getters.profilerCurrentModule;
    },
    currentElement: function () {
      return this.$store.getters.profilerCurrentElement;
    },
    currentAtts: function () {
      return this.$store.getters.profilerCurrentAtts;
    },
    elements: function () {
      return this.$store.getters.profilerModuleElements;
    },
    attClasses: function () {
      return this.$store.getters.profilerModuleAttClasses;
    },
    showDesc: function () {
      return this.$store.getters.profilerShowDesc;
    },
    showInactive: function () {
      return this.$store.getters.profilerShowInactive;
    },
  },
  created() {
    this.$store.dispatch("profilerFetchModules");
    // this.setOptions()
  },
};
</script>

<style lang="scss">
.optionsBox {
  background-color: #f5f5f5;
  border: 0.5px solid #999999;
  border-radius: 3px;
  padding: 0.5rem;
  text-align: left;
  box-sizing: border-box;

  h1 {
    font-size: 1.2em;
  }

  hr {
    border: 0.5px solid #999999;
  }

  .dl {
    .dt {
      width: 4em;
      float: left;
      clear: both;
      text-align: right;
      padding-right: 0.5em;
      font-weight: 700;
    }

    .dd {
    }
  }
}

.profileDrafter {
  text-align: left;

  .heading {
    background-color: #f5f5f5;
    border: 0.5px solid #999999;
    border-radius: 3px;
    padding: 0.5rem;
    text-align: left;
    box-sizing: border-box;
    margin-bottom: 0.5rem;
    z-index: 2;

    button {
      font-size: 1rem;
      margin-top: -0.2rem;
    }

    .moduleName,
    .elementName {
      font-size: 1.2rem;
      font-weight: 700;
    }

    .desc {
      margin-left: 1.8rem;
    }
  }

  &.hideInactive .inactive,
  &.hideInactive .inactiveModule {
    display: none;
  }

  &.hideDesc .desc {
    display: none;
  }
}

.stickyBox {
  position: sticky;
  top: 0;
}
</style>
