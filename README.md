# Hiretrades Business Directory - Plugin

## Installation

### 1. Install
```
yarn add ht2-business-directory
# or
npm i ht2-business-directory --save
```

### 2. Plug-in
```js
import HiretradesBusinessDirectory from 'ht2-business-directory'

Vue.use(HiretradesBusinessDirectory)

new Vue({
  // your vue config
  directorySettings: new HiretradesBusinessDirectory(),
})
```

### 3. Props

```js
    headertext: { 
      type: String
    },
    profileurl: {
      type: String,
      default: 'https://www.hiretrades.com.au/profile/'
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
```

### 4. Use in your components

```vue
<template>
  <ht2-business-directory />
</template>

<script>
  export default {
    async created() {
      console.log(this.$directory);
    },
  };
</script>
```

## License
MIT
