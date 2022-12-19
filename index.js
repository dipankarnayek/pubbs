const functions = require('firebase-functions');
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
app.use(express.json()); //To use post data need to send data from android as body (Receive json as input in request.body)
//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.json());
app.use(bodyParser());
var url = require('url');
//Import Admin SDK. It will help in using firebase 
var admin = require('firebase-admin');
const { request } = require('http');
const { json } = require('body-parser');
const { count, Console } = require('console');
const { resolve } = require('path');
const { rejects } = require('assert');

const PORT = process.env.PORT || '5000';
/*const config = functions.config().firebase
admin.initializeApp(config);*/



var serviceAccount = {
    "type": "service_account",
    "project_id": "iitpubbsuser",
    "private_key_id": "de79f06024fd5b16dc50a7ffe9cae1050d5591cf",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDlGNqTMOOODkxE\niQgD0j5pu2Me2eSrEwt/AN8kprUF60NYj8yDQeMqUxjOSst+HGUUsHVyrkwGFTyy\nN46g3MUU8edqvpJzpTjtnZonaNKSNCRXBOtzII8RAI1vlT2qowiKRbewmitG2oHo\nnytltKf59HedyepKpRCyH+Itd/kaBS5vtCypOBCb8M7mRwBgctIXtJVog766mXfj\nd+SOSUxuv4sMFZtFv1bZGOn7Nx6dFt2uRsWsh2RfxRq2W1pDX+pmS1qI+mx6jJoo\nCq/HwpFAf5wlcliCbCXgxpEXfx8K+OkazRzOT88yw8MzAeoMZel7FYusBZxd5Sm3\n+K5Yw2GLAgMBAAECggEAa1XOqmGga6D1SLLvB2NMjJsX4I9z3FcK7tEIuxJEA+bq\n4aZVyjVnaiAOojBW0Noa3aujCzzwL3Vpv5HaCDIHQD3qD5AD65zAZEuPuuEYrxkw\n4XhTm9foT63zlhDVGIpT6PyrCFni5spfTQ6t9XPDs48/L7U3SQu3G81mWak5E1/x\nCLI9X2NxmR8cXZw+O6CQXjrBFylSHikLMegoy8Tn8d20s56SvxjDCv9FqtFRPDAT\nC7iOx3EPnrgSYeuHAHHwMCcBTWeRRxlk/4WR9QHZhH26YZjDbqTPvk6nrQvnLOw1\nLQ3DpnAwRpE0y4Yp8UhCZgpfzOqaYSQ//XMfBFnuaQKBgQD6Y7cYoQX7PaL7mT20\nAEga36uwci1tNWqfvMXp6xBd0kSUnxRJY+5H87z9aImCopqCVyeuzKc8Gencuegu\ny6q7mTgnSPND8SyBSkO/3+MjWzthhz+Qmz/QWTTlPVSFNGpbnl0CVnV2uAu4k9UP\nEvtuX7ow5TsHgRdcorV3f6sQvQKBgQDqOwA80DhHPO6KniVWnXTxkvhEVaN8tDil\nayAtUBv6iR+wNJmu0EU/QUBWpAMCRjH1zyIi/R/jTsWMH9Wm4Mr613QV23reE/qn\ntjYcx/va/voebS56gOVt+U34wkiDgO/VKz2MPz5HtwLREAW3OEL4+4Soz+z+7t/I\npmp0W4JT5wKBgH7gsnIHflluRT1KzIp+rgr4Fi7l3ID/VVU2Oe+rjnKMTvYkmgoK\nWj8ZkkWyiCOrM7IiadhYmdGJrAiOJ8o2qABBxsOZYrOl7RBiymvbDmTnIPLtrtce\n5Do2SehzqHWLNu3QFH9PwlvzLPVN6+OkkcW/OkD2l2/ZCTaGuH+iMNPdAoGBAJyd\nDq+a2cZoK2dsDrM3XPYZuv6V9FZxel7AnicuJUcDYLjEsu18PJDq5EYKLCjdHpKp\nCL40WZn3FYd30bdfHtlSLkBfHGxZF4QEBXKBFRl822h0wFsQzFcYFtZ5sVqcX8A8\nxU59CvuQlsWK3QeBCubH5g+p12Et/1t+Sje66A2JAoGBANOvIuNRPcJGNR8C4+qx\nfo1O1k+L/vxYBbNPXLoJTBIiN4EtZBy6TZMV1bqGqXagNlvJ0YDwCHh2Zjga7u0a\nengr5dtq5RUhL+HnG9NBdm2pkXK0cVSqM30s5cVw5xupLZztCFmO9yxunA1iBV9S\nqiO3aSI2qAQIY2znuIAs5FoW\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-oumb3@iitpubbsuser.iam.gserviceaccount.com",
    "client_id": "108027446818473426038",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-oumb3%40iitpubbsuser.iam.gserviceaccount.com"
  };
  
/*var serviceAccount = {
    "type": "service_account",
    "project_id": "iitpubbs-testing",
    "private_key_id": "837f26f1f0d4c5ae1d92ba16e8cbb7ccd20caaef",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDS4+p1buHtOJUK\nwXTP3tDOIheerDG6TttxXm6X29aFcvNFEWbDe3yHZ0aXOzzuQyO8eIDAhHJG+qEl\n2TzB9HJUR7Gge9pmbNazZpH+whR3Ht8IZAV0ybhMa+ZxyQyK0Uyd0NxFddR7xw4+\n0TgHCrm0pBYLQ8ACXn+/VkNBt1YXbWoX+gKdSAHWffqzPFQnZhl/2pRwToOMNnu4\nMeuI5vGEC7YNAnqosUBm6YImn9hTH+H0b/Zju6JjKao/iNCYY24m6bk06tDa7IXx\n8CJQciff3edbYTmh2fLzQLtAjNyvpqtlCVcBQc/ECBNPWUBi8peiYHbgqnoyAFdx\nzJlqRwbNAgMBAAECggEAPxvtYc8Y1QCFuX5DEqG/IrCZGOa2yuYmTTrRJain/a90\nlUqr0fv2PB7vxPn5NePpodD91p7MA+mkp8rmn7QjMo1x3nCx3szbQzyCnBZAQZV/\ncOddqqFjAZuYjpx3oGMZ5nBGOpMUTyY2YR4DAjh3clNYNW7E2vCkkgGihtvya3fL\nHVXWrkMXrQDL7QBczGKpzJURxVGQcdeksrduolDxwHYGF5PG7jgmgOhGIcP7486t\nZVkoepk+ln1y8Q8rEzcmSkj4jEIX2TzzG1lja2cDYv5f/H1NeJcZI10ZFUIejbPQ\nh10+8KezM6Bum9aLtJMt1X/dAFRLsYn31cxYlHw/kQKBgQD9Y+bg5tnn1EaWZXAR\n5k8D/YDZ4aoYq//yHEk2e8CFkyhz/qwE7j74PWNPdk2+iak5Ki1EvOyTCQ7OGYTd\nSfGR0RSCEgebofIeCG4C3mZTEizocaCIKZQ9ztJUXPQUG7VYKyhPd5IZON6GKpnd\n0SGa6OoC6le1SUQ9JUWUzI0MNwKBgQDVD/UBLsH7g9rbvl193yVPRDtcwGjshz21\nsrlv2K581vDaLv+mNUNins93HQAa1X2+nWBTuUULs1YaWoOb+ayUoNH+UARp92Nm\nz9AlIFp60Hzmi2MaIczdQw0SOJwgqddYnV+q/eC+LOw5Y/ZfB9UHQzsAhFNX3VSm\npnzo7rKrGwKBgA4pmkrxvDYv8C4Rx1zIwZvYfG4xJb+xRWHz4MexzQXqPrWVA2pX\nIp/fVoCnfRrsONAgIl2YLaTeObydQobXzi+3Pu0yMsipGY5CLFvusEtuVaI8T5us\nr0NxHuJmO6IwFkeySdN/PGQ6gH2BPg5e1QECianWDUbtrGm6fpQdhrirAoGABSjM\nwwmR0vhfbWDPvMORkLjTQyy5nbisquC4EthJaWZ/EJmAwVKa3iGAXp8KKJww3lPL\nSFu9K0pddGfqtfU206aNTz46zSIbexrfLHb7GexAigioDrLw1g7QmzdZuITEXTX6\nYhahwZku4zjjd2umIfXj0OBjcEZAzYRMlAtrsi8CgYB8/SQL3HA4hXJ4QJqtWBL/\n+aZSPdcFLiBlweil9j/l8B4Q+hpZJcRZlBFHUVszVzrwaBPTBSSDOALL39p7tSmX\nZ4CENwhUeXewDWxzMHbp5HOCPiq+ct6/3u7gmu1PzjyRRmbYAnnSt/G627Un6ot6\nlRagUg+ZtzHXmryeXNi0SQ==\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-zkrjt@iitpubbs-testing.iam.gserviceaccount.com",
    "client_id": "101783971908790132454",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-zkrjt%40iitpubbs-testing.iam.gserviceaccount.com"
  };*/
 /* var serviceAccount = {
    "type": "service_account",
    "project_id": "iitpubbs-de1cc",
    "private_key_id": "f66559ef34ed512f36c856a3d877ebb16368b171",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDGt1V8YZR+95rZ\nUygoefQh7hBLJyFYybhOgO+3QPolJ4dIA0eYy67zyij69DJ1u+LU/PqZxA/UQpoH\nWmrpp8tdj5qi/h7VhC57tC6i1psGwl8FiwuQtIvf4ngNd4Q5n2KFOmwJy1WLvJRI\nIIGm33qpNdj2ZLOMreacKcq1kWTI1e4S4A//yVODN4ogBaleCfCBcpVhDDqcVM9X\nz/2Act7NhOUBdNFe3I1t/1s6ChIYG9DUBnDFSzw7OiIwUkWtgODMrgPLmAsQsq0J\nNz+JxIuKlsKinuN/16jmQtBAut6XEYl7KRMFEqraLK1G50C43tS+XX0kw44m0vZ3\nQJVoS6lPAgMBAAECggEADX2s5BY2iq2CFHcSJuKrXGeuhiul6+07V2O8N+jFaCMC\n4DS4y6V9vzdeXjXt/GhBF3dasXh0yqhVj2I9bUI4YFBmOI1Kx/GCu7Xuj0eanB7e\nF0uVVsGrLWFRXTixVWgovCV3PZhRunxBuj6FZDA6l6T8PIjMV89b9LDcU5oHXvW9\nxopm5Kyy0uZgptfhaqwUvEZjKQSYssuDAZp6/NkAE8qa0BLgTafLrfxKORmBauR1\nyGibyLjTjgU+z3Xz65GZ2WGCvAF/MMwjYXkyp4mD8+7n0mrauOaDsHO5suzNBRDj\nZ0LyDJGvKGgg/ErY6pjMQaKDUpAKtNrQZUkfmCFoAQKBgQD2avYpYzJBkkiTPWoK\nXYs28Y76SH5UvyJ1YiRI/Jk+Wu2DgNk6xeDKD6d85YgG22OnQs3CBw3ni38FV8Du\n+/xpgD64EZyZnVA+0c4tuVcVgcogwYrhHqZoTpT4vDMzCOLxLBchMwOIOMwmDdGL\n9AeV6fsQLZeNZ+f1OadKewV5AQKBgQDOcYMYm083Zsa26SzAiICZoL2CvAycLORh\npM27nI2gBLvTCnH8mUjcvFJVPG9VeZmq3ByX9XCPl/rQx7kc6m37xK9YwfKDgBTI\nuZBDj3CPHR4x86SNeqrjrDIhFsJv/k6ilIQZR8GXbLboFy+kpvn8ozQwEXH4o5ix\nmqTnH9lSTwKBgEpGT1CGT92n5CxNdKsPKykygnA6banJuu8618kQKni7G6BptBCd\nGHaPZWKmJOw8MLt3zWFQkwZZ672Gh+cBGUILn9wHovZCjq+Aue7aUL9w0aYx8FSO\n0oXaOdkHkT8uzIj5Szd8kvH6fL5zp9fRhH/ReRWVSHsc+LPX3u76SdoBAoGBAKvG\nMaHQ4OolP2VEwbL2IaMy510XoZp1lBZXLcRUsFcceThR8aSP2tuoaw13OuAxTRap\nDbW3SNCCUfVUqgeQXLFn58r/ng2jDigylwJQIQVD4jMIGryJ/BVy20dDC8hqHv4S\ne5QZa9DWaZ7WZBMpyMpY9fylF2MepNfq6BlUG9zrAoGAKLsFVVkff3ibAEGXGzpm\n/b0ewL56mwSvfm5qOKGVomQOHRwKM23HUYH0qlxdnqoy+WnHGADDxsSbuEvh/CnK\nfdhugvQpiGyxEg9PMuxvtZ0NF4cyK3o9/nqu9Xl1L3ez4noOY83dA8jwvZaHOQiL\nHDLOyGGMgay87lg7NwBzzFA=\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-mj244@iitpubbs-de1cc.iam.gserviceaccount.com",
    "client_id": "107976362579132522096",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-mj244%40iitpubbs-de1cc.iam.gserviceaccount.com"
  }*/
  
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://iitpubbsuser.firebaseio.com" //"https://iitpubbs-de1cc.firebaseio.com"//"https://iitpubbsuser.firebaseio.com" //https://iitpubbs-testing.firebaseio.com
  });

 
  app.get("/",(req, res) => {
      res.send("Hello from pubbs server hit main Database updated");
  })
  app.get("/insertLock",(request,response)=>{
    try{
        var urldata = url.parse(request.url, true).query;
        var ref = admin.database().ref("PubbsIITKgp/Bicycle/"+urldata.lockId) || admin.database().ref("PubbsTesting/Bicycle/"+urldata.lockId);
        ref.update({
            lockId: urldata.lockId,
            status: 0,
            battery: 100
        });
        response.send({"status": "Successful"});
    }catch(err)
    {
        response.send({"status": err});
    } 
  });
  app.get("/connect",(request,response)=>{
    try{
        var urldata = url.parse(request.url, true).query;
        var ref = admin.database().ref("PubbsIITKgp/Bicycle/"+urldata.lockId) || admin.database().ref("PubbsTesting/Bicycle/"+urldata.lockId);
        ref.once("value",snapshot=>{
            if(snapshot.exists()){
                response.send({"status": "true"});
            }else{
                response.send({"status": "false"});
            }
        });
    }catch(err)
    {
        response.send({"status": err});
    }
  });
 
  app.get("/status", (request, response)=>{
      try{
        var urldata = url.parse(request.url, true).query;
        var ref = admin.database().ref("PubbsIITKgp/Bicycle/"+urldata.lockId) || admin.database().ref("PubbsTesting/Bicycle/"+urldata.lockId);
        if(urldata.value=="get"){
            ref.once("value", snapshot=>{
                response.send({
                    "status": snapshot.child("status").val()
                })
            });
        }else if(urldata.value=="update"){
            ref.update({
                status : urldata.status
            });
            response.send({"status": "Successful"});
        }
    }catch(err){
        response.send({"status": err});
    }
});

app.get("/operation", (request, response)=>{
    try{
        var urldata = url.parse(request.url, true).query;
        var ref = admin.database().ref("PubbsIITKgp/Bicycle/"+urldata.lockId) || admin.database().ref("PubbsTesting/Bicycle/"+urldata.lockId);
        if(urldata.value=="get"){
            ref.once("value", snapshot=>{
                response.send({
                    "operation": snapshot.child("operation").val()
               })
            });
        }else if(urldata.value=="update"){
            ref.update({
                operation : urldata.operation
            });
            response.send({"status": "Successful"});
        }
    }catch(err){
        response.send({"status": err});
    }
});


  app.get("/lockOperation",(request,response)=>{
    try{
        var urldata = url.parse(request.url, true).query;
        var ref = admin.database().ref("PubbsIITKgp/Bicycle/"+urldata.lockId) || admin.database().ref("PubbsTesting/Bicycle/"+urldata.lockId);
        if(urldata.value=="get"){
            ref.once("value", snapshot=>{
                if(snapshot.child("operation").val() === null && snapshot.child("status").val() === null && snapshot.child("battery").val()===null)
                response.send({
                    "status" : "error"
                })
                else response.send({
                    "operation": snapshot.child("operation").val(),
                    "status": snapshot.child("status").val(),
                    "battery": snapshot.child("battery").val()
                })
            });
        }
        else if(urldata.value=="update"){
            ref.update({
                operation : urldata.operation,
                status : urldata.status,
                batteryLevel : urldata.battery
            });
            response.send({"status": "Successful"});
        }
       
    }catch(err)
    {
        response.send({"status": err});
    }
  });

  app.get("/battery",(request,response)=>{
    try{
        var urldata = url.parse(request.url, true).query;
        var ref = admin.database().ref("PubbsIITKgp/Bicycle/"+urldata.lockId) || admin.database().ref("PubbsTesting/Bicycle/"+urldata.lockId);
        if(urldata.operation == "get"){
            ref.once("value", snapshot=>{
                response.send({"battery": snapshot.child("battery").val()});
            });
        }else if(urldata.operation == "update"){
            ref.child("battery").set(urldata.battery);
            response.send({"status": "Successful"});
        }
    }catch(err)
    {
        response.send({"status": err, "battery": 0});
    } 
  });

  
  app.get("/theft",(request,response)=>{
    try{
        var urldata = url.parse(request.url, true).query;
        var ref = admin.database().ref("PubbsIITKgp/Bicycle/"+urldata.lockId) || admin.database().ref("PubbsTesting/Bicycle/"+urldata.lockId);
        if(urldata.value=="get"){
            ref.once("value", snapshot=>{
                if(snapshot.child("theft").exists()){
                    response.send({
                        "theft":snapshot.child("theft").val()
                    });
                }else{
                    response.send({
                        "theft": "-1"
                    });
                }
            });
        }else if(urldata.value=="update"){
            ref.update({"theft": urldata.theft});
            response.send({"status": "Successful"});
        }
    }catch(err)
    {
        response.send({"status": err});
    } 
  });

//*********************************************** modify by dipankar***********************/
  app.get("/insertlocation",(request,response)=>{
    try{
        var urldata = url.parse(request.url, true).query;
        var ref = admin.database().ref("PubbsIITKgp/Bicycle/"+urldata.lockId) || admin.database().ref("PubbsTesting/Bicycle/"+urldata.lockId);
        if(urldata.value=="get"){
            ref.once("value", snapshot=>{
                if(snapshot.child("latitude").val() === null && snapshot.child("longitude").val() === null)
                response.send({
                    "status" : "error"
                })
                else response.send({
                    "latitude": snapshot.child("operation").val(),
                    "longitude": snapshot.child("status").val()
                   
                })
            });
        }
        else if(urldata.value=="update"){
            ref.update({
                latitude : urldata.latitude,
                longitude : urldata.longitude
    
            });
            response.send({"status": "Successful"});
        }
       
    }catch(err)
    {
        response.send({"status": err});
    }
  });

  const server = app.listen(PORT, function () {
    //console.log(`Listening on port ${PORT}`);
  });
  
