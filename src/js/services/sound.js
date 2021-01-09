const rootUrl = 'http://js.local:8888/tree/dist/audio/';

const sound = function (src) {
  this.sound = document.createElement('audio');
  this.sound.src = rootUrl + src;
  this.sound.setAttribute('preload', 'auto');
  this.sound.setAttribute('controls', 'none');
  this.sound.style.display = 'none';
  document.body.appendChild(this.sound);

  this.play = function() {
    this.sound.play();
  }

  this.stop = function() {
    this.sound.pause();
  }
}

export default sound;
