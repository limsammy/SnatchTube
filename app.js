const dotenv = require('dotenv');
dotenv.load();

const YouTube = require('simple-youtube-api');
const YoutubeMp3Downloader = require("youtube-mp3-downloader");
const pry = require('pryjs');

const YD = new YoutubeMp3Downloader({
  "ffmpegPath": "/usr/local/Cellar/ffmpeg/3.4.2/bin/ffmpeg",
  "outputPath": "./exports",
  "youtubeVideoQuality": "highest",
  "queueParallelism": 2,
  "progressTimeout": 2000
});

const youtube = new YouTube(process.env.API_KEY);

function snatchPlaylist(playlist_url) {
  youtube.getPlaylist(playlist_url)
    .then(playlist => {
      console.log(`The playlist's title is ${playlist.title}`);
      playlist.getVideos()
        .then(videos => {
          console.log(`This playlist has ${videos.length === 300 ? '300+' : videos.length} videos.`);
          videos.forEach(function(element) {
            snatchMp3(element.id);
          });
        })
        .catch(console.log);
    })
    .catch(console.log);
};

function snatchMp3(video_id) {
  //Download video and save as MP3 file
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

snatchPlaylist('https://www.youtube.com/playlist?list=PLJKDxKDJBeYnen4wYXDY8jhlcZsDAsaT6')