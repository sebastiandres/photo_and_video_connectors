from IPython.display import HTML
import os
try: 
    # Use google's version to evaluate javascript
    from google.colab.output import eval_js
    eval_js_available = True
except:
    eval_js_available = False

def setup_properties(video_type="", width=600, height=480):
    """
    Starts the video stream ...    
    """
    # Get file path
    cwd = os.path.dirname(__file__)
    # Dynamically declarate the global variables in javascript
    with open(os.path.join(cwd, "js_code/video.html")) as fh:
        my_html = "".join(fh.readlines())
    from IPython import embed; embed()
    # Change values
    swap_dict = {'DEFAULT_VIDEO_TYPE':video_type,
                 'DEFAULT_WIDTH':str(width),
                 'DEFAULT_HEIGHT':str(height),
                }
    for key, val in swap_dict.items():
        my_html = my_html.replace(key, val)
    print(my_html)
    return HTML(my_html)
    
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
        f"""
        data_value = stream_frame('{bbox}')
        var command = "data = " + "'" + data_value + "'"  
        var kernel = IPython.notebook.kernel;
        kernel.execute(command);
        """
        # This runs the javascript and makes data available
        HTML(js_wrapper)

    return data


if __name__=="__main__":
    setup_properties(video_type="", width=600, height=480)