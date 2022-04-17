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
    <auth v-if="is_loggedin"></auth>
    

    <div class="wrapper" v-if="!BigPicture"> <!-- wrapper  -->

      <div><!-- menu section  -->
        <div> <!-- menu button  -->
          <table style="margin-left:auto; margin-right:auto; margin-top:50px">
            <tr>
              <th @click="mode='index'"  v-bind:class = "modeClass('index')? 'mode':''">図鑑</th>&nbsp;
              <th @click="mode='rare'; chosenRegion='All'"  v-bind:class = "modeClass('rare')? 'mode':''">レアカ</th>&nbsp;
              
              <th @click="mode='search'; chosenRegion='All'"  v-bind:class = "modeClass('search')? 'mode':''">検索</th>&nbsp;

              <th @click="mode='link'; chosenRegion='All'; link() "  v-bind:class = "modeClass('link')? 'mode':''">リンク</th>&nbsp;

              <th @click="exportData()"  v-bind:class = "modeClass('a')? 
              'mode':''">アップロード</th>&nbsp;

              <th @click="mode='picLink'"  v-bind:class = "modeClass('picLink')? 'mode':' '">＊</th>&nbsp;
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
          
          <table style="margin-left:auto; margin-right:auto; margin-top:30px">
            <tr>
              <th @click="searchMode='pokemon'" v-bind:class = "searchClass('pokemon')? 'searchTab':''">ポケモン</th>&nbsp;
              <th @click="searchMode='series'; chosenRegion='all'"  v-bind:class = "searchClass('series')? 'searchTab':''">シリーズ</th>&nbsp;
              
              </tr>
            </table>
          <hr>
          
          <div v-if="searchMode=='pokemon'"> <!-- table --> 
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


          <div v-if="searchMode=='series'"><!--  series -->
            
            <div >
              <!-- <select v-model="selectedSeries">
                <option disabled value="">選択して下さい</option>
                <option v-for="item in seriesList" v-bind:value="item.id" v-bind:key="item">
                    {{ item.name }}
                </option>
              </select> -->
              <template v-if="!hasChosenSeries">
                <!-- <span @click="test()">test</span> -->
                <!-- {{list}} -->
                <div v-for="(series,index) in seriesList" :key="index">
                  <span @click="searchSeries(series.id)" class="series"><small style="color:red">{{series.series}}</small>:{{series.name}}({{series.releaseDate.substring(0, series.releaseDate.indexOf('/'))}})</span>
                  <br>
                </div>
              </template>
              <br>


            </div>

            <hr>


            <div v-if="hasChosenSeries">
              {{this.seriesDetail.name}}
              <br>
              {{this.seriesDetail.releaseDate}}
              <br>
              {{this.seriesDetail.printedTotal}}
              <br>

              <span @click="hasChosenSeries=false">Go back</span>

            <br><br><br>

            </div>

            

    

            <div class="row"> <!-- card -->
              <template v-for="(pokemon,index) in tempList" :key="index">
                <div class="column"  > 
                  
                  
                  <div class="card" @click="displayPic(tempList[index].images.large)"  >
                    <img v-bind:src="tempList[index].images.small">
                    <small v-bind:class = "index % 18?'':'end'">No.{{index+1 }}&nbsp;<i class='fa fa-star' style="font-size:100%;" v-if="pokemon.shiny"></i></small>
                    <br>
                    <!-- <span>{{tempList[index].id}}</span> -->
                    <span v-if="tempList[index].supertype=='Pokémon'" style="margin-bottom: 50px">{{basic[tempList[index].nationalPokedexNumbers[0]].name}}</span>
                    <span v-else style="margin-bottom: 50px">{{tempList[index].name}}</span>
                    <br>
                    <span v-if="tempList[index].cardmarket">
                      {{ Math.floor(tempList[index].cardmarket.prices.averageSellPrice * 125)}}¥

                    </span>
                  </div>
                </div>
                
              </template>
            </div>
            <div style="margin-bottom: 0px">
              Top&nbsp;<a class="fa fa-arrow-up" @click="topFunction()" style="margin-top:25px"></a>
            </div>

          </div>



          <div v-if="searchMode=='pokemon'"> <!-- pokemon seach --> 
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
            <br>
            <span @click="showingOnePokemon = false">Go back</span>
            
            <br>
            <div v-if="showingOnePokemon">
              <span v-if="showingOnePokemon">{{tempCount}} Cards</span><br>
             <span>
                Lowest price {{Math.floor(tempLowest* 125)}}¥ from No.{{tempLowestIndex +1}}
              </span><br>
              <span>
                Highesgt price {{Math.floor(tempHighest* 125)}}¥ from No.{{tempHighestIndex +1}}
              </span><br>

            </div>
            

            <br><br>

            <div class="row">
            <!-- card -->
              <div v-if="showingOnePokemon">
                
                
                <template v-for="(pokemon,index) in tempList" :key="index">
                  <div  class="column"  > 
                    
                  
                  
                    <div class="card" @click="displayPic(tempList[index].images.large)"  v-bind:class="{ BigPicture: 'bigPic' }" >
                      <img v-bind:src="tempList[index].images.small">
                      <small v-bind:class = "index % 18?'':'end'">No.{{index+1 }}&nbsp;<i class='fa fa-star' style="font-size:100%;" v-if="pokemon.shiny"></i></small>
                      <br>
                      <!-- <span>{{tempList[index].id}}</span> -->
                      <span v-if="tempList[index].supertype=='Pokémon'" style="margin-bottom: 50px">{{basic[tempList[index].nationalPokedexNumbers[0]].name}}</span>
                      <!-- <span  style="margin-bottom: 50px">{{tempList[index].name}}</span> -->
                      <br>
                      <span v-if="tempList[index].cardmarket">
                        <span v-if="tempList[index].cardmarket.prices">
                          {{ Math.floor(tempList[index].cardmarket.prices.trendPrice * 125)}}¥
                        </span>
                      </span>
                    </div>
                  </div>
                  
                </template>
              </div>
              <div v-else> 
                <div v-for="(pokemon,index) in dataList" :key="index">
                  <div @click="getPic(index)" class="column" v-if="(lowIndex <=index && index <= maxIndex && showingCaught ) || (!pokemon.owned && !showingCaught && lowIndex <=index && index <= maxIndex)"  > 
                    
                    
                    <div class="card" >
                      <img v-bind:src="linkSrc + index +'.png'">
                      <small v-bind:class = "index % 18?'':'end'">No.{{index}}&nbsp;<i class='fa fa-star' style="font-size:100%;" v-if="pokemon.shiny"></i></small>
                      <br>
                      <span style="margin-bottom: 50px">{{basic[index].name}}</span>
                      <br>
                      <span style="margin-bottom: 50px">{{totalPrintedList[index]}} Cards</span><br>
                     
                    </div>
                  </div>
                
                </div>

             </div>
              
            </div>

            <div style="margin-bottom: 0px">
              Top&nbsp;<a class="fa fa-arrow-up" @click="topFunction()" style="margin-top:25px"></a>
            </div>

          </div>
            

        </div>

        <div v-if="mode=='link'"> <!-- mode -link- -->
          
          
          <hr>
          





          <div v-if="searchMode=='pokemon'"> <!-- pokemon seach --> 
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
            <br>
            <span @click="showingOnePokemon = false">Go back</span>
            
            <br>
            <div v-if="showingOnePokemon">
              <span v-if="showingOnePokemon">{{tempCount}} Cards</span><br>
             <span>
                Lowest price {{Math.floor(tempLowest* 125)}}¥ from No.{{tempLowestIndex +1}}
              </span><br>
              <span>
                Highesgt price {{Math.floor(tempHighest* 125)}}¥ from No.{{tempHighestIndex +1}}
              </span><br>

            </div>
            

            <br><br>

            <div class="row">
            <!-- card -->
              <div v-if="showingOnePokemon">
                hey
                
                
                <template v-for="(pokemon,index) in tempList" :key="index">
                  <div  class="column"  > 
                    
                  
                  
                    <div class="card" @click="displayPic(tempList[index].images.large)"  v-bind:class="{ BigPicture: 'bigPic' }" >
                      <img v-bind:src="tempList[index].images.small">
                      <small v-bind:class = "index % 18?'':'end'">No.{{index+1 }}&nbsp;<i class='fa fa-star' style="font-size:100%;" v-if="pokemon.shiny"></i></small>
                      <br>
                      <!-- <span>{{tempList[index].id}}</span> -->
                      <span v-if="tempList[index].supertype=='Pokémon'" style="margin-bottom: 50px">{{basic[tempList[index].nationalPokedexNumbers[0]].name}}</span>
                      <!-- <span  style="margin-bottom: 50px">{{tempList[index].name}}</span> -->
                      <br>
                      <span v-if="tempList[index].cardmarket">
                        <span v-if="tempList[index].cardmarket.prices">
                          {{ Math.floor(tempList[index].cardmarket.prices.trendPrice * 125)}}¥
                        </span>
                      </span>
                    </div>
                  </div>
                  
                </template>
              </div>
              <div v-else> 
                <div v-for="(pokemon,index) in dataList" :key="index">
                  <div @click="getPic(index)" class="column" v-if="(lowIndex <=index && index <= maxIndex && showingCaught ) || (!pokemon.owned && !showingCaught && lowIndex <=index && index <= maxIndex)"  > 
                    
                    
                    <div class="card" >
                      <img v-bind:src="linkSrc + index +'.png'">
                      <small v-bind:class = "index % 18?'':'end'">No.{{index}}&nbsp;<i class='fa fa-star' style="font-size:100%;" v-if="pokemon.shiny"></i></small>
                      <br>
                      <span style="margin-bottom: 50px">{{basic[index].name}}</span>
                      <br>
                      <span style="margin-bottom: 50px">{{totalPrintedList[index]}} Cards</span><br>
                     
                    </div>
                  </div>
                
                </div>

             </div>
              
            </div>

            <div style="margin-bottom: 0px">
              Top&nbsp;<a class="fa fa-arrow-up" @click="topFunction()" style="margin-top:25px"></a>
            </div>

          </div>
            

        </div>

        <div v-if="mode=='picLink'"> <!-- mode -pic Link- -->
          <div>
            <input type="text" v-model="picLinks">
            <button @click="getThePics()">Check the pics</button>
          </div>

        
          

            <div class="row">
            <!-- card -->
              <template v-for="(pokemon,index) in picArray" :key="index">
                <div class='column'> 
                  
                  
                  <div class="card" >
                    <img v-bind:src="pokemon">
                    <small v-bind:class = "index % 18?'':'end'">No.{{index+1}}&nbsp;</small>
                    <br>
                    <!-- <span style="margin-bottom: 50px">{{basic[index].name}}</span> -->
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

    <div v-else @click="BigPicture= false"> <!-- pivs  -->
      <img style="margin-top:50px" :src="picsrc" alt="">
      <br>
      <button >Go back</button>
    </div>

  </body>

  
  
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import { nameList } from  './const/nameList'
import { seriesList } from  './const/seriesList'
import { totalPrintedList } from  './const/totalPrintedList'
import { basic } from  './const/basic.js'
import auth from  './components/auth.vue';
import db from "./firebase.js"

// import { useRoute } from 'vue-router'
// import firebase from 'firebase'
// require('firebase/aut
export default {
  name: 'App',
  components: {
    auth 
  },
  data(){
    return{
      linkSrc: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/",
      sup: 'yo',
      allName: '',
      nameList,
      seriesList,
      totalPrintedList,
      basic,
      dataList: undefined,
      chosenRegion: 'All',
      lowIndex: 1,
      maxIndex: 151,
      showingCaught: true,
      list: undefined,

      mode: 'search',
      searchMode: 'series',
      // currentUser: 'nisino25',
      is_logined: false,
      setUrl: 'https://api.pokemontcg.io/v2/cards?q=set.id:',
      selectedSeries: undefined,
      tempList: undefined,
      seriesDetail: undefined,
      showingOnePokemon: false,
      hasChosenSeries: false,

      tempData: undefined,
      tempCount: undefined,
      tempLowest: undefined,
      tempLowestIndex: undefined,
      tempHighest: undefined,
      tempHighestIndex: undefined,

      BigPicture: false,
      picsrc: undefined,

      picLinks: '',
      picArray: [],


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
      this.showingOnePokemon = false

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

    getThePics(){
      this.picArray = []
      // this.picLinks ='https://images.pokemontcg.io/base1/2.png,https://images.pokemontcg.io/base1/4.png,https://images.pokemontcg.io/base1/6.png,https://images.pokemontcg.io/base1/8.png,https://images.pokemontcg.io/base1/7.png,https://images.pokemontcg.io/base1/1.png'
      
      let str = this.picLinks
      let i = 0 
      while(i <= 5 ){
        let result = str.split(',')[i];
        this.picArray.push(result)
        i++
        // str = str.split(',')[i]
        // str = str.split(',')[1]
        console.log(str.split(',')[i])
      }
      

      // let str = this.picLinks
      // let delimiter = ','
      // let start = 1
      // let tokens = str.split(delimiter).slice(start)
      // let result = tokens.join(delimiter); // those.that
      // console.log(result)
      
    


    },

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
      const URL = 'https://pokeapi.co/api/v2/pokemon-species/' +id.toString() +'&orderBy=-set.releaseDate'
      const res = await fetch(URL)
      const json = await res.json()
      console.log(json)
      this.tempData = json
      this.tempCount = 0
      for(let i in json){
        this.tempCount++
        console.log(i)
      }
      
    },

    regionClass(name){
      if(name == this.chosenRegion){
        return true
      }else{
        return false
      }
    },

    searchClass(name){
      if(name == this.searchMode){
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

    async getPic(num){
      if(num == 151){
        console.log('ミュウ')
      }
      this.showingOnePokemon = true
      const URL =  'https://api.pokemontcg.io/v2/cards?q=nationalPokedexNumbers:' + num +'&orderBy=set.releaseDate'
      const res = await fetch(URL)
      const json = await res.json()
      this.tempList = json.data
      console.log(this.tempList)
      this.getMoreData() 
      this.tempCount = 0
      let list = []
      let indexList = []

      for(let i in this.tempList){
        if(this.tempList[i].cardmarket){
          if(this.tempList[i].cardmarket.prices){
            if(this.tempList[i].cardmarket.prices.trendPrice){
              // console.log(this.tempList[i].cardmarket.prices.trendPrice)
              list.push(this.tempList[i].cardmarket.prices.trendPrice)
              indexList.push(parseInt(i))
            }
          }
        }
        this.tempCount++
      }
      this.tempLowest =  Math.min(...list)
      this.tempLowestIndex = list.indexOf(this.tempLowest)
      this.tempLowestIndex = indexList[this.tempLowestIndex]

      this.tempHighest =  Math.max(...list)
      this.tempHighestIndex = list.indexOf(this.tempHighest)
      this.tempHighestIndex = indexList[this.tempHighestIndex]
      // console.log(indexList)
      // this.tempLowest = list.indexof(this.tempLowest)
      // this.tempHighest =  Math.max(...list)
      
      
      return
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
    },

    async exportData(){
      let text = `${this.currentUser}としてデータをアップロードしますか？`;
      if (confirm(text) == true) {
        let docRef = db.collection('database').doc('account')
        let val = await docRef.get()
        
        let favoriteData = val.exists ? val.data() : {}

        favoriteData[this.currentUser] = JSON.stringify(this.dataList)

        // localStorage.pokemonDataList = JSON.stringify(this.dataList); 
        // await docRef.set(JSON.stringify(this.dataList) )
        await docRef.set(favoriteData)
        console.log('done')
        
      } else {
        text = "You canceled!";
      }
      
      
    },

    async searchSeries(title){
      const URL = this.setUrl +title
      const res = await fetch(URL)
      const json = await res.json()
      this.tempList = json.data
      console.log(this.tempList)
      this.hasChosenSeries =true
      this.selectedSeries = title
      this.getMoreData() 
      return
    },

    async getMoreData() {
      const URL = 'https://api.pokemontcg.io/v2/sets/' +this.selectedSeries
      const res = await fetch(URL)
      const json = await res.json()
      this.seriesDetail = json.data
      console.log(json.data)

      
      return
    },

    async test(){
      const URL = 'https://api.pokemontcg.io/v2/sets?orderBy=releaseDate'
      const res = await fetch(URL)
      const json = await res.json()
      let list = []
      for(let i in json.data){
        // console.log(json.data[i].releaseDate)
        let item = json.data[i]
        list.push({id:item.id, total:item.printedTotal,series: item.series, name: item.name, releaseDate: item.releaseDate, images: item.image })
      }
      console.log(json.data)
      console.log(list)
      this.list = list

    },

    displayPic(link){
      console.log(link)
      this.BigPicture = true
      this.picsrc = link 
    },

    async link(){
      const URL = 'https://api.pokemontcg.io/v2/cards?q=set.id:' + 'base1'
      
      const res = await fetch(URL)
      const json = await res.json()
      this.tempList = json.data
      console.log(this.tempList)
      this.hasChosenSeries =true
      this.selectedSeries = 'base1'
      // this.getMoreData() 
      this.templist = json.data
      this.showingOnePokemon = false
      this.searchMode = 'pokemon'
      // const route = useRoute()
      console.log(this.$route.query.page)
      console.log(new URL(location.href).searchParams.get('p1'))
      return
    },






    // async incrementVisitNum(){
    //   this.firstMove = true;
    //   let docRef = db.collection('database').doc('mainData')
    //   let val = await docRef.get()
      
    //   let favoriteData = val.exists ? val.data() : {}
    //   // console.log(doc.data())
    //   if(!(favoriteData[this.currentUser.uid])){
    //     favoriteData[this.currentUser.uid] = [1,0,0,0];
    //   }else{
    //     favoriteData[this.currentUser.uid][0]++
    //   }
      
    //   await docRef.set(favoriteData)
    //   this.getMasterData()
      
    // },

    
  },
  computed:{
    
    

    KantoRemaining() {
      let num =0
      let count = 1
      if(this.dataList){
        while(count < 152){
          if(this.dataList[count]){
            if(this.dataList[count].owned){
              num++
            }

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
          if(this.dataList[count]){
            if(this.dataList[count].owned){
              num++
            }
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
          if(this.dataList[count]){
            if(this.dataList[count].owned){
              num++
            }
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
          if(this.dataList[count]){
            if(this.dataList[count].owned){
              num++
            }
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
          if(this.dataList[count]){
            if(this.dataList[count].owned){
              num++
            }
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
          if(this.dataList[count]){
            if(this.dataList[count].owned){
              num++
            }
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
          if(this.dataList[count]){
            if(this.dataList[count].owned){
              
              num++
            }
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
          if(this.dataList[count]){
            if(this.dataList[count].owned){
              num++
            }
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
          if(this.dataList[count]){
            if(this.dataList[count].owned){
              num++
            }
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
  width:95%;
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
.searchTab{
  color:green;
}

.mode{
  color:blue;
}

.series{
  float: left;
  margin-left: 10px;
}


.bigPic {
  position: absolute;
  clip: rect(0px,60px,200px,0px);
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
