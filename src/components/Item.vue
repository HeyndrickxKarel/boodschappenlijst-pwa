<template>
  <div>
    <span class="tag is-medium item">
      <p-check
        class="p-icon p-round p-smooth"
        color="success"
        v-model="data.checked"
        @change="handleChange()"
      >
        <i slot="extra" class="icon mdi mdi-check"></i>
        {{data.value}}
      </p-check>
      <span class="tag is-small store-tag" v-bind:class="style" v-if="data.tag">{{data.tag}}</span>
    </span>
    <button class="delete" @mousedown="startHold" @mouseup="endHold" v-on:click="deleteItem()"></button>
  </div>
</template>

<script>
export default {
  props: ["data", "tag"],
  data() {
    return {
      counter: undefined,
      count: 0,
      style: ""
    };
  },
  mounted() {
    this.setStyle();
  },
  methods: {
    setStyle() {
      console.log(this.$props.data.tag);
      switch (this.$props.data.tag) {
        case "Delhaize":
          this.style = "is-danger";
          break;
        case "Lidl":
          this.style = "is-warning";
          break;
        case "Slager":
          this.style = "is-info";
          break;
        case "Action":
          this.style = "is-light";
          break;
      }
      console.log(this.style);
    },
    deleteItem() {
      this.$emit("itemDeleted", this.data);
    },
    handleChange() {
      this.$emit("itemChanged", this.data);
    },
    startHold() {
      this.counter = setInterval(() => {
        if (this.count == 1) {
          this.$emit("deleteAllItems");
        }
        this.count++;
      }, 1000);
    },
    endHold() {
      clearInterval(this.counter);
    }
  }
};
</script>

<style>
button.delete {
  float: right;
  background-color: #d9534e;
  color: transparent;
  transition: color 0.4s, background-color 0.4s, transform 2s;
  margin-top: 8px;
}
button.delete:hover,
button.delete:active {
  background-color: #d9534e !important;
  color: transparent !important;
}
button.delete:active {
  background-color: #d9534e !important;
  color: transparent !important;
  transform: scale(1.5);
}
.item {
  color: #363636 !important;
  background-color: transparent !important;
  font-size: 17px !important;
}
.store-tag {
  position: absolute;
  right: 40px;
  z-index: -1;
}
.is-warning {
  background-color: #f8b334;
}
</style>