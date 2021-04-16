async function remove_choice_div() {
    /*  Removes the height and width inputs and choice buttons */
    document.getElementById("choice_div");
    choice_div.remove();
}

async function add_choice_div(input_type) {
    /*  Adds the height and width inputs and choice buttons */
    // Div where to place everything
    const choice_div = document.createElement('div');
    choice_div.setAttribute("id", "choice_div")
    document.body.appendChild(choice_div);
    // Add height and width texts
    var width_text = document.createTextNode("Resolution: width ");
    choice_div.appendChild(width_text);
    var width_input = document.createElement("INPUT");
    width_input.setAttribute("type", "text");
    width_input.setAttribute("value", "600");
    width_input.setAttribute("size", "4");
    choice_div.appendChild(width_input);
    var height_text = document.createTextNode("  height ");
    choice_div.appendChild(height_text);
    var height_input = document.createElement("INPUT");
    height_input.setAttribute("type", "text");
    height_input.setAttribute("value", "480");
    height_input.setAttribute("size", "4");
    choice_div.appendChild(height_input);
    var _br = document.createElement("br");
    choice_div.appendChild(_br);
    // Put webcam button
    const webcam_button = document.createElement('button');
    webcam_button.setAttribute("id", "webcam_button")
    webcam_button.textContent = 'Capture from Webcam';
    choice_div.appendChild(webcam_button);
    function webcam_function(){alert(input_type + " " + height_input.value + " " + width_input.value)};
    //function webcam_function(){stream_frame("Capturing", ""); }
    webcam_button.addEventListener("click", webcam_function);
    // Put screen button
    var _space1 = document.createTextNode("  ");
    choice_div.appendChild(_space1);
    // Put screen button
    const screen_button = document.createElement('button');
    screen_button.setAttribute("id", "screen_button")
    screen_button.textContent = 'Capture from Screen';
    choice_div.appendChild(screen_button);
    function screen_function(){alert(input_type + " " + height_input.value + " " + width_input.value)};
    //function screen_function(){stream_frame("Capturing", ""); }
    screen_button.addEventListener("click", screen_function);
    var _space2 = document.createTextNode("  ");
    choice_div.appendChild(_space2);
    // Put webcam button
    const upload_button = document.createElement('button');
    upload_button.setAttribute("id", "upload_button")
    upload_button.textContent = 'Upload video';
    choice_div.appendChild(upload_button);
    function upload_function(){alert(input_type + " " + height_input.value + " " + width_input.value)};
    //function upload_function(){stream_frame("Capturing", ""); }
    upload_button.addEventListener("click", upload_function);
}
