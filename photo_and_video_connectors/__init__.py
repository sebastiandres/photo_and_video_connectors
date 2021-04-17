import os, sys
sys.path.insert(0, os.path.abspath(".."))
sys.path.insert(0, os.path.abspath("."))

from .version_file import version_number as version

### Change it if you change the names of files or classes
from .py_code import video