const constants = require("./constants");

module.exports = Object.freeze({
    STDERR_JSON: {
        response: constants.ERR,
        error: {
            code: constants.INT_ERR_CODE,
            message: constants.INT_ERR
        }
    },

    NOT_FOUND_JSON: {
        response: constants.ERR,  
        error: {
            code: constants.NOT_FOUND_CODE,
            message: constants.FILE_NOT_EXIST
        }
    },

    FILE_EXISTS_JSON: {
        response: constants.SUCC, 
        data: {
            code: constants.SUCCESS_CODE,
            message: constants.FILE_EXISTS
        }  
    },

});