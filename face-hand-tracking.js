

const video = document.getElementById("myvideo");
const canvas = document.getElementById("mycanvas");

let model;

const options = {
    flipHorizonal: false,
    maxNumBoxes: 3,
    scoreThreshold: 0.7
}

let context = canvas.getContext("2d")

handTrack.load(options).then(function (modelData) {
    model = modelData;

    //Webカメラを起動する
    handTrack.startVideo(video).then(function (status) {
        if (status) {
            console.log(status);
            startDetection();
        } else {
            console.log("failed")
        };
    });
});

function startDetection() {
    model.detect(video).then((predictions) => {
        model.renderPredictions(predictions, canvas, context, video);

        requestAnimationFrame(startDetection);
    });
}
