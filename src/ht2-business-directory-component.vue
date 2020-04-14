<template>
<div class="container p-5">
   <h2 v-if="headertext">{{this.headertext}}</h2>
   <div v-if="showlocationdetails" class="alert alert-secondary">
     <p class="m-0">IP: {{getip()}}, Latitude: {{locationdetails().lat}}, Longitude: {{locationdetails().lon}}</p> <input type="checkbox" v-model="showalloptions"/> Show all options
     <div v-if="showtypetext">
       <input type="checkbox" checked v-model="showtypetextcheck"> Show source type
    </div>
    <div v-if="showdistancetext">
       <input type="checkbox" checked v-model="showdistancetextcheck"> Show distance from  your location<br>
    </div>
   </div>
  <div class="py-4 gutter parent">
     <vue-element-loading :active="show" spinner="bar-fade-scale"/>
     <div class="row mb-3 justify-content-md-center"  v-if="lists && lists.length > 0">
        <div v-for="(d, k) in lists" :key="k" class="col-12 col-lg-4 col-sm-6 pb-2">
           <div class="col pb-4 h-100"> 
             <div class="card  h-100 card-type" v-bind:class="{ 'shadow-sm rounded': shadowclass, 'type-r bg-white': d.type === 'r', 'type-p bg-grey': d.type === 'p' }">
              <div class="card-body m-0">
                <div class="media">
                  <img class="mr-3 responsive avatar" style="width:60px" :src="d.avatar == null ? 'https://www.colorbook.io/imagecreator.php?width=1920&height=1080' : d.avatar" alt="Generic placeholder image">
                  <div class="media-body">
                    <h5 class="mt-0" v-if="d.type === 'r'"><a :href="profileurl + d.uri">{{d.business_name}}</a></h5>
                    <h5 class="mt-0" v-else>{{d.business_name}}</h5>
                    <h6 class="card-subtitle mb-0 text-muted">{{d.suburb}}, {{d.state}}  <small style="color:red" v-if="showdistancetext"> dist: {{d.distance}} km</small></h6>
                    <starrating :read-only="true" :star-size="15" :show-rating="false" v-bind:max-rating="5" :rating="getratings[d.business_id]"></starrating>
                  </div>
                </div>
                <div class="card-text pb-4 mt-3 text-sm">
                  <p class="hascontent"><small>{{ $directory.randomcontent( d.description, services[d.business_id], d.type, d.suburb, d.state, d.business_name, servicesp[d.lead_id])  | strippedContent | cutstring(200, d.type) }}</small></p>
                </div>      
              </div>
              <div class="m-0 text-center" v-if="showtypetext"><small style="color:red;font-size:11px"> source type: <span>{{ d.type | typefilter }}</span></small></div>
            </div>
           </div>
        </div>
        <div v-if="showpagination" class="row mb-3 justify-content-md-center pt-3">
          <pagination :currentpage="currentPage" :pages="totalpage" @changePage="clickPagination" vspbutton="vspButton" vspbuttonseelcted="vspButton-selected" vspbuttonfast="vspButtonFast"></pagination>
        </div>
        <div v-else>
          loading...
        </div>
      </div>
       <div v-else></div>
  </div>
</div>
</template>
<script>

require("./style.css")

import Vue from 'vue'
import VueRouter from 'vue-router'
import { mapActions, mapGetters, mapState } from 'vuex'
import starrating from './ht2-rating-star.vue'
import pagination from './ht2-pagination.vue'
import VueElementLoading from 'vue-element-loading'

Vue.use(VueRouter)
const router = new VueRouter({ mode: 'history'});

export default {
  name: 'ht2-business-directory-component',
  router,
  data () {
    return { 
      show:false, 
      neededpotenailnextpage: false,
      exactitems: 0,
      loadaccounts: false, 
      loadpotentials: false,
      firstloading: false,
      lists:[], dpin:false, 
      totalaccountspages: 0,
      directorylistsnew:[], 
      currentPage:1,
      currentPotentialPage: 1,
      totalpage:0 , 
      initialtotal:0, 
      potentialtotal:0, 
      showpagination:false, 
      services:[], servicesp:[], 
      getratings:{}, 
      distanceoptions: 50, 
      showdistancetextcheck:true, 
      showtypetextcheck:true, 
      showalloptions: true }
  },
  beforeRouteEnter (to, from, next) {
    console.log(from, 'from')
  },
  components: {
   starrating, pagination, VueElementLoading
  },
  props: {
    headertext: { 
      type: String 
    },
    profileurl: {
      type: String,
      default: 'https://www.hiretrades.com.au/profile/'
    },
    apiurl: {
      type: String,
      reguired: true
    },
    category: {
      type: Number,
      default: 29
    },
    suburb: {
      type: String
    },
    state: {
      type: String
    },
    lat: {
      type: Number
    },
    lon: {
      type: Number
    },
    limit: {
      type: Number,
      default: 6
    },
    itemsperpage: {
      type: Number,
      default: 6
    },
    nearby: {
      type: Number,
      default: 0
    },
    showlocationdetails: {
      type: Boolean,
      default: false
    },
    shadowclass: {
      type: Boolean,
      defrault: false
    },
    showtypetext: {
      type: Boolean,
      default: true
    },
    showdistancetext: {
      type: Boolean,
      default: true
    }
  },
  serverPrefetch () {
    return this.fetchItem(true)
  },
  mounted () {
    this.fetchItem(true)
  },
  methods: {
    ...mapActions('ht2directoryStore', ['getdirectorystore', 'getdirectorystorepotentials']),
    ...mapGetters('ht2directoryStore', ['directorystore', 'directorystorepotentials']),
    ...mapState('ht2directoryStore', ['getip', 'locationdetails', 'ratings']),

    refetchItems() {
       this.show = true
       this.total = 0
       this.currentPotentialPage = 1
       this.currentPage = 1
       this.potentialtotal = 0
       this.loadaccounts = false
       this.fetchItem(true)
    },

    fetchItem(firstload) {
        const parameters = {
          'category_id': this.category,
          'suburb': this.suburb,
          'limit': this.limit,
          'nearby': this.nearby,
          'state': this.state,
          'page': this.currentPage,
          'type': 'r',
          'lat': this.lat,
          'lon': this.lon,
          'url': '/business/directory/2'
        }
        this.lists = []

        if (firstload) {
          this.firstloading = true
        }

        return this.getdirectorystore(parameters).then( () => {

          var sv = this.directorystore().services_by_business_id
          var p = this.directorystore().pluspotentials < 6 ? 6 : this.directorystore().pluspotentials
          this.potentialtotal = this.directorystore().pluspotentials
          var stotalpage = (this.directorystore().total + p) / this.limit
          this.totalpage = Math.floor(stotalpage)
          var orignumber = this.directorystore().total / this.limit
          var floorednumber =  Math.floor(orignumber)
          var extract =  orignumber - Math.floor(orignumber)
          var remainingitems =  Number(extract) * this.limit
          this.exactitems = Math.round(remainingitems)
          this.totalaccountspages = floorednumber

          this.show = true
          this.showpagination = true

          if (sv instanceof Object) {
            var st = JSON.parse(JSON.stringify(sv))
            this.services = st  
          }

          this.getratings = this.ratings()
          var cp = this.currentPage;

          setTimeout( () => {
            this.loadaccounts = true
            this.show = false
          }, 200)
    
        })
    },

    fetchPotentialsConjunction (firstload) {
      
      if (firstload) {
        var limit = this.limit - this.exactitems
        this.currentPotentialPage = 1
      } else {
        var limit = this.limit
        this.currentPotentialPage = (this.currentPage - this.totalaccountspages) - 1
      }

      const parameters = {
        'category_id': this.category,
        'suburb': this.suburb,
        'limit': (firstload == true ? limit : this.limit),
        'nearby': this.nearby,
        'state': this.state,
        'page': this.currentPotentialPage,
        'lat': this.lat,
        'lon': this.lon,
        'type': 'p',
        'url': '/business/directory/2'
      }
      return this.getdirectorystorepotentials(parameters)
    },

    fetchPotentials (f) {
      this.fetchPotentialsConjunction(f).then(() => {
        if (this.directorystorepotentials().data.length > 0) {
        var p = this.directorystorepotentials().data
        p.forEach(v => {
          this.lists.push(v)
        })
        var svp = this.directorystorepotentials().services_by_business_id
          if (svp instanceof Object) {
            var stp = JSON.parse(JSON.stringify(svp))
            this.servicesp = stp
          }
        }
        this.show = false
      })
    },

    clickPagination (c) {
      this.lists = []
      this.currentPage = c
      this.$router.push({query: {'page': c}})
      
      var cp = c - 1;

      if( cp == this.totalaccountspages ) {
        this.loadaccounts = false
        this.fetchItem(false).then( () => {
          this.fetchPotentials(true)
        })
      } else if (cp > this.totalaccountspages) {
        this.fetchPotentials(false)
      } else {
        this.loadaccounts = false
        this.fetchItem()
      }

      setTimeout(() => {
        this.show = false
      }, 200)

    }

  },
  filters: {
    strippedContent(v) {
      if(v === null || v === '') return v
      return v.replace(/<\/?[^>]+(>|$)/g, '').replace(/\&nbsp;/g, '')
    },
    cutstring(v, n, t){
      if(t === 'r') {
        var cut= v.indexOf(' ', n);
        if(cut== -1) return v;
        return v.substring(0, cut)
      } else {
        return v
      }
    },
    typefilter (v) {
      return v === 'r' ? 'account' : 'potential'
    }
  },
  watch: {
    loadaccounts: function(d) {
      if(d) {
        if (this.directorystore().data.data.length > 0) {
          this.lists = []
          var t = this.directorystore().data.data
          t.forEach(v => {
            this.lists.push(v)
          })
          if (t.length < 6 && this.firstloading) {
            this.fetchPotentials(true)
          }
        }
      }
    },
     total: function (d) {
       return this.directorystore().total
     },
     category: function(d) {
       this.category = d
       this.refetchItems()
     },
     nearby: function (d) {
       this.nearby = d
       this.distanceoptions = d
       this.refetchItems()
     },
     suburb: function (d) {
       this.suburb = d
       this.refetchItems()
     },
     state: function (d) {
       this.state = d 
     },
     distanceoptions: function(d) {
       if(d === 1) {
         alert('This is not recommended, it takes a while to load all items')
       }
       this.$emit('nearbyemit', d)
     },
     showdistancetextcheck: function(c) {
       this.$emit('showdistancetext', c)
     },
     showtypetextcheck: function (c) {
       this.$emit('showtypetextcheck', c)
     }
  }
};
</script>