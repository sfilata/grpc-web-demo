const {
  EchoRequest,
  EchoResponse
} = require('./echo_pb.js');
// import {EchoRequest, EchoResponse} from './echo_pb'
// import {EchoServiceClient} from './echo_grpc_web_pb'
const {
  EchoServiceClient
} = require('./echo_grpc_web_pb.js');

const echoService = new EchoServiceClient('http://localhost:8080');

const request = new EchoRequest();
request.setMessage('Hello, Sfilata');

echoService.echo(request, {}, function (err, res) {
  const [message, name] = [res.getMessage(), res.getName()];
  if (err) {
    console.log('Error occured!');
  }

  console.log(message, name)
  document.getElementById('content').innerHTML = `${message}. ${name}`
});