  


var dataset,noofusers;

function recom()
{
    
       
               //  let ds=document.getElementById('Users');
                
            
               var ds = firebase.database().ref("Dataset");


               ds.on("value",function(snapshot1)
                           {
                   
                            console.log(snapshot1.val());
                   console.log("REC"+JSON.stringify(snapshot1.val()));
                   dataset=snapshot1.val();
                   thenn();
               });
    
}


 var len  = function(obj){
    var len=0;
    for(var i in obj){
        len++
    }
  //   console.log(len);
    return len;
     
}
 

function thenn()
{
    

      
console.log("qwer");

var pearson_correlation = function(dataset,p1,p2){
var existp1p2 = {};
for(item in dataset[p1]){
            if(item in dataset[p2]){
               // console.log(item);
                existp1p2[item] = 1
            }
        }
        var num_existence = len(existp1p2);
if(num_existence ==0) return 0;

        var p1_sum=0,
            p2_sum=0,
            p1_sq_sum=0,
            p2_sq_sum=0,
            prod_p1p2 = 0;
       
        for(var item in existp1p2){
          //  console.log(dataset[p2][item]);
            p1_sum += dataset[p1][item];
            p2_sum += dataset[p2][item];
p1_sq_sum += Math.pow(dataset[p1][item],2);
            
         //   console.log(p1_sq_sum);
            p2_sq_sum += Math.pow(dataset[p2][item],2);
            
          //  console.log(p2_sq_sum);
prod_p1p2 += dataset[p1][item]*dataset[p2][item];
            
           // console.log(prod_p1p2);
        }
  //  console.log(num_existence)
        var numerator =prod_p1p2 - (p1_sum*p2_sum/num_existence);
 //   console.log(numerator);
    
var st1 = p1_sq_sum - Math.pow(p1_sum,2)/num_existence;
   // console.log(st1);
    
        var st2 = p2_sq_sum -Math.pow(p2_sum,2)/num_existence;
  //  console.log(st2);
    
var denominator = Math.sqrt(st1*st2);
   // console.log(denominator);
    
if(denominator ==0) return 0;
        else {
            var val = numerator / denominator;
            return val;
        }
        
}


var similar_user = function(dataset,person,num_user,distance){
var scores=[];
for(var others in dataset){
        if(others != person && typeof(dataset[others])!="function"){
            var val = pearson_correlation(dataset,person,others)
            var p = others
            scores.push({val:val,p:p});
        }
    }
    scores.sort(function(a,b){
        return b.val < a.val ? -1 : b.val > a.val ? 1 : b.val >= a.val ? 0 : NaN;
    });
    var score=[];
    for(var i =0;i<num_user;i++){
        score.push(scores[i]);
    }
return score;
    
}



//console.log(dataset);
//console.log(pearson_correlation(dataset,'6wysx7SdeSM0ghLhxNfEg10e1ZA2','GXKuIas0AVNT8jahB04U74X0ePw2'));
  //  console.log(pearson_correlation(dataset,'6wysx7SdeSM0ghLhxNfEg10e1ZA2','XOrkRsw26dUrwFA7PmgrwP0g8pz2'));
    //console.log(pearson_correlation(dataset,'6wysx7SdeSM0ghLhxNfEg10e1ZA2','GXKuIas0AVNT8jahB04U74X0ePw2'));
    
    var scoreREC=similar_user(dataset,localStorage.getItem('userid')/*'6wysx7SdeSM0ghLhxNfEg10e1ZA2'*/,5,pearson_correlation);
console.log(scoreREC);

var arrayREC=[];
var userREC=[];
var difREC=[];

var abc=0
var dif=0

for (var i = 0; i < scoreREC.length; i++) {
    console.log("PAIR " + i + ": " + scoreREC[i].p);
   // console.log("PAIR " + i + ": " + scoreREC[i].cid);


   

   var SongsRE=document.getElementById('Recommeded');

    if(scoreREC[i].val>0)
    {

        dif++;
        var ref=firebase.database().ref("Users/Customers/"+scoreREC[i].p+"/Songs");


        var refSongs=firebase.database().ref("Songs");
        

        ref.once("value")
            .then(function(s)
            {
               // console.log("____________");
                s.forEach(function(childSnapshot1)
                {

                 /*   var ref2=firebase.database().ref("Users/Customers/"+localStorage.getItem('userid')+"/Songs");

                    ref2.once("value")
                            .then(function(snapshot) 
                            {
                            var hasName = snapshot.hasChild(childSnapshot1.val()); // true
                            //var hasAge = snapshot.hasChild("age"); // false
                            console.log("REC a "+hasName);


                            if(!hasName)
                            {

                                arrayREC.push(childSnapshot1.val());

                            }  //if  


                            })
                            .then(function(s)
                            {
                                console.log(arrayREC);
                            });

*/

                        if(arrayREC.indexOf(childSnapshot1.val()) === -1)
                            arrayREC.push(childSnapshot1.val());
                });

               



            })
            .then(function(s){
              console.log("hh");

                abc++;
                updateREC();

            })

        

      



    }//if

   // abc++

}//for

function updateREC()
{
    console.log(abc)

    console.log(dif)


    if(abc==dif)
    {

        var ref2=firebase.database().ref("Users/Customers/"+localStorage.getItem('userid')+"/Songs");


        console.log(arrayREC)

         var loopvar=0
        // while(loopvar<arrayREC.length)
        // {
        //     ref2.once("value")
        //         .then(function(snapshot) 
        //         {
        //             console.log(arrayREC[parseInt(3)])

        //             var hasName = snapshot.hasChild(arrayREC[jj]);
        //             if(hasName)
        //             {
        //                 arrayREC.splice(jj,1)
        //             }

        //         })


        //         loopvar++
        // }



      
            ref2.once("value")
            .then(function(snapshot) 
            {
               // console.log(snapshot.val())
               snapshot.forEach(function(childSnapshot1)
               {
                   userREC.push(childSnapshot1.val());
                  // console.log(cmp);
/*
                   if(arrayREC.includes(snapshot.val()))
                   {
                    arrayREC.splice(loopvar,1)
                    console.log(arrayREC)
                    loopvar=loopvar+1;
                   }
                  // loopvar=loopvar+1;
*/
               });

            })
            .then(function(s){
               // console.log(userREC)


                arrayREC.map((a)=>
                {

                    if(!userREC.includes(a))
                    {
                        console.log(a)
                        difREC.push(a);
                    }

                });


            });

            console.log(difREC)


            refSongs.on("value",function(snapshot1)
            {
                snapshot1.forEach(function(childSnapshot1)
                {

                    if(difREC.includes(childSnapshot1.val().key))
                    {



                        var artist=  childSnapshot1.val().artist;
                        var  album=childSnapshot1.val().album;
                        var  dur=childSnapshot1.val().duration;
                      //  var   file=childSnapshot1.val().file;
                        var  image=childSnapshot1.val().image;
                        var  name=childSnapshot1.val().name;
                         
                        var div=document.createElement('div');
                        div.setAttribute('class','both');

                       var divleft=document.createElement('div');
                       divleft.setAttribute('class','left');
                       var divright=document.createElement('div');
                       divright.setAttribute('class','right');
                         
                       var Nartist=document.createElement('p');
                    
                       var Nalbum=document.createElement('p');
                       var Ndur=document.createElement('p');
                       //var Nfile=document.createElement('p');
                      
                       var Nimage=document.createElement('img');
                       Nimage.setAttribute('src', image);
                       var Nname=document.createElement('p');
                    

                       var bu=document.createElement('button');
                       bu.setAttribute('data',childSnapshot1.val().key);

                       bu.addEventListener('click',addSongToList);
                       bu.innerHTML="Add";
                       bu.setAttribute('class','addBu');
                       
                          //console.log("addd"+addressData);
                     /*   var br=document.createElement('br');
                        var brr=document.createElement('br');
                       var br1=document.createElement('br');
                       var br2=document.createElement('br');
                       var br3=document.createElement('br');
                       var br4=document.createElement('br');
                       var br5=document.createElement('br');*/
                      
                         
                          Nalbum.innerHTML="Album :"+album;
                          Nartist.innerHTML="Artist :"+artist;
                          Ndur.innerHTML="Duration :"+dur;
                          Nname.innerHTML="Name :"+name;
                         
                         divleft.appendChild(Nimage);

                         divright.appendChild(Nname);
                         divright.appendChild(Nalbum);
                         divright.appendChild(Nartist);
                         divright.appendChild(Ndur);

                         divright.appendChild(bu);

                       
                     div.appendChild(divleft);
                     div.appendChild(divright);

                      
                       
  
                       SongsRE.appendChild(div);




                    }



                });

            });







    }
     
    

}



       // console.log(recommendation_eng(dataset,'Toby',pearson_correlation));
    
    
}
  