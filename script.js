const nowPlaying = document.querySelector('.now-playing');
const trackArt = document.querySelector('.track-art');
const trackName = document.querySelector('.track-name');
const trackArtist = document.querySelector('.track-artist');

const playPauseBtn = document.querySelector('.playpause-track');
const nextBtn = document.querySelector('.next-track');
const prevBtn = document.querySelector('.prev-track');

const seekSlider = document.querySelector('.seek_slider');
const volumeSlider = document.querySelector('.volume_slider');
const currTime = document.querySelector('.current-time');
const totalDuration = document.querySelector('.total-duration');
const wave = document.getElementById('wave');
const randomIcon = document.querySelector('.fa-random');

const currTrack = document.createElement('audio');

let trackIndex = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

const musicList = [
   {
      img: 'images/fallingdown.jpeg',
      name: 'Falling Down',
      artist: 'Wid Cards',
      music: 'music/fallingdown.mp3',
   },
   {
      img: 'images/faded.png',
      name: 'Faded',
      artist: 'Alan Walker',
      music: 'music/Faded.mp3',
   },
   {
      img: 'images/ratherbe.jpeg',
      name: 'Rather Be',
      artist: 'Clean Bandit',
      music: 'music/Rather Be.mp3',
   },
   {
      img: 'images/stay.png',
      name: 'Stay',
      artist: 'Justin Bieber',
      music: 'musiC/stay.mp3',
   },
];

loadTrack(trackIndex);

function loadTrack(trackIndex) {
   clearInterval(updateTimer);
   reset();

   reset();

   currTrack.src = musicList[trackIndex].music;
   currTrack.load();

   trackArt.style.backgroundImage = `url(${musicList[trackIndex].img})`;
   trackName.textContent = musicList[trackIndex].name;
   trackArtist.textContent = musicList[trackIndex].artist;
   nowPlaying.textContent = `Playing ${trackIndex + 1} of ${musicList.length}`;

   updateTimer = setInterval(setUpdate, 1000);

   currTrack.addEventListener('ended', nextTrack);
   randomBgColor();
}

function randomBgColor() {
   let hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'c'];
   let a;

   function generateColor(a) {
      for (let i = 0; i < 6; i++) {
         let x = Math.round(Math.random() * 14);
         console.log(x);
         let y = hex[x];
         a += y;
      }

      return a;
   }

   let color1 = generateColor('#');
   let color2 = generateColor('#');
   let angle = 'to right';

   let gradient = `linear-gradient(${angle}, ${color1}, ${color2})`;
   document.body.style.background = gradient;
}

function reset() {
   currTime.textContent = "00:00";
   totalDuration.textContent = "00:00";
   seekSlider.value = 0;
}

function randomTrack() {
   isRandom ? pauseRandom() : playRandom();
}

function playRandom() {
   isRandom = true;
   randomIcon.classList.add('randomActive');
}

function pauseRandom() {
   isRandom = false;
   randomIcon.classList.remove('randomActive');
}

function repeatTrack() {
   let currentIndex = trackIndex;
   loadTrack(currentIndex);
   playTrack();
}

function playPauseTrack() {
   isPlaying ? pauseTrack() : playTrack();
}

function playTrack() {
   currTrack.play();
   isPlaying = true;
   trackArt.classList.add('rotate');
   wave.classList.add('loader');
   playPauseBtn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
   currTrack.pause()
   isPlaying = false;
   trackArt.classList.remove('rotate');
   wave.classList.remove('loader');
   playPauseBtn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}

function nextTrack() {
   if (trackIndex < musicList.length - 1 && isRandom === false) {
      trackIndex += 1;
   } else if (trackIndex < musicList.length - 1 && isRandom === true) {
      let randomIndex = Number.parseInt(Math.random() * musicList.length);
      trackIndex = randomIndex;
   } else {
      trackIndex = 0;
   }

   loadTrack(trackIndex);
   playTrack();
}

function prevTrack() {
   if (trackIndex > 0 && isRandom === false) {
      trackIndex -= 1;
   } else if (trackIndex > 0 && isRandom === true) {
      let randomIndex = Number.parseInt(Math.random() * musicList.length);
      trackIndex = randomIndex;
   } else {
      trackIndex = musicList.length - 1;
   }

   loadTrack(trackIndex);
   playTrack();
}

function seekTo() {
   let seekto = currTrack.duration * (seekSlider.value / 100);
   currTrack.currentTime = seekto;
}

function setVolume() {
   currTrack.volume = volumeSlider.value / 100;
}

function setUpdate() {
   let seekPosition = 0;
   if(!isNaN(currTrack.duration)){
      seekPosition = currTrack.currentTime * (100 / currTrack.duration);
      seekSlider.value = seekPosition;

      let currentMinutes = Math.floor(currTrack.currentTime / 60);
      let currentSeconds = Math.floor(currTrack.currentTime - currentMinutes * 60);
      let durationMinutes = Math.floor(currTrack.duration / 60);
      let durationSeconds = Math.floor(currTrack.duration - durationMinutes * 60);

      if(currentSeconds < 10) {currentSeconds = "0" + currentSeconds; }
      if(durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
      if(currentMinutes < 10) {currentMinutes = "0" + currentMinutes; }
      if(durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

      currTime.textContent = currentMinutes + ":" + currentSeconds;
      totalDuration.textContent = durationMinutes + ":" + durationSeconds;
   }
}