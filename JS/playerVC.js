

var lenSong;



function pushRating()
{
  var sdata=[]
  console.log('rr')
  var rat=document.getElementsByClassName('rating');
  var skey=document.getElementsByClassName('list-group-item');

  var datastar=firebase.database().ref('Dataset/'+localStorage.getItem('userid'));

  datastar.once('value')
          .then(function(s){
              s.forEach(function(ss){
                sdata.push(ss.val())
               console.log(ss.val())
              })
          })
          .then(function(s)
          {
                          // console.log(sdata)
                            //var ss=skey[1].getAttribute("data");
                          // console.log(ss)
                            // console.log(sdata[0])

                            
                  
                  //rat.appendChild(star5);
                var ii=0;
                // for(ii=0;ii<lenSong;ii++)
                // {
                //   console.log(ii)
                //   rat[ii].appendChild(star.cloneNode(true));
                //   rat[ii].appendChild(star2.cloneNode(true));
                //   rat[ii].appendChild(star3.cloneNode(true));
                //   rat[ii].appendChild(star4.cloneNode(true));
                //   rat[ii].appendChild(star5.cloneNode(true));
                // }

                for(ii=0;ii<lenSong;ii++)
                {
                  var star=document.createElement('input');
                star.setAttribute('type','radio');
                star.setAttribute('name','stars'+ii);
                star.setAttribute('value','1');
                star.setAttribute('class','stars');
                star.setAttribute('songkey',skey[ii].getAttribute("data"));

                  if(sdata[ii]!=0)
                  {
                      if(sdata[ii]==1)
                      {
                        star.setAttribute('checked','checked');
                      }

                  }
                  


                star.addEventListener('change',show);
                rat[ii].appendChild(star);

                var star2=document.createElement('input');
                star2.setAttribute('type','radio');
                star2.setAttribute('name','stars'+ii);
                star2.setAttribute('value','2');
                star2.setAttribute('class','stars');
                star2.setAttribute('songkey',skey[ii].getAttribute("data"));
                //console.log(skey[ii].getAttribute("data"));

                if(sdata[ii]!=0)
                  {
                      if(sdata[ii]==2)
                      {
                        star2.setAttribute('checked','checked');
                      }

                  }

                star2.addEventListener('change',show);
                rat[ii].appendChild(star2);

                var star3=document.createElement('input');
                star3.setAttribute('type','radio');
                star3.setAttribute('name','stars'+ii);
                star3.setAttribute('value','3');
                star3.setAttribute('class','stars');
                star3.setAttribute('songkey',skey[ii].getAttribute("data"));

                if(sdata[ii]!=0)
                  {
                      if(sdata[ii]==3)
                      {
                        star3.setAttribute('checked','checked');
                      }

                  }


                star3.addEventListener('change',show);
                rat[ii].appendChild(star3);

                var star4=document.createElement('input');
                star4.setAttribute('type','radio');
                star4.setAttribute('name','stars'+ii);
                star4.setAttribute('value','4');
                star4.setAttribute('class','stars');
                star4.setAttribute('songkey',skey[ii].getAttribute("data"));

                if(sdata[ii]!=0)
                  {
                      if(sdata[ii]==4)
                      {
                        star4.setAttribute('checked','checked');
                      }

                  }


                star4.addEventListener('change',show);
                rat[ii].appendChild(star4);

                var star5=document.createElement('input');
                star5.setAttribute('type','radio');
                star5.setAttribute('name','stars'+ii);
                star5.setAttribute('value','5');
                star5.setAttribute('class','stars');
                
                if(sdata[ii]!=0)
                  {
                      if(sdata[ii]==5)
                      {
                        star5.setAttribute('checked','checked');
                      }

                  }
                

                star5.setAttribute('songkey',skey[ii].getAttribute("data"));
                star5.addEventListener('change',show);
                rat[ii].appendChild(star5);
                }
            })





    }


 


function show()
{
  console.log('show')
    alert(this.value);
    const reff=firebase.database().ref("Dataset/"+localStorage.getItem('userid'));
        
    reff.update({
        [this.getAttribute('songkey')]:parseInt(this.value)
       
    });
}





    var audioPlayer = {
    audioData: {
    currentSong: -1,
    songs: []
  },

  // UI
  load: function() {
    this.data = data;
      console.log(data);
      lenSong=data.length
      console.log(lenSong)
    data.forEach(function(val, i) {
      $("#playlist").append(
        `<li class='list-group-item' data=${val.key}>` + val.name+`<div class='aldp'><img src=${val.image} class='aldpimg'></div><div class='rating'></div></li>`
      );
    })
    pushRating();
  },
  changeCurrentSongEffect: function(options) {
    if (options.play) {
      $("#playlist .list-group-item")
        .removeClass("list-group-item-success").find("span").remove();
      $("#playlist .list-group-item")
        .eq(this.audioData.currentSong)
        .addClass("list-group-item-success")
        .removeClass("list-group-item-danger")
       
    }
    if (options.end) {
      $("#playlist .list-group-item")
      .eq(this.audioData.currentSong)
      .removeClass("list-group-item-success")
      .addClass("list-group-item-danger");
    }
  },
  playSong: function(audio,iii) {
    this.changeCurrentSongEffect({
      play: 1
    });
    audio.onended = function() {
      audioPlayer.changeCurrentSongEffect({
        end: 1
      });
      audioPlayer.changeStatusCode("Finished listening to", true);
    }



     //Album dp

     var albumdp=document.getElementById("imgalbum");
     //var albumdp=document.getElementById("imgalbum");
     var promi=new Promise(function(r,re)
     {
         //albumdp.setAttribute('src',"");
         r("h");
     });
     var colors;

     promi.then(function(h){
       $(albumdp).fadeOut(1000);
     })
     .then(function(h){
       albumdp.setAttribute('src',this.data[iii].image);
       getColors(this.data[iii].image,function(cc){


        

       // console.log()
        

       var paths = document.getElementsByTagName("svg"),i;
       var act=document.getElementsByClassName('list-group-item-success');
        document.body.style.backgroundColor=cc[0].raw_hex

        lightOrDark(cc[0].raw_hex,function(dl){
            console.log(dl)
            if(dl=="l")
            {
              document.body.style.setProperty("color", "black", "important");
             // act.style.setProperty("color", "black", "important");

                  for (i = 0; i < paths.length;++i) 
                  {
                      paths[i].style.setProperty("fill", "black", "important");
                  }
            }
            else if(dl=="d")
            {
              document.body.style.setProperty("color", "white", "important")
              //act.style.setProperty("color", "white", "important");

              for (i = 0; i < paths.length;++i) 
              {
                  paths[i].style.setProperty("fill", "white", "important");
              }

            }
        })


       })
      

     }).then(function(h){
     
      //console.log(colors)
       $(albumdp).fadeIn(1000);
     })

     
     
     
    

     console.log("imggg\n\n")
     //dp


     
    this.changeStatusCode("Playing", true, audio);
  },
  changeStatusCode: function(statusMessage, addSongName, scope) {
    if (addSongName) {
      statusMessage += " " + $("#playlist .list-group-item").eq(this.audioData.currentSong).text();
    }
    this.speak(statusMessage, scope);
    $(".status")
    .fadeOut("slow")
    .html(statusMessage)
    .fadeIn("slow");
  },
  changeLastCommand: function(cmd) {
    $(".l-command").fadeOut("slow")
    .text(cmd)
    .fadeIn("slow");
  },
  toggleSpinner: function(show) {
    (show || false) ? $("#spinner").fadeIn(900) : $("#spinner").fadeOut(1200);
  },

  // Audio Player
  play: function() {
    var currentSong = this.audioData.currentSong;
    if (currentSong === -1) {
      this.audioData.currentSong = ++currentSong;
      this.audioData.songs[this.audioData.currentSong] = new Audio(
        this.data[0].file);

      this.playSong(this.audioData.songs[currentSong],this.audioData.currentSong);

    } else {
      this.playSong(this.audioData.songs[currentSong],this.audioData.currentSong);
    }
  },
  pauseSong: function(audio, stopPlayback) {
    if (audio.paused) {
      return;
    }
    audio.pause();
    if (stopPlayback) {
      this.changeStatusCode("Stopped", true);
      audio.currentTime = 0;
      return;
    }
    this.changeStatusCode("Paused", true);
  },
  stop: function(stopPlayback) {
    this.pauseSong(this.audioData.songs[this.audioData.currentSong], stopPlayback || false);
    if (stopPlayback) {
      this.audioData.songs[this.audioData.currentSong].currentTime = 0;
    }
  },
  prev: function() {
    var currentSong = this.audioData.currentSong;
    if (typeof this.audioData.songs[currentSong - 1] !== 'undefined') {
      this.pauseSong(this.audioData.songs[currentSong],currentSong);
      this.audioData.currentSong = --currentSong;
      this.playSong(this.audioData.songs[currentSong],this.audioData.currentSong);

    } else if (currentSong > 0) {
      this.pauseSong(this.audioData.songs[currentSong]);
      this.audioData.currentSong = currentSong = --currentSong;
      this.audioData.songs[this.audioData.currentSong] = new Audio(
        this.data[currentSong].file);
      this.playSong(this.audioData.songs[currentSong],this.audioData.currentSong);
    } else {
      this.changeStatusCode("There are no previous songs.");
    }
  },
  next: function() {
    var currentSong = this.audioData.currentSong;
    if (currentSong > -1) {
      this.pauseSong(this.audioData.songs[currentSong]);
    }
    if (typeof this.data[currentSong + 1] !== 'undefined') {
      currentSong = ++this.audioData.currentSong;
      this.audioData.songs[this.audioData.currentSong] = new Audio(this.data[currentSong].file);
      this.playSong(this.audioData.songs[currentSong],this.audioData.currentSong);
    } else {
      this.changeStatusCode("You have reached the final song.");
    }
  },
  searchSpecificSong: function(keyword) {
    try {
      this.data.forEach(function(val, i) {
           console.log("qq");
        if (val.name.trim().toLowerCase().indexOf(keyword) !== -1) {
          if (typeof this.audioData.songs[i] !== 'undefined') {
            //if the song is already cached
            if (this.audioData.currentSong > -1) {
              this.pauseSong(this.audioData.songs[this.audioData.currentSong]);
            }
            this.audioData.currentSong = i;
            audioPlayer.playSong(audioPlayer.audioData.songs[i],i);
               console.log("q");
            throw LoopBreakException;
          } else {
               console.log("w");
            //add the song and play it
            if (this.audioData.currentSong > -1) {
              this.pauseSong(this.audioData.songs[this.audioData.currentSong]);
            }
            this.audioData.currentSong = i;
            this.audioData.songs[i] = new Audio(this.data[i].file);
            this.playSong(this.audioData.songs[i],i);
            throw LoopBreakException;
          }
        }
      }, audioPlayer);
    } catch (e) {
      return e;
    }
  },

  // Speech API
  speak: function(text, scope) {
    var message = new SpeechSynthesisUtterance(text);
    message.rate = 1;
    window.speechSynthesis.speak(message);
    if (scope) {
      message.onend = function() {
        scope.play();
      }
    }
  },
  processCommands: function(cmd) {
    this.changeLastCommand(cmd);
    var playSpecific = cmd.match(/play\s*(.+)$/);
    if (playSpecific) {
        console.log(playSpecific[1]);
      this.searchSpecificSong(playSpecific[1]);
      return;
    }
    switch (cmd) {
      case "play":
        this.play();
        break;
      case 'pause':
        this.stop();
        break;
      case "stop":
        this.stop(true);
        break;
      case "next":
        this.next();
        break;
      case "previous":
        this.prev();
        break;
      default:
        this.speak("Your command was invalid!", false);
    }
  },
}
