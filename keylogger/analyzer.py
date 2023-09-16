from keylogger import KeyLogger
import time

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
        
        if(len(shortTimeHistory) != 0):
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
            if(entry[0] == "Key.backspace"):
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
        

analyzer = Analyzer(10)
    
while True:
    print("CPM: " + str(analyzer.getCPM()))
    print("WPM: " + str(analyzer.getWPM()))
    print("Speed Variation: " + str(analyzer.getSpeedVariation()))
    print("ABU: " + str(analyzer.getABU()))
    print("RBU: " + str(analyzer.getRBU()))
    time.sleep(5)