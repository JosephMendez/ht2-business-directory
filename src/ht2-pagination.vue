<template>
  <div>
    <div v-if="pages < maxPages">
      <button :class="vspbutton + (vspbuttonfast !== '' ? ' ' + vspbuttonfast : '')" @click="handlePageChange(1)"> first </button>
      <button v-for="item in pages" :key="item" :class="vspbutton + (item == currPage ? ' ' + vspbuttonselected : '')" @click="handlePageChange(item)">{{item}}</button>
      <button :class="vspbutton + (vspbuttonfast !== '' ? ' ' + vspbuttonfast : '')" @click="handlePageChange(pages)">>></button>
    </div>
    <div v-else>
      <button :class="vspbutton + (vspbuttonfast !== '' ? ' ' + vspbuttonfast : '')" @click="handlePageChange(1)"> first </button>
      <button v-for="item in leftPages" @click="handlePageChange(item)" :key="item" :class="vspbutton + (item == currPage ? ' ' + vspbuttonselected : '')">{{item}}</button>
      <span v-if="(pages - 4) - currPage > 3">...</span>
      <button v-for="item in [pages - 4, pages - 3, pages - 2, pages - 1, pages]" :class="vspbutton + (item == currPage ? ' ' + vspbuttonselected : '')" :key="item" @click="handlePageChange(item)">{{item}}</button>

      <button :class="vspbutton + (vspbuttonfast !== '' ? ' ' + vspbuttonfast : '')" @click="handlePageChange(pages)">last</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ht2Pagination',
    props: {
      pages: {
        type: Number,
        required: true
      },
      currentpage: {
        type: Number,
        required: true
      },
      vspbutton: {
        type: String,
        default: 'vspButton'
      },
      vspbuttonselected: {
        type: String,
        default: 'vspButton-selected'
      },
      vspbuttonfast: {
        type: String,
        default: ''
      }
	},
    data () {
      return {
        maxPages: 10,
        leftPages: [],
        currPage: 0
      }
    },
    methods: {
      handlePageChange(item){
        if (this.currPage !== item) {
          this.currPage = item
          this.generateLeftPages()
          this.$emit('changePage', item)
        }
      },
      generateLeftPages(){
        var start = (this.currPage - parseInt(this.maxPages/Math.pow(2,2)) > 1 ? this.currPage - parseInt(this.maxPages/Math.pow(2,2)) : 1);
        var stop = parseInt(this.maxPages/2) + this.currPage - parseInt(this.maxPages/Math.pow(2,2)) - 1;
        if(stop < parseInt(this.maxPages/2)) stop = parseInt(this.maxPages/2);
        if(stop >=  this.pages - parseInt(this.maxPages/2) + 1){
          stop =  this.pages - parseInt(this.maxPages/2);
          start = this.pages - parseInt(this.maxPages/2) - parseInt(this.maxPages/Math.pow(2,2)) - 2;
        }

        this.leftPages = []
        for(var i = start; i <= stop; i++){
          this.leftPages.push(i);
        }
      }
    },
    watch: {
      currentpage: function(val) {
        this.handlePageChange(val)
      }
    },
    mounted(){
	    this.currPage = this.currentpage
      this.generateLeftPages()
    }
  }
</script>