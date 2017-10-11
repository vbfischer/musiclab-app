import React from 'react';

import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';

import Grid from 'material-ui/Grid';
import AddIcon from 'material-ui-icons/Add';
import ModeEditIcon from 'material-ui-icons/ModeEdit';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';
import Button from 'material-ui/Button';
import {withKnobs, text} from '@storybook/addon-knobs';

storiesOf('Button', module)
    .addDecorator(withKnobs)

    .add('Flat Buttons', () => (
        <Grid container>
            <Grid item>
                <Button color="primary"
                        onClick={action('clicked')}>{text('Label', 'Primary Button')}</Button>
            </Grid>
            <Grid item>
                <Button color="accent"
                        onClick={action('clicked')}>{text('Label', 'Accent Button')}</Button>
            </Grid>
            <Grid item>
                <Button color="contrast"
                        onClick={action('clicked')}>{text('Label', 'Contrast Button')}</Button>
            </Grid>
            <Grid item>
                <Button disabled
                        onClick={action('clicked')}>{text('Label', 'Disabled Button')}</Button>
            </Grid>
            <Grid item>
                <Button href="#" onClick={action('clicked')}>{text('Label', 'Link')}</Button>
            </Grid>
            <Grid item>
                <Button href="#" disabled
                        onClick={action('clicked')}>{text('Label', 'Disabled Link')}</Button>
            </Grid>
            <Grid item>
                <Button dense onClick={action('clicked')}>{text('Label', 'Dense Button')}</Button>
            </Grid>
        </Grid>
    ))
    .add('Raised Buttons', () => (
        <Grid container>
            <Grid item>
                <Button raised color="primary"
                        onClick={action('clicked')}>{text('Label', 'Primary Button')}</Button>
            </Grid>
            <Grid item>
                <Button raised color="accent"
                        onClick={action('clicked')}>{text('Label', 'Accent Button')}</Button>
            </Grid>
            <Grid item>
                <Button raised color="contrast"
                        onClick={action('clicked')}>{text('Label', 'Contrast Button')}</Button>
            </Grid>
            <Grid item>
                <Button raised disabled
                        onClick={action('clicked')}>{text('Label', 'Disabled Button')}</Button>
            </Grid>
            <Grid item>
                <Button raised href="#" onClick={action('clicked')}>{text('Label', 'Link')}</Button>
            </Grid>
            <Grid item>
                <Button raised href="#" disabled
                        onClick={action('clicked')}>{text('Label', 'Disabled Link')}</Button>
            </Grid>
            <Grid item>
                <Button raised dense onClick={action('clicked')}>{text('Label', 'Dense Button')}</Button>
            </Grid>
        </Grid>
    ))
    .add('Floating Action Buttons', () => (
        <Grid container>
            <Grid item>
                <Button fab color="primary" aria-label="add" onClick={action('clicked')}>
                    <AddIcon/>
                </Button>
            </Grid>
            <Grid item>
                <Button fab color="accent" aria-label="edit" onClick={action('clicked')}>
                    <ModeEditIcon/>
                </Button>
            </Grid>
        </Grid>
    ))
    .add('Icon Buttons', () => (
        <Grid container>
            <Grid item>
                <IconButton aria-label="Delete">
                    <DeleteIcon/>
                </IconButton>
            </Grid>
        </Grid>
    ));


