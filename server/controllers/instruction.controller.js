import path from 'path';

import {Router} from 'express';
import Promise from 'bluebird';
import {requireAuth} from '../config/passport';
import {Instruction, Category} from '../models';
import logger from '../config/logger';
import Prismic from 'prismic-javascript';
import _ from 'lodash';

const fs = Promise.promisifyAll(require('fs'));

let route = Router({mergeParams: true});


route.post('/', requireAuth, async (req, res) => {
    const {title, description, category, docUid} = req.body;

    var instruction = new Instruction({
        title,
        description,
        category,
        resource: docUid
    });

    if (docUid) {
        const content = await req.prismic.api.getByUID('exercise', docUid);

        logger.info(content);
    }

    await instruction.save();

    res.json(instruction);
});


route.get('/references', requireAuth, async (req, res) => {
    logger.info('INFO!!');
    const docs = await req.prismic.api.query(
        [],
        {fetch: ['exercise.title', 'exercise.description']}
    );

    res.json(docs.results.map((r) => {
        return {
            title: r.data.exercise.title.value[0].text,
            exercise: r.uid,
            description: _.get(r.data.exercise, 'description.value[0].text')

        }
    }));
});

export default route;