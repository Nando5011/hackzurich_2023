"""Return the pid of the window which is currently active.
for weird caching reasons this has to be done this way
Keyword arguments:
argument -- description
Return: return_description
"""


import psutil
import sys
import pygetwindow as gw
import time

if sys.platform == "darwin":
    from AppKit import NSWorkspace


if sys.platform == "darwin":
    front_window_info = NSWorkspace.sharedWorkspace().frontmostApplication()
    pid = front_window_info.processIdentifier()
    print("pi: " + str(pid))

elif sys.platform == "win32" or sys.platform == "cygwin" or sys.platform == "msys":
    active_window = gw.getActiveWindow()
    pid = active_window.processId

else:
    raise Exception("Platform not supported")

print(pid)