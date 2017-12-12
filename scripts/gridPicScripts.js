//GLOBALS

var images = [null, null, null, null];
var currentIndex;
var userIdGlobal;
var finalimage;
var img1,img2,img3,img4;
var finalcanvas = document.getElementById('finalcanvas');
var finalctx = finalcanvas.getContext("2d");
//var canvas = document.getElementById('canvas');
//var ctx = canvas.getContext("2d");

var imagedone = 0;
var wantoverlay=0;
img1 = new Image();
img2 = new Image();
img3 = new Image();
img4 = new Image();

img1.src = "assets/overlayTest-01.png";
img2.src = "assets/overlayTest-02.png";
img3.src = "assets/overlayTest-03.png";
img4.src = "assets/overlayTest-04.png";
function finalizeimage(){
    
    finalctx.width = "700";
    finalctx.height = "700";
    
    finalctx.drawImage(images[0],0,0,350,350);
    finalctx.drawImage(images[1],350,0,350,350);
    finalctx.drawImage(images[2],0,350,350,350);
    finalctx.drawImage(images[3],350,350,350,350);
    
    imagedone =1;
    
    
//    finalctx.drawImage(img1,0,0,350,350);
//    finalctx.drawImage(img2,350,0,350,350);
//    finalctx.drawImage(img3,0,350,350,350);
//    finalctx.drawImage(img4,350,350,350,350);

    
}
//function drawoverlay(){
//    img1 = new Image();
//    img2 = new Image();
//    img3 = new Image();
//    img4 = new Image();
//    img1.crossOrigin="anonymous";
//    img2.crossOrigin="anonymous";
//    img3.crossOrigin="anonymous";
//    img4.crossOrigin="anonymous";
//    img1.src = "assets/overlayTest-01.png";
//    img2.src = "assets/overlayTest-02.png";
//    img3.src = "assets/overlayTest-03.png";
//    img4.src = "assets/overlayTest-04.png";
//    
//    finalctx.drawImage(img1,0,0,350,350);
//    finalctx.drawImage(img2,350,0,350,350);
//    finalctx.drawImage(img3,0,350,350,350);
//    finalctx.drawImage(img4,350,350,350,350);
//    
//}
var checkbox = document.getElementById("chbx");

function checkbox_changed() {
    if (checkbox.checked == true) {
        wantoverlay=1;
        
    } else {
        wantoverlay=0;
    }
}
function download(){
    if (imagedone == 0){
        alert("Must Finalize Image Before Download");// cannot download image before
        return;
    }
    
//    ctx.width = "700";
//    ctx.height = "700";
    
//    ctx.drawImage(images[0],0,0,350,350);
//    ctx.drawImage(images[1],350,0,350,350);
//    ctx.drawImage(images[2],0,350,350,350);
//    ctx.drawImage(images[3],350,350,350,350);
    var download = document.getElementById("download");
    var GridPicImage = document.getElementById("finalcanvas").toDataURL("GridPicImage/png")
    .replace("GridPicImage/png", "image/octet-stream");
    download.setAttribute("href", GridPicImage);
    
}

function createVideoStream(containerIndex){
    if (images[containerIndex-1] != null){ //a picture for that container already exists
        return; //functionality to delete images will be in the gallery tab
    }
}

function createVideoStream(containerIndex){
  if (images[containerIndex-1] != null){ //a picture for that container already exists
      return; //functionality to delete images will be in the gallery tab
  }
  var container = document.getElementById("container" + containerIndex.toString()); //selecting the container that was clicked

  var currentVideo = document.getElementById("vid"); //grabbing the current video on the page if there is one
  var parentId = $("video").closest("div").prop("id"); //grabbing the parent div id that contains the 'vid' element
  console.log(parentId + ", container" + containerIndex.toString());
  if (currentVideo != null && parentId != "container" + containerIndex.toString()){ //we only want to delete the video when another container is clicked
    document.getElementById("vid").remove();
    currentVideo = null;
  }

  if (currentVideo == null){ //only want to create a new 'vid' element when one does not already exist
    currentIndex = containerIndex;
    var createVideo = document.createElement('video');
    createVideo.setAttribute("autoplay", "true");
    //createVideo.videoWidth = "300";
    //createVideo.videoHeight = "300";
    createVideo.id = "vid";

    container.appendChild(createVideo); //appending the video stream

    navigator.mediaDevices.getUserMedia({video: true}).then(function (stream) { //onclick to take picture and creating putting image on the screen
        //stream.applyConstraints(constraints);
        vid.srcObject = stream;
        vid.play();

        vid.onclick = function () {
            var c = document.createElement('canvas');
            c.width = "350";
            c.height = "350";
            c.getContext('2d').drawImage(vid, 0, 0);
            c.toBlob(CreateImage);
                
                                                            
        };
    }).catch(function(error){
      vid.parentNode.removeChild(vid);
      console.log(error);
    });
  }
}

function CreateImage(blob){
    var url = URL.createObjectURL(blob);
    var img = new Image();
    img.onload = function(){URL.revokeObjectURL(url);};
    img.src = url;
    img.id = "img" + currentIndex;
    img.className = "userPicture";

    URL.revokeObjectURL(vid.src);

    var parentContainer = vid.parentNode;
    parentContainer.innerHTML = ''; //removes both the 'vid' and 'overlay'
    parentContainer.appendChild(img); //this is the user taken image


    //adding image to images[]
    images[currentIndex-1] = img;

    //We want to upload after the image is stitched
    uploadBlob(blob);
}

function testfunction(test){
  console.log(test.id);
}


/**
    * Handles the sign in button press.
*/
function toggleSignIn() {
    if (firebase.auth().currentUser) {
        // [START signout]
        firebase.auth().signOut();
        // [END signout]
    } else {
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;
        if (email.length < 4) {
            alert('Please enter an email address.');
            return;
        }
        if (password.length < 4) {
            alert('Please enter a password.');
            return;
        }
        // Sign in with email and pass.
        // [START authwithemail]
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // [START_EXCLUDE]
            if (errorCode === 'auth/wrong-password') {
                alert('Wrong password.');
            } else {
                alert(errorMessage);
            }
            console.log(error);
            document.getElementById('quickstart-sign-in').disabled = false;
            // [END_EXCLUDE]
        });
        // [END authwithemail]
    }
    document.getElementById('quickstart-sign-in').disabled = true;
}

/**
* Handles the sign up button press.
*/
function handleSignUp() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    if (email.length < 4) {
        alert('Please enter an email address.');
        return;
    }
    if (password.length < 4) {
        alert('Please enter a password.');
        return;
    }
    // Sign in with email and pass.
    // [START createwithemail]
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode == 'auth/weak-password') {
            alert('The password is too weak.');
        } else {
            alert(errorMessage);
        }
        console.log(error);
        // [END_EXCLUDE]
    });
    // [END createwithemail]
}

function sendPasswordReset() {
    var email = document.getElementById('email').value;
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

/**
* initApp handles setting up UI event listeners and registering Firebase auth listeners:
*  - firebase.auth().onAuthStateChanged: This listener is called when the user is signed in or
*    out, and that is where we update the UI.
*/



function initApp() {
    // Listening for auth state changes.
    // [START authstatelistener]
    firebase.auth().onAuthStateChanged(function(user) {
        // [START_EXCLUDE silent]
        document.getElementById('quickstart-verify-email').disabled = true;
        // [END_EXCLUDE]
        if (user) {
            // User is signed in.
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var isAnonymous = user.isAnonymous;
            var uid = user.uid;
            var providerData = user.providerData;
            // [START_EXCLUDE]
            document.getElementById('quickstart-sign-in-status').textContent = 'You are signed in as '+user.email;
            openTab(event, 'Camera');
            document.getElementById('cameraInstruct').textContent = 'Click a grid piece to start, then take a picture that matches the overlay!';
            document.getElementById('galleryInstructions').textContent = "Last few pictures you've taken:";
            userIdGlobal = user.uid;
            updatePictures();
            document.getElementById('gridPicMain').style.display = 'block';
            document.getElementById('quickstart-sign-in').textContent = 'Sign out';
            document.getElementById('quickstart-sign-up').style.display= "none";
            //document.getElementById('quickstart-account-details').textContent = JSON.stringify(user, null, '  ');

            // document.getElementById('file').addEventListener('change', handleFileSelect, false);

            if (!emailVerified) {
                document.getElementById('quickstart-verify-email').disabled = false;
            }
            // [END_EXCLUDE]
            } else {
            // User is signed out.
            // [START_EXCLUDE]
            userIdGlobal= '';
            document.getElementById('picturesHere').innerHTML = '';
            document.getElementById('gridPicMain').style.display = 'none';
            document.getElementById('cameraInstruct').textContent = 'Sign in before making a GridPic!';
            document.getElementById('galleryInstructions').textContent = 'Sign in to see your GridPics!';
            document.getElementById('quickstart-sign-in-status').textContent = 'Sign in to create a GridPic';
            document.getElementById('quickstart-sign-in').textContent = 'Sign in';
            document.getElementById('quickstart-sign-up').style.display= "inline";

            //document.getElementById('quickstart-account-details').textContent = 'null';

            //document.getElementById('file').disabled = false;
            // [END_EXCLUDE]
        }
        // [START_EXCLUDE silent]
        document.getElementById('quickstart-sign-in').disabled = false;
        // [END_EXCLUDE]
    }) ;
    // [END authstatelistener]
    document.getElementById('quickstart-sign-in').addEventListener('click', toggleSignIn, false);
    document.getElementById('quickstart-sign-up').addEventListener('click', handleSignUp, false);
    //FIX THIS document.getElementById('quickstart-verify-email').addEventListener('click', sendEmailVerification, false);
    document.getElementById('quickstart-password-reset').addEventListener('click', sendPasswordReset, false);
}

function openTab(evt, cityName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}

function uploadBlob(blob){
    var firebaseStorage = firebase.storage().ref();
    var fileName = Date();

    var metadata = {'contentType': blob.type};
    var user = firebase.auth().currentUser;
    console.log(user.uid);
    if (user != null){
      firebaseStorage.child('images/' + user.uid + '/' + fileName).put(blob, metadata).then(function(snapshot){
          console.log('Uploaded', snapshot.totalBytes, 'bytes.');
          console.log(snapshot.metadata);
          var url = snapshot.downloadURL;
          console.log('File available at', url);  //remove these logs

          //realtime database for the download url
          var firebaseDatabase;

          switch(currentIndex){ //setting realtime database information based on the container the picture was taken in
            case 1:
              firebaseDatabase = firebase.database().ref('users/' + user.uid).update({
                email: user.email,
                image_path1: url
              });
              break;
            case 2:
              firebaseDatabase = firebase.database().ref('users/' + user.uid).update({
                email: user.email,
                image_path2: url
              });
              break;
            case 3:
              firebaseDatabase = firebase.database().ref('users/' + user.uid).update({
                email: user.email,
                image_path3: url
              });
              break;
            case 4:
              firebaseDatabase = firebase.database().ref('users/' + user.uid).update({
                email: user.email,
                image_path4: url
              });
              break;
          }

      }).catch(function(error){
          console.error('Upload failed:', error); //remove these logs
      });
    }
}
function updatePictures(){
    // Get a reference to the database service
        var database = firebase.database();

        // Create a storage reference from our database
        var storageRef = database.ref();

        var picturePlace = document.getElementById("picturesHere");

        // Adds an event listener to any child added to our database
        // This is triggered when the listener is first attached and every time a new child is added
        // Adds the orders to the orders div
        storageRef.on("child_added", function(snapshot){
            //console.log(snapshot.val()[userIdGlobal]['image_path'+1]);
            for (i=1;i<5;i++){
                //console.log(snapshot.val()[userIdGlobal]['image_path'+i]);
                if (snapshot.val()[userIdGlobal]['image_path'+i] != undefined){
                    picturePlace.innerHTML += "<img src='"+snapshot.val()[userIdGlobal]['image_path'+i]+"'></img>";
                };
            };
        });
}
window.onload = function() {
    initApp();
    openTab(event, 'Signin/Signup');
    //console.log(userIdGlobal);
    if (userIdGlobal != '' && userIdGlobal != undefined){
        updatePictures();
    };
};
