function signup() {
    var name = document.getElementById('signup-username').value;
  	var email = document.getElementById('signup-email').value;
    var password = document.getElementById('signup-password').value;

    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) 
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
                console.log('qwerty');
                alert('Account Created');
            }
                
        console.log(error);
    });
    
    signToData(email,name);
    
}

function signToData(email,name)
{
  const database = firebase.database();
  const ref = database.ref('Users');
    ref.push({
                    Name: name,
                    EmailID: email
                    
            })
}

function verify() {
      	firebase.auth().currentUser.sendEmailVerification().then(function() {
        alert('Email Verification Sent!');
      });
}

function login(){
	var email = document.getElementById('signin-email').value;
    var password = document.getElementById('signin-password').value;
    firebase.auth().signInWithEmailAndPassword(email, password)
    	.catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;

          if (errorCode === 'auth/wrong-password') {
            alert('Wrong password.');
          } else {
              if(errorMessage==('There is no user record corresponding to this identifier. The user may have been deleted.'))
            //alert('Password correct');
                    alert(errorMessage);
              else
                  {
                      alert('Correct Password');
                      alert(errorMessage);
                  }
                  
          }

        });
        firebase.auth().onAuthStateChanged(function(user) {
        	if (user) {
        		var displayName = user.displayName;
          		var email = user.email;
          		var emailVerified = user.emailVerified;
          		console.log(email)
        	}
        	if (!emailVerified) {
            	console.log(emailVerified)
          }
          else {
          		console.log(emailVerified)
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
