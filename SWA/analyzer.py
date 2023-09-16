from keylogger import KeyLogger
import threading
import time
import timeit

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
    def __init__(self, refreshTime: int):
        self.keylogger = KeyLogger(refreshTime, refreshTime)
        self.REFRESH_TIME = refreshTime
        self.latestActivity = []
        self.__run()

    def __updateShortTimeHistory(self):
        self.latestActivity = []
        self.latestActivity = self.keylogger.getLatestActivity()

    def __run(self):
        while(True):
            startTime = time.time()
            self.__updateShortTimeHistory()
            self.__checkForThresholds()
            endTime = time.time()
            runTime = endTime - startTime
            time.sleep(ANALYZEREFRESHTIME - runTime)

    # These functions will get executed independently on their events
    # TODO implement these based on the statistics, these can be blocking as they are executed independently
    def __onWPMThresholdExceeded(self):
        print("WARNING: WPM is below threshold!")
        time.sleep(10)
    def __onCPMThresholdExceeded(self):
        print("WARNING: CPM is below threshold!")
        time.sleep(10)
    def __onSpeedThresholdExceeded(self):
        print("WARNING: Speed variation above threshold!")
    def __onABUThresholdExceeded(self):
        print("WARNING: ABU is above threshold!")
    def __onRBUThresholdExceeded(self):
        print("WARNING: RBU is above threshold!")
    def __printStatus(self):
        print(self.__getLatestValues())

    def __getLatestCPM(self):
        cpm = len(self.latestActivity) / (self.REFRESH_TIME / 60)
        return cpm

    def __getLatestWPM(self):
        wpm = len(self.latestActivity) / (self.REFRESH_TIME / 60) / 5
        return wpm

    def __getLatestSpeedVariation(self):
        speedVariation = 0
        for i in range(len(self.latestActivity) - 1):
            timeDelta = self.latestActivity[i + 1][1] - self.latestActivity[i][1]
            speedVariation += timeDelta.seconds

        if len(self.latestActivity) != 0:
            speedVariation /= len(self.latestActivity)
            return speedVariation
        else:
            return 0

    def __getLatestABU(self):
        """
        ABU = Absolute Backspace Usage

        The ABU is a value that shows how often the user uses the backspace key.
        """
        backspaceCount = 0
        for entry in self.latestActivity:
            if entry[0] == "Key.backspace":
                backspaceCount += 1
        return backspaceCount

    def __getLatestRBU(self):
        """
        RBU = Relative Backspace Usage

        The RBU is a value that shows how often the user uses the backspace key relative to the other keys.
        """
        backspaceCount = self.__getLatestABU()
        if len(self.latestActivity) == 0:
            return 0
        rbu = backspaceCount / len(self.latestActivity)
        return rbu

    def __getLatestValues(self):
        return {
            "CPM": self.__getLatestCPM(),
            "WPM": self.__getLatestWPM(),
            "SpeedVariation": self.__getLatestSpeedVariation(),
            "ABU": self.__getLatestABU(),
            "RBU": self.__getLatestRBU()
        }

    def __checkForThresholds(self):
        values = self.__getLatestValues()
        if values["WPM"] < WPM_THRESHOLD:
            onWPMThresholdExceededThread = threading.Thread(target=self.__onWPMThresholdExceeded, args=(), kwargs={})
            onWPMThresholdExceededThread.start()
        if values["CPM"] < CPM_THRESHOLD:
            onCPMThresholdExceededThread = threading.Thread(target=self.__onCPMThresholdExceeded, args=(), kwargs={})
            onCPMThresholdExceededThread.start()
        if values["SpeedVariation"] > SPEED_VARIATION_THRESHOLD:
            onSpeedThresholdExceededThread = threading.Thread(target=self.__onSpeedThresholdExceeded, args=(), kwargs={})
            onSpeedThresholdExceededThread.start()
        if values["ABU"] > ABU_THRESHOLD:
            onABUThresholdExceededThread = threading.Thread(target=self.__onABUThresholdExceeded, args=(), kwargs={})
            onABUThresholdExceededThread.start()
        if values["RBU"] > RBU_THRESHOLD:
            onRBUThresholdExceededThread = threading.Thread(target=self.__onRBUThresholdExceeded, args=(), kwargs={})
            onRBUThresholdExceededThread.start()
        statusThread = threading.Thread(target=self.__printStatus, args=(), kwargs={})
        statusThread.start()

ANALYZEREFRESHTIME = 5
analyzer = Analyzer(ANALYZEREFRESHTIME)