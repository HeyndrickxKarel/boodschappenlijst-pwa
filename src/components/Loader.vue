<template>
<div class="loaderanimation"></div>
</template>

<script>
export default {};
</script>

<style lang="scss">



.loaderanimation  {
  animation: rotate 1s infinite;  
  height: 25px;
  width: 25px;
  position: absolute;
  right: 20px;
  top:20px;
}

.loaderanimation:before,
.loaderanimation:after {   
  border-radius: 50%;
  content: '';
  display: block;
  height: 10px;  
  width: 10px;
}
.loaderanimation:before {
  animation: ball1 1s infinite;  
  background-color: #d9534e;
  box-shadow: 15px 0 0 #f8b334;
  margin-bottom: 5px;
}
.loaderanimation:after {
  animation: ball2 1s infinite; 
  background-color: #428bcb;;
  box-shadow: 15px 0 0 #5bb85b;
}

@keyframes rotate {
  0% { 
    -webkit-transform: rotate(0deg) scale(0.8); 
    -moz-transform: rotate(0deg) scale(0.8);
  }
  50% { 
    -webkit-transform: rotate(360deg) scale(1.2); 
    -moz-transform: rotate(360deg) scale(1.2);
  }
  100% { 
    -webkit-transform: rotate(720deg) scale(0.8); 
    -moz-transform: rotate(720deg) scale(0.8);
  }
}

@keyframes ball1 {
  0% {
    box-shadow: 15px 0 0 #f8b334;
  }
  50% {
    box-shadow: 0 0 0 #f8b334;
    margin-bottom: 0;
    -webkit-transform: translate(8px,8px);
    -moz-transform: translate(8px, 8px);
  }
  100% {
    box-shadow: 15px 0 0 #f8b334;
    margin-bottom: 5px;
  }
}

@keyframes ball2 {
  0% {
    box-shadow: 15px 0 0 #5bb85b;
  }
  50% {
    box-shadow: 0 0 0 #5bb85b;
    margin-top: -10px;
    -webkit-transform: translate(8px,8px);
    -moz-transform: translate(8px, 8px);
  }
  100% {
    box-shadow: 15px 0 0 #5bb85b;
    margin-top: 0;
  }
}

</style>