const { google } = require('googleapis');
const { verifyAttestation } = require('appattest-checker-node');
const { configureGoogleAuth } = require('../utils/configure_google_auth')

exports.attestTokenAndroid = async(req, res, next) => {

    try {
        await configureGoogleAuth();

        const integrityResponse = await google.playintegrity('v1').v1.decodeIntegrityToken({
            packageName: process.env.PACKAGE_NAME,
            requestBody: {
            integrityToken: req.body.attestToken
            }
        });

        const response = integrityResponse.data && integrityResponse.data.tokenPayloadExternal;

        if (!response) {
            //throw some error here 
            throw new Error('Invalid Response');
        }

        const { requestDetails, appIntegrity, deviceIntegrity, accountDetails } = response;

        if (
            !requestDetails ||
            requestDetails.requestPackageName.toLowerCase() !== process.env.PACKAGE_NAME.toLowerCase() ||
            Date.now() - requestDetails.timestampMillis >= 120000 ||
            !appIntegrity ||
            appIntegrity.appRecognitionVerdict !== 'PLAY_RECOGNIZED' ||
            !deviceIntegrity ||
            (deviceIntegrity.deviceRecognitionVerdict &&
            deviceIntegrity.deviceRecognitionVerdict.length === 0) ||
            !accountDetails ||
            accountDetails.appLicensingVerdict !== 'LICENSED'
        ) {
            // throw new Error('Forbidden Device');
            return res.json(response);
        }

        if (!deviceIntegrity.deviceRecognitionVerdict.includes('MEETS_DEVICE_INTEGRITY')) {
            // throw new Error('Forbidden Device');
            return res.json(response);
        }
        
        return res.data(response);

    } catch (error) {

        res.status(500).send(error);

    }
    
    next();
};

exports.attestTokeniOS = async(req, res, next) => {

    try {

        var packageName = process.env.PACKAGE_NAME;
        var teamID = process.env.TEAM_ID;
        console.log('attest ios')
        let result =await verifyAttestation({
            appId: `${teamID}.${packageName}`,
            develomentEnv: true,
            },  // appInfo
            req.body.keyId,
            req.body.challenge,
            req.body.attestToken
        );

        console.log(result);
        return res.data(result);
    } catch (error) {

        res.status(500).send(error);

    }
    
    next();
};