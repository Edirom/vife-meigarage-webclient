<template>
  <div class="columns">
    <div class="column col-12">
      <h1>
        <img
          id="largeLogo"
          alt="MEI Garage"
          src="../assets/meigarage.logo.png"
        />
      </h1>
      <!-- <p>
        Welcome to the MEI Garage. Please select a task you would like to
        accomplish.
      </p> -->
    </div>

    <div class="column col-lg-4 col-6 col-md-6 col-xs-12 cardBg">
      <Card
        id="validationCard"
        title="Validation"
        subtitle="Validate files"
        description="Common validation scenarios"
        link="./validation"
        linkText="See all"
        :contents="validationContent"
      />
    </div>

    <div class="column col-lg-4 col-6 col-md-6 col-xs-12">
      <Card
        id="conversionCard"
        title="Conversion"
        subtitle="Convert between formats"
        description="Common file conversions"
        link="./conversions"
        linkText="See all"
        :contents="conversionContent"
      />
    </div>

    <div class="column col-lg-4 col-6 col-md-6 col-xs-12 cardBg">
      <!-- todo: extract values for props into a config file; replace link "./conversions" with "./configuration" -->
      <Card
        id="configurationCard"
        title="Modification"
        subtitle="Modify, enrich and enhance files with additional information"
        description="Common modifications"
        link="./conversions/mei40Corpus/mei40Diff"
        linkText="See all"
        :contents="configContent"
      />
    </div>

    <div class="column col-lg-4 col-6 col-md-6 col-xs-12">
      <Card
        id="customizationCard"
        title="Schema Customization"
        subtitle="Customize the MEI Schema"
        description="Available customizations"
        link="./customization"
        linkText="MEI Customization Service"
        :contents="customizationContent"
      />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Card from "@/components/Card.vue";

export default {
  name: "home",
  data() {
    return {
      //todo: extract configContent in a config file later
      customizationContent: [
        { name: "MEI Customization Service", link: "/customization", href: "" },
        {
          name: "MEI ProfileDrafter",
          link: "/profiler",
          href: "",
          additionalText: "helps to restrict MEI",
        },
        {
          name: "MEI Comparison",
          link: "",
          href: "https://music-encoding.org/archive/comparison-4.0.html",
          additionalText: "compares MEI 4.0 with MEI 3.0",
        },
      ],
      conversionContent: [
        {
          name: "MEI 4.0 (2018) to MEI 5.0 (2023)",
          link: "/conversions/mei40/mei50",
          href: "",
        },
        {
          name: "MusicXML (partwise) to MEI 4.0 (2018)",
          link: "/conversions/musicxml-partwise/mei40",
          href: "",
        },
        {
          name: "MEI 4.0 (2018) to PDF Score (LilyPond)",
          link: "/conversions/mei40/pdf-lilypond",
          href: "",
        },
      ],
      validationContent: [
        { name: "Validate MEI 3.0.0", link: "/validation/mei300", href: "" },
        { name: "Validate MEI 4.0.1", link: "/validation/mei401", href: "" },
        {
          name: "Validate MEI dev Neumes",
          link: "/validation/meidev-neumes",
          href: "",
        },
      ],
      configContent: [
        {
          name: "Create MEI Diff document from corpus document",
          link: "/conversions/mei40Corpus/mei40Diff",
          href: "",
        },
      ],
    };
  },
  components: {
    Card,
  },
  methods: {
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    },
  },
};
</script>

<style lang="scss">
.seeAllButton {
  margin-top: 0.5rem;
}

.column {
  margin-top: 0.4rem;
  margin-bottom: 0.4rem;
}

#largeLogo {
  width: 8rem;
}

.cardBg {
  position: relative;
  overflow: hidden;
}
</style>
