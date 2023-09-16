from pynput.keyboard import Key, Listener
import logging
import datetime
from datetime import timedelta
import time

# 'e' 23:59:23

class KeyLogger:
    def __init__(self):
        self.shortTimeHistory = []
        self.longTimeHistory = []

    def getTimeDeltaToNow(self, compareTime):
        currentTime = datetime.datetime.now()
        timeDelta = currentTime - compareTime
        return timeDelta

    def onKeyPress(self, keyStr):
        self.shortTimeHistory.append(keyStr + datetime.datetime.now().strftime('%H:%M:%S'))
        # TODO fix this: parse the str
        shortTimeHistoryTimeSpan = self.getTimeDeltaToNow(self.shortTimeHistory[0])
        MAX_SHORTIMEHISTORYTIMESPAN = timedelta(minutes=5)
        # Remove elements as long as the time span in the shortTimeHistory is >5min
        while(shortTimeHistoryTimeSpan > MAX_SHORTIMEHISTORYTIMESPAN):
            self.shortTimeHistory.pop(0)
            shortTimeHistoryTimeSpan = self.getTimeDeltaToNow(self.shortTimeHistory[0])

    def getShortTimeHistory(self):
        return self.shortTimeHistory

mykeyLogger = KeyLogger()

def on_press(key):
    mykeyLogger.onKeyPress(str(key))

with Listener(on_press=on_press) as listener:
    listener.join()

while(1):
    print(KeyLogger.getShortTimeHistory())
    time.sleep(5)

