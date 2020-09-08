

var data;

var inn=false,out=false;

 var refItems = firebase.database().ref("Users/Customers/"+localStorage.getItem('userid')+"/Songs");
                
                var sss=[];

    var l=0;
        
               refItems.once("value").then(function(snapshot1){
                   
                    console.log(snapshot1.val());
                   snapshot1.forEach(function(childSnapshot1){
                       
                                l=l+1;
                              console.log(childSnapshot1.val());
                              
                              let refSongs = firebase.database().ref("Songs/"+childSnapshot1.val());
                                refSongs.once("value").then(function(s){
                                  
                                   // console.log(l);
                                  console.log(s.val());
                                   // if(_.findWhere(sss,s.val) == null)
                                        sss.push(s.val());
                                    
                                  
                              }).then(function(u)
                                      {
                                     // sss=[];
                                     console.log(sss);
                                     console.log(JSON.stringify(sss));
                                     data=sss;
                                     abc();
                                    inn=true;
                                });
                                
                       
                       
                   });
                   
                   
                   
               }).then(function(v)
                       {
                    out=true;
                   console.log(l);
                   
               });








console.log(l);



function abc() {
    
    
    if(l==sss.length)
        {
             console.log(data);
    
    
  audioPlayer.load();
  if (window['webkitSpeechRecognition']) {
    var speechRecognizer = new webkitSpeechRecognition();
    // recognition will not end when user stops speaking if set to true
    speechRecognizer.continuous = true;
    // process the request while the user is speaking
    // and their commands are final. Set to false by default
    speechRecognizer.interimResults = true;
    speechRecognizer.lang = "en-US";
    var currentCommands = ['play', 'stop', 'pause', 'next', 'previous'],
        results = [],
        timeoutSet = false;

    speechRecognizer.onresult = function (evt) {
      audioPlayer.toggleSpinner(true);
      results.push(evt.results);
      if (!timeoutSet) {
        setTimeout(function() {
          timeoutSet = false;
          results.reverse();
          try {
            results.forEach(function (val, i) {
              var el = val[0][0].transcript.toLowerCase();
              if (currentCommands.indexOf(el.split(" ")[0]) !== -1) {
                speechRecognizer.abort();
                audioPlayer.processCommands(el);
                audioPlayer.toggleSpinner();
                results = [];
                throw new BreakLoopException;

              }
              if (i === 0) {
                audioPlayer.processCommands(el);
                speechRecognizer.abort();
                audioPlayer.toggleSpinner();
                results = [];
              }
            });
          }
          catch(e) {return e;}
        }, 3000)
      }

      timeoutSet = true;
    }
    speechRecognizer.onend = function () {
      speechRecognizer.start();
    }

    speechRecognizer.start();
  }
  else {
    alert("Your browser does not support the Web Speech API");
  }
        }
   
}
