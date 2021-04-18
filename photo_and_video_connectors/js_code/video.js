async function remove_choice_div() {
  /*  Removes the height and width inputs and choice buttons */
  choice_div = document.getElementById('choice_div');
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
    var result = '';
    if (!shutdown) {
      WIDTH = parseInt(document.getElementById('width_input').value);
      HEIGHT = parseInt(document.getElementById('height_input').value);
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
  WIDTH = parseInt(document.getElementById('width_input').value);
  div.style.maxWidth = parseInt(WIDTH) + 'px';
  canvas_div = document.getElementById('canvas_div');
  canvas_div.appendChild(div);

  const modelOut = document.createElement('div');
  modelOut.innerHTML = '<span>Status:</span>';
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

  if (VIDEO_TYPE=='webcam')
    {stream = await navigator.mediaDevices.getUserMedia( {video: { facingMode: 'environment'} })}
  else
    {stream = await navigator.mediaDevices.getDisplayMedia()};

  div.appendChild(video);

  imgElement = document.createElement('img');
  imgElement.style.position = 'absolute';
  imgElement.style.zIndex = 1;
  imgElement.onclick = () => { shutdown = true; };
  div.appendChild(imgElement);

  const instruction = document.createElement('div');
  instruction.innerHTML = 'Click here or on the video to stop';
  div.appendChild(instruction);
  instruction.onclick = () => { shutdown = true; };

  video.srcObject = stream;
  await video.play();

  captureCanvas = document.createElement('canvas');
  captureCanvas.width = video.videoWidth;
  captureCanvas.height = video.videoHeight;
  window.requestAnimationFrame(onAnimationFrame);

  return stream;
}

async function stream_frame(label, imgData) {
  /*
  Updating the frame with the provided data 
  */
  if (shutdown) {
    removeDom();
    shutdown = false;
    return '';
  }

  var preCreate = Date.now();
  stream = await createDom();

  var preShow = Date.now();
  if (label != '') {
    labelElement.innerHTML = label;
  }
        
  if (imgData != '') {
    var videoRect = video.getClientRects()[0];
    imgElement.style.top = videoRect.top + 'px';
    imgElement.style.left = videoRect.left + 'px';
    imgElement.style.width = videoRect.width + 'px';
    imgElement.style.height = videoRect.height + 'px';
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