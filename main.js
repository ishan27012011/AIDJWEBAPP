scoreLeftWrist=0;
music= "";
leftWrist_y=0;
leftWrist_x=0;
rightWrist_y=0;
rightWrist_x=0;
function preload(){
music=loadSound("music.mp3");
}

function setup(){
canvas=createCanvas(600, 500);
canvas.center();
video= createCapture(VIDEO);
video.hide();
poseNet=ml5.poseNet(video, modelLoaded)
poseNet.on('pose', gotPoses)
}

function draw() {
image(video, 0, 0, 600, 500);
fill("red");
stroke("black");
if (scoreLeftWrist>0.2) {
circle(leftWrist_x, leftWrist_y, 20);
number=Number(leftWrist_y);
removedecimal=floor(number);
volume=removedecimal/500;
document.getElementById("volume").innerHTML="Volume: "+ volume;
music.setVolume(volume);    
}
}

function play() {
music.play();
music.setVolume(1);
music.rate(1);
}

function modelLoaded(){
console.log("Model has been loaded");
}

function gotPoses(results) {
if (results.length > 0) {
console.log(results);
scoreLeftWrist=results[0].pose.keypoints[9].score;
console.log("Score of Left Wrist = " + scoreLeftWrist);
leftWrist_x= results[0].pose.leftWrist.x;
leftWrist_y= results[0].pose.leftWrist.y;
console.log("Left wrist x=" + leftWrist_x +" Left wrist y=" + leftWrist_y);

rightWrist_x= results[0].pose.rightWrist.x;
rightWrist_y= results[0].pose.rightWrist.y;
console.log("Right wrist x=" + rightWrist_x + " Right wrist y" + rightWrist_y);
}
}


