from pynput.keyboard import Key, Listener
from pynput import keyboard
import logging
import datetime
from datetime import timedelta
import time
import os

MAX_SHORTIMEHISTORYTIMESPAN = timedelta(seconds=300)

def getTimeStampFromHistoryEntry(entry):
    earliestTimeInHistory = entry
    # Split the string at the semicolon
    parts = entry.split(';')

    # Check if there was a semicolon in the string
    if len(parts) > 1:
        # Select the part after the semicolon (index 1)
        earliestTimeInHistory = parts[1]
    else:
        # Handle the case when there is no semicolon
        earliestTimeInHistory = entry
    return earliestTimeInHistory

class KeyLogger:
    def __init__(self):
        self.shortTimeHistory = []
        self.longTimeHistory = []

    # Get a timeDelta from the given comparetime (as string) and the current system time
    def getTimeDeltaToNow(self, compareTime):
        currentTime = datetime.datetime.now()
        timeDelta = currentTime - datetime.datetime.strptime(compareTime, '%H:%M:%S')
        return timeDelta

    def onKeyPress(self, keyStr):
        self.shortTimeHistory.append(keyStr + ";" + datetime.datetime.now().strftime('%H:%M:%S'))
        try:
            if(len(self.shortTimeHistory) != 0):
                # fix, if keyStr is "key.XXX", then somehwo only the "key." is removed instead of the whole?
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
