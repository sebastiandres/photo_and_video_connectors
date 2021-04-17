async function remove_buttons(my_element) {
    document.body.removeChild(my_element);
}

async function takePhoto(capture_type, quality) {
    // Crear un div donde poner el video
    const photo_div = document.createElement('div');
    document.body.appendChild(photo_div);
    // Agregar un boton
    const capture = document.createElement('button');
    capture.textContent = 'Capture';
    photo_div.appendChild(capture);
    // Agregar el video
    const video = document.createElement('video');
    video.style.display = 'block';

    let stream;
    if (capture_type === "webcam") {
        stream = await navigator.mediaDevices.getUserMedia({video: true, audio: false});
    } else {
        stream = await navigator.mediaDevices.getDisplayMedia();
    }
    
    // ACÁ LA MAGIA DEL INTERNET
    document.body.appendChild(photo_div);
    photo_div.appendChild(video);
    video.srcObject = stream;
    await video.play();

    // Resize the output to fit the video element.
    //google.colab.output.setIframeHeight(document.documentElement.scrollHeight, true);

    // Wait for Capture to be clicked.
    await new Promise((resolve) => capture.onclick = resolve);
    
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0);
    stream.getVideoTracks()[0].stop();
    photo_div.remove();
    
    return canvas.toDataURL('image/jpeg', quality);
}

async function getPicture(quality) {
    // Div where to place everything
    const div = document.createElement('div');
    document.body.appendChild(div);
    // Upload file button
    const upload_button = document.createElement('button');
    upload_button.setAttribute("id", "upload_button")
    upload_button.textContent = 'Cargar archivo';
    div.appendChild(upload_button);
    // Webcam button
    const webcam_button = document.createElement('button');
    webcam_button.textContent = 'Foto de Webcam';
    div.appendChild(webcam_button);
    // Screen button
    const screen_button = document.createElement('button');
    screen_button.textContent = 'Foto de Escritorio';
    div.appendChild(screen_button);
    // Add actions
    upload_button.addEventListener("click", function(){remove_buttons(div); });
    webcam_button.addEventListener("click", function(){remove_buttons(div); takePhoto("webcam", 0.8); });
    screen_button.addEventListener("click", function(){remove_buttons(div); takePhoto("screen", 0.8); });
}