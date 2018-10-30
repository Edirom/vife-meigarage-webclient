<template>
  <div id="app">
    <header class="navbar">
      <section class="navbar-section">
        <router-link to="/" class="navbar-brand mr-2"><img alt="ViFE Logo" id="vifeLogo" src="./assets/vife-logo.png"></router-link>
        <a href="https://edirom.de" class="btn btn-link">ViFE</a>
      </section>
      <section class="navbar-section">
      <div class="input-group input-inline">
        <a href="http://music-encoding.org" class="btn btn-link">MEI</a>
      </div>
      </section>
    </header>

    <!--<div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>-->
    <div class="container grid-lg">

        <router-view/>

    </div>

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
#vifeLogo {
  width: 3em;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
