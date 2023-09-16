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

analyzer = Analyzer(10)
    
while True:
    print("CPM: " + str(analyzer.getCPM()))
    print("WPM: " + str(analyzer.getWPM()))
    print("Speed Variation: " + str(analyzer.getSpeedVariation()))
    time.sleep(5)