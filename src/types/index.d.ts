import Vue, { PluginFunction } from 'vue';
// import { Store } from 'vuex';

export class HiretradesBusinessDirectory {
  constructor(options?: HiretradesBusinessDirectoryOptions);

  static install(): PluginFunction<any>;
  // static init(Vue: Vue, store: Store<any>): void;
  static init(Vue: Vue, store: any): void;

  // Your instance methods
  world(): string;
}

export interface HiretradesBusinessDirectoryOptions extends Object {
  accessorName?: string
}

declare module 'vue/types/vue' {
  interface Vue {
    $directory: HiretradesBusinessDirectory;
    __$HiretradesBusinessDirectoryInstance: HiretradesBusinessDirectory;
  }
}

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    directorySettings?: HiretradesBusinessDirectoryOptions | HiretradesBusinessDirectory
  }
}
