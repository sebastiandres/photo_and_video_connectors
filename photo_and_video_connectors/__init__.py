import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), "."))
sys.path.append(os.path.join(os.path.dirname(__file__), ".."))
sys.path.append(os.path.join(os.path.dirname(__file__), "..", ".."))

from .version_file import version_number as version

### Change it if you change the names of files or classes
from . import video
from . import photo
