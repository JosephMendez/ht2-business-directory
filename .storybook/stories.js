import Vue from 'vue';
import Vuex from 'vuex';
import { storiesOf } from '@storybook/vue';

import HiretradesBusinessDirectory from '../src/ht2-business-directory';

Vue.use(Vuex);
Vue.use(HiretradesBusinessDirectory);

const withSettings = component => ({
  directorySettings: new HiretradesBusinessDirectory(),
  ...component
});

const stories = storiesOf('HiretradesBusinessDirectory', module);

stories
  // Add some stories here to make your plugin more descriptive
  .add(
    'My Customs  Component',
    () =>
      withSettings({
        template: `
        <div>
          <ht2-business-directory />
        </div>
      `
      }),
    {
      notes: `
        # Using \`ht2-business-directory\`

        \`\`\`html
        <template>
          <ht2-business-directory />
        </template>
        \`\`\`
      `
    }
  )
  .add(
    'My Custom Component with another markup',
    () =>
      withSettings({
        template: `
        <div>
          <b>Hello</b>
          <ht2-business-directory />
          <i>world</i>
        </div>
      `
      }),
    {
      notes: `
        # Using \`ht2-business-directory\` with other components

        \`\`\`html
        <template>
          <div>
            <b>Hello</b>
            <ht2-business-directory />
            <i>world</i>
          </div>
        </template>
        \`\`\`
      `
    }
  );
