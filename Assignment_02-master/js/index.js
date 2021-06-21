$(function () {
    var config = {
        apiKey: "AIzaSyCsowejb39H-b9cf3tOtOOSV_PC9aWqzKU",
        authDomain: "assignment02-71adf.firebaseapp.com",
        databaseURL: "https://assignment02-71adf.firebaseio.com",
        projectId: "assignment02-71adf",
        storageBucket: "assignment02-71adf.appspot.com",
        messagingSenderId: "498135780166"
    };
    firebase.initializeApp(config);

    $("#play").click(function () {
        var name = $("#name").val();
        localStorage.setItem('name', name);
        console.log(name);
        signInAnonymously();
    });

    $("#scoreboard").click(function () {
        window.location.href = "scoreboard.html";
    });
});

function saveUserToDatabase(user) {
    var name = $("#name").val();
    var database = firebase.database().ref('/user/');
    var postData = {
        name: name,
        uid: user.uid
    };
    console.log(postData);
    database.push(postData);
}

function signInAnonymously() {
    var name = $("#name").val();
    firebase.auth().signInAnonymously().catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        // ...
    });
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            //saveUserToDatabase(user);
            var isAnonymous = user.isAnonymous;
            var uid = user.uid;
            window.location.href = "play.html";
            // ...
        } else {
            // User is signed out.
            // ...
        }
        // ...
    });
}
