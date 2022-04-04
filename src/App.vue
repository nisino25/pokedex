<template>
  <head>
      <link rel="apple-touch-icon" sizes="180x180" href="https://i.ibb.co/SJkgPg9/android-chrome-512x512.png">
  <link rel="icon" type="image/png" sizes="32x32" href="https://i.ibb.co/SJkgPg9/android-chrome-512x512.png">
  <link rel="icon" type="image/png" sizes="16x16" href="https://i.ibb.co/SJkgPg9/android-chrome-512x512.png">
  <link rel="manifest" href="https://i.ibb.co/SJkgPg9/android-chrome-512x512.png">
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
  <!-- <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"> -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css">
  </head>
  <div> <!-- table -->
  
    <table style="margin-left:auto; margin-right:auto;">
       <tr>
        <th @click="chosenRegion='Kanto'">カントー</th>&nbsp;
        <th @click="chosenRegion='Johto'">ジョウト</th>&nbsp;
        <th @click="chosenRegion='Hoenn'"> ホウエン</th>&nbsp;
        <th @click="chosenRegion='Shinnoh'">シンオウ</th>
      </tr>
      <tr>
        <td>151/{{KantoRemaining}}</td>&nbsp;
        <td>100/{{JohtoRemaining}}</td>&nbsp;
        <td>135/{{HoennRemaining}}</td>&nbsp;
        <td>107/{{ShinnohRemaining}}</td>&nbsp;
      </tr>
    </table>
    <br>
    <table style="margin-left:auto; margin-right:auto;">
       <tr>
        <th @click="chosenRegion='Ish'">イッシュ</th>&nbsp;
        <th @click="chosenRegion='Kalos'">カロス</th>&nbsp;
        <th @click="chosenRegion='Alola'">アローラ</th>&nbsp;
        <th @click="chosenRegion='Galar'">ガラル</th>&nbsp;
        <th @click="chosenRegion=''">全て</th>
      </tr>
      <tr>
        <td>156/{{IshRemaining}}</td>&nbsp;
        <td>72/{{KalosRemaining}}</td>&nbsp;
        <td>88/{{AlolaRemaining}}</td>&nbsp;
        <td>89/{{GalarRemaining}}</td>&nbsp;
        <td>898/{{AllRemaining}}</td>&nbsp;
      </tr>
    </table>

    
  </div>

  
  <hr>
  
  <div style="float:right; margin-right:5px; ">
    <div @click='showingCaught = true'>
      <label for="" style="margin-right: 6px">ON</label>
      <input type="radio" v-model="showingCaught" v-bind:value="true">
    </div>

    <div @click='showingCaught = false'>
      <label for="">OFF</label>
      <input type="radio" v-model="showingCaught" v-bind:value="false">
    </div>

    
  </div>
  {{lowIndex}}-{{maxIndex}} 
  <br><br><br>

  <div class="row">
    <template v-for="(pokemon,index) in dataList" :key="index">
      <div @click="pokemon.owned = !pokemon.owned" class="column" v-if="(lowIndex <=index && index <= maxIndex && showingCaught ) || (!pokemon.owned && !showingCaught && lowIndex <=index && index <= maxIndex)"  v-bind:class = "pokemon.owned?'caught':''">
        
        
        <div class="card" >
          <img v-bind:src="linkSrc + index +'.png'">
          <small>No.{{index}}</small>
          <br>
          <span>{{nameList[index]}}</span>
        </div>
      </div>
      
    </template>
  </div>
  <div>
    Top&nbsp;<a class="fa fa-arrow-up" @click="topFunction()" style="margin-top:25px"></a>
  </div>
</template>



<script>
// import HelloWorld from './components/HelloWorld.vue'
  import { nameList } from  './const/nameList'


export default {
  name: 'App',

  
  data(){
    return{
      linkSrc: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/",
      sup: 'yo',
      allName: '',
      nameList,
      dataList: undefined,
      chosenRegion: 'Kanto',
      lowIndex: 1,
      maxIndex: 151,
      showingCaught: true,

    }
  },
  mounted(){
    if(localStorage.pokemonDataList){
      console.log('local data found it')
      this.dataList = JSON.parse(localStorage.pokemonDataList);
      console.log(this.dataList[1].owned)
      this.dataList[0].owned= true

      // this.showingDataList = this.createShowingCal()
    }else{
      console.log('welcome and now creating') 

      this.createData()
      localStorage.pokemonDataList = JSON.stringify(this.dataList); 
    }
  },
  watch:{
    dataList: {
      deep:true,
      handler() {
        localStorage.pokemonDataList = JSON.stringify(this.dataList); 
      }
    },
    chosenRegion: function(){

      switch(this.chosenRegion) {
        case 'Kanto':
          this.lowIndex = 1
          this.maxIndex = 151
          break;

        case 'Johto':
          this.lowIndex = 152
          this.maxIndex = 251
          break;

        case 'Hoenn':
          this.lowIndex = 252
          this.maxIndex = 386
          break;

        case 'Shinnoh':
          this.lowIndex = 387
          this.maxIndex = 493
          break;

        case 'Ish':
          this.lowIndex = 494
          this.maxIndex = 649
          break;

          case 'Kalos':
          this.lowIndex = 650
          this.maxIndex = 721
          break;

        case 'Alola':
          this.lowIndex = 722
          this.maxIndex = 809
          break;

        case 'Galar':
          this.lowIndex = 810
          this.maxIndex = 898
          break;

        default:
          this.lowIndex = 1
          this.maxIndex = 898
      }
    }
    
  },
  methods:{

    createData(){
      let count = 0
      this.dataList = []

      while(count <= 898){
        this.dataList.push({owned: false,id: count })
        // while(count < 100){
        count++
      }
    },

    topFunction(){
      window.scrollTo({top: 0, behavior: 'smooth'});
    },
    // async getAllPo(kemon(){
    //   const URL = 'https://data.nba.net/10s/prod/v1/'+ this.searchDate + '/scoreboard.json'
    // },

    async getSpecificPokemon(id){
      const URL = 'https://pokeapi.co/api/v2/pokemon-species/' +id.toString()  
      const res = await fetch(URL)
      const json = await res.json()
      console.log(json)
      
    },
  },
  computed:{
    KantoRemaining() {
      let num =0
      let count = 1
      if(this.dataList){
        while(count < 152){
          if(this.dataList[count].owned){
            num++
          }
          count++
        }
      }
      return num 
    },
    JohtoRemaining() {
      let num =0
      let count = 152
      if(this.dataList){
        while(count < 252){
          if(this.dataList[count].owned){
            num++
          }
          count++
        }
      }
      return num 
    },
    HoennRemaining() {
      let num =0
      let count = 252
      if(this.dataList){
        while(count < 387){
          if(this.dataList[count].owned){
            num++
          }
          count++
        }
      }
      return num 
    },
    ShinnohRemaining() {
      let num =0
      let count = 387
      if(this.dataList){
        while(count < 494){
          if(this.dataList[count].owned){
            num++
          }
          count++
        }
      }
      return num 
    },
    IshRemaining() {
      let num =0
      let count = 494
      if(this.dataList){
        while(count < 650){
          if(this.dataList[count].owned){
            num++
          }
          count++
        }
      }
      return num 
    },
    KalosRemaining() {
      let num =0
      let count = 650
      if(this.dataList){
        while(count < 722){
          if(this.dataList[count].owned){
            num++
          }
          count++
        }
      }
      return num 
    },
    AlolaRemaining() {
      let num =0
      let count = 722
      if(this.dataList){
        while(count < 810){
          if(this.dataList[count].owned){
            num++
          }
          count++
        }
      }
      return num 
    },
    GalarRemaining() {
      let num =0
      let count = 810
      if(this.dataList){
        while(count < 899){
          if(this.dataList[count].owned){
            num++
          }
          count++
        }
      }
      return num 
    },
    AllRemaining() {
      let num =0
      let count = 1
      if(this.dataList){
        while(count < 899){
          if(this.dataList[count].owned){
            num++
          }
          count++
        }
      }
      return num 
    },
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

* {
  box-sizing: border-box;
}

body {
  font-family: Arial, Helvetica, sans-serif;
}

/* Float four columns side by side */
.column {
  float: left;
  width: 33%;
  padding: 0 10px;
}

/* Remove extra left and right margins, due to padding in columns */
.row {margin: 0 -5px;}

/* Clear floats after the columns */
.row:after {
  content: "";
  display: table;
  clear: both;
}

/* Style the counter cards */
.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2); /* this adds the "card" effect */
  padding: 10px;
  text-align: center;
  background-color: #f1f1f1;
  margin-bottom: 15px;
  height: 150px;
  font-size: 80%;
}

img{
   display:block;
  width:95%;
  height: auto;
  margin-left:auto;
  margin-right:auto;
}

.caught{
  opacity: 0.35;
}

/* Responsive columns - one column layout (vertical) on small screens */
/* @media screen and (max-width: 600px) {
  .column {
    width: 100%;
    display: block;
    margin-bottom: 20px;
  }
} */
</style>
