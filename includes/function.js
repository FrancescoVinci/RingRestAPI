const fs = require('fs')
const lockFile = require('lockfile');
const constants = require('./constants');
const standardJSON = require('../includes/standardJSON');
var execFileSync = require("child_process").execFileSync;
var spawnSync = require("child_process").spawnSync;
const { param } = require('../routes/api');


module.exports = async function(){

    //creates an array of parameters to pass to the exe
    this.createParamString = function(params){

        paramString = [];
        if(params.hasOwnProperty('seq_sep')){
            paramString.push('--seq-sep', params.seq_sep);
        }
        if(params.hasOwnProperty('bond_control')){
            paramString.push('--bond-control', params.bond_control);
        }
        if(params.hasOwnProperty('interaction_type')){
            paramString.push('--interaction-type', params.interaction_type);
        }
        if(params.hasOwnProperty('net_policy')){
            paramString.push('--net-policy', params.net_policy);
        }
        if(params.hasOwnProperty('h_bond')){
            paramString.push('--h-bond', params.h_bond);
        }
        if(params.hasOwnProperty('vdw_bond')){
            paramString.push('--vdw-bond', params.vdw_bond);
        }
        if(params.hasOwnProperty('ionic_bond')){
            paramString.push('--ionic-bond', params.ionic_bond);
        }
        if(params.hasOwnProperty('generic_bond')){
            paramString.push('--generic-bond', params.generic_bond);
        }
        if(params.hasOwnProperty('pication_bond')){
            paramString.push('--pication-bond', params.pication_bond);
        }
        if(params.hasOwnProperty('pipistack_bond')){
            paramString.push('--pipistack-bond', params.pipistack_bond);
        }
        if(params.hasOwnProperty('h_bond_angle')){
            paramString.push('--h-bond-angle', params.h_bond_angle);
        }
        if(params.hasOwnProperty('pication_angle')){
            paramString.push('--pication-angle', params.pication_angle);
        }
        if(params.hasOwnProperty('pipistack_normal_normal')){
            paramString.push('--pipistack-normal-normal', params.pipistack_normal_normal);
        }
        if(params.hasOwnProperty('pipistack_normal_centre')){
            paramString.push('--pipistack-normal-centre', params.pipistack_normal_centre);
        }
        return paramString;
    }

    //creates the .pdb input file and passes it to the .exe with parameters, then deletes the created files
    this.createRIN = function(content, res, pdbname, paramString){

        lockFile.lock(constants.PATH_TO_INPUT + pdbname, function (er) {

            //creates a pdb file at the specified path
            console.log('\tCreating ' + pdbname+'...');

            try{
                fs.writeFileSync(constants.PATH_TO_INPUT+pdbname, content);
            }catch(error){
                console.log(error);
                res.status(constants.INT_ERR_CODE).json(standardJSON.STDERR_JSON);
                console.log('End');
                return;
            }
            console.log('\tCreated '+pdbname);

            console.log('\tRunning reduced...');

            try{
                resultred = spawnSync(constants.PATH_TO_REDUCE, [constants.PATH_TO_INPUT+pdbname], {maxBuffer: 1024 * 3072});
                fs.writeFileSync(constants.PATH_TO_REDUCEPDB+pdbname, resultred.stdout);
            }catch(error){
                console.log(error);
                res.status(constants.INT_ERR_CODE).json(standardJSON.STDERR_JSON);
                console.log('End');
                return;
            }
            
            console.log('\tExecuted successfully');     

            //concatenates the various parameters
            paths = ['-l', constants.PATH_TO_LOG, '-o', constants.PATH_TO_OUTPUT+pdbname+'.xml'];
            params = paths.concat(paramString);
            params.push(constants.PATH_TO_REDUCEPDB + pdbname);

            console.log('\tArgs pass to exe: ' + params);

            //pass everything to the exe and execute 
            console.log('\tRunning exe...');

            try{
                result = execFileSync(constants.PATH_TO_RING, params);
            }catch(error){
                console.log(error);
                res.status(constants.BAD_REQUEST_CODE).json({
                    response: constants.ERR,
                    error: {
                        code: constants.BAD_REQUEST_CODE,
                        message: error.message
                    }
                });
                console.log('End');
                return;
            }

            console.log('\tExecuted successfully');
            
            //inserts the output of the exe into xmldoc
            try{
                xmldoc = fs.readFileSync(constants.PATH_TO_OUTPUT+pdbname+'.xml');
            }catch(error){
                console.log(error);
                res.status(constants.INT_ERR_CODE).json(standardJSON.STDERR_JSON);
                console.log('End');
                return;
            }

            try{
                log = fs.readFileSync('./RinG/logs/main.txt');
            }catch(error){
                console.log(error);
                res.status(constants.INT_ERR_CODE).json(standardJSON.STDERR_JSON);
                console.log('End');
                return;
            }
        
            // delete the files created
            console.log('\tDeleting residual files...');
            try{
                fs.unlinkSync(constants.PATH_TO_INPUT+pdbname);
                console.log('\tDeleted '+pdbname);

                fs.unlinkSync(constants.PATH_TO_OUTPUT+pdbname+'.xml');
                console.log('\tDeleted '+pdbname+'.xml');

                fs.unlinkSync(constants.PATH_TO_REDUCEPDB+pdbname);
                 console.log('\tDeleted '+pdbname);
                
                fs.unlinkSync(constants.PATH_TO_LOG+'/'+constants.FILE_LOG_NAME);
                console.log('\tDeleted main.txt in logs directory');

            }catch(error){
                console.log(error);
                res.status(constants.INT_ERR_CODE).json(standardJSON.STDERR_JSON);
                console.log('End');
                return;
            }

            //send result
            console.log('End');
            res.status(constants.SUCCESS_CODE).json({
                response: constants.SUCC,
                data: {
                    code: constants.SUCCESS_CODE,
                    message: constants.PROCESS_SUCC,
                    log: log.toString(),
                    xml: xmldoc.toString()
                }
            });
            return;
        }); 
    }
}