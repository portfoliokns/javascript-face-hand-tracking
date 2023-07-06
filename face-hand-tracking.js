// console.log(handTrack);

const video = document.getElementById("myvideo");
const canvas = document.getElementById("mycanvas");

let model;

const options = {
  flipHorizonal: false,
  maxNumBoxes: 3,
  scoreThreshold: 0.7,
}

let context = canvas.getContext("2d");

handTrack.load(options).then(function(modelData){
  model = modelData;
  console.log(model);

  //Webカメラ起動
  handTrack.startVideo(video).then(function(status) {
    if (status) {
      console.log(status);
      startDitection();
    } else {
      console.log("failed");
    }
  });
});

function startDitection()
{
  model.detect(video).then((predictions) => {
    model.renderPredictions(predictions, canvas, context, video);

    requestAnimationFrame(startDitection);
  });
}
