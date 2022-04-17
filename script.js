let songIndex = 0;
let playPause = document.getElementById("playPauseBottom");
let progressBar = document.getElementById("progressBar");
let gif = document.getElementById("gif");
let songImg = document.getElementById("SongImg")
let Ssongs = document.getElementById("Ssongs");

let songItems = Array.from(document.getElementsByClassName("songItem"));

let audioElement1 = new Audio("");


let songs = [
  { songName: "Let me love you", src: 'https:p.scdn.co/mp3-preview/4dfd08831d34dcfafd602d68917aa214c95483a4?cid=9abf79a7600143ad951ecc85d4356191', coverPath: "Cover Song Images" },
];

let songduration;
audioElement1.onloadedmetadata = function () {
  songduration = audioElement1.duration;
  let q = parseInt(songduration / 60);
  let r = parseInt(songduration % 60);
  let time = `${q}:${r}`;
  songItems.forEach((element, i) => {
    element.getElementsByClassName("timestamp")[0].innerText = time;
    document.getElementsByClassName("timestampB")[0].innerHTML = time;
  });

};

let val;
audioElement1.addEventListener('timeupdate', () => {
  progress = (audioElement1.currentTime / audioElement1.duration) * 100;
  progressBar.value = progress;
  val = progressBar.value;

  if (val == 100) {
    playPause.classList.remove("pause");
    playPause.classList.add("play");
    gif.style.opacity = 0;
  }
});

progressBar.addEventListener('change', () => {
  audioElement1.currentTime = (progressBar.value * audioElement1.duration) / 100;
});

let client_id = null;
let client_secret = null;

// taking clientId and client secret from the user
function promptId() {
  client_id = prompt("Enter Client Id", '');
  console.log(client_id);
}
function promptSecret() {
  client_secret = prompt("Enter Client Secret", '');
  console.log(client_secret);
}


let target = Array.from(document.getElementsByClassName('cbtn'));
const makeallblack = () => {
  target.forEach((e) => {
    e.classList.remove('red');
    e.classList.add('allBlack');
  })
}

// Fetching Songs from spotify api and rendering their respective name,image,time using javascript
const getsongs = async () => {

  let song_no;
  // to see which button among categories is clicked
  let target = Array.from(document.getElementsByClassName('cbtn'));
  target.forEach(e => {

    e.addEventListener('click', () => {

      makeallblack();
      e.classList.add('red');
      let cont = document.querySelector('.songContainer');
      var child = cont.lastElementChild;

      while (child) {
        cont.removeChild(child);
        child = cont.lastElementChild;
      }
      func(e.id);
    })

  })

  const getToken = async () => {
    const result = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        'content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret)
      },
      body: 'grant_type=client_credentials'
    })


    const data = await result.json();
    access_token = await data.access_token;
    // console.log(access_token)
    return access_token;
  }
  var access_token = await getToken();
  // To get all indian available categories
  const tracks = await fetch(`https://api.spotify.com/v1/browse/categories?country=IN`, {
    method: 'GET',
    headers: { 'Authorization': 'Bearer ' + access_token }
  })
  const data3 = await tracks.json();

  let audioElement = new Audio('https://p.scdn.co/mp3-preview/661a27e9a12438dac8c8fc5b013e00677bc4abec?cid=9abf79a7600143ad951ecc85d4356191');
  playPause.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
      audioElement.play();
      playPause.classList.remove("play");
      playPause.classList.add("pause");
      gif.style.opacity = 1;
    }
    else {
      audioElement.pause();
      playPause.classList.remove("pause");
      playPause.classList.add("play");
      gif.style.opacity = 0;
    }
  });

  let pImage = (document.querySelector('.pImage'));

  let func = async (e) => {
    let bollywood = '37i9dQZF1DX0XUfTFmNBRM';
    let bollywood2 = "37i9dQZF1DWSwxyU5zGZYe";
    let bollywood3 = "37i9dQZF1DWXtlo6ENS92N";
    let bollywood4 = "37i9dQZF1DXd8cOUiye1o2";
    let punjabi = '37i9dQZF1DWWwF1YkSKLlU';
    let marathi = "37i9dQZF1DX84EApEEEkUc";
    let classical = "37i9dQZF1DX6EUcyVKIE73";
    let moneyHeist = "37i9dQZF1DX44eggCvVygr";
    let top50 = "37i9dQZF1DXcBWIGoYBM5M";
    let honeysingh = "37i9dQZF1DZ06evO4r9h36";
    let badshah = "37i9dQZF1DZ06evO0g1ZvH";
    let nehakakkar = "37i9dQZF1DZ06evO3581ka";

    let final_song;

    switch (e) {
      case 'bollywood': final_song = '37i9dQZF1DX0XUfTFmNBRM'; break;
      case 'bollywood2': final_song = '37i9dQZF1DWSwxyU5zGZYe'; break;
      case 'bollywood3': final_song = '37i9dQZF1DWXtlo6ENS92N'; break;
      case 'classical': final_song = '37i9dQZF1DX6EUcyVKIE73'; break;
      case 'marathi': final_song = '37i9dQZF1DX84EApEEEkUc'; break;
      case 'punjabi': final_song = '37i9dQZF1DWWwF1YkSKLlU'; break;
      case 'honeysingh': final_song = '37i9dQZF1DZ06evO4r9h36'; break;
      case 'badshah': final_song = '37i9dQZF1DZ06evO0g1ZvH'; break;
      case 'nehakakkar': final_song = '37i9dQZF1DZ06evO3581ka'; break;
      case 'top50': final_song = '37i9dQZF1DXcBWIGoYBM5M'; break;
    }

    const track = await fetch(`https://api.spotify.com/v1/playlists/${final_song}/tracks?offset=0&limit=100& locale=en-US,en;q=0.9`, {
      method: 'GET',
      headers: { 'Authorization': 'Bearer ' + access_token }
    })
    const data4 = await track.json();
    let no = 0;

    let cont = document.querySelector('.songContainer');
    let ind = 0;
    data4.items.forEach(e => {
      no++;
      let imag = document.createElement('img')
      let span1 = document.createElement('span')
      let span2 = document.createElement('span')
      let span3 = document.createElement('span')
      let span4 = document.createElement('span')
      let i = document.createElement('i')
      let ele = document.createElement('div')



      imag.src = e.track.album.images[2].url;

      let Songname = e.track.name;
      span1.innerText = `${Songname}`;

      span2.className = 'songList'
      span2.appendChild(span3)
      span2.appendChild(span4)

      span3.className = 'timestamp';
      let q = parseInt(e.track.duration_ms / 60000);
      let r = parseInt(e.track.duration_ms % 60000);
      let sec = r.toString();
      sec = sec.slice(0, 2);

      let time = `${q}:${sec}`;
      span3.innerText = `${time}`

      span4.className = 'font'
      span4.appendChild(i)

      i.className = 'fa play'
      i.id = `playPause${ind}`;
      ind++;

      ele.className = 'songItem';
      ele.id = `${e.track.id}`;
      ele.appendChild(imag);
      ele.appendChild(span1);
      ele.appendChild(span2);

      cont.appendChild(ele);
    })


    let Index = Array.from(document.getElementsByClassName('fa play'));
    let pid;

    let playing = document.getElementById('playing');
    Index.forEach((e) => {

      e.addEventListener('click', () => {
        let idd = ((e.parentElement).parentElement).parentElement.id;

        data4.items.forEach(e => {
          if (e.track.id == idd) {

            playing.innerHTML = e.track.name;
            if (pid != idd) {
              audioElement.src = e.track.preview_url;
            }
            // bottom player
            let val;
            audioElement.addEventListener('timeupdate', () => {
              progress = (audioElement.currentTime / audioElement.duration) * 100;
              progressBar.value = progress;
              val = progressBar.value;

              if (val == 100) {
                playPause.classList.remove("pause");
                playPause.classList.add("play");
                gif.style.opacity = 0;
              }
            });
            if (audioElement.currentTime != 0) {
              if (audioElement.paused || audioElement.currentTime <= 0) {
                playPause.classList.remove('play');
                playPause.classList.add('pause');
                gif.style.opacity = 1;
                audioElement.play();
              }
              else {
                playPause.classList.remove('pause');
                playPause.classList.add('play');
                audioElement.pause();
                gif.style.opacity = 0;
              }
            }
            else {
              audioElement.src = e.track.preview_url;
              playPause.classList.remove('play');
              gif.style.opacity = 1;
              playPause.classList.add('pause');
              audioElement.play();
            }
            pImage.src = e.track.album.images[1].url;
            pid = idd;
          }
        })
      })
    })

  }
}
let a = 0,x=1000;
if (a == 0) {
  setInterval(() => {
    // console.log("i am running")
    if (client_secret != null && client_id != null && a==0) {
      a = 1;
      x=10000;
      getsongs();
    }
  }, x);
}

