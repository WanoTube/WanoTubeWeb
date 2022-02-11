<template>
  <div class="pattern">
    <!-- <video class="video video-wrapper" id="video-element" muted src="../../assets/videos/LiuYu_Tiktok1.webm" type="video/mp4"> -->
    <!-- </video> -->
  </div>
</template>
<script>
export default {
  mounted() {
    let player = document.getElementById("video-element");
    let btnPlayPauses = document.getElementsByClassName("btnPlayPause");
    let btnPlayPause =
      btnPlayPauses[0].offsetWidth > 0 && btnPlayPauses[0].offsetHeight > 0
        ? btnPlayPauses[0]
        : btnPlayPauses[1];

    let btnPauses = document.getElementsByClassName("btnPause");
    let btnPause =
      btnPauses[0].offsetWidth > 0 && btnPauses[0].offsetHeight > 0
        ? btnPauses[0]
        : btnPauses[1];
    btnPauses[0].style.display = "none";
    btnPauses[1].style.display = "none";

    let progressBars = document.getElementsByClassName("slider");
    let progressBar =
      progressBars[0].offsetWidth > 0 && progressBars[0].offsetHeight > 0
        ? progressBars[0]
        : progressBars[1];

    let currentTimes = document.getElementsByClassName("current-time");
    let currentTime =
      currentTimes[0].offsetWidth > 0 && currentTimes[0].offsetHeight > 0
        ? currentTimes[0]
        : currentTimes[1];

    let durations = document.getElementsByClassName("duration");
    let duration =
      durations[0].offsetWidth > 0 && durations[0].offsetHeight > 0
        ? durations[0]
        : durations[1];

    let quickRestarts = document.getElementsByClassName("quickRestart");
    let quickRestart =
      quickRestarts[0].offsetWidth > 0 && quickRestarts[0].offsetHeight > 0
        ? quickRestarts[0]
        : quickRestarts[1];

    let rewinds = document.getElementsByClassName("rewind");
    let rewind =
      rewinds[0].offsetWidth > 0 && rewinds[0].offsetHeight > 0
        ? rewinds[0]
        : rewinds[1];

    let forwards = document.getElementsByClassName("forward");
    let forward =
      forwards[0].offsetWidth > 0 && forwards[0].offsetHeight > 0
        ? forwards[0]
        : forwards[1];

    let skipTracks = document.getElementsByClassName("skipTrack");
    let skipTrack =
      skipTracks[0].offsetWidth > 0 && skipTracks[0].offsetHeight > 0
        ? skipTracks[0]
        : skipTracks[1];
    btnPlayPauses[0].addEventListener("click", onClicked);
    btnPlayPauses[1].addEventListener("click", onClicked);

    btnPauses[0].addEventListener("click", onClicked);
    btnPauses[1].addEventListener("click", onClicked);
    player.addEventListener(
      "ended",
      function () {
        this.pause();
      },
      false
    );
    player.addEventListener("timeupdate", updateProgressBar, false);

    progressBars[0].addEventListener("click", seek);
    progressBars[1].addEventListener("click", seek);

    quickRestarts[0].addEventListener("click", stopVideo);
    quickRestarts[1].addEventListener("click", stopVideo);

    rewinds[0].addEventListener("click", rewindVideo);
    rewinds[1].addEventListener("click", rewindVideo);

    forwards[0].addEventListener("click", fastForwardVideo);
    forwards[1].addEventListener("click", fastForwardVideo);

    skipTracks[0].addEventListener("click", endVideo);
    skipTracks[1].addEventListener("click", endVideo);

    let startTime, endTime;
    window.addEventListener("resize", resizeDetected);
    function resizeDetected() {
      btnPlayPause =
        btnPlayPauses[0].offsetWidth > 0 && btnPlayPauses[0].offsetHeight > 0
          ? btnPlayPauses[0]
          : btnPlayPauses[1];
      btnPause =
        btnPauses[0].offsetWidth > 0 && btnPauses[0].offsetHeight > 0
          ? btnPauses[0]
          : btnPauses[1];
      progressBar =
        progressBars[0].offsetWidth > 0 && progressBars[0].offsetHeight > 0
          ? progressBars[0]
          : progressBars[1];
      currentTime =
        currentTimes[0].offsetWidth > 0 && currentTimes[0].offsetHeight > 0
          ? currentTimes[0]
          : currentTimes[1];
      duration =
        durations[0].offsetWidth > 0 && durations[0].offsetHeight > 0
          ? durations[0]
          : durations[1];
      quickRestart =
        quickRestarts[0].offsetWidth > 0 && quickRestarts[0].offsetHeight > 0
          ? quickRestarts[0]
          : quickRestarts[1];
      rewind =
        rewinds[0].offsetWidth > 0 && rewinds[0].offsetHeight > 0
          ? rewinds[0]
          : rewinds[1];
      forward =
        forwards[0].offsetWidth > 0 && forwards[0].offsetHeight > 0
          ? forwards[0]
          : forwards[1];
      skipTrack =
        skipTracks[0].offsetWidth > 0 && skipTracks[0].offsetHeight > 0
          ? skipTracks[0]
          : skipTracks[1];
    }

    function onClicked() {
      if (player.paused || player.ended) {
        let playPromise = player.play();

        if (playPromise !== undefined) {
          playPromise
            .then((_) => {
              player.muted = false;
              changeButtonType(btnPlayPauses[0], btnPauses[0]);
              changeButtonType(btnPlayPauses[1], btnPauses[1]);
            })
            .catch((error) => {
              alert(error);
            });
        }
      } else {
        let pausePromise = player.pause();
        changeButtonType(btnPauses[0], btnPlayPauses[0]);
        changeButtonType(btnPauses[1], btnPlayPauses[1]);

        if (pausePromise !== undefined) {
          pausePromise
            .then((_) => {
              player.muted = true;
            })
            .catch((error) => {
              alert(error);
            });
        }
      }
    }
    function changeButtonType(buttonToHide, buttonToShow) {
      buttonToHide.style.display = "none";
      buttonToShow.style.display = "block";
    }

    function seek(e) {
      let percent = e.offsetX / this.offsetWidth;
      player.currentTime = percent * player.duration;
      e.target.value = Math.floor(percent / 100);
      e.target.innerHTML = progressBar.value + "% played";
    }
    // Update the progress bar
    progressBar.oninput = function () {
      // console.log(progressBar.value)
    };

    function updateProgressBar() {
      updateCurrentTimeText();

      // Work out how much of the media has played via the duration and currentTime parameters
      let percentage = Math.floor((100 / player.duration) * player.currentTime);
      // Update the progress bar's value
      progressBar.value = percentage;
      // Update the progress bar's text (for browsers that don't support the progress element)
      progressBar.innerHTML = percentage + "% played";
    }
    function updateCurrentTimeText() {
      let totalCurrentTime = Math.floor(player.currentTime); // seconds
      let totalDurationTime = Math.floor(player.duration); // seconds

      let sCurrentTime = convertSecondsToHMS(totalCurrentTime);
      let sDurationTime = convertSecondsToHMS(totalDurationTime);

      currentTime.innerHTML = sCurrentTime;
      duration.innerHTML = sDurationTime;
    }
    function convertSecondsToHMS(secs) {
      let hourCurrentTime = 0,
        minCurrentTime = 0,
        secondCurrentTime = 0;

      hourCurrentTime = Math.floor(secs / 3600);
      minCurrentTime = Math.floor((secs - hourCurrentTime * 3600) / 60);
      secondCurrentTime = secs - hourCurrentTime * 3600 - minCurrentTime * 60;

      if (hourCurrentTime < 10) {
        hourCurrentTime = "0" + hourCurrentTime;
      }
      if (minCurrentTime < 10) {
        minCurrentTime = "0" + minCurrentTime;
      }
      if (secondCurrentTime < 10) {
        secondCurrentTime = "0" + secondCurrentTime;
      }

      return hourCurrentTime + ":" + minCurrentTime + ":" + secondCurrentTime;
    }
    // Stop the current media from playing, and return it to the start position
    function stopVideo() {
      player.pause();
      if (player.currentTime) player.currentTime = 0;
      changeButtonType(btnPauses[0], btnPlayPauses[0]);
      changeButtonType(btnPauses[1], btnPlayPauses[1]);
    }
    function rewindVideo() {
      player.currentTime -= 10;
      if (player.currentTime == 0) {
        player.pause();
        changeButtonType(btnPauses[0], btnPlayPauses[0]);
        changeButtonType(btnPauses[1], btnPlayPauses[1]);
      }
    }
    function fastForwardVideo() {
      player.currentTime += 10;
      if (player.currentTime == player.duration) {
        player.pause();
        changeButtonType(btnPauses[0], btnPlayPauses[0]);
        changeButtonType(btnPauses[1], btnPlayPauses[1]);
      }
    }
    function endVideo() {
      player.pause();
      if (player.currentTime) player.currentTime = player.duration;
      changeButtonType(btnPauses[0], btnPlayPauses[0]);
      changeButtonType(btnPauses[1], btnPlayPauses[1]);
    }
  },
};
</script>
<style>
.video {
  /* overflow: hidden; */
  z-index: 1;
}
.video-wrapper {
  width: 230px;
  height: 500px;
  /* object-fit: cover; */
}
</style>