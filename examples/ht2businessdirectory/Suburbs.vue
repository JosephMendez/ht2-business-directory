<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li v-for="(d, i) in samplecategory" :key="i" class="nav-item active" style='border-right: 1px solid #aaa;'>
            <a class="nav-link" href="#" @click="changeSuburbs(d.id, d.suburb, d.state)"> {{d.name}}</a>
            
          </li>
        </ul>
      </div>
    </nav>

    <router-link to='/' class="p-4"> >>> Category Test Here</router-link>

    <ht2-business-directory-component-2020 
      headertext="Business Directory - API Implementation"
      apiurl='https://hiretrades.com.au/api'
      :state="selectedstate"
      :suburb="selectedsuburb"
      :showlocationdetails="true"
      :category="setcategory"
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

export default {
  data() {
    return {
      nearbyvalue: 50,
      showtype: true,
      showdistance: true,
      msg: 'worldsss',
      setcategory: 1,
      selectedstate: 'WA',
      selectedsuburb: 'PERTH',
      samplecategory: [
        {
          name: 'Air-Con - Perth',
          state: 'WA',
          suburb: 'PERTH',
          id: 1
        },
        {
          name: 'Air-Con - Sydney',
          state: 'NSW',
          suburb: 'SYDNEY',
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
        }]
    }
  },
  methods: {
    changeSuburbs(cat, suburb, state) {
      this.setcategory = cat
      this.selectedstate = state
      this.selectedsuburb = suburb
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
  }
};
</script>
<style>
.bg-grey {
   background: #eeeeee !important
}
</style>