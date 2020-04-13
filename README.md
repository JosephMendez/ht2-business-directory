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

### 3. Use in your components

```vue

<template>
  <ht2-business-directory 
    :category_id='29' 
    state='WA' 
    suburb='PERTH' 
    :nearby='50'
    :itemsperpage='6' 
    headertext='Business Directory - Air Con'
  />
</template>

```

### 4. Props

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
    lat: {
      type: Number
    },
    lon: {
      type: Number
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

## DEMO URL

```
http://ht2-dev.hiretrades.com.au/testbusinessdirectory/
# or

git clone https://github.com/JosephMendez/ht2-business-directory

cd ht2-business-directory

and run command

yarn examples:ht2businessdirectory

# or
npm install
npm run examples:ht2businessdirectory
```

## License
MIT
