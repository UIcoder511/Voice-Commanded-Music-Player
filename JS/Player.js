// Mythium Archive: https://archive.org/details/mythium/

               var refItems = firebase.database().ref("Users/Customers/"+localStorage.getItem('userid')+"/Songs");
                
                var sss=[];

                // refItems.on('child_added', function(snapshot)
                // {
                //     console.log('hi');
                // });


        
               refItems.on("value").then(function(snapshot1){
                   
                    console.log("player:"+snapshot1.val());
                   snapshot1.forEach(function(childSnapshot1){
                       
                              console.log(childSnapshot1.val());
                              
                              let refSongs = firebase.database().ref("Songs/"+childSnapshot1.val());
                                refSongs.on("value").then(function(s){
                                  
                                  console.log(s.val());
                                  sss.push(s.val());
                                  
                              }).then(function(u)
                                      {
                                     console.log(sss);
                                     console.log(JSON.stringify(sss));
                                        mm()
                                });
                                
                       
                       
                   });
                   
                   
                   
               });



function mm() {
    //'use strict'
    var supportsAudio = !!document.createElement('audio').canPlayType;
    if (supportsAudio) {
        // initialize plyr
        var player = new Plyr('#audio1', {
            controls: [
                
                'play',
                'progress',
                'current-time',
                'duration',
                'mute',
                'volume'
                
            ]
        });
        // initialize playlist and controls
        
        
        console.log('_______________________');
        
        

             /*  refItems.on("value",function(snapshot1)
               		{
               			  console.log(snapshot1.val());
                        //  console.log("Users:"+ snapshot1.exists());
							//Users.innerHTML="";

                          snapshot1.forEach(function(childSnapshot1)


                          	{
                              
                              console.log(childSnapshot1.val());
                              
                              let refSongs = firebase.database().ref("Songs/"+childSnapshot1.val());
                              refSongs.on("value",function(s){
                                  
                                  console.log(s.val());
                                  sss.push(s.val());
                                  
                              });
                              
                          });
                   
                  // console.log(sss[1].album);
                   //console.log(JSON.stringify(sss));
               }).then(function(values) { 
        console.log("hi"); // [snap, snap, snap] 
    });
        
        Promise.all(sss).then(function(values) { 
      console.log(sss[1].album);
                   console.log(JSON.stringify(sss)); // [snap, snap, snap] 
    });*/
        
        
                                         
                   
               	
                  
              
    
//function
        
        
        
   // console.log(sss[1].album);
        


        
        
          console.log('_______________________');
        
        
        
        var index = 0,
            playing = false,
            extension = '',
            
           // tracks=sss
            tracks = sss,
            
            buildPlaylist = $.each(tracks, function(key, value) {
                var trackName = value.name,
                    trackDuration = value.duration,mediaPath=value.file;
              //  if (trackNumber.toString().length === 1) {
            //        trackNumber = '0' + trackNumber;
              //  }
                $('#plList').append('<li> \
                    <div class="plItem">  \
                        <span class="plTitle">' + trackName + '</span> \
                        <span class="plLength">' + trackDuration + '</span> \
                    </div> \
                </li>');
            }),
            trackCount = tracks.length,
            npAction = $('#npAction'),
            npTitle = $('#npTitle'),
            audio = $('#audio1').on('play', function () {
                playing = true;
                npAction.text('Now Playing...');
            }).on('pause', function () {
                playing = false;
                npAction.text('Paused...');
            }).on('ended', function () {
                npAction.text('Paused...');
                if ((index + 1) < trackCount) {
                    index++;
                    loadTrack(index);
                    audio.play();
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }).get(0),
            btnPrev = $('#btnPrev').on('click', function () {
                if ((index - 1) > -1) {
                    index--;
                    loadTrack(index);
                    if (playing) {
                        audio.play();
                    }
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }),
            btnNext = $('#btnNext').on('click', function () {
                if ((index + 1) < trackCount) {
                    index++;
                    loadTrack(index);
                    if (playing) {
                        audio.play();
                    }
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }),
            li = $('#plList li').on('click', function () {
                var id = parseInt($(this).index());
                if (id !== index) {
                    playTrack(id);
                }
            }),
            loadTrack = function (id) {
                console.log(tracks)
                $('.plSel').removeClass('plSel');
                $('#plList li:eq(' + id + ')').addClass('plSel');
                npTitle.text(tracks[id].name);
                index = id;
                audio.src = mediaPath;
                updateDownload(id, audio.src);
            },
            updateDownload = function (id, source) {
                player.on('loadedmetadata', function () {
                    $('a[data-plyr="download"]').attr('href', source);
                });
            },
            playTrack = function (id) {
                loadTrack(id);
                audio.play();
            };
        extension = audio.canPlayType('audio/mpeg') ? '.mp3' : audio.canPlayType('audio/ogg') ? '.ogg' : '';
        loadTrack(index);
        
    } else {
        // no audio support
        $('.column').addClass('hidden');
        var noSupport = $('#audio1').text();
        $('.container').append('<p class="no-support">' + noSupport + '</p>');
    }
}
