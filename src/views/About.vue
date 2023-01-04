<template>
  <div class="about">
    <h1>About the MEI Garage</h1>
    <p>
      The MEI Garage is a "workshop" for symbolic music encoding data. It is
      modelled after the TEI's
      <a href="https://oxgarage.tei-c.org/" target="_blank">OxGarage</a> and
      offers a convenient interface to common tasks for music encoding data,
      both through Web and REST interfaces. It offers <u>conversion</u> between
      different formats, <u>customization</u> of the MEI Schema,
      <u>validation</u> of various XML-based music encoding formats, and
      <u>configuration</u> of MEI data to conform to specific profiles and
      needs.
    </p>
    <p>
      MEI Garage uses existing open source transformations, scripts and tools.
      The MEI Garage itself is open source as well. It has been initiated by the
      <a href="https://edirom.de" target="_blank"
        >Virtueller Forschungsverbund Edirom</a
      >
      (Virtual Research Group Edirom), and is maintained by the MEI Community.
    </p>
    <p>
      If you would like to contribute to the MEI Garage – perhaps by adding
      another transformation or tool – please
      <a
        href="https://music-encoding.org/community/community-contacts.html"
        target="_blank"
        >contact</a
      >
      us.
    </p>
    <p>
      The MEI Garage, and all data operations done with it, are provided "as
      is", without warranty of any kind, express or implied, including but not
      limited to the warranties of merchantability, fitness for a particular
      purpose or noninfringement. In no event shall the authors or copyright
      holders be liable for any claim, damages or other liability, whether in an
      action of contract, tort or otherwise, arising from, out of or in
      connection with the software or the use or other dealings in the software.
    </p>
    <p>
      If you notice problems of any conversion, script or tool offered by the
      MEI Garage, please reach out and help us to remedy that flaw, for the
      benefit of all other users of these tools, both inside and outside the MEI
      Garage context. Thanks!
    </p>
    <p>
      The currently used webclient version is {{ $store.getters.appVersion }}.
    </p>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "about",
  components: {},
  methods: {},
};
</script>

<style lang="scss">
h1 {
  margin: 5rem auto 2rem;
}
</style>
