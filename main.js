Webcam.set({
    width:350,
    height:350,
    image_format: "png",
    png_quality:100
});

camera=document.getElementById("camera");

Webcam.attach(camera);

function capture(){
    Webcam.snap(function(data_uri){
        document.getElementById("output").innerHTML='<img id="captured_img" src='+data_uri+'>';
    });
}

console.log("ml5 version: ",ml5.version);

classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/t29N_-Qu2/model.json",modelLoaded);

function modelLoaded(){
    console.log("Model Loaded");
}

function identify(){
    img=document.getElementById("captured_img");
    classifier.classify( img , gotResult );
}

function gotResult(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("result_label").innerHTML=results[0].label;
        document.getElementById("result_accuracy").innerHTML=results[0].confidence.toFixed(2);
    }
}