const dotenv = require('dotenv');
dotenv.load();

const YouTube = require('simple-youtube-api');
const YoutubeMp3Downloader = require("youtube-mp3-downloader");
const pry = require('pryjs');
var fs = require('fs');

const YD = new YoutubeMp3Downloader({
  "ffmpegPath": "/usr/local/Cellar/ffmpeg/3.4.2/bin/ffmpeg",
  "outputPath": "./exports",
  "youtubeVideoQuality": "lowest",
  "queueParallelism": 10,
  "progressTimeout": 20000
});

const youtube = new YouTube(process.env.API_KEY);

function snatchPlaylist(playlist_url) {
  youtube.getPlaylist(playlist_url)
    .then(playlist => {
      console.log(`The playlist's title is ${playlist.title}`);
      playlist.getVideos()
        .then(videos => {
          console.log(`This playlist has ${videos.length === 150 ? '150+' : videos.length} videos.`);
          for (var i = 0; i < videos.length; i++) {
            // eval(pry.it);
            if (!fs.existsSync(`./exports/${videos[i].title}.mp3`)) {
              let video_id = videos[i].id;
              snatchMp3(video_id);
            } else {
              console.log('==============')
              console.log('SKIPPED A SONG')
            };
          };
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
    console.log('THIS IS AN ERROR: ' + error);
  });

  // YD.on("progress", function(progress) {
  //   console.log(JSON.stringify(progress));
  // });
};

module.exports = {

};

// snatchPlaylist('https://www.youtube.com/playlist?list=PLJKDxKDJBeYnen4wYXDY8jhlcZsDAsaT6')
const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const inquirer = require('./lib/inquirer');

clear();
console.log(
  chalk.yellow(
    figlet.textSync('SnatchTube', {
      horizontalLayout: 'full'
    })
  )
);
console.log(
  chalk.yellow(
    'Get mp3s of a youtube playlist')
);

const run = async () => {
  const choice = await inquirer.promptUserForURL();
  // eval(pry.it);
  console.log(choice);
  snatchPlaylist(choice.choice);
};

run();

// snatchMp3('9eBfa9nNzvk');