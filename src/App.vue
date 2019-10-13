<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Delhaize</router-link> |
      <router-link to="/about">Lidl</router-link>
    </div>-->
    <router-view />
  </div>
</template>

<style lang="scss">
@import "~bulma/css/bulma.css";
@import "~pretty-checkbox/src/pretty-checkbox.scss";
@import url("https://fonts.googleapis.com/css?family=Raleway&display=swap");

html {
  background-color: #fafafa;
}

#app {
  font-family: "Avenir", "Raleway", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  padding: 4%;
}
.overflow-scroll {
  overflow: scroll;
}

.outer {
  display: flex;
  flex-flow: column;
  height: 100%;
}

.inner_fixed {
  height: 100px;
}

.inner_remaining {
  flex-grow: 1;
}
</style>
