const mongoose = require('mongoose');
const constants = require('../includes/constants');
const regexpPDB = /^[\w\-_\s]+.pdb$/;
const regexpINT = /^\+?\d+$/;

//create a json schema for xml requests by name
//and specifies the type of fields.
//Also attaches functions for validation.
const PostSchemaFromName = mongoose.Schema({
    pdbname: {
        type: String, 
        validate: {
            validator: function(v){
                return v.match(regexpPDB);
            },
            message: props => `${props.value} ${constants.NOT_VALID_NAME}`
        },
        required: [true , constants.FILE_NAME_REQ]
    },
    seq_sep: {
        type: Number,
        validate: {
            validator: function(v){
                return regexpINT.test(v);
            },
            message: props => `${props.value} ${constants.NOT_VALID_NUM}`
        },
        min: [constants.MIN_SEQ_SEP, `${constants.MIN_MESSAGE_UINT} ${constants.MIN_SEQ_SEP}`],
        max: [constants.MAX_LIMIT, constants.MAX_MESSAGE_UINT]
    },
    bond_control: {
        type: String, 
        enum: constants.BOND_CONTROL
    },
    interaction_type: {
        type: String, 
        enum: constants.INTERACTION_TYPE
    },
    net_policy: {
        type: String, 
        enum: constants.NET_POLICY
    },
    h_bond: {
        type: Number,
        min: [constants.MIN_H_BOND, `${constants.MIN_MESSAGE} ${constants.MIN_H_BOND}`],
        max: [constants.MAX_LIMIT, constants.MAX_MESSAGE]
    },
    vdw_bond: {
        type: Number,
        min: [constants.MIN_VDW_BOND, `${constants.MIN_MESSAGE} ${constants.MIN_VDW_BOND}`],
        max: [constants.MAX_LIMIT, constants.MAX_MESSAGE]
    },
    ionic_bond: {
        type: Number,
        min: [constants.MIN_IONIC_BOND, `${constants.MIN_MESSAGE} ${constants.MIN_IONIC_BOND}`],
        max: [constants.MAX_LIMIT, constants.MAX_MESSAGE]
    },
    generic_bond: {
        type: Number,
        min: [constants.MIN_GENERIC_BOND, `${constants.MIN_MESSAGE} ${constants.MIN_GENERIC_BOND}`],
        max: [constants.MAX_LIMIT, constants.MAX_MESSAGE]
    },
    pication_bond: {
        type: Number,
        min: [constants.MIN_PICATION_BOND, `${constants.MIN_MESSAGE} ${constants.MIN_PICATION_BOND}`],
        max: [constants.MAX_LIMIT, constants.MAX_MESSAGE]
    },
    pipistack_bond: {
        type: Number,
        min: [constants.MIN_PIPISTACK_BOND, `${constants.MIN_MESSAGE} ${constants.MIN_PIPISTACK_BOND}`],
        max: [constants.MAX_LIMIT, constants.MAX_MESSAGE]
    }
});

module.exports = mongoose.model('PostFromName', PostSchemaFromName);
