import { devMode, registerVuexStore } from './utils'
import axios from 'axios'

const instanceBusinessDirectory = axios.create({
  baseURL: 'https://ht2-api.hiretrades.com.au/api/'
})

import HiretradesBusinessDirectoryComponent from './ht2-business-directory-component.vue';

export default class HiretradesBusinessDirectory {
  constructor(options = {}) {
    const defaults = {
      accessorName: '$directory'
    };
    this.options = { ...defaults, ...options };
  }
  directorydata(setbaseURL, apiurl, parameters) {
    const instance = axios.create({
      baseURL: setbaseURL
    })
   return instance.get( apiurl, {
      params: parameters
    })
  }
  randomcontent(v, s, t, suburb, state, bn, l) {
    if (v==='' || v ===null) {
          console.log(bn ,' type type')
          if(t == 'r' && s instanceof Object) {
            var z = Object.values(s);
            console.log(z)
            var cat = z.join(', ').replace(/, ([^,]*)$/, ' and $1')
          } else {
            if(l instanceof Object) {
              var x = Object.values(l);
              var cat = x.join(', ')
              // var cat = x.slice(0, -1).join(',')+' & '+x.slice(-1) + ' ';
            } else {
              var cat = ''
            }
          }
          let contents = [
          { content: `${bn} can assist with your ${cat} requirements in ${suburb}, ${state}.` },
          { content: `${bn} are a tradie providing ${cat} in the locality of ${suburb}, ${state}.` },
          { content: `${bn} based in ${suburb}, ${state} provide ${cat} to assist with your needs.` },
          { content: `For your ${cat} needs in  ${suburb}, ${state} seek assistance from ${bn}.` },
          { content: `In need of ${cat}? ${bn} in, ${suburb}, ${state} can assist you.` },
          { content: `Based in ${suburb}, ${state} ${bn} can help you with ${cat}.` },
          { content: `Wanting local ${cat} in ${suburb}, ${state}. ${bn} can help.` },
          { content: `${bn} in ${suburb}, ${state} can assist with all your needs for ${cat}.` },
          { content: `${cat} delivery by ${bn} in ${suburb}, ${state}.` },
          { content: `Providing ${cat} ${bn} based in ${suburb}, ${state} can assist.` },
          { content: `${cat} works in ${suburb}, ${state} are provided by ${bn}.` },
          { content: `${bn} in ${suburb}, ${state} provide ${cat} near you.` },
          { content: `Hire ${bn} for all your ${cat} needs in ${suburb}, ${state}.` },
          { content: `${cat} in ${suburb}, ${state} are delivered by ${bn}.` },
          { content: `Need ${cat} in ${suburb}, ${state}? ${bn} would like to assist you.` }
        ]
        let rand = Math.floor(Math.random() * 14)
        return contents[rand].content
  
    } else {
        return v
    }
  }

  static register = (Vue, options, store) => {
   
    Vue.component('ht2-business-directory', HiretradesBusinessDirectoryComponent);

    registerVuexStore(store, 'ht2directoryStore', {
       namespaced: true,
       state: { 
        locationdetails: { lat: '', lon: ''},
        getip: '',
        directorystore: 
         {
          data: { data: [] },
          total: 0,
          hasmorepage: false,
          services_by_business_id: {},
          ratings: {}
        }, 
        directorystorepotentials: 
         {
          data: { data: [] },
          total: 0,
          hasmorepage: false,
          services_by_business_id: {},
          ratings: {}
        }, 
        directorystoreerror: '', 
        directorystorecurrent: {},
        ratings: {}
      },
       getters: {
        directorystore: state => state.directorystore,
        directorystorepotentials: state => state.directorystorepotentials,
        directorystorecurrent: state => state.directorystorecurrent,
        directorystoreerror: state => state.directorystoreerror,
        getip: state => state.getip,
        locationdetails: state => state.locationdetails,
        ratings: state => state.ratings
       },
       actions: {
        getdirectorystore: ({ commit }, parameters) =>
        instanceBusinessDirectory.get( parameters['url'], { params:  parameters  })
        .then( d =>
          commit('setdirectorystore', d.data)
          )
          .catch( err => console.log(err)),
        getdirectorystorepotentials: ({ commit }, parameters) =>
        instanceBusinessDirectory.get( parameters['url'], { params:  parameters  })
        .then( d =>
          commit('setdirectorystorepotentials', d.data)
          )
          .catch( err => console.log(err)),
       },
       mutations: {
        setdirectorystore: (state, data) => { 
          state.directorystore = data
          state.locationdetails = data.locationdetails
          state.getip = data.getip
          state.ratings = data.ratings
         },
        setdirectorystorepotentials: (state, data) => { state.directorystorepotentials = data },
        setdirectorystorecurrentpage: (state, data) => { state.directorystorecurrent = data },
        setdirectorystoreerror: (state, rr) => { state.directorystoreerror = rr}
       }
     });
  };

  static mixin = () => ({
    mounted() {
      console.log(this.$store);
    }
  });

  initialized = false;

  init(Vue, store) {
    if (devMode() && !install.installed) {
      console.warn(
        `[ht2-business-directory] not installed. Make sure to call \`Vue.use(HiretradesBusinessDirectory)\` before init root instance.`
      );
    }

    if (this.initialized) {
      return;
    }

    HiretradesBusinessDirectory.register(Vue, this.options, store);
    this.initialized = true;
  }
}

export function install(Vue) {
  const isDev = devMode();
  
  if (install.installed && Vue) {
    if (isDev) {
      console.warn(
        '[ht2-business-directory] already installed. Vue.use(HiretradesBusinessDirectory) should be called only once.'
      );
    }
    return;
  }

  Vue.mixin({
    beforeCreate() {
      const { directorySettings, store, parent } = this.$options;

      let instance = null;
      if (directorySettings) {
        instance =
          typeof directorySettings === 'function'
            ? new directorySettings()
            : new HiretradesBusinessDirectory(directorySettings);
        instance.init(Vue, store);
      } else if (parent && parent.__$HiretradesBusinessDirectoryInstance) {
        instance = parent.__$HiretradesBusinessDirectoryInstance;
        instance.init(Vue, parent.$store);
      }

      if (instance) {
        this.__$HiretradesBusinessDirectoryInstance = instance;
        this[instance.options.accessorName] = instance;
      }
    },

    ...HiretradesBusinessDirectory.mixin()
  });

  install.installed = true;
  if (isDev) {
    console.info('[ht2-business-directory] is plugged in.');
  }
}

HiretradesBusinessDirectory.install = install;
