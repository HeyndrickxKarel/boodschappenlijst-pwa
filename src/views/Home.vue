<template>
  <div class="home outer">
    <div class="inner_fixed">
      <h3 class="title is-4">
        Boodschappen
        <transition name="fly-in">
          <Wifi v-if="!statusOnline"></Wifi>
        </transition>
      </h3>

      <transition name="fly-in">
        <Loader v-if="makingApiCalls"></Loader>
      </transition>
      <Add @itemAdded="addItem"></Add>
    </div>

    <div class="overflow-scroll inner_remaining">
      <transition-group name="fly-in">
        <Item
          v-for="(item,index) in groceryList.items"
          :key="index"
          :data="item"
          @itemDeleted="itemDeleted"
          @itemChanged="itemChanged"
          @deleteAllItems="deleteAllItems"
        ></Item>
      </transition-group>
    </div>
  </div>
</template>

<script>
import Add from "@/components/Add.vue";
import Loader from "@/components/Loader.vue";
import Item from "@/components/Item.vue";
import Wifi from "@/components/Wifi.vue";
//import { ApiService } from "../services/apiService";
import axios from "axios";
var baseURL = "https://peaceful-dawn-70653.herokuapp.com/api/";

import { setTimeout, clearTimeout } from "timers";

export default {
  name: "home",
  components: {
    Add,
    Item,
    Loader,
    Wifi
  },
  data() {
    return {
      groceryList: [{ value: "Don't mind me" }],
      timer: undefined,
      makingApiCalls: false,
      storedItems: Array,
      storedToBeAddedItems: Array,
      storedToBeRemovedItems: Array,
      storedToBeCheckedItems: Array,
      storedSugItems: Array,
      storedToBeAddedSugItems: Array,
      storedToBeRemovedSugItems: Array,
      statusOnline: navigator.onLine,
      synching: false,
      waiting: false
    };
  },
  created() {
    window.addEventListener("online", this.setStatusOnline);
    window.addEventListener("offline", this.setStatusOffline);
  },
  mounted() {
    this.loadStorage();

    if (!navigator.onLine) {
      this.setGroceryList(this.storedItems, this.storedSugItems);
    } else {
      this.synchronize();
    }
  },
  methods: {
    addItem(item) {
      if (this.isItemAlreadyInArray(this.storedToBeRemovedItems, item)) {
        let itemFromRemoved = this.storedToBeRemovedItems.find(
          elem => elem.value == item.value
        );
        let index = this.storedToBeRemovedItems.indexOf(itemFromRemoved);
        if (index > -1) this.storedToBeRemovedItems.splice(index, 1);
      } else {
        this.groceryList.items.push(item);

        this.storedToBeAddedItems.push(item);
      }

      if (navigator.onLine) {
        this.synchronize();
      } else {
        localStorage.setItem(
          "storedToBeAddedItems",
          JSON.stringify(this.storedToBeAddedItems)
        );
        localStorage.setItem(
          "storedToBeRemovedItems",
          JSON.stringify(this.storedToBeRemovedItems)
        );
      }
    },
    itemDeleted(value) {
      let index = this.groceryList.items.indexOf(value);
      this.groceryList.items.splice(index, 1);

      let item = value;

      if (this.isItemAlreadyInArray(this.storedToBeAddedItems, item)) {
        index = this.storedToBeAddedItems.indexOf(item);
        if (index > -1) this.storedToBeAddedItems.splice(index, 1);
      } else {
        this.storedToBeRemovedItems.push(item);
      }

      if (navigator.onLine) {
        this.synchronize();
      } else {
        localStorage.setItem(
          "storedToBeRemovedItems",
          JSON.stringify(this.storedToBeRemovedItems)
        );
        localStorage.setItem(
          "storedToBeAddedItems",
          JSON.stringify(this.storedToBeAddedItems)
        );
      }
    },
    itemChanged(itemToChange) {
      if (
        !this.isItemAlreadyInArray(this.storedToBeCheckedItems, itemToChange)
      ) {
        this.storedToBeCheckedItems.push(itemToChange);
      } else {
        let index = this.storedToBeCheckedItems.indexOf(itemToChange);
        if (index > 0) this.storedToBeCheckedItems.splice(index, 1);
      }

      if (navigator.onLine) {
        this.synchronize();
      } else {
        localStorage.setItem(
          "storedToBeCheckedItems",
          JSON.stringify(this.storedToBeCheckedItems)
        );
      }
    },
    deleteAllItems() {
      this.groceryList.items = [];
      this.updateGroceryList();
    },
    loadStorage() {
      this.storedItems = localStorage.getItem("storedItems")
        ? JSON.parse(localStorage.getItem("storedItems"))
        : [];

      this.storedToBeAddedItems = localStorage.getItem("storedToBeAddedItems")
        ? JSON.parse(localStorage.getItem("storedToBeAddedItems"))
        : [];

      this.storedToBeRemovedItems = localStorage.getItem(
        "storedToBeRemovedItems"
      )
        ? JSON.parse(localStorage.getItem("storedToBeRemovedItems"))
        : [];

      this.storedToBeCheckedItems = localStorage.getItem(
        "storedToBeCheckedItems"
      )
        ? JSON.parse(localStorage.getItem("storedToBeCheckedItems"))
        : [];

      this.storedSugItems = localStorage.getItem("storedSugItems")
        ? JSON.parse(localStorage.getItem("storedSugItems"))
        : [];

      this.storedToBeAddedSugItems = localStorage.getItem(
        "storedToBeAddedSugItems"
      )
        ? JSON.parse(localStorage.getItem("storedToBeAddedSugItems"))
        : [];

      this.storedToBeRemovedSugItems = localStorage.getItem(
        "storedToBeRemovedSugItems"
      )
        ? JSON.parse(localStorage.getItem("storedToBeRemovedSugItems"))
        : [];
    },
    integrateServerList(groceryList) {
      // ---- INTEGRATE ITEMS ----
      var items = groceryList.items;

      // REMOVE ITEMS VIA STORAGE
      this.storedToBeRemovedItems.forEach(item => {
        let index = items.indexOf(
          items.find(elem => elem.value == item.value),
          0
        );
        if (index > -1) items.splice(index, 1);
      });

      // ADD ITEMS VIA STORAGE
      this.storedToBeAddedItems.forEach(item => {
        if (!this.isItemAlreadyInArray(items, item)) {
          items.push(item);
        }
      });

      // ADD CHECKS VIA STORAGE
      this.storedToBeCheckedItems.forEach(item => {
        let itemToChange = items.find(elem => elem.value == item.value);
        if (itemToChange) itemToChange.checked = item.checked;
      });

      // ---- INTEGRATE SUGGESTED ITEMS ----
      var suggestedItems = groceryList.suggestedItems;

      // REMOVE SUGGESTED ITEMS VIA STORAGE
      this.storedToBeRemovedSugItems.forEach(item => {
        let index = suggestedItems.indexOf(item, 0);
        if (index > -1) suggestedItems.splice(index, 1);
      });

      // ADD SUGGESTED ITEMS VIA STORAGE
      this.storedToBeAddedSugItems.forEach(item => {
        if (!suggestedItems.includes(item)) {
          suggestedItems.push(item);
        }
      });

      this.clearStoredLists();

      //Clear storage and updated saved lists
      localStorage.setItem("storedToBeAddedItems", "[]");
      localStorage.setItem("storedToBeAddedSugItems", "[]");
      localStorage.setItem("storedToBeRemovedItems", "[]");
      localStorage.setItem("storedToBeCheckedItems", "[]");
      localStorage.setItem("storedToBeRemovedSugItems", "[]");
      localStorage.setItem("storedItems", JSON.stringify(items));
      localStorage.setItem("storedSugItems", JSON.stringify(suggestedItems));

      this.setGroceryList(items, suggestedItems);
    },
    synchronize() {
      this.makingApiCalls = true;
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = undefined;
      }
      if (this.synching) {
        this.waiting = true;
        console.log("waiting");
        if (!this.waiting) setTimeout(this.synchronize, 100);
      } else {
        this.waiting = false;
        this.timer = setTimeout(() => {
          this.synching = true;
          axios
            .get(baseURL + "grocerylist")
            .then(result => {
              //ONCE THE SERVER GROCERY LIST HAS BEEN LOADED FROM THE SERVER

              let serverList = result.data;

              this.integrateServerList(serverList);
              this.updateGroceryList();
            })
            .catch(error => {
              console.log(error);
              this.makingApiCalls = false;
              this.synching = false;
            });
        }, 1000);
      }
    },
    updateGroceryList() {
      this.makingApiCalls = false;
      axios
        .put(baseURL + "grocerylist/items", this.groceryList.items)
        .then(() => {})
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.makingApiCalls = false;
          this.synching = false;
        });
    },
    clearStoredLists() {
      this.storedToBeAddedItems = [];
      this.storedToBeRemovedItems = [];
      this.storedToBeAddedSugItems = [];
      this.storedToBeAddedSugItems = [];
      this.storedToBeCheckedItems = [];
    },
    setGroceryList(items, suggestedItems) {
      this.groceryList = {
        items: items,
        suggestedItems: suggestedItems
      };
    },
    setStatusOnline() {
      this.statusOnline = navigator.onLine;
      this.synchronize();
    },
    setStatusOffline() {
      this.statusOnline = navigator.onLine;
    },
    isItemAlreadyInArray(array, item) {
      let exists = false;
      for (let i = 0; i < array.length; i++) {
        const elem = array[i];
        if (elem.value == item.value && elem.checked == item.checked) {
          exists = true;
          break;
        }
      }
      return exists;
    }
  }
};
</script>
<style lang="scss">
.title {
  margin-bottom: 0.5em;
  transition: 0.4s;
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
.not-synched {
  color: #d9534e;
}
.synched {
  color: #38a876;
}
</style>
