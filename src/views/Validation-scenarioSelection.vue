<template>
  <div>
    <div>
      <div class="columns">
        <div class="column col-12">
          <Breadcrumb />
        </div>
        <div class="column col-12">
          <h1>Available Validation Scenarios</h1>
          <div class="viewBox">
            <div class="viewBoxInner">
              <table class="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>name</th>
                    <th>version</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody id="validation-scenarios" ref="container">
                  <tr>
                    <td>
                      <router-link to="/validation/mei/4.0.1">MEI</router-link>
                    </td>
                    <td>4.0.1 (current) [-> nur der hier geht]</td>
                    <td>
                      <router-link to="/validation/mei/4.0.1"
                        ><i class="icon icon-forward"></i
                      ></router-link>
                    </td>
                  </tr>
                  <ValidationOptionItem
                    format="mei"
                    version="4.0.1"
                    name="meimeimei"
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
import Breadcrumb from "@/components/Breadcrumb.vue";
import ValidationOptionItem from "@/components/ValidationOptionItem.vue";

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
