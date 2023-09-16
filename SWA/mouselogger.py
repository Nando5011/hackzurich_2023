import pyautogui
import threading
import math
import datetime

# Sets up a keyboard listener and logs the keyboard inputs.
# A history of the last key presses can be accesses via getShortTimeHistory()
# How long this history is is set via the maxShortTimeHistoryTimeSpan parameter
class MouseLogger:
    def __init__(self):
        self.lastPosition = pyautogui.position()
        self.currentPosition = []
        self.latestActivity = []
        self.__everyQuarterSecond()

    # Get velocity in pixel/seconds
    def __getVelocity(self, point1, point2):
        deltaX = abs(point1[0] - point2[0])
        deltaY = abs(point1[1] - point2[1])
        distance = math.sqrt(deltaX**2 + deltaY**2)
        # velocity = distance because time is 1
        return distance

    def __everyQuarterSecond(self):
        self.currentPosition = pyautogui.position()
        velocity = self.__getVelocity(self.currentPosition, self.lastPosition)
        self.latestActivity.append((velocity, datetime.datetime.now()))
        self.lastPosition = self.currentPosition

        timer = threading.Timer(0.25, self.__everyQuarterSecond)
        timer.start()  # after 0.25 seconds do it again

## (in the meanwhile you can do other stuff...)

    def getLatestActivity(self):
        ret = self.latestActivity
        self.latestActivity = []
        return ret
