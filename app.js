const tubeToMp3 = require('youtube-mp3-downloader');
const google = require('googleapis');
const youtube = google.youtube('v3');
const secrets = require('./secrets.json');

function snatchMp3(video_id) {
  var YD = new YoutubeMp3Downloader({
    "ffmpegPath": "/usr/local/Cellar/ffmpeg/3.4/bin/ffmpeg",
    "outputPath": "./exports",
    "youtubeVideoQuality": "highest",
    "queueParallelism": 2 "progressTimeout": 2000 // How long should be the interval of the progress reports
  });

  YD.download(video_id);

  YD.on("finished", function(err, data) {
    console.log(JSON.stringify(data));
  });
  YD.on("error", function(error) {
    console.log(error);
  });
  YD.on("progress", function(progress) {
    console.log(JSON.stringify(progress));
  });
};

function snatchVideoId(playlist_id) {
  youtube.playlistItems.list({
    key: process.env.API_KEY,
    part: 'id,snippet',

  })
}

youtube.playlistItems.list({
  key: secrets.web.api_key,
  part: 'id,snippet',
  playlistId: 'PLvxLmGsmqdZc-GYVeLhS0N_6jfrzEleQm',
  maxResult: 10,
}, (err, results) => {
  console.log(err ? err.message : results.items[0].snippet);
});