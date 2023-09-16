import sys
import pygetwindow as gw
import time
from AppKit import NSWorkspace
import psutil


def get_active_window_title():
    if sys.platform == "darwin":
        front_window_info = NSWorkspace.sharedWorkspace().frontmostApplication()
        pid = front_window_info.processIdentifier()

        # get process cmd using pid
        cmd = psutil.Process(pid).cmdline()
        cmd = " ".join(cmd)
        return cmd

    elif sys.platform == "win32" or sys.platform == "cygwin" or sys.platform == "msys":
        active_window = gw.getActiveWindow()
        pid = active_window.processId

        # get process cmd using pid
        cmd = psutil.Process(pid).cmdline()
        cmd = " ".join(cmd)
        return cmd

time.sleep(5)

print("Active window title:")
print(get_active_window_title())
