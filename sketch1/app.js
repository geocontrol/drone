var twitter = require('ntwitter');
var play = require('play');
var fs = require("fs");
var lame = require("lame");
var Speaker = require("speaker");
	
var twit = new twitter({
  consumer_key: '4O1kSBVL1yafz4VAWF6Hw',
  consumer_secret: 'neg1SGatR6L6Zc9SnJG1HNpXEt3GAh9TA2IsHxw',
  access_token_key: '5791-Cm4btdK1W8lJJohhL2ItlhqSmBwDGJaIzdf4Xy5rPoAyP',
  access_token_secret: 'o5nKJ6Ax1KuudW0bP7pukL4okfe83ZHi7KkT8Tc2ukybM'
});

fs.createReadStream('./sounds/drone_demo_01.mp3')
  .pipe(new lame.Decoder)
  .on('format', console.log)
  .pipe(new Speaker);

twit.stream('statuses/filter', {'follow':'904137332'}, function(stream) {
//twit.stream('statuses/filter', {'follow':'5791'}, function(stream) {
  stream.on('data', function (data) {
    console.log(data);
	play.sound('./sounds/ky57.wav', function(){
		console.log('Playing Interrupt Sound');
	});
  });
  stream.on('end', function (response) {
    // Handle a disconnection
  });
  stream.on('destroy', function (response) {
    // Handle a 'silent' disconnection from Twitter, no end/error event fired
  });
  // Disconnect stream after five seconds
  //setTimeout(stream.destroy, 1000);
});

