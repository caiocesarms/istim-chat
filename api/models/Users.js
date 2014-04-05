/**
 * User
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {
    attributes: {

        /*username: {
            type: 'string',
            required: true,
            unique: true
        },*/
        username: {
            type: 'string',
            required: true,
            unique: true
        },

        password: {
            type: 'string',
            required: true
        },

        status: {
            type: 'string',
            defaultsTo: 'offline'
        },

        friendList: {
            type: 'array',
            defaultsTo: new Array()      
        },
        
        friendsRequest: {
            type: 'array',
            defaultsTo: new Array()
        },

        getStatus: function() {
            return this.status;
        }
    }
    
};
