song1="";
song2="";
song1Stat="";
song2Stat="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
roghtWristY=0;
scoreleftwrist=0;
scorerightwrist=0;
function setup()
{
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    posenet=ml5.poseNet(video,modelloaded);
    posenet.on("pose",GotResults);
}
function draw()
{
    image(video,0,0,600,500);
    song1Stat=song1.isPlaying();
    song2Stat=song2.isPlaying();
    stroke("red");
    fill("red");
    if (scoreleftwrist>0.2)
    {
    circle(leftWristX,leftWristY,20);
    song2.stop()
    if(song1Stat==false)
    {
        song1.play();
        document.getElementById("song").innerHTML="playing harry potter theme song";
    }
    }

    if (scorerightwrist>0.2)
    {
    circle(rightWristX,rightWristY,20);
    song1.stop()
    if(song2Stat==false)
    {
        song2.play();
        document.getElementById("song").innerHTML="playing peter pan theme song";
    }
    }
}
function preload()
{
    song1=loadSound("music.mp3");
    song2=loadSound("music2.mp3");
}
function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);

}
function modelloaded()
{
    console.log("model Loaded!");
}
function GotResults(results)
{
    if (results.length>0)
    {
        console.log(results);
        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log("left wrist x="+leftWristX+"left wrist y= "+leftWristY);
        console.log("right Wrist x= "+rightWristX+"right wrist y="+rightWristY);

        scoreleftwrist=results[0].pose.keypoints[9].score;
        scorerightwrist=results[0].pose.keypoints[10].score;
        console.log("left wrist score= "+scoreleftwrist+" right wrist score= "+scorerightwrist);
    }
}