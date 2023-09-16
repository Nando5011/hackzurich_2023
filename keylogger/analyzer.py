from keylogger import KeyLogger
import time

WPM_THRESHOLD = 30
CPM_THRESHOLD = 150
SPEED_VARIATION_THRESHOLD = 0.6
ABU_THRESHOLD = 10
RBU_THRESHOLD = 0.1

class Analyzer:
    def __init__(self, maxLoggingTime: int):
        self.keylogger = KeyLogger(maxLoggingTime)
        self.MAX_LOGGING_TIME = maxLoggingTime

    def getCPM(self):
        shortTimeHistory = self.keylogger.getShortTimeHistory()
        cpm = len(shortTimeHistory) / (self.MAX_LOGGING_TIME / 60)
        return cpm

    def getWPM(self):
        shortTimeHistory = self.keylogger.getShortTimeHistory()
        wpm = len(shortTimeHistory) / (self.MAX_LOGGING_TIME / 60) / 5
        return wpm

    def getSpeedVariation(self):
        shortTimeHistory = self.keylogger.getShortTimeHistory()
        speedVariation = 0
        for i in range(len(shortTimeHistory) - 1):
            timeDelta = shortTimeHistory[i + 1][1] - shortTimeHistory[i][1]
            speedVariation += timeDelta.seconds

        if len(shortTimeHistory) != 0:
            speedVariation /= len(shortTimeHistory)
            return speedVariation
        else:
            return 0

    def getABU(self):
        """
        ABU = Absolute Backspace Usage

        The ABU is a value that shows how often the user uses the backspace key.
        """
        shortTimeHistory = self.keylogger.getShortTimeHistory()
        backspaceCount = 0
        for entry in shortTimeHistory:
            if entry[0] == "Key.backspace":
                backspaceCount += 1
        return backspaceCount

    def getRBU(self):
        """
        RBU = Relative Backspace Usage

        The RBU is a value that shows how often the user uses the backspace key relative to the other keys.
        """
        shortTimeHistory = self.keylogger.getShortTimeHistory()
        backspaceCount = self.getABU()
        if len(shortTimeHistory) == 0:
            return 0
        rbu = backspaceCount / len(shortTimeHistory)
        return rbu
    
    def getAllValues(self):
        return {
            "CPM": self.getCPM(), 
            "WPM": self.getWPM(), 
            "SpeedVariation": self.getSpeedVariation(),
            "ABU": self.getABU(), 
            "RBU": self.getRBU()
        }
    

def checkForThresholds(values):
    if values["WPM"] < WPM_THRESHOLD:
        print("WARNING: WPM is below threshold!")
    if values["CPM"] < CPM_THRESHOLD:
        print("WARNING: CPM is below threshold!")
    if values["SpeedVariation"] > SPEED_VARIATION_THRESHOLD:
        print("WARNING: Speed variation is above threshold!")
    if values["ABU"] > ABU_THRESHOLD:
        print("WARNING: ABU is above threshold!")
    if values["RBU"] > RBU_THRESHOLD:
        print("WARNING: RBU is above threshold!")

analyzer = Analyzer(10)

while True:
    values = analyzer.getAllValues()
    # log all values
    print(values)

    # check for thresholds
    checkForThresholds(values)
    
    time.sleep(5)
