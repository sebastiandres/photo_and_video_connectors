from IPython.display import display, Javascript
#from google.colab.output import eval_js

def setup_properties(video_type, height=480, width=600):
    """
    Starts the video stream ...    
    """
    print("Doing some pipelines yet. At setup_properties")
    #js = Javascript(JAVASCRIPT_CODE)
    #display(js)
    return
    
def update_frame(bbox):
    """
    Updates the video frame that is displayed
    to the updated 
    and returns the current frame capture by the camera. 
    Input: 
        bbox: ??
    Output:
        data: ??
    """
    print("Doing some pipelines yet. At update_frame")
    data = eval_js(f"stream_frame('{bbox}')")
    return data