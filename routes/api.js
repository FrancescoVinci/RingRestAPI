const express = require('express');
const router = express.Router();
const https = require('https');
const PostFromName = require('../models/PostFromName');
const PostFromContent = require('../models/PostFromContent');
const constants = require('../includes/constants');
const standardJSON = require('../includes/standardJSON');
require('../includes/function.js')();

//check is the .pdb file exists in files.rcsb.org
router.get('/ispresent/:pdbfile', async(req,res) => {

    console.log('[/ispresent]:Incoming Get request');

    const requestOption = {
        hostname: 'files.rcsb.org',
        method: 'HEAD',
        path: '/view/' + req.params.pdbfile
    }
    
    const request = https.request(requestOption, r => {

        console.log('\tRequest submitted to rcbs.org');
        console.log(`\tStatus code: ${r.statusCode}`);

        r.on('error', (error) => {
            console.log('\t' + error);
            res.status(constants.INT_ERR_CODE).json(standardJSON.STDERR_JSON);
            console.log('End');
            return;
        });

        if(r.statusCode == constants.NOT_FOUND_CODE){
            console.log(`\tFile ${req.params.pdbfile} does not exist`);
            res.status(constants.NOT_FOUND_CODE).json(standardJSON.NOT_FOUND_JSON);
            console.log('End');
        }else if(r.statusCode == constants.SUCCESS_CODE){
            console.log(`\tFile ${req.params.pdbfile} exists`);
            res.status(constants.SUCCESS_CODE).json(standardJSON.FILE_EXISTS_JSON);
            console.log('End');
        }
    });

    request.on('error', (error) => {
        console.log('\t' + error);
        res.status(constants.INT_ERR_CODE).json(standardJSON.STDERR_JSON);
        console.log('End');
        return;
    });
    
    request.end();

});

//returns the specified .pdb file, if it exists in files.rcsb.org
router.get('/getpdb/:pdbfile', async(req,res) => {

    console.log('[/getpdb]:Incoming Get request');

    const requestOption = {
        hostname: 'files.rcsb.org',
        method: 'GET',
        path: '/view/' + req.params.pdbfile
    }

    str = '';
    const request = https.request(requestOption, r => {

        console.log('\tRequest submitted to rcbs.org');
        console.log(`\tStatus code: ${r.statusCode}`);

        r.on('error', error => {
            console.log(error);
            res.status(constants.INT_ERR_CODE).json(standardJSON.STDERR_JSON);
            console.log('End');
            return;
        });

        if(r.statusCode == constants.NOT_FOUND_CODE){
            console.log(`\tFile ${req.params.pdbfile} does not exist`);
            res.status(constants.NOT_FOUND_CODE).json(standardJSON.NOT_FOUND_JSON);
            console.log('End');
        }else if(r.statusCode == constants.SUCCESS_CODE){
            r.setEncoding('utf8');
            r.on('data', chunk => {
                str += chunk;
            })
            .on('end', function() {
                console.log(`\tFile ${req.params.pdbfile} exists`);
                res.status(constants.SUCCESS_CODE).json({
                    response: constants.SUCC,
                    data: {
                        code: constants.SUCCESS_CODE,
                        message: constants.FILE_EXISTS,
                        pdb: `${str}`
                    }
                });
                console.log('End');
            });
        }
    });

    request.on('error', error => {
        console.log(error);
        res.status(constants.INT_ERR_CODE).json(standardJSON.STDERR_JSON);
        console.log('End');
        return;
    });
    
    request.end();
});

//returns an xml of the specified .pdb
router.post('/requestxml/fromname', async(req,res) => {

    console.log('[/requestxml/fromname]:Incoming Post request');

    const post = new PostFromName({
        pdbname: req.body.pdbname,
        seq_sep: req.body.seq_sep,
        bond_control: req.body.bond_control,
        interaction_type: req.body.interaction_type,
        net_policy: req.body.net_policy,
        h_bond: req.body.h_bond,
        vdw_bond: req.body.vdw_bond,
        ionic_bond: req.body.ionic_bond,
        generic_bond: req.body.generic_bond,
        pication_bond: req.body.pication_bond,
        pipistack_bond: req.body.pipistack_bond,
        h_bond_angle: req.body.h_bond_angle,
        pication_angle: req.body.pication_angle,
        pipistack_normal_normal: req.body.pipistack_normal_normal,
        pipistack_normal_centre: req.body.pipistack_normal_centre
    });

    post.validate()
    .then(() => {
       
        const options = {
            hostname: "files.rcsb.org",
            method: 'GET',
            path: "/view/"+ post.pdbname
        }

        paramString = createParamString(req.body);

        const request = https.request(options, r => {

            console.log('\tRequest submitted to rcbs.org');
            console.log(`\tStatus code: ${r.statusCode}`);

            r.on('error', error => {
                console.log(error);
                res.status(constants.INT_ERR_CODE).json(standardJSON.STDERR_JSON);
                console.log('End');
                return;
            });

            str = '';

            if(r.statusCode == constants.NOT_FOUND_CODE){
                console.log('\tFile does not exist in rcbs.org');
                res.status(constants.NOT_FOUND_CODE).json(standardJSON.NOT_FOUND_JSON);
                console.log('End');
            }else if(r.statusCode == constants.SUCCESS_CODE){
                console.log('\tGetting file from rcbs.org');
                r.setEncoding('utf8');
                r.on('data', chunk => {
                    str += chunk;
                })
                .on('end', function() {
                    console.log('\tFile obtained correctly');
                    createRIN(str, res, post.pdbname, paramString);
                });
            }
        });

        request.on('error', error => {
            console.log(error);
            res.status(constants.INT_ERR_CODE).json(standardJSON.STDERR_JSON);
            console.log('End');
            return;
        });

        request.end();
    })
    .catch(error => {
        console.log(error.errors);
        res.status(constants.BAD_REQUEST_CODE).json({
            response: constants.ERR,
            error: {
                code: constants.BAD_REQUEST_CODE,
                message: error.errors
            }
        });
        console.log('End');
    });
});

//returns an xml of the specified .pdb from content
router.post('/requestxml/fromcontent', async(req,res) => {

    console.log('[/requestxml/fromcontent]:Incoming Post request');

    const post = new PostFromContent({
        pdbname: req.body.pdbname,
        content: req.body.content,
        seq_sep: req.body.seq_sep,
        bond_control: req.body.bond_control,
        interaction_type: req.body.interaction_type,
        net_policy: req.body.net_policy,
        h_bond: req.body.h_bond,
        vdw_bond: req.body.vdw_bond,
        ionic_bond: req.body.ionic_bond,
        generic_bond: req.body.generic_bond,
        pication_bond: req.body.pication_bond,
        pipistack_bond: req.body.pipistack_bond,
        h_bond_angle: req.body.h_bond_angle,
        pication_angle: req.body.pication_angle,
        pipistack_normal_normal: req.body.pipistack_normal_normal,
        pipistack_normal_centre: req.body.pipistack_normal_centre
    });

    post.validate()
    .then(() => {
        paramString = createParamString(req.body);

        console.log('\tGetting file from the content field');
        createRIN(post.content, res, post.pdbname, paramString);
    })
    .catch(error => {
        console.log(error.errors);
        res.status(constants.BAD_REQUEST_CODE).json({
            response: constants.ERR,
            error: {
                code: constants.BAD_REQUEST_CODE,
                message: error.errors
            }
        });
        console.log('End');
    });
});

module.exports = router;