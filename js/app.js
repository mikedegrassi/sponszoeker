
// const video = document.getElementById("webcam");
const imageFile = document.getElementById("imageFile")
const image = document.getElementById('uploadedImage');
let label = document.getElementById("label");
const featureExtractor = ml5.featureExtractor('MobileNet', modelLoaded);
let classifier;
const synth = window.speechSynthesis
let score = 0;

const labelOneBtn = document.querySelector("#labelOne");
const labelTwoBtn = document.querySelector("#labelTwo");
const trainbtn = document.querySelector("#train");
const savebtn = document.querySelector("#save");
const startbtn = document.querySelector("#start");
const fileDiv = document.getElementById('fileDiv');
const scoreP = document.getElementById('score');

scoreP.innerHTML = score;
//
// labelOneBtn.addEventListener("click", () => classifier.addImage('spons'));
// labelTwoBtn.addEventListener("click", () => classifier.addImage('soap'));

startbtn.addEventListener("click", () => startText());

// imageFile.addEventListener("change", (event) => modelLoaded(event));

// trainbtn.addEventListener("click", () => classifier.train(training));
//
// if (navigator.mediaDevices.getUserMedia) {
//     navigator.mediaDevices
//         .getUserMedia({ video: true })
//         .then((stream) => {
//             video.srcObject = stream;
//         })
//         .catch((err) => {
//             console.log("Something went wrong!");
//         });
// }

function speak(text) {
    if (synth.speaking) {
        console.log('still speaking...')
        return
    }
    if (text !== '') {
        let utterThis = new SpeechSynthesisUtterance(text)
        synth.speak(utterThis)
    }
}

function startText () {
    speak('Zoek een spons o te beginnen met de afwas');

    startbtn.classList.add('hidden');
    fileDiv.classList.remove('hidden');
}

function modelLoaded() {
    classifier = featureExtractor.classification(image);
    classifier.load("./model.json");
}

function gotResults() {

    setTimeout(() => {
        classifier.classify(image, (err, result) => {
            if (err) console.log(err)
            label.innerHTML = result[0].label
            resultController(result[0].label);
        })
    }, 1000);

}

function resultController(result) {
    if (result=== 'spons') {
        speak('Goed, nu kan je beginnen met de afwas');
        image.classList.remove('hidden');
        score++;
        scoreP.innerHTML = score;
    } else {
        speak('Dit is volgens mij geen spons');
    }
}