<template>
  <div class="columns">

    <div class="column col-12">
      <div class="logo"><img id="largeLogo" alt="MEI Garage" src="../assets/meigarage.logo.png"></div>
      <p>
        Welcome to the MEI Garage. Please select a task you would like to accomplish.
      </p>
    </div>

    <div class="column col-lg-4 col-6 col-md-6 col-xs-12">
      <home-card title="Validation" subtitle="Validate files" link="/validation"
                 description="Common validation scenarios:" :contents="validations"></home-card>
    </div>

    <div class="column col-lg-4 col-6 col-md-6 col-xs-12">
      <home-card title="Conversion" subtitle="Convert between formats" link="/conversions"
                 description="Common file conversions:" :contents="conversions"></home-card>
    </div>

    <div class="column col-lg-4 col-6 col-md-6 col-xs-12">
      <home-card title="Customization" subtitle="Customize the MEI Schema" link="/customization"
                 description="Common customizations:" :contents="customizations"></home-card>
    </div>

    <div class="column col-lg-4 col-6 col-md-6 col-xs-12">
      <home-card title="Data Configuration" subtitle="Set data profiles" link="/configuration"
                 description="Common data configurations:" :contents="configurations"></home-card>
    </div>
  </div>

</template>

<script>
// @ is an alias to /src
import HomeCard from "@/components/Card.vue";

export default {
  name: "home",
  components: {
    HomeCard
  },
  methods: {
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    }
  },
  data() {
    return {
      validations: [
        {
          name: "Validate MEI 3.0.0"
        },
        {
          name: "Validate MEI 4.0.0"
        },
        {
          name: "Validate MusicXML 3.1"
        }
      ],
      conversions: [
        {
          name: "MEI 3.0 to MEI 4.0",
          link: "/conversions/mei30/mei40"
        },
        {
          name: "MusicXML (partwise) to MEI",
          link: "/conversions/musicxml-partwise/mei40"
        },
        {
          name: "MusicXML (timewise) to MEI",
          link: "/conversions/musicxml-timewise/mei40"
        }
      ],
      customizations: [
        {
          name: "MEI Customization Service",
          link: "/customization"
        },
        {
          name: "MEI ProfileDrafter (helps to restrict MEI)",
          href: "/profileDrafter.html"
        },
        {
          name: "MEI Comparison (compares MEI 4.0 with MEI 3.0)",
          href: "https://music-encoding.org/archive/comparison-4.0.html"
        }
      ],
      configurations: [
        {
          name: "Adjust MEI Controlevents"
        },
        {
          name: "Add timestamps"
        },
        {
          name: "Add IDs"
        }
      ]
    };
  }
};
</script>

<style lang="scss">
.column {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}
.logo {
  img {
    max-height: 15vh;
  }
}
</style>
