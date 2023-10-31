<template>
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
                <tr>
                  <td>
                    <router-link to="/validation/mei/3.0.0">MEI</router-link>
                  </td>
                  <td>3.0.0</td>
                  <td>
                    <router-link to="/validation/mei/3.0.0"
                      ><i class="icon icon-forward"></i
                    ></router-link>
                  </td>
                </tr>
                <tr>
                  <td>
                    <router-link to="/validation/mei/2.1.1">MEI</router-link>
                  </td>
                  <td>2.1.1</td>
                  <td>
                    <router-link to="/validation/mei/2.1.1"
                      ><i class="icon icon-forward"></i
                    ></router-link>
                  </td>
                </tr>
                <tr>
                  <td>
                    <router-link to="/validation/mei/2.0.0">MEI</router-link>
                  </td>
                  <td>2.0.0</td>
                  <td>
                    <router-link to="/validation/mei/2.0.0"
                      ><i class="icon icon-forward"></i
                    ></router-link>
                  </td>
                </tr>
                <tr>
                  <td>
                    <router-link to="/validation/musicxml/3.1"
                      >MusicXML</router-link
                    >
                  </td>
                  <td>3.1</td>
                  <td>
                    <router-link to="/validation/musicxml/3.1"
                      ><i class="icon icon-forward"></i
                    ></router-link>
                  </td>
                </tr>
                <tr>
                  <td>
                    <router-link to="/validation/musicxml/3.0"
                      >MusicXML</router-link
                    >
                  </td>
                  <td>3.0</td>
                  <td>
                    <router-link to="/validation/musicxml/3.0"
                      ><i class="icon icon-forward"></i
                    ></router-link>
                  </td>
                </tr>
                <tr>
                  <td>
                    <router-link to="/validation/tei/p5-3.5.0">TEI</router-link>
                  </td>
                  <td>P5 Release 3.5.0 (current)</td>
                  <td>
                    <router-link to="/validation/tei/p5.3.5.0"
                      ><i class="icon icon-forward"></i
                    ></router-link>
                  </td>
                </tr>
                <tr>
                  <td>
                    <router-link to="/validation/tei/p5-2.9.1">TEI</router-link>
                  </td>
                  <td>P5 Release 2.9.1</td>
                  <td>
                    <router-link to="/validation/tei/p5.2.9.1"
                      ><i class="icon icon-forward"></i
                    ></router-link>
                  </td>
                </tr>
                <tr>
                  <td>
                    <router-link to="/validation/tei/p5-1.9.1">TEI</router-link>
                  </td>
                  <td>P5 Release 1.9.1</td>
                  <td>
                    <router-link to="/validation/tei/p5.1.9.1"
                      ><i class="icon icon-forward"></i
                    ></router-link>
                  </td>
                </tr>
              </tbody>
            </table>

            <div class="internalComment">
              <h1>Interner Hinweis</h1>
              <p>
                Wir müssen noch überlegen, wie wir mit Profilen umgehen. Aktuell
                gehe ich davon aus (und bastele es so), dass die als Parameter
                im nächsten Schritt übergeben werden. Außerdem sollten wir
                nochmal überlegen, wie wir mit eigenen Schemata / Customizations
                umgehen – soll man die hochladen können, um seine Daten zu
                validieren? Macht über die GUI vermutlich nicht soviel Sinn,
                aber über REST, mit einem Link auf die Schema-Datei vielleicht
                schon…
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Breadcrumb from "@/components/Breadcrumb.vue";
import ValidationOptionItem from "@/components/ValidationOptionItem.vue";

export default {
  name: "validation-scenarios",
  components: {
    ValidationOptionItem,
    Breadcrumb,
  },
};
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
