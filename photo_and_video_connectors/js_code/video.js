<script type = "text/JavaScript">
var VIDEO_TYPE = "";
var WIDTH = 1000;
var HEIGHT = 800;
</script>

<div id="canvas_div">
<b>Resolution</b>: width <input type="text" id="width_input" value="800" size="4">
 height <input type="text" id="height_input" value="600" size="4">
 <br>
<b>Input</b>: <button id="webcam_button" onclick="webcam_function()">Webcam</button> 
<button id="screen_button" onclick="screen_function()">Screen</button> 
</div>

<script type = "text/JavaScript">
function webcam_function(){
    VIDEO_TYPE = "webcam";
    WIDTH = width_input.value;
    HEIGHT = height_input.value;
    stream_frame("Capturing...", ""); 
}
function screen_function(){
    VIDEO_TYPE = "screen";
    WIDTH = width_input.value;
    HEIGHT = height_input.value;
    stream_frame("Capturing...", "");
}
async function remove_choice_div() {
    /*  Removes the height and width inputs and choice buttons */
    choice_div = document.getElementById("choice_div");
    choice_div.remove();
}

var video;
var div = null;
var stream;
var captureCanvas;
var imgElement;
var labelElement;

var pendingResolve = null;
var shutdown = false;

function removeDom() {
   stream.getVideoTracks()[0].stop();
   video.remove();
   div.remove();
   video = null;
   div = null;
   stream = null;
   imgElement = null;
   captureCanvas = null;
   labelElement = null;
}

function onAnimationFrame() {
  if (!shutdown) {
    window.requestAnimationFrame(onAnimationFrame);
  }
  if (pendingResolve) {
    var result = "";
    if (!shutdown) {
      captureCanvas.getContext('2d').drawImage(video, 0, 0, WIDTH, HEIGHT);
      result = captureCanvas.toDataURL('image/jpeg', 0.8)
    }
    var lp = pendingResolve;
    pendingResolve = null;
    lp(result);
  }
}

async function createDom() {
  if (div !== null) {
    return stream;
  }

  div = document.createElement('div');
  div.style.border = '2px solid black';
  div.style.padding = '3px';
  div.style.width = '100%';
  div.style.maxWidth = parseInt(WIDTH) + 'px';
  //document.body.appendChild(div);
  canvas_div = document.getElementById("canvas_div");
  canvas_div.appendChild(div);

  const modelOut = document.createElement('div');
  modelOut.innerHTML = "<span>Status:</span>";
  labelElement = document.createElement('span');
  labelElement.innerText = 'No data';
  labelElement.style.fontWeight = 'bold';
  modelOut.appendChild(labelElement);
  div.appendChild(modelOut);
       
  video = document.createElement('video');
  video.style.display = 'block';
  video.width = div.clientWidth - 6;
  video.setAttribute('playsinline', '');
  video.onclick = () => { shutdown = true; };

  if (VIDEO_TYPE=="webcam")
    {stream = await navigator.mediaDevices.getUserMedia( {video: { facingMode: "environment"} })}
  else
    {stream = await navigator.mediaDevices.getDisplayMedia()};

  div.appendChild(video);

  imgElement = document.createElement('img');
  imgElement.style.position = 'absolute';
  imgElement.style.zIndex = 1;
  imgElement.onclick = () => { shutdown = true; };
  div.appendChild(imgElement);
  
  const instruction = document.createElement('div');
  instruction.innerHTML = 
      '<span style="color: red; font-weight: bold;">' +
      'When finished, click here or on the video to stop this demo</span>';
  div.appendChild(instruction);
  instruction.onclick = () => { shutdown = true; };
  
  video.srcObject = stream;
  await video.play();

  captureCanvas = document.createElement('canvas');
  //captureCanvas.width = 640; //video.videoWidth;
  //captureCanvas.height = 480; //video.videoHeight;
  captureCanvas.width = video.videoWidth;
  captureCanvas.height = video.videoHeight;
  window.requestAnimationFrame(onAnimationFrame);
  
  return stream;
}


async function stream_frame(label, imgData) {
  /* 
  */ 
  remove_choice_div()
  if (shutdown) {
    removeDom();
    shutdown = false;
    return '';
  }

  var preCreate = Date.now();
  stream = await createDom();
  
  var preShow = Date.now();
  if (label != "") {
    labelElement.innerHTML = label;
  }
        
  if (imgData != "") {
    var videoRect = video.getClientRects()[0];
    imgElement.style.top = videoRect.top + "px";
    imgElement.style.left = videoRect.left + "px";
    imgElement.style.width = videoRect.width + "px";
    imgElement.style.height = videoRect.height + "px";
    imgElement.src = imgData;
  }
  
  var preCapture = Date.now();
  var result = await new Promise(function(resolve, reject) {
    pendingResolve = resolve;
  });
  shutdown = false;
  
  return {'create': preShow - preCreate, 
          'show': preCapture - preShow, 
          'capture': Date.now() - preCapture,
          'img': result};
}
    
</script>