<template>
  <head>
      <link rel="apple-touch-icon" sizes="180x180" href="https://i.ibb.co/SJkgPg9/android-chrome-512x512.png">
  <link rel="icon" type="image/png" sizes="32x32" href="https://i.ibb.co/SJkgPg9/android-chrome-512x512.png">
  <link rel="icon" type="image/png" sizes="16x16" href="https://i.ibb.co/SJkgPg9/android-chrome-512x512.png">
  <link rel="manifest" href="https://i.ibb.co/SJkgPg9/android-chrome-512x512.png">
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
  <!-- <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"> -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  </head>

  <body>
    
    <div class="wrapper"> <!-- wrapper  -->
      
      <div><!-- menu section  -->
        <div> <!-- menu button  -->
          <table style="margin-left:auto; margin-right:auto; margin-top:50px">
            <tr>
              <th @click="mode='index'"  v-bind:class = "modeClass('index')? 'mode':''">図鑑</th>&nbsp;
              <th @click="mode='rare'; chosenRegion='All'"  v-bind:class = "modeClass('rare')? 'mode':''">レアカ</th>&nbsp;
              
              <th @click="mode='search'; chosenRegion='All'"  v-bind:class = "modeClass('search')? 'mode':''">検索</th>&nbsp;
            </tr>
          </table>

        <hr>
          
        </div>
        


        <div v-if="mode=='index'"> <!-- mode -index- -->

        
          <table style="margin-left:auto; margin-right:auto; margin-top:30px">
          <tr>
            <th @click="chosenRegion='Kanto'"  v-bind:class = "regionClass('Kanto')? 'end':''">カントー</th>&nbsp;
            <th @click="chosenRegion='Johto'" v-bind:class = "regionClass('Johto')? 'end':''">ジョウト</th>&nbsp;
            <th @click="chosenRegion='Hoenn'" v-bind:class = "regionClass('Hoenn')? 'end':''"> ホウエン</th>&nbsp;
            <th @click="chosenRegion='Shinnoh'" v-bind:class = "regionClass('Shinnoh')? 'end':''">シンオウ</th>
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
              <th @click="chosenRegion='Ish'" v-bind:class = "regionClass('Ish')? 'end':''">イッシュ</th>&nbsp;
              <th @click="chosenRegion='Kalos'" v-bind:class = "regionClass('Kalos')? 'end':''">カロス</th>&nbsp;
              <th @click="chosenRegion='Alola'" v-bind:class = "regionClass('Alola')? 'end':''">アローラ</th>&nbsp;
              <th @click="chosenRegion='Galar'" v-bind:class = "regionClass('Galar')? 'end':''">ガラル</th>&nbsp;
              <th @click="chosenRegion='All'; showingCaught = true" v-bind:class = "regionClass('All')? 'end':''">全て</th>
            </tr>
            <tr>
              <td>156/{{IshRemaining}}</td>&nbsp;
              <td>72/{{KalosRemaining}}</td>&nbsp;
              <td>88/{{AlolaRemaining}}</td>&nbsp;
              <td>89/{{GalarRemaining}}</td>&nbsp;
              <td>898/{{AllRemaining}}</td>&nbsp;
            </tr>
          </table>

            <hr>
          
            <div style="float:right; margin-right:5px; margin-right: 20px">
              <div @click='showingCaught = true'>
                <label for="" style="margin-right: 6px">ON</label>
                <input type="radio" v-model="showingCaught" v-bind:value="true">
              </div>

              <div @click='showingCaught = false' style="">
                <label for="">OFF</label>
                <input type="radio" v-model="showingCaught" v-bind:value="false">
              </div>

              
            </div>
            {{lowIndex}}-{{maxIndex}} 
            <br><br><br>

            <div class="row">
            <!-- card -->
              <template v-for="(pokemon,index) in dataList" :key="index">
                <div @click="pokemon.owned = !pokemon.owned" class="column" v-if="(lowIndex <=index && index <= maxIndex && showingCaught ) || (!pokemon.owned && !showingCaught && lowIndex <=index && index <= maxIndex)"  v-bind:class = "pokemon.owned?'caught':''"> 
                  
                  
                  <div class="card" >
                    <img v-bind:src="linkSrc + index +'.png'">
                    <small v-bind:class = "index % 18?'':'end'">No.{{index}}&nbsp;<i class='fa fa-star' style="font-size:100%;" v-if="pokemon.shiny"></i></small>
                    <br>
                    <span style="margin-bottom: 50px">{{basic[index].name}}</span>
                  </div>
                </div>
                
              </template>
            </div>
            <div style="margin-bottom: 0px">
              Top&nbsp;<a class="fa fa-arrow-up" @click="topFunction()" style="margin-top:25px"></a>
            </div>

        </div>

        <div v-if="mode=='rare'"> <!-- mode -rare- -->

          <div> <!-- table --> 
            <table style="margin-left:auto; margin-right:auto; margin-top:30px">
            <tr>
              <th @click="chosenRegion='Kanto'"  v-bind:class = "regionClass('Kanto')? 'end':''">カントー</th>&nbsp;
              <th @click="chosenRegion='Johto'" v-bind:class = "regionClass('Johto')? 'end':''">ジョウト</th>&nbsp;
              <th @click="chosenRegion='Hoenn'" v-bind:class = "regionClass('Hoenn')? 'end':''"> ホウエン</th>&nbsp;
              <th @click="chosenRegion='Shinnoh'" v-bind:class = "regionClass('Shinnoh')? 'end':''">シンオウ</th>
              </tr>
              <tr>
                <td>151/{{KantoShinyRemaining}}</td>&nbsp;
                <td>100/{{JohtoShinyRemaining}}</td>&nbsp;
                <td>135/{{HoennShinyRemaining}}</td>&nbsp;
                <td>107/{{ShinnohShinyRemaining}}</td>&nbsp;
              </tr>
            </table>

            <br>
            <table style="margin-left:auto; margin-right:auto;">
              <tr>
                <th @click="chosenRegion='Ish'" v-bind:class = "regionClass('Ish')? 'end':''">イッシュ</th>&nbsp;
                <th @click="chosenRegion='Kalos'" v-bind:class = "regionClass('Kalos')? 'end':''">カロス</th>&nbsp;
                <th @click="chosenRegion='Alola'" v-bind:class = "regionClass('Alola')? 'end':''">アローラ</th>&nbsp;
                <th @click="chosenRegion='Galar'" v-bind:class = "regionClass('Galar')? 'end':''">ガラル</th>&nbsp;
                <th @click="chosenRegion='All'; showingCaught = true" v-bind:class = "regionClass('All')? 'end':''">全て</th>
              </tr>
              <tr>
                <td>156/{{IshShinyRemaining}}</td>&nbsp;
                <td>72/{{KalosShinyRemaining}}</td>&nbsp;
                <td>88/{{AlolaShinyRemaining}}</td>&nbsp;
                <td>89/{{GalarShinyRemaining}}</td>&nbsp;
                <td>898/{{AllShinyRemaining}}</td>&nbsp;
              </tr>
            </table>
            

            <hr>
          </div>
          <div> <!-- content --> 
            <div style="float:right; margin-right:5px; margin-right: 20px">
              <div @click='showingCaught = true'>
                <label for="" style="margin-right: 6px">ON</label>
                <input type="radio" v-model="showingCaught" v-bind:value="true">
              </div>

              <div @click='showingCaught = false' style="">
                <label for="">OFF</label>
                <input type="radio" v-model="showingCaught" v-bind:value="false">
              </div>

              
            </div>
            {{lowIndex}}-{{maxIndex}} 
            <br><br><br>

            <div class="row">
            <!-- card -->
              <template v-for="(pokemon,index) in dataList" :key="index">
                <div @click="shinyCheck(index)" class="column" v-if="(lowIndex <=index && index <= maxIndex && showingCaught ) || (!pokemon.owned && !showingCaught && lowIndex <=index && index <= maxIndex)"  v-bind:class = "pokemon.shiny?'caught':''"> 
                  
                  
                  <div class="card" >
                    <img v-bind:src="linkSrc + index +'.png'">
                    <small v-bind:class = "index % 18?'':'end'">No.{{index}}&nbsp;<i class='fa fa-star' style="font-size:100%;" v-if="pokemon.shiny"></i></small>
                    <br>
                    <span style="margin-bottom: 50px">{{basic[index].name}}</span>
                  </div>
                </div>
                
              </template>
            </div>
            <div style="margin-bottom: 0px">
              Top&nbsp;<a class="fa fa-arrow-up" @click="topFunction()" style="margin-top:25px"></a>
            </div>

          </div>
            

        </div>

        <div v-if="mode=='search'"> <!-- mode -search- -->

          <div> <!-- table --> 
            <table style="margin-left:auto; margin-right:auto; margin-top:30px">
            <tr>
              <th @click="chosenRegion='Kanto'"  v-bind:class = "regionClass('Kanto')? 'end':''">カントー</th>&nbsp;
              <th @click="chosenRegion='Johto'" v-bind:class = "regionClass('Johto')? 'end':''">ジョウト</th>&nbsp;
              <th @click="chosenRegion='Hoenn'" v-bind:class = "regionClass('Hoenn')? 'end':''"> ホウエン</th>&nbsp;
              <th @click="chosenRegion='Shinnoh'" v-bind:class = "regionClass('Shinnoh')? 'end':''">シンオウ</th>
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
                <th @click="chosenRegion='Ish'" v-bind:class = "regionClass('Ish')? 'end':''">イッシュ</th>&nbsp;
                <th @click="chosenRegion='Kalos'" v-bind:class = "regionClass('Kalos')? 'end':''">カロス</th>&nbsp;
                <th @click="chosenRegion='Alola'" v-bind:class = "regionClass('Alola')? 'end':''">アローラ</th>&nbsp;
                <th @click="chosenRegion='Galar'" v-bind:class = "regionClass('Galar')? 'end':''">ガラル</th>&nbsp;
                <th @click="chosenRegion='All'" v-bind:class = "regionClass('All')? 'end':''">全て</th>
              </tr>
              <tr>
                <td>156/{{IshRemaining}}</td>&nbsp;
                <td>72/{{KalosRemaining}}</td>&nbsp;
                <td>88/{{AlolaRemaining}}</td>&nbsp;
                <td>89/{{GalarRemaining}}</td>&nbsp;
                <td>898/{{AllRemaining}}</td>&nbsp;
              </tr>
            </table>
            

            <hr>
          </div>
          <div> <!-- content --> 
            <div style="float:right; margin-right:5px; margin-right: 20px">
              <div @click='showingCaught = true'>
                <label for="" style="margin-right: 6px">ON</label>
                <input type="radio" v-model="showingCaught" v-bind:value="true">
              </div>

              <div @click='showingCaught = false' style="">
                <label for="">OFF</label>
                <input type="radio" v-model="showingCaught" v-bind:value="false">
              </div>

              
            </div>
            {{lowIndex}}-{{maxIndex}} 
            <br><br><br>

            <div class="row">
            <!-- card -->
              <template v-for="(pokemon,index) in dataList" :key="index">
                <div @click="getPic(basic[index].name)" class="column" v-if="(lowIndex <=index && index <= maxIndex && showingCaught ) || (!pokemon.owned && !showingCaught && lowIndex <=index && index <= maxIndex)" > 
                  
                  
                  <div class="card" >
                    <img v-bind:src="linkSrc + index +'.png'">
                    <small v-bind:class = "index % 18?'':'end'">No.{{index}}&nbsp;<i class='fa fa-star' style="font-size:100%;" v-if="pokemon.shiny"></i></small>
                    <br>
                    <span style="margin-bottom: 50px">{{basic[index].name}}</span>
                  </div>
                </div>
                
              </template>
            </div>
            <div style="margin-bottom: 0px">
              Top&nbsp;<a class="fa fa-arrow-up" @click="topFunction()" style="margin-top:25px"></a>
            </div>

          </div>
            

        </div>

      </div>
          
    
      
      

      
    </div>
  </body>

  
  
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import { nameList } from  './const/nameList'
  import { basic } from  './const/basic.js'

export default {
  name: 'App',

  data(){
    return{
      linkSrc: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/",
      sup: 'yo',
      allName: '',
      nameList,
      basic,
      dataList: undefined,
      chosenRegion: 'All',
      lowIndex: 1,
      maxIndex: 151,
      showingCaught: true,

      mode: 'index',


    }
  },
  mounted(){
    if(localStorage.pokemonDataList){
      console.log('local data found it')
      this.dataList = JSON.parse(localStorage.pokemonDataList);
      this.dataList[0].owned= true
      this.dataList[0].shiny= false
      if(this.dataList[0].shiny){
        console.log('jheus')
        this.addShiny()
      }

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
          this.lowIndex = 151
          this.maxIndex = 251
          break;

        case 'Hoenn':
          this.lowIndex = 250
          this.maxIndex = 386
          break;

        case 'Shinnoh':
          this.lowIndex = 385
          this.maxIndex = 493
          break;

        case 'Ish':
          this.lowIndex = 493
          this.maxIndex = 649
          break;

          case 'Kalos':
          this.lowIndex = 649
          this.maxIndex = 721
          break;

        case 'Alola':
          this.lowIndex = 721
          this.maxIndex = 809
          break;

        case 'Galar':
          this.lowIndex = 808
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

    regionClass(name){
      if(name == this.chosenRegion){
        return true
      }else{
        return false
      }
    },

    modeClass(name){
      if(name == this.mode){
        return true
      }else{
        return false
      }
    },

    getPic(name){
      window.open('https://yuyu-tei.jp/game_poc/sell/sell_price.php?name='+ name, '_blank').focus();
    },

    addShiny(){
      console.log('called')
      for(let item in this.dataList){
        this.dataList[item].shiny = false
        console.log('done')
      }
      this.dataList[0].shiny = true
    },
    
    shinyCheck(num){
      if(this.dataList[num].shiny){
        this.dataList[num].shiny = false
      }else{
        if(!this.dataList[num].shiny){
          this.dataList[num].owned = true
          this.dataList[num].shiny = true
        }
      }
    }
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

    KantoShinyRemaining() {
      let num =0
      let count = 1
      if(this.dataList){
        while(count < 152){
          if(this.dataList[count].shiny){
            num++
          }
          count++
        }
      }
      return num 
    },
    JohtoShinyRemaining() {
      let num =0
      let count = 152
      if(this.dataList){
        while(count < 252){
          if(this.dataList[count].shiny){
            num++
          }
          count++
        }
      }
      return num 
    },
    HoennShinyRemaining() {
      let num =0
      let count = 252
      if(this.dataList){
        while(count < 387){
          if(this.dataList[count].shiny){
            num++
          }
          count++
        }
      }
      return num 
    },
    ShinnohShinyRemaining() {
      let num =0
      let count = 387
      if(this.dataList){
        while(count < 494){
          if(this.dataList[count].shiny){
            num++
          }
          count++
        }
      }
      return num 
    },
    IshShinyRemaining() {
      let num =0
      let count = 494
      if(this.dataList){
        while(count < 650){
          if(this.dataList[count].shiny){
            num++
          }
          count++
        }
      }
      return num 
    },
    KalosShinyRemaining() {
      let num =0
      let count = 650
      if(this.dataList){
        while(count < 722){
          if(this.dataList[count].shiny){
            num++
          }
          count++
        }
      }
      return num 
    },
    AlolaShinyRemaining() {
      let num =0
      let count = 722
      if(this.dataList){
        while(count < 810){
          if(this.dataList[count].shiny){
            num++
          }
          count++
        }
      }
      return num 
    },
    GalarShinyRemaining() {
      let num =0
      let count = 810
      if(this.dataList){
        while(count < 899){
          if(this.dataList[count].shiny){
            num++
          }
          count++
        }
      }
      return num 
    },
    AllShinyRemaining() {
      let num =0
      let count = 1
      if(this.dataList){
        while(count < 899){
          if(this.dataList[count].shiny){
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
  margin-right: auto;
  margin-left: auto;
  color: #2c3e50;
  margin-top: 60px;
  width: 375px;
  margin:0;
  padding:0;
  overflow-x:hidden;
  vertical-align: middle;
}

* {
  box-sizing: border-box;
}

body {
  font-family: Arial, Helvetica, sans-serif;
  text-align: center;
  margin-right: auto;
  margin-left: auto;
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
  padding: 0px;
  text-align: center;
  background-color: #f1f1f1;
  margin-bottom: 15px;
  height: auto;
  font-size: 80%;
}

img{
  display:block;
  width:70%;
  height: auto;
  margin-top: 10px;
  margin-left:auto;
  margin-right:auto;
}

.caught{
  opacity: 0.35;
}

.end{
  color:red;
}

.mode{
  color:blue;
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
