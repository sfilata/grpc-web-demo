const PROTO_PATH = __dirname + '/echo.proto';

const assert = require('assert');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const packageDefinition = protoLoader.loadSync(
  PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  }
);

const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
const echo = protoDescriptor.grpc.gateway.testing;

/**
 * 
 * @param {!Object} call 
 * @returns {!Object} metadata
 */
const copyMetadata = (call) => {
  const metadata = call.metadata.getMap();
  const response_metadata = new grpc.Metadata();
  for (const key in metadata) {
    response_metadata.set(key, metadata[key]);
  }
  return response_metadata;
};

/**
 * 
 * @param {!Object} call 
 * @param {function():?} callback 
 */
const doEcho = (call, callback) => {
  console.log(call.request);
  callback(null, {
    // message: '123123123'
    message: call.request.message,
    name: 'sfilata'
  }, copyMetadata(call))
}

/**
 * Get a new server with the handler functions in this file bound to the
 * methods it serves.
 * @return {!Server} The new server object
 */
function getServer() {
  var server = new grpc.Server();
  server.addService(echo.EchoService.service, {
    echo: doEcho,
  });
  return server;
}

if (require.main === module) {
  var echoServer = getServer();
  echoServer.bindAsync(
    '0.0.0.0:9090', grpc.ServerCredentials.createInsecure(), (err, port) => {
      assert.ifError(err);
      echoServer.start();
    });
  console.log('The server is running!')
}

exports.getServer = getServer;