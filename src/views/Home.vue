<template>
  <div class="columns">

    <div class="column col-12">
      <h1>MEIGarage</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
        Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus
        mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa
        quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo,
        rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium.
        Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi.
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
          name: "MEI All"
        },
        {
          name: "MEI CMN (2013+)"
        },
        {
          name: "Local Customization File"
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
</style>
