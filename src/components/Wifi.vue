<template>
  <span class="wifi-strike">
    <font-awesome-icon :icon="['fas', 'wifi']"></font-awesome-icon>
  </span>
</template>

<script>
export default {};
</script>

<style>
.wifi-strike {
  color: #b84945;
}

.wifi-strike::after {
  content: "";
  background-color: #363636;
  height: 5px;
  width: 34px;
  border-radius: 20px;
  display: inline-block;
  -webkit-transform: rotate(45deg);
  transform: rotate(40deg);
  position: relative;
  left: -32px;
  top: -8px;
}
</style>