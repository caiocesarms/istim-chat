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

  /*create: function (req, res) {
      
      console.log("Entrou");
      
      var a = { username: "oiii", password: "foiii" };
      
      Users.create(a).done(function(err, ach) {
          console.log("Foii");
        return res.send(201, ach);
      });
      
      return res.send("okokok");
    
  },*/
    
/*Show users list with the angular*/
userlist: function (req, res){
    res.view('main/users');
},
    

/* Return the friend list of the user
 * the username is required */  
getFriends : function (req, res) {
  var username = req.param('username'); // required parameters

  if(!username) {
    return res.send(400,"Username Is Required");
  } else {
    // Find the user
    Users.findOneByUsername(username).done(  
        function sendListOfFriends( err, user ) {
            if(!user){ //User not Found
                return res.send(404,"User Not Found"); 
            }else{ // return the friend list of the user
                return res.send(200,u.friendList);
            }
        }
    );
  }
},
    

/* Request a friendship with the user 
 * Required a username and a username of the friend */    
friendsRequest : function (req, res) {

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
              
              Users.findOneByUsername(newfriend).done( function (err, usr){
                if(!usr){
                    return res.send(404, "Username Of Request Friend Not Found");
                }else{
                    
                    if(!FindInArray(usr.friendsRequest, username)){
                        var size = usr.friendsRequest.length;
                        usr.friendsRequest[size] = username;
                        
                         usr.save(function (err) { //save changes made in the users
                            if (err) {
                                return res.send(500,"Error Save");
                            }
                        });
                    }else{
                        return res.send(200,"User already has a request");
                    }
                     return res.send(200,"Request successful");   
                }
              });
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
    
    /* synchronize local users with users in userserver */
    updateUsers : function(req, res){
        var request = require('request');
        
        request('http://istim-user.nodejitsu.com/user', function (error, response, body) {
            if (!error && response.statusCode == 200) { 
                
                var listUsers = JSON.parse(body);
                
                for( var k = 0; k <  listUsers.length ; k++){
                   var a = new Object();
                   a.username = listUsers[k].email;
                   a.password = listUsers[k].password;
                   a.id = listUsers[k].id;
                   
                    Users.create(a).done(function(err, users){
                        if (error) {
                            // Set the error header
                            res.set('error', 'DB Error');
                            return res.send(500, { error: "DB Error" });
                        }
                    });
                }
                
                return res.send(200, listUsers);
                
            } else {
                return res.send(404, 'recurso não encontrado');
            }
        });
    },
    
    
    getAllUsers : function (req, res) {
        
        var request = require('request');
        request('http://istim-user.nodejitsu.com/user', function (error, response, body) {
            if (!error && response.statusCode == 200) {
                
                body = "{\"Users\":" + body + "}"; 
                
                var listUsers = JSON.parse(body);
                
                return res.send(200, listUsers);
                
            } else {
                return res.send(404, 'recurso não encontrado');
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

function FindInArray(array, target){
    
    for(var i; i <  array.length; i++){
        if(array[i] == target){
            return true;
        }
    }
    return false;
}