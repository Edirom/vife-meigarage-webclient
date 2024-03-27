<template>
  <div>
    <div>
      <div class="columns">
        <div class="column col-12">
          <Breadcrumb />
        </div>
        <div class="column col-12">
          <h1>Available Modification Options</h1>
          <div class="viewBox">
            <div class="viewBoxInner">
              <table class="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>name</th>
                    <th>id</th>
                  </tr>
                </thead>
                <tbody id="modification-options" ref="container">
                  <ModificationOptionItem
                    v-for="modification in modifications"
                    v-bind="modification"
                    :name="modification.name"
                    :id="modification.id"
                  />
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import Breadcrumb from "@/components/Breadcrumb.vue";
import ModificationOptionItem from "@/components/ModificationOptionItem.vue";
import { computed } from "vue";

const store = useStore();

//const validations = computed(() => store.state.validations);
//console.log("from store", validations.value);
const modifications = computed(() => store.state.modifications);
console.log("from store", modifications.value);
</script>

<style scoped lang="scss">
.viewBox {
  background-color: #f5f5f5;
  border: 0.5px solid #999999;
  border-radius: 3px;
  padding: 2rem;
}

.viewBoxInner {
  background-color: #ffffff;
  padding: 1rem;
}

.internalComment {
  background-color: #ff666666;
  border: 5px solid #ff6666;
  padding: 1.5rem;
  border-radius: 0.5rem;
  margin: 2rem 0;
}
</style>
