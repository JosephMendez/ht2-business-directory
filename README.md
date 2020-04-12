# HiretradesBusinessDirectory

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
