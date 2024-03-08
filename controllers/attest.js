const bcrypt = require('bcryptjs');
const { attestTokenValidation } = require('../utils/validation');
const { randomUUID } = require('crypto');
const { google } = require('googleapis');
const { attestTokeniOS, attestTokenAndroid} = require('../services/attest');

// Request UUID challeenge
exports.getChallenge = async(req, res, next) => {

    try {

        let results = randomUUID(); 
        res.json(results);

    } catch (error) {

        res.status(500).send(error);

    }
    
    next();
};

exports.attestToken = async(req, res, next) => {
    console.log('attest token')
    const {error} = attestTokenValidation(req.body);
    if(error)
        return res.status(400).send(error.details[0].message);

    try {
    
        if(req.body.platform == 'IOS') {
            let response = await attestTokeniOS(req, res, next);
            console.log(response);
            return res.data(response);
        }

        let response = await attestTokenAndroid(req, res, next);
        console.log(response);
        return res.data(response);
        
    } catch (err) {
        
      throw new Error(`Some error occured ${err}`);
    }
    
    next();
};