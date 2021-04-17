from IPython.display import HTML
import os
try: 
    # Use google's version to evaluate javascript
    from google.colab.output import eval_js
    eval_js_available = True
except:
    eval_js_available = False

def setup_properties(video_type="", height=480, width=600):
    """
    Starts the video stream ...    
    """
    # Get file path
    cwd = os.path.dirname(__file__)
    # Dynamically declarate the global variables in javascript
    with open(os.path.join(cwd, "js_code/video.html")) as fh:
        my_html_template = "".join(fh.readlines())
    my_html = my_html_template.format(video_type, height, width)
    # Save it for debug purposes
    with open(os.path.join(cwd, "js_code/video_result.html"), "r") as fh:
        fh.write(my_html)
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
    if eval_js_available:
        data = eval_js(f"stream_frame('{bbox}')")
    else:
        """
        var kernel = IPython.notebook.kernel;
        kernel.execute(command, {"output": callback});
        """
        # This runs the javascript and makes data available
        HTML(js_wrapper)

    return data