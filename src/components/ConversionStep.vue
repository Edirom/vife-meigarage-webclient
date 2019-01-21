<template>
  <div class="conversionStep" :id="id">
    <h1>{{label}}</h1>
    <div v-if="step.parameters.length > 0">
      <h2>Parameters:</h2>
      <div class="parameter" v-for="param in step.parameters" v-bind="param">
        <div v-if="param.type === 'pathBoolean'">
          <div class="form-group">
            <label class="form-checkbox">
              <input id="param.id" type="checkbox" checked="checked">
              <i class="form-icon"></i> {{param.label}}
            </label>
          </div>
        </div>
        <div v-else>
          <label class="selectBoxLabel">{{param.label}}</label>
          <div class="selectBox form-group">
            <select class="form-select">
              <option v-for="value in param.values" v-bind="value" :value="value">{{value}}</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "ConversionStep",
  props: {
    step: Object,
    label: String,
    id: String
  }
};
</script>

<style scoped lang="scss">
  .conversionStep {
    text-align: left;
    margin: 0 0 .5rem .2rem;
    padding: .5rem 1rem;
    border-radius: 3px;
    border: .5px solid #999999;
    background-color: #f5f5f5;

    h1 {
      font-size: 1rem;
      margin: 0 0 0 -.5rem;
    }

    h2 {
      font-size: .9rem;
      margin: .3rem 0 .2rem 0;
    }

    .parameter {
      margin: 0 0 .2rem 0;
    }

    h3 {
      font-size: .8rem;
      font-weight: 100;
    }

    .selectBoxLabel {
      
    }
  }
</style>
