# Library to configure this setup file
from distutils.core import setup

# Import the version of the the pypsdier
from photo_and_video_connectors import version as current_version
print("Current Library Version:", current_version)

# Use the README for the long description
long_description=open('README.md').read() ### Change the content of README.rst

setup(
    name='photo_and_video_connectors',        ### Change here
    version=current_version,
    author='Sebastian Flores Benner',       ### Change here
    author_email='sebastiandres@gmail.com', ### Change here
    packages=['photo_and_video_connectors'],  ### Change here
    scripts=[],
    url='https://github.com/sebastiandres/photo_and_video_connectors',    ### Change here
    license='MIT',  ### May/May not change this. But if you change it, must also change LICENCE file
    description='Photo and video connectors for python.', ### Change here
    long_description=long_description,
)
