var Router = require('express').Router;

import group from './group.controller';
import authentication from './authentication.controller';
import category from './category.controller';
import goal from './goal.controller';
import instruction from './instruction.controller';
import journal from './journal.controller';

export default () => {
    let api = Router({mergeParams: true});

    api.use('/auth', authentication);
    api.use('/category', category);
    api.use('/goal', goal);
    api.use('/instruction', instruction);
    api.use('/group', group);
    api.use('/journal', journal);

    return api;
}