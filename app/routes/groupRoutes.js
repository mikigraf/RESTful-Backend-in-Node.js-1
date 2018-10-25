const passport = require('passport');
const express = require('express');
const router = express.Router();
const {
    User,
    Team
} = require('../db/index');

const isAdmin = require('../middlewares/isAdmin');

/**
 * @api {get} /teams All teams
 * @apiName Get list of all teams
 * @apiGroup Teams
 * 
 * @apiSuccess {Array} array of team id's. 
 * 
 * 
 */
router.get('/teams', [passport.authenticate('jwt', {
    session: false
}), isAdmin], async (req, res, next) => {
    try {
        if (Object.keys(req.query).length === 0) {
            let teams = await Team.find({});
            if (!teams) {
                res.status(404).send('It seems like there are no teams.');
            }

            const ids = teams.map(t => t._id);
            res.status(200).json(ids);
        }

    } catch (error) {
        res.status(500).json(error);
    }
});

/**
 * @api {get} /teams/:id Team data
 * @apiName Get team data
 * @apiGroup Teams
 * 
 * @apiParam {Number} id Teams unique ID.
 * 
 * @apiSuccess {Team} JSON object containing team data. 
 * 
 * 
 */
router.get('/teams/:id', [passport.authenticate('jwt', {
    session: false
})], async (req, res, next) => {
    try {
        let team = await User.findById(req.params.id);
        res.status(200).json(team);
    } catch (error) {
        res.status(500).json(error);
    }
});

/**
 * @api {post} /teams/:id/add Add member
 * @apiName Add member to the team
 * @apiGroup Teams
 * 
 * @apiParam {Number} id Teams unique ID.
 * 
 * @apiSuccess {Team} JSON object containing team data. 
 * 
 * 
 */
router.post('/teams/:id/add', passport.authenticate('jwt', {
    session: false
}), async (req, res, next) => {
    try {
        var team = await Team.findById(req.params.id);
        if (req.user.status === 'admin' || team.leaders.indexOf(req.user._id)) {
            var new_member = await User.findById(req.query.new_member_id);
            team.members.push(req.query.new_member._id);
            new_member.groups.push(team._id);
            team.save();
            new_member.save();
            res.status(200).send(team);
        }
        res.status(401).send('Unauthorized.');
    } catch (error) {
        res.status(500).json(error);
    }
});



// delete team