<template>
  <div class="Planning">
      {{showingModal}}
    <div v-for="(item,index) in planning" :key="index">
      <div class="columns is-mobile">
        <div class="column is-narrow">
          <a @click="showModal" class="not-styled-link plannings-item-day">{{index}}</a>
        </div>
        <div class="column">
          <span
            class="w-100 tag-transition"
            v-bind:class="{ 'tag': planning[index].length > 0, 'is-warning': planning[index].length > 0,'is-rounded': planning[index].length > 0,  }"
          >
            <input type="text" class="plannings-item-input w-100" v-model="planning[index]" />
          </span>
        </div>
      </div>
      <hr />
    </div>
    <!-- v-bind:class="{'is-active':showingModal}" -->
    <div class="modal" v-if="showingModal">
      <div class="modal-background" @click="hideModal"></div>
      <transition name="fly-in">
        <div class="modal-content pop-up" v-if="showingModal">
            <span v-for="item in recipes" :key="item" class="is-warning is-rounded tag tag-margin">{{item}}</span>
        </div>
      </transition>
      <transition name="fly-in">
        <button @click="hideModal" class="modal-close is-large" aria-label="close" v-if="showingModal"></button>
      </transition>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      days: ["Ma", "Di", "Wo", "Do", "Vr", "Za", "Zo"],
      planning: {
        Ma: "WAP",
        Di: "",
        Wo: "",
        Do: "",
        Vr: "",
        Za: "",
        Zo: ""
      },
      recipes: ["Spaghetti","Pasta","WAP","Puree","WAP","Puree","Spaghetti","Pasta","Spaghetti","Pasta","WAP","Puree"],
      showingModal: false
    };
  },
  methods: {
    showModal() {
      this.showingModal = true;
    },
    hideModal() {
      this.showingModal = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.pop-up {

}
.tag-margin{
    margin: 5px;
}
hr {
  margin: 0px;
  background-color: #f1f1f1;
  margin-bottom: calc(1.5rem - 0.75rem);
}
.columns {
  margin-top: 0rem;
}
.columns:not(:last-child) {
  margin-bottom: 0px;
}
.plannings-item {
  &-input {
    font-size: 1.2em;
    background-color: transparent;
    border: none;
    font-family: "Avenir", "Raleway", Helvetica, Arial, sans-serif;
    color: #2c3e50;
    padding-left: 2px;
    outline: none;
  }
  &-day {
    font-size: 1.2em;
  }
}
.tag-transition {
  transition: 0.4s;
}
.modal {
  display: flex;
}
.modal-background {
  transition: 0.4s;
}
.modal-content {
  height: 100%;
  width: 80%;
  transition: 0.4s;
}
.modal-close {
  transition: 0.4s;
}
</style>