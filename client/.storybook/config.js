/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved, import/extensions */

import {configure} from '@storybook/react';

function loadStories() {
    require('../stories/index.js');
    require('../stories/buttons.js');
    require('../stories/appbar.js');
}

configure(loadStories, module);
