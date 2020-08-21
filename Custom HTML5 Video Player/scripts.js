const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

function togglePlayPause() {
    const state = video.paused ? 'play' : 'pause';
    video[state]();
}

function updateButton() {
    const icon = video.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
}

function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
}

function updateRange() {
    video[this.name] = this.value;
}

function updateProgress() {
    const progressPercent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${progressPercent}%`;
}

function scrub(e) {
    video.currentTime = (e.offsetX / progress.offsetWidth) * video.duration;
}

video.addEventListener('click',togglePlayPause);
video.addEventListener('play',updateButton);
video.addEventListener('pause',updateButton);
video.addEventListener('timeupdate',updateProgress);

toggle.addEventListener('click', togglePlayPause);
skipButtons.forEach(button => button.addEventListener('click',skip));
ranges.forEach(range => range.addEventListener('change',updateRange));
ranges.forEach(range => range.addEventListener('mousemove',updateRange));

let mouseDown = false;
progress.addEventListener('click',scrub);
progress.addEventListener('mousemove', (e) => mouseDown && scrub(e));
progress.addEventListener('mousedown', () => mouseDown = true);
progress.addEventListener('mouseup', () => mouseDown = false);

