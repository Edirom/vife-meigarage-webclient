<template>
  <div>
    <div class="columns">
      <div class="column col-12">
        <Breadcrumb />
      </div>
      <div class="column col-12">
        <h1>Validation</h1>
        <p>
          Validating <span class="filename">FILENAME</span> against
          <span class="format">{{ format }}</span> in version
          <span class="version">{{ version }}</span>
        </p>

        <div class="viewBox">
          <div class="viewBoxInner">
            <h1>Success</h1>
            <i class="icon icon-4x icon-check"></i>
            <p>Your file is valid.</p>
          </div>
        </div>
        <p class="additionalInfo">
          This results page will be available for
          <span id="remainingTime">two hours</span>. After that, you will be
          redirected to the options page, and we will delete your uploaded file
          from our servers automatically.
        </p>

        <div class="internalComment">
          <h1>Interner Hinweis</h1>
          <p>
            Ich fände es ziemlich klasse, wenn wir die verbleibende Zeit mit
            <a href="https://momentjs.com/" target="_blank">Moment.js</a>
            angeben könnten. Das ist hinreichend präzise und leichter
            nachzuvollziehen als irgendwelche UTC-Angaben.
          </p>
          <p>
            Wenn man nach Ablauf dieser Zeit nochmal die URL aufruft, sollte der
            Router einen auf die Validation-scenario-Seite bringen, so dass man
            dann ggf. neu hochladen muss.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Breadcrumb from "@/components/Breadcrumb.vue";

export default {
  name: "validation-success",
  components: {
    Breadcrumb,
  },
  computed: {
    format() {
      return this.$route.params.format;
    },

    version() {
      return this.$route.params.version;
    },
  },
};
</script>

<style scoped lang="scss">
.filename,
.format,
.version {
  font-size: 1.2rem;
  font-weight: 700;
}

.viewBox {
  background-color: #1dbf2a;
  border: 0.5px solid #999999;
  border-radius: 3px;
  padding: 2rem;
}

.viewBoxInner {
  background-color: #ffffff;
  padding: 1rem;

  p {
    margin: 1rem 0 0;
  }
}

.additionalInfo {
  margin: 2rem 0;
  text-align: left;
}

#remainingTime {
  font-size: 1rem;
  font-weight: 700;
}

.internalComment {
  background-color: #ff666666;
  border: 5px solid #ff6666;
  padding: 1.5rem;
  border-radius: 0.5rem;
  margin: 2rem 0;
}
</style>
