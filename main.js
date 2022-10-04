scoreLeftWrist=0;
scoreRightWrist=0;
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

if (scoreRightWrist>0.1) {
circle(rightWrist_x, rightWrist_y, 20);

if (rightWrist_y>0 && rightWrist_y<=100) {
document.getElementById("speed").innerHTML="Speed = 0.5x";
music.rate(0.5);  
}
else if(rightWrist_y>100 && rightWrist_y<=200){
document.getElementById("speed").innerHTML="Speed = 1.0x";
music.rate(1.0);
}
else if(rightWrist_y>200 && rightWrist_y<=300){
document.getElementById("speed").innerHTML="Speed = 1.5x";
music.rate(1.5);
}
else if(rightWrist_y>300 && rightWrist_y<=400){
document.getElementById("speed").innerHTML="Speed = 2.0x";
music.rate(2.0);
}
else if(rightWrist_y>400 && rightWrist_y<=500){
document.getElementById("speed").innerHTML="Speed = 2.5x";
music.rate(2.5);
}
}

if (scoreLeftWrist>0.1) {
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
scoreRightWrist=results[0].pose.keypoints[10].score;
scoreLeftWrist=results[0].pose.keypoints[9].score;
console.log("Score of Left Wrist = " + scoreLeftWrist);
console.log("Score of Right Wrist = " + scoreRightWrist);
leftWrist_x= results[0].pose.leftWrist.x;
leftWrist_y= results[0].pose.leftWrist.y;
console.log("Left wrist x=" + leftWrist_x +" Left wrist y=" + leftWrist_y);

rightWrist_x= results[0].pose.rightWrist.x;
rightWrist_y= results[0].pose.rightWrist.y;
console.log("Right wrist x=" + rightWrist_x + " Right wrist y" + rightWrist_y);
}
}


