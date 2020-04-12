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
       <input type="radio" value="50"  v-model="distanceoptions">50km 
       <input type="radio" value="100" v-model="distanceoptions">100km  
       <input type="radio" value="statewide" v-model="distanceoptions">StateWide
       <input type="radio" value="nationwide" v-model="distanceoptions">NationWide (not recommended)
    </div>
   </div>
  <div class="py-4 gutter parent">
     <vue-element-loading :active="show" spinner="bar-fade-scale"/>
     <div class="row mb-3 justify-content-md-center"  v-if="directorylists">
        <div v-for="(d, k) in directorylists" :key="k" class="col-12 col-lg-4 col-sm-6 pb-2">
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
        <div v-if="showpagination" class="pt-3">
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
    return { show:false, lists:[], dpin:false, directorylistsnew:[], currentPage:1, totalpage:0 , initialtotal:0, showpagination:false, services:[], servicesp:[], getratings:{}, distanceoptions: 50, showdistancetextcheck:true, showtypetextcheck:true, showalloptions: true }
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
    limit: {
      type: Number,
      default: 2000
    },
    itemsperpage: {
      type: Number,
      default: 6
    },
    nearby: {
      type: Number,
      default: 50
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
    return this.fetchItem()
  },
  mounted () {
    if(!this.directorylists) {
      this.fetchItem()
    }
  },
  computed: {
     directorylists (d) {
      var t = this
      if (this.$store.state.ht2directoryStore.directorystore.data.data.length > 0) {
        this.initialtotal = this.directorystore().total
        if(this.lists.length > 0) {
          var d = (this.currentPage - 1) * this.itemsperpage
          var n = this.itemsperpage * this.currentPage
          this.total = this.lists.length
          this.totalpage = Math.floor(this.lists.length / this.itemsperpage)
          this.showpagination = true
          return this.lists.slice(d, n)
        } else {
          this.total = this.lists.length
          this.totalpage = Math.floor(this.directorystore().total / this.itemsperpage)
          return this.$store.state.ht2directoryStore.directorystore.data.data 
        } 
      }
     }
  },
  methods: {
    ...mapActions('ht2directoryStore', ['getdirectorystore', 'getdirectorystorepotentials']),
    ...mapGetters('ht2directoryStore', ['directorystore', 'directorystorepotentials']),
    ...mapState('ht2directoryStore', ['getip', 'locationdetails', 'ratings']),
    refetchItems() {
       this.show = true
       this.total = 0
       this.dpin = false
       this.fetchItem()
    },
    fetchItem() {
        const parameters = {
          'category_id': this.category,
          'suburb': this.suburb,
          'limit': this.limit,
          'nearby': this.nearby,
          'state': this.state,
          'type': 'r',
          'url': '/business/directory/2'
        }
        this.lists = []
        return this.getdirectorystore(parameters).then( () => {
          var sv = this.directorystore().services_by_business_id
          this.initialtotal = this.directorystore().total
          this.show = true
          if (sv instanceof Object) {
            var st = JSON.parse(JSON.stringify(sv))
            this.services = st
          }
          this.getratings = this.ratings()
          this.fetchBackground().then( () => {
            this.dpin = true
            this.show = false
          })
        })
    },
    fetchBackground () {
      const parameters = {
        'category_id': this.category,
        'suburb': this.suburb,
        'limit': this.initialtotal,
        'nearby': this.nearby,
        'state': this.state,
        'type': 'p',
        'url': '/business/directory/2'
      }
      return this.getdirectorystorepotentials(parameters)
    },
    clickPagination (c) {
      this.show = true
      this.currentPage = c
      this.$router.push({query: {'page': c}})
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
    dpin: function(d) {
      if (this.directorystorepotentials().data.data.length > 0) {
        this.lists = this.directorystore().data.data
        var t = this.directorystorepotentials().data.data
        t.forEach(v => {
          this.lists.push(v)
        })
        var svp = this.directorystorepotentials().services_by_business_id
        if (svp instanceof Object) {
          var stp = JSON.parse(JSON.stringify(svp))
          this.servicesp = stp
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
       if(d === 'nationwide') {
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