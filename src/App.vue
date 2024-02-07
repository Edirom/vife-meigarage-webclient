<template>
  <div id="app">
    <header class="navbar">
      <section class="navbar-section">
        <a
          id="meiLink"
          href="http://music-encoding.org"
          target="_blank"
          class="btn btn-link"
          ><img
            alt="Music Encoding Initiative"
            id="meiLogo"
            src="./assets/meilogo.png"
        /></a>
        <a id="home" href="/" class="btn btn-link"
          ><img
            alt="MEI Garage"
            id="garageLogo"
            src="./assets/meigarage.logo.png"
        /></a>
      </section>
      <section class="navbar-section">
        <a
          id="vifeLink"
          href="https://edirom.de"
          target="_blank"
          class="btn btn-link"
          ><img alt="ViFE" id="vifeLogo" src="./assets/vife-logo.svg"
        /></a>
      </section>
    </header>

    <div class="container grid-lg">
      <router-view />
    </div>
    <footer class="footer">
      <router-link to="/about" class="btn btn-link">About</router-link> |
      <a class="btn btn-link" href="../ege-webservice/" target="_blank">API</a>
      |<a
        class="btn btn-link"
        href="https://music-encoding.org/community/community-contacts.html"
        target="_blank"
        >Contact</a
      >
    </footer>
  </div>
</template>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.footer {
    bottom: 0;
    position: sticky;
    height: auto;
    background-color: #f5f5f5;
}
header.navbar {
  background-color: #f5f5f5;
  border-bottom: 0.5px solid #cccccc;
  height: 2rem;

  #meiLink {
    margin: 0;
    padding: 0 1rem;
    line-height: 1rem;
    position: absolute;
    top: 0.1rem;

    #meiLogo {
      width: 3rem;
    }
  }

  #home {
    margin: 0;
    padding: 0 1rem;
    line-height: 1rem;
    position: absolute;
    top: 0.1rem;
    left: 4rem;

    #garageLogo {
      width: 3rem;
    }
  }

  #vifeLink {
    margin: 0;
    padding: 0 1rem;
    line-height: 1rem;
    position: absolute;
    top: -0.2rem;

    #vifeLogo {
      width: 2.5rem;
    }
  }
}
</style>
