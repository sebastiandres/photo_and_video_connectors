from IPython.display import display, Javascript
#from google.colab.output import eval_js
import os

def setup_properties(video_type="", height=480, width=600):
    """
    Starts the video stream ...    
    """
    # Get file path
    cwd = os.path.dirname(__file__), ".")
    # Dynamically declarate the global variables in javascript
    js_1 = f"var VIDEO_TYPE = '{video_type}';"
    js_2 = f"var HEIGHT = '{height}';"
    js_3 = f"var WIDTH = '{width}';"
    js_txt = "\n".join([js_1, js_2, js_3, "\n\n"])
    # Load the shared javascript functions
    # This requires VIDEO_TYPE, HEIGHT, WIDTH
    with open(os.path.join(cwd, "js_code/shared.js")) as fh:
        js_aux = "".join(fh.readlines())
    js_txt = js_txt + "\n" + js_aux
    # Load video.js
    # This requires VIDEO_TYPE, HEIGHT, WIDTH
    with open(os.path.join(cwd, "js_code/shared.js")) as fh:
        js_aux = "".join(fh.readlines())
    js_txt = js_txt + "\n" + js_aux
    # Launch something, if needed
    js_txt = js_txt + "\n" + 'add_choice_div("video");'
    with open("js_code.txt","w") as fh:
        fh.write(js_txt)
    display(Javascript(js_txt))
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