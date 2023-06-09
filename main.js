song = "";
leftWristy= 0;
rightWristy= 0;
scoreleftwrist= 0;
scorerightwrist= 0;

leftWristx= 0;
rightWristx= 0;


function preload(){
    song = loadSound("music.mp3");
}

function setup(){
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}

function modelLoaded(){
    console.log('PoseNet Is Initialized');
}


function draw(){
    image (video,0,0,600,500);

    fill('#800080');
    stroke("#800080");

    if (scorerightwrist > 0.2){
        circle(leftWristx,leftWristy,20);
        if (rightWristy > 0 && rightWristy <= 100){
            document.getElementById("speed").innerHTML="Speed = 0.5x";
            song.rate(0.5);
        }

        if (rightWristy > 100 && rightWristy <= 200){
            document.getElementById("speed").innerHTML="Speed = 1x";
            song.rate(1);
        }

        if (rightWristy > 200 && rightWristy <= 300){
            document.getElementById("speed").innerHTML="Speed = 1.5x";
            song.rate(1.5);
        }

        if (rightWristy > 300 && rightWristy <= 400){
            document.getElementById("speed").innerHTML="Speed = 2x";
            song.rate(2);
        }

        if (rightWristy > 400 && rightWristy <= 500){
            document.getElementById("speed").innerHTML="Speed = 2.5x";
            song.rate(2.5);
        }
    }

    circle(leftWristx,leftWristy,20);

        if(scoreleftwrist > 0.2){

    circle(leftWristx,leftWristy,20);
    InNumberleftWristy = Number(leftWristy);
    remove_decimals = floor(InNumberleftWristy);
    volume = remove_decimals/500;
    document.getElementById("volume").innerHTML = "Volume = " + volume;
    song.setVolume(volume);
}
}
function Play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        scoreleftwrist=results[0].pose.keypoints[9].score;
        scorerightwrist=results[0].pose.keypoints[10].score;
        console.log("scoreleftwrist = " + scoreleftwrist + "scorerightwrist = " + scorerightwrist);
        leftWristx = results[0].pose.leftWrist.x;
        leftWristy = results[0].pose.leftWrist.y;
        console.log(" leftWristx = " + leftWristx + " leftWristy = " + leftWristy);

        rightWristx = results[0].pose.rightWrist.x;
        rightWristy = results[0].pose.rightWrist.y;
        console.log(" rightWristx = " + rightWristx + " rightWristy = " + rightWristy);
    }
}