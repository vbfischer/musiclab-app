import {JournalEntry} from '../models';
import {Router} from 'express';
import {requireAuth} from '../config/passport';

import moment from 'moment';

let route = Router({mergeParams: true});

route.post('/', requireAuth, (req, res) => {
    let entryDate = moment().toDate();

    if(req.body.entryDate) {
        entryDate = moment(req.body.entryDate).toDate()
    }
    let journal = new JournalEntry({
        notes: req.body.notes,
        practiceTime: req.body.practiceTime,
        entryDate: entryDate
    });

    req.user.setAccess(journal, ['read', 'write', 'delete']);

    journal.save()
        .then((result) => {
            res.json(result);
        });
});

export default route;


// exports.create = function (req, res) {
//     var journal = new Journal({
//         notes: req.body.notes,
//         practiceTime: req.body.practiceTime,
//         entryDate: moment(req.body.entryDate).toDate()
//     });
//
//     journal.save()
//         .then(function (j) {
//             res.json(j);
//         });
// };
//
// exports.createItem = function (req, res) {
//     const body = req.body;
//
//     const item = new JournalItem({
//         goal: body.goal,
//         bpmMin: body.bpmMin,
//         bpmMax: body.bpmMax,
//         minutes: body.minutes,
//         notes: body.notes,
//         parentEntry: body.parentEntry
//     });
//
//     item.save()
//         .then(function(i) {
//             res.json(i);
//         })
// };
//
// exports.update = function (req, res) {
//
// };