import threading
import time
<<<<<<< HEAD
import math
from .keylogger import KeyLogger
from .mouselogger import MouseLogger
=======
>>>>>>> 0ad6cedf18092bfe285d0c312f86c6e367baf008

WPM_THRESHOLD = 30
CPM_THRESHOLD = 150
SPEED_VARIATION_THRESHOLD = 0.6
ABU_THRESHOLD = 10
RBU_THRESHOLD = 0.1

# The Analyzer will automatically log the keyboard inputs of the user and draw statistics from them.
# Based on these statistics the Analyzer will automatically issue threads that will be executed independently
# The Analyzer analyses the user in the given interval (on creation). This is called the refresh time
# IMPORTANT: The Analyzer uses a blocking sleep function in order to comply with the refresh time,
# so create the Analyzer in an own thread/context
# IMPORTANT: The creation of the threads also needs some time (~1-2 seconds on easy cases), so do not
# choose a refresh time of atleast 5 seconds.
class Analyzer:
    def __init__(self, refreshTime: int, shortTimeHistoryTimeSpan: int):
        self.keylogger = KeyLogger(shortTimeHistoryTimeSpan)
        self.mouselogger = MouseLogger()
        self.REFRESH_TIME = refreshTime
        self.workflowRatings = []
        self.latestKeyboardActivity = []
        self.latestMouseActivity = []
        self.__run()

    def __updateLatestActivity(self):
        self.latestKeyboardActivity = []
        self.latestKeyboardActivity = self.keylogger.getLatestActivity()
        self.latestMouseActivity = self.mouselogger.getLatestActivity()

    def __run(self):
        while(True):
            startTime = time.time()
            self.__updateLatestActivity()
            self.__updateWorkflowRating()
            if(len(self.workflowRatings) == 6):
                self.__checkForThresholds()
            endTime = time.time()
            runTime = endTime - startTime
            # If runTime is bigger than refresh time, dont wait
            # this could lead to missed inputs
            if(self.REFRESH_TIME > runTime):
                time.sleep(self.REFRESH_TIME - runTime)

    # These functions will get executed independently on their events
    # TODO implement these based on the statistics, these can be blocking as they are executed independently
    def __onAFKStatus(self):
        print("AFK")
        time.sleep(10)
    def __onSuggestBreak(self):
        print("TO A BREAK")
    def __onEnterFocusMode(self):
        print("FOCUS MODE ON")
    def __onNotifyWorkflowRating(self):
        print("NOTIFYING FIREBASE")
    def __printStatus(self):
        # print(self.__getLatestValues())
        # print(self.workflowRatings)
        print("Average workflowRating: " + str(sum(self.workflowRatings) / len(self.workflowRatings)))

    def __getLatestCPM(self):
        cpm = len(self.latestKeyboardActivity) / (self.REFRESH_TIME / 60)
        return cpm

    def __getLatestWPM(self):
        wpm = len(self.latestKeyboardActivity) / (self.REFRESH_TIME / 60) / 5
        return wpm

    def __getLatestSpeedVariation(self):
        speedVariation = 0
        for i in range(len(self.latestKeyboardActivity) - 1):
            timeDelta = self.latestKeyboardActivity[i + 1][1] - self.latestKeyboardActivity[i][1]
            speedVariation += timeDelta.seconds

        if len(self.latestKeyboardActivity) != 0:
            speedVariation /= len(self.latestKeyboardActivity)
            return speedVariation
        else:
            return 0

    def __getLatestABU(self):
        """
        ABU = Absolute Backspace Usage

        The ABU is a value that shows how often the user uses the backspace key.
        """
        backspaceCount = 0
        for entry in self.latestKeyboardActivity:
            if entry[0] == "Key.backspace":
                backspaceCount += 1
        return backspaceCount

    def __getLatestRBU(self):
        """
        RBU = Relative Backspace Usage

        The RBU is a value that shows how often the user uses the backspace key relative to the other keys.
        """
        backspaceCount = self.__getLatestABU()
        if len(self.latestKeyboardActivity) == 0:
            return 0
        rbu = backspaceCount / len(self.latestKeyboardActivity)
        return rbu

    def __getLatestAvgMouseSpeed(self):
        NOMOVEMENT_SPEED = 30
        numMouseMovements = 0
        speeds = []
        for activity in self.latestMouseActivity:
            # Only count speed if mouse was actually moving a bit
            if(activity[0] >= NOMOVEMENT_SPEED):
                speeds.append(activity[0])
        # Return avg speed
        if(len(speeds) > 0):
            return sum(speeds) / len(speeds)
        else:
            return 0


    def __getLatestValues(self):
        return {
            "CPM": self.__getLatestCPM(),
            "WPM": self.__getLatestWPM(),
            "SpeedVariation": self.__getLatestSpeedVariation(),
            "ABU": self.__getLatestABU(),
            "RBU": self.__getLatestRBU(),
            "avgMouseSpeed": self.__getLatestAvgMouseSpeed(),
            "mouseActive": True if (self.__getLatestAvgMouseSpeed() > 0) else False
        }

    def __setToBoundaries(self, value, valueMin, valueMax):
        if(value < valueMin):
            value = valueMin
        if(value > valueMax):
            value = valueMax
        return value

    def __updateWorkflowRating(self):
        WPM_BOT = 20
        WPM_AVG = 70
        WPM_TOP = 120
        WPM_WEIGHT = 40

        RBU_BOT = 1.00
        RBU_AVG = 0.08
        RBU_TOP = 0.00
        RBU_WEIGHT = 20

        MOUSESPEED_BOT = 50
        MOUSESPEED_AVG = 200
        MOUSESPEED_TOP = 350
        MOUSESPEED_WEIGHT = 30

        averageWorkFlowRating = 50
        wordsPerMinute = self.__getLatestWPM()
        wordsPerMinuteValid = True if (wordsPerMinute > 0) else False
        relativeBackSpaceUsageValid = True if (wordsPerMinute > 0) else False
        wordsPerMinute = self.__setToBoundaries(self.__getLatestWPM(), WPM_BOT, WPM_TOP)
        relativeBackSpaceUsage =  self.__setToBoundaries(self.__getLatestRBU(), RBU_BOT, RBU_TOP)
        avgMouseSpeed = self.__getLatestAvgMouseSpeed()
        mouseActive = True if (avgMouseSpeed > 0) else False
        avgMouseSpeed = self.__setToBoundaries(avgMouseSpeed, MOUSESPEED_BOT, MOUSESPEED_TOP)

        wpmRating = (wordsPerMinute-WPM_BOT) / (WPM_TOP-WPM_BOT)

        # If rbu > than avg -> rating 0...0.5
        if(relativeBackSpaceUsage > RBU_AVG):
            rbuRating = relativeBackSpaceUsage / 1.84
        # If rbu <= than avg -> rating 0.5...1
        else:
            rbuRating = 1 - (relativeBackSpaceUsage / 0.016)

        mouseSpeedRating = (avgMouseSpeed-MOUSESPEED_BOT) / (MOUSESPEED_TOP-MOUSESPEED_BOT)

        if(wordsPerMinuteValid == True):
            wpmPoints = (wpmRating * WPM_WEIGHT) - (WPM_WEIGHT/2)
        else:
            wpmPoints = 0
        if(relativeBackSpaceUsageValid == True):
            rbuPoints = (rbuRating * RBU_WEIGHT) - (RBU_WEIGHT/2)
        else:
            rbuPoints = 0
        if(mouseActive == True):
            mouseSpeedPoints = (mouseSpeedRating * MOUSESPEED_WEIGHT) - (MOUSESPEED_WEIGHT/2)
        else:
            mouseSpeedPoints = 0

        if((wordsPerMinuteValid == False) and (relativeBackSpaceUsageValid == False) and (mouseActive == False)):
            workflowRating = 0
        else:
            workflowRating = averageWorkFlowRating + wpmPoints + rbuPoints + mouseSpeedPoints
            workflowRating = self.__setToBoundaries(workflowRating, 0, 100)

        while(len(self.workflowRatings) >= 6):
            self.workflowRatings.pop(0)
        self.workflowRatings.append(workflowRating)

    def __checkForThresholds(self):
        if(len(self.workflowRatings) != 0):
            averageWorkflowRating = sum(self.workflowRatings) / len(self.workflowRatings)
        else:
            averageWorkflowRating = 0

        if(averageWorkflowRating < 5):
            onAFKThread = threading.Thread(target=self.__onAFKStatus, args=(), kwargs={})
            onAFKThread.start()
        elif(averageWorkflowRating < 40):
            suggestBreakThread = threading.Thread(target=self.__onSuggestBreak, args=(), kwargs={})
            suggestBreakThread.start()
        elif(averageWorkflowRating > 65):
            enterFocusModeThread = threading.Thread(target=self.__onEnterFocusMode, args=(), kwargs={})
            enterFocusModeThread.start()

        # Send data to firebase
        notifyWorkflowRatingThread = threading.Thread(target=self.__onNotifyWorkflowRating, args=(), kwargs={})
        notifyWorkflowRatingThread.start()

        statusThread = threading.Thread(target=self.__printStatus, args=(), kwargs={})
        statusThread.start()