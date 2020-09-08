
var isverified=false;
var islogin=false;
var issignup=false;
var ispasswordcorrect=false;

function signup() {
    var name = document.getElementById('signup-username').value;
  	var email = document.getElementById('signup-email').value;
    var password = document.getElementById('signup-password').value;

    firebase.auth().createUserWithEmailAndPassword(email, password).then(
        function(val) 
           {
                //console.log(val);
                var userid=firebase.auth().currentUser.uid
                const database = firebase.database();
               
                const ref = database.ref('Users/Customers/'+userid);
               // var newClientKey = database.ref().child('Users/Customers').push().key;
             //   console.log(newClientKey);
               
                ref.set({
                    
                    Name: name,
                    EmailID: email,
                    Address: null
                       
            })
                
                issignup=true;
               //Success!!
                    firebase.auth().currentUser.sendEmailVerification().then(function() {
                    alert('Email Verification Sent!');
                    });
               console.log(val);
            }).catch(function(error) 
                     {
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        if (errorCode == 'auth/weak-password') {
                                alert('The password is too weak.');
                                } 
                        console.log(error);
                        console.log(errorCode);
                        console.log(errorMessage);
                        if(errorMessage=='The email address is already in use by another account.')
                                alert('Already used');
                        else
                            {
                              //  console.log('qwerty');
                               // alert('Account Created');
                            }
                
                    console.log(error);
                    });
    
    
    
}

var UName;  
function login(){
	var email = document.getElementById('signin-email').value;
    var password = document.getElementById('signin-password').value;
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(
        function(val) 
           {
               // console.log("correct");
                if(isverified)
                    {
                        
                       var userid=firebase.auth().currentUser.uid;
                       console.log(userid);
                        var ref = firebase.database().ref("Users/Customers/"+userid);

                            ref.once("value", function(snapshot){
                                // Contains all data from Firebase
                               // var data = snapshot.val();
                               console.log(snapshot.val().Name);
                              //  console.log(snapshot.val().Name);
                                      localStorage.setItem("userid",userid);
                                      localStorage.setItem("username",snapshot.val().Name);
                                      localStorage.setItem("email",snapshot.val().EmailID);
                                      //var UEmail = childData.EmailID;
                                      //  console.log(UName);
                                      //  p.innerHTML =UName;
                                    //var $form_modal = 
                                    $('.user-modal').removeClass('is-visible');
                                   window.location.href = 'Profile.html';
                                   // console.log(UName+UEmail);
                                        
                                // Has customer name
                                
                                // Has customer phone
                              //  window.location.href='index.html';

                                // Append data to view
                               
                            });
                        
                       
                    }
                    
                    
            })
    	.catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;

          if (errorCode === 'auth/wrong-password') {
            alert('Wrong password.');
          } else {
              
            //  console.log("correct")
              if(errorMessage==('There is no user record corresponding to this identifier. The user may have been deleted.'))
            //alert('Password correct');
                    alert(errorMessage);
              else
                  {
                     // alert('Correct Password');
                     // alert(errorMessage);
                  }
                  
          }

        });
    
        firebase.auth().onAuthStateChanged(function(user) {
        	if (user) {
        		var displayName = user.displayName;
          		var email = user.email;
          		var emailVerified = user.emailVerified;
          		console.log('changed')
                console.log(emailVerified)
               
                if (!emailVerified) 
            {
            	alert('Please Verify Email...');
            }
                 else {
              
               
                isverified=true;
          		console.log("verified")
          }
        	}
        	
         
});
}

 function re() {
      var email = document.getElementById('reset-email').value;
      // [START sendpasswordemail]
      firebase.auth().sendPasswordResetEmail(email).then(function() {
        // Password Reset Email Sent!
        // [START_EXCLUDE]
        alert('Password Reset Email Sent!');
        // [END_EXCLUDE]
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode == 'auth/invalid-email') {
          alert(errorMessage);
        } else if (errorCode == 'auth/user-not-found') {
          alert(errorMessage);
        }
        console.log(error);
        // [END_EXCLUDE]
      });
      // [END sendpasswordemail];
    }