<template>
  <div>
    <vue-element-loading :active="show" spinner="bar-fade-scale"/>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li v-for="(d, i) in samplecategory" :key="i" class="nav-item">
            <button :class="{active: currentmenu == d.id}" class="nav-link" @click="changeCategory(d.id, d.name)"> {{d.name}}</button>
          </li>
        </ul>
      </div>
    </nav>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li v-for="(d, i) in samplesuburb" :key="i" class="nav-item active">
            <button :class="{active: currentmenusub == d.id}" class="nav-link" @click="changeSuburbs(d.id, d.suburb, d.state, d.name)"> {{d.name}}</button>
          </li>
        </ul>
      </div>
    </nav>
    <ht2-business-directory
      :headertext="headtext"
      apiurl='https://hiretrades.com.au/api'
      :showlocationdetails="true"
      :category="setcategory"
      :state="selectedstate"
      :suburb="selectedsuburb"
      :shadowclass="true"
      :nearby="nearbyvalue" 
      @nearbyemit="changeNearby"
      @showdistancetext="showDistanceText"
      @showtypetextcheck="showTypeText"
      :showtypetext="showtype"
      :showdistancetext="showdistance"
    />
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
  </div>
</template>
<script>
import VueElementLoading from 'vue-element-loading'

export default {
  data() {
    return {
      show: false,
      clickmenu: false,
      headtext: 'Business Directory - Air Con',
      currentmenu: 1,
      currentmenusub: null,
      nearbyvalue: 0,
      showtype: true,
      showdistance: true,
      selectedstate: '',
      selectedsuburb: '',
      setcategory: 1,
      samplesuburb: [
        {
          name: 'Air-Con - Perth',
          state: 'WA',
          suburb: 'PERTH',
          id: 1
        },
        {
          name: 'Handyman - Perth',
          state: 'WA',
          suburb: 'PERTH',
          id: 40
        },
        {
          name: 'Plumbers - Sydney',
          state: 'NSW',
          suburb: 'SYDNEY',
          id: 57
        },
        {
          name: 'Carpenters - Sydney',
          state: 'NSW',
          suburb: 'SYDNEY',
          id: 16
        },
        {
          name: 'Builder - Sydney',
          state: 'NSW',
          suburb: 'SYDNEY',
          id: 14
        },
        {
          name: 'Painters - Sydney', 
          state: 'NSW',
          suburb: 'SYDNEY',
          id: 79
        },
        {
          name: 'Kitchen - Perth',
          id: 48,
          state: 'WA',
          suburb: 'PERTH',
        },
        {
          name: 'Electricians - Perth',
          state: 'WA',
          suburb: 'PERTH',
          id: 29
      }],
      samplecategory: [
        {
          name: 'Air-Con',
          id: 1
        },
        {
          name: 'Handyman',
          id: 40
        },
        {
          name: 'Plumbers',
          id: 57
        },
        {
          name: 'Carpenters',
          id: 16
        },
        {
          name: 'Builder',
          id: 14
        },
        {
          name: 'Painters', 
          id: 79
        },
        {
          name: 'Kitchen',
          id: 48
        },
        {
          name: 'Electricians',
          id: 29
        },
        {
          name: 'Cleaning',
          id: 20
        }]
    }
  },
  methods: {
    setcurrentMenu(i) {
        if(this.currentmenu == i) this.clickmenu = true
    },
    changeSuburbs(cat, suburb, state, name) {
      this.show = true
      this.currentmenusub = cat
      this.currentmenu = null
      this.nearbyvalue = 0
      this.setcategory = cat
      this.selectedstate = state
      this.selectedsuburb = suburb
      this.headtext = 'Business Directory - ' +name 
      setTimeout( () => {
          this.show = false
      },1000)
    },
    changeCategory(i, name) {
      this.show = true
      this.currentmenusub = null
      this.currentmenu = i
      this.nearbyvalue = 0
      this.selectedstate = null
      this.selectedsuburb = null
      this.setcategory = i
      this.headtext = 'Business Directory - ' +name 
       setTimeout( () => {
          this.show = false
      },200)
    },
    showDistanceText (s) {
      this.showdistance = s
    },
    showTypeText (s) {
      this.showtype = s
    },
    changeNearby(d) {
      if( d == 'statewide') {
        var v = 0
      } else if (d == 'nationwide') {
        var v = 1
      } else {
        var v = d
      }
      this.nearbyvalue = parseInt(v)
    }
  },
  components: {
   VueElementLoading
  }
};
</script>
<style>
.bg-grey {
   background: #eeeeee !important
}
.active {
    color: blueviolet !important;
}
</style>