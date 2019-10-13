<template>
  <div>
    <input
      type="text"
      ref="addInput"
      class="main-input"
      v-model="item"
      placeholder="Voeg hier wat toe..."
      v-on:keyup.enter="onEnter()"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      item: "",
      types: ["Delhaize", "Lidl", "Slager","Action"]
    };
  },
  methods: {
    addItem() {},
    onEnter() {
      var itemObject = { value: this.item, checked: false };

      for (let i = 0; i < this.types.length; i++) {
        const element = this.types[i];
        let index = this.item.toLowerCase().indexOf(element.toLowerCase());
        if (index > -1) {
          itemObject.tag = element;
          itemObject.value = itemObject.value
            .toLowerCase()
            .replace(element.toLowerCase(), "")
            .trim();
          itemObject.value =
            itemObject.value[0].toUpperCase() + itemObject.value.slice(1);
          break;
        }
      }

      this.$emit("itemAdded", itemObject);
      this.item = "";
      this.$refs.addInput.focus();
    }
  }
};
</script>

<style>
.main-input {
  background-color: transparent;
  font-size: 1.2em;
  background-color: transparent;
  font-size: 1.2em;
  width: 90%;
  border: 0px;
  padding: 10px 0px;
  color: #428bcb;
  outline: none;
  margin-bottom: 0.5em;
  font-family: "Avenir", "Raleway", Helvetica, Arial, sans-serif;
}

::placeholder {
  /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: #428bcb;
  opacity: 1; /* Firefox */
}

:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: #428bcb;
}

::-ms-input-placeholder {
  /* Microsoft Edge */
  color: #428bcb;
}
</style>