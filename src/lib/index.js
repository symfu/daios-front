var thrift = require('thrift');
var Calc = require('./DmsThriftServer');
var types = require('./hellos_types');

//console.log('11111111111',thrift.createConnection)
var connection = thrift.createConnection("192.168.1.254", 9999);
// //console.log(connection)
connection.on('error', function(err) {
  //console.log(err);
});

// Create a Calc client with the connection
var client = thrift.createClient(Calc, connection);

client.heartBeatConn( 10, function (err, response) {
  //console.log("1+1=" + response);
});

