import sys
import pygetwindow as gw
import time
import asyncio
import threading
import datetime
import subprocess
import shlex
import psutil

if sys.platform == "darwin":
    from AppKit import NSWorkspace

def get_pid_of_active_window():
    # call the test script and get the output
    if sys.platform == "darwin" or sys.platform == "linux":
        output = subprocess.check_output(["python3", "SWA/get_pid.py"])
        output = subprocess.check_output(["python3", "SWA/get_pid.py"])
    else:
        output = subprocess.check_output(["py", "SWA/get_pid.py"])
    # decode the output
    output = output.decode("utf-8")
    # split the output into lines
    output = output.split("\n")
    # remove the last line, because it is empty
    output.pop()
    # remove the first line, because it is a header
    output.pop(0)
    # remove the last line, because it is a footer

    return output


class WindowLogger:
    """This class logs the active window.

    the report since the last report can be accessed via getActiveWindowHistory()
    """
    
    def __init__(self, interval: datetime.timedelta):
        self.activeWindowHistory = []
        self.activeWindowHistoryCompacted = []
        self.interval = interval

    def __logActiveWindowName(self):
        pid = get_pid_of_active_window()
        if len(pid) == 0:
            return
        pid = pid[0]
        process = psutil.Process(int(pid))
        processName = process.exe()
        self.activeWindowHistory.append((processName, datetime.datetime.now()))

        # log to compacted history
        if len(self.activeWindowHistoryCompacted) == 0:
            self.activeWindowHistoryCompacted.append((processName, datetime.datetime.now()))
        else:
            lastEntry = self.activeWindowHistoryCompacted[-1]
            if lastEntry[0] == processName:
                self.activeWindowHistoryCompacted[-1] = (processName, lastEntry[1] + self.interval)
            else:
                self.activeWindowHistoryCompacted.append((processName, datetime.datetime.now()))
            


    async def __run(self):
        while True:
            self.__logActiveWindowName()
            await asyncio.sleep(self.interval.seconds)

    def start(self):
        asyncio.run(self.__run())

    def getActiveWindowHistory(self):
        return self.activeWindowHistory
    
    def getActiveWindowHistoryCompacted(self):
        return self.activeWindowHistoryCompacted
    
    def getTimePerWindow(self):
        timePerWindow = {}
        for entry in self.activeWindowHistory:
            if entry[0] in timePerWindow:
                timePerWindow[entry[0]] += self.interval.seconds
            else:
                timePerWindow[entry[0]] = self.interval.seconds
        return timePerWindow

if __name__ == "__main__":
    windowLogger = WindowLogger(datetime.timedelta(seconds=1))
    thread = threading.Thread(target=windowLogger.start)
    thread.start()
    print("Started window logger")
    while True:
        # pretty print the time per window
        timePerWindow = windowLogger.getTimePerWindow()
        print("Time per window:")
        for key in timePerWindow:
            print(key + ": " + str(timePerWindow[key]))
        time.sleep(10)
