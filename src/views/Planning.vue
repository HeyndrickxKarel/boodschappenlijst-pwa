<template>
  <div class="Planning">
      <div v-for="(item,index) in planning" :key="index">
      <div class="columns is-mobile" >
          <div class="column is-narrow">
              <span>{{index}}</span>              
          </div>
          <div class="column">  
              <span>{{item}}</span>
          </div>
      </div>
          <hr>
      </div>

  </div>
</template>
<script>
export default {
    data(){
        return {
            days: ["Ma","Di","Wo","Do","Vr","Za","Zo"],
            planning: {
                Ma: "WAP",
                Di: "",
                Wo:"",
                Do:"",
                Vr:"",
                Za:"",
                Zo: ""
            }
        }
    }
}
</script>

<style lang="scss" scoped>
hr{
    margin: 0px;
    background-color:#f1f1f1;
    margin-bottom: calc(1.5rem - 0.75rem);
}
.columns{
    margin-top: 0rem;
}
.columns:not(:last-child) {
    margin-bottom: 0px;
}
</style>