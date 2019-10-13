<template>
  <div id="app">
    <h3 class="title is-4">
      <transition name="fly-in-delayed">
        <router-link
          :key="routes[indexLabel].route"
          v-on:click.native="changeRouteLink"
          :to="routes[indexLabel].route"
          class="not-styled-link"
        >{{routes[indexRoute].label}}</router-link>
      </transition>
      <transition name="fly-in">
        <Wifi v-if="!statusOnline"></Wifi>
      </transition>
      <transition name="fly-in">
        <Loader v-if="makingApiCalls"></Loader>
      </transition>
    </h3>

    <transition name="fly-in-delayed">
      <router-view @setMakingApiCalls="setMakingApiCalls" />
    </transition>
  </div>
</template>

<script>
import Wifi from "@/components/Wifi.vue";
import Loader from "@/components/Loader.vue";

export default {
  components: {
    Wifi,
    Loader
  },
  data() {
    return {
      statusOnline: navigator.onLine,
      makingApiCalls: false,
      indexRoute: 0,
      indexLabel: 1,
      routes: [
        { route: "/", label: "Boodschappen", name: "Groceries" },
        { route: "/planning", label: "Planning", name: "Planning" },
        { route: "/wordlist", label: "Woordenlijst", name: "WordList" }
      ]
    };
  },
  created() {
    window.addEventListener("online", this.setStatusOnline);
    window.addEventListener("offline", this.setStatusOffline);
  },
  methods: {
    setStatusOnline() {
      this.statusOnline = navigator.onLine;
    },
    setStatusOffline() {
      this.statusOnline = navigator.onLine;
    },
    setMakingApiCalls(value) {
      this.makingApiCalls = value;
    },
    changeRouteLink() {
      this.indexRoute = (this.indexRoute + 1) % 3;
      this.indexLabel = (this.indexLabel + 1) % 3;
    }
  }
};
</script>

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

.fly-in {
  animation: fly-in 4s;
}
.fly-in-enter-active {
  animation: fly-in 0.5s;
}
.fly-in-leave-active {
  animation: fly-in 0.5s reverse;
}
@keyframes fly-in {
  0% {
    transform: scale(0.7);
    opacity: 0;
  }
  50% {
    transform: scale(1.05);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
.not-styled-link {
  color: inherit;
}
.fly-in-delayed-enter-active {
  animation: fly-in 0.5s;
  animation-delay: 0.5s;
  opacity: 0;
}
.fly-in-delayed-leave-active {
  animation: fly-in reverse 0.5s;
}

@keyframes going {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(50px);
    opacity: 0;
  }
}
@keyframes coming {
  from {
    transform: translateX(-50px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
.w-100{
  width: 100%;
}
</style>
