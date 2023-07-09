//DOM初期化
const video = document.getElementById("myvideo");
const canvas = document.getElementById("mycanvas");

let model;
let context = canvas.getContext("2d");

const options = {
  flipHorizonal: true,
  maxNumBoxes: 2,
  scoreThreshold: 0.8,
}

handTrack.load(options).then(function(modelData){
  model = modelData;

  //Webカメラ起動
  handTrack.startVideo(video).then(function(status) {
    if (status) {
      startDitection();
    } else {
      alert("エラーが発生しました。このページを閉じてください。");
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
