from IPython.display import display, Javascript
#from google.colab.output import eval_js

def setup_properties(video_type="", height=480, width=600):
    """
    Starts the video stream ...    
    """
    # Dynamically declarate the global variables in javascript
    js_1 = f"var DEFAULT_VIDEO_TYPE='{video_type}';"
    js_2 = f"var DEFAULT_HEIGHT='{height}';"
    js_3 = f"var DEFAULT_WIDTH='{width}';"
    js_code = Javascript("\n".join([js_1, js_2, js_3]))
    display(js_code)
    # Load the shared javascript functions
    # This requires VIDEO_TYPE, HEIGHT, WIDTH
    with open("../js_code/shared.js") as fh:
        js_txt = "".join(fh.readlines())
    js_code = Javascript(js_txt)
    display(js_code)
    # Load video.js
    # This requires VIDEO_TYPE, HEIGHT, WIDTH
    with open("../js_code/video.js") as fh:
        js_txt = "".join(fh.readlines())
    js_code = Javascript(js_txt)
    display(js_code)
    # Launch something, if needed
    display(Javascript('add_choice_div("video");'))
    return
    
def update_frame(bbox=""):
    """
    Updates the video frame that is displayed
    to the updated 
    and returns the current frame capture by the camera. 
    Input: 
        bbox: ??
    Output:
        data: ??
    """
    #print("Doing some pipelines yet. At update_frame")
    #data = ""
    data = eval_js(f"stream_frame('{bbox}')")
    return data