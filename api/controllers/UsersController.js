/**
 * UsersController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {

    userlist: function (req, res){
        res.view('main/users');
    },
    
  getFriends : function (req, res) {
      var username = req.param('username'); // required parameters
      
      if(!username) {
        return res.send(400,"Username Is Required");
      } else {
           
        Users.findOneByUsername(username).done( 
            function sendListOfFriends( err, u ) {
                
                if(!u){
                    return res.send(404,"User Not Found");
                }else{
                    return res.send(200,u.friendList);
                }
            }
        );
          
      }
  },
    
  addFriend : function (req, res) {
    
      var username = req.param('username');
      var newfriend = req.param('newfriend');
      
      if(!username && !newfriend){
        return res.send(400,"Username And New Friend Are Riquired");
      } else if(!username) {
        return res.send(400,"Username Is Riquired");
      } else if(!newfriend){
        return res.send(400,"New Friend Is Riquired");
      }else{
          
              Users.findOneByUsername(username).done( function (err, usr) {          
                  if(!usr){
                    return res.send(404, "Username Not Found");
                  }else{
                      var position = usr.friendList.length;
                      var haveThisFriend = false;

                      for(var i = 0; i < usr.friendList.length; i++){
                        if(usr.friendList[i] == newfriend){
                            haveThisFriend = true;
                        }
                      }

                      if(haveThisFriend){ // User already has this friend
                         return res.send(200,"User Already Has This Friend");
                      } else { 
                          usr.friendList[position] = newfriend; // add
                          usr.save(function (err) { //save changes made in the users
                            if (err) {
                                return res.send(500,"Error Save");
                            }
                          });

                          return res.send(200,"OK");
                      }
                  }
                });
                  
            }
  },
    
    getStatus : function (req, res) {
        var username = req.param('username');
        
        if(!username){
             return res.send(400,"Username Is Riquired");
        }else{
            Users.findOneByUsername(username).done( function (err, usr) {
                if(!usr){
                   return  res.send(404,"User Not Found");
                }else{
                   return  res.send(200, usr.status);
                }
            });
        }
    },
    
    setStatus : function (req, res) {
        var username = req.param('username');
        var status = req.param('status');
        
        if(!username){
            return res.send(400,"Username Is Riquired");
        }else if(!status){
            return res.send(400,"Status Is Riquired");
        }else{
            Users.findOneByUsername(username).done(
                function(err, usr){
                    if(!usr){
                       return res.send(404,"User Not Found");
                    }else{
                        if(status == "online" || status == "offline"){
                            usr.status = status;
                            usr.save(function (err) { //save changes made in the users
                                if (err) {
                                    return res.send(500,"Error save");
                                }
                            }); 
                            
                            return res.send(200,"OK");
                        }else{
                            return  res.send(400,"Invalid Status");
                        }
                    }
                }
            );
        }
    },
    
    
    getAllUsers : function (req, res) {
        
        var request = require('request');
        request('http://istim-user.nodejitsu.com/user', function (error, response, body) {
            if (!error && response.statusCode == 200) {
                res.send(200, JSON.parse(body));
            } else {
                res.send(404, 'recurso não encontrado');
            }
        });
        
        /* MANEIRA ANTIGA QUE ESTAVAMOS FAZENDO
        var http = require('http');
        
        var response = 'nothing';
        var url = 'http://istim-user.nodejitsu.com/user';
        
        http.get(url, function(res) {
            var body = '';

            res.on('data', function(chunk) {
                body += chunk;
            });
            
            res.on('end', function() {
                response = JSON.parse(body);
                console.log("Got response: ", response);
            });
        }).on('error', function(e) {
            console.log("Got error: ", e);
        });
        console.log("Got response: ", response);*/
    }
};