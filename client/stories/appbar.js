import React from 'react';

import {storiesOf} from '@storybook/react';
import {withKnobs} from '@storybook/addon-knobs';
import Header from '../src/components/header';
import Navbar from '../src/containers/navbar';

storiesOf('App Bar', module)
    .addDecorator(withKnobs)
    .add('Header', () => (
        <Header appName="GuitarLab" currentUser="currentUser"/>
    ))
    .add('Sidebar', () => (
        <Navbar/>
    ))
    ;