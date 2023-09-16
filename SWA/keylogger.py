from pynput import keyboard
import datetime
from datetime import timedelta
import threading

# Sets up a keyboard listener and logs the keyboard inputs.
# A history of the last key presses can be accesses via getShortTimeHistory()
# How long this history is is set via the maxShortTimeHistoryTimeSpan parameter
class KeyLogger:
    def __init__(self, maxShortTimeHistoryTimeSpanSeconds: int, latestActivityTimeSpanSeconds: int):
        self.shortTimeHistory = []
        self.latestActivity = []
        self.LATESTACTIVITYTIMESPAN = datetime.timedelta(seconds=latestActivityTimeSpanSeconds)
        self.__clearLatestActivity()
        listener = keyboard.Listener(on_press=self.__onKeyPress)
        listener.start()
        self.MAX_SHORTIMEHISTORYTIMESPAN = datetime.timedelta(seconds=maxShortTimeHistoryTimeSpanSeconds)
    # Get a timeDelta from the given comparetime (as string) and the current system time
    def __getTimeDeltaToNow(self, compareTime):
        currentTime = datetime.datetime.now()
        timeDelta = currentTime - compareTime
        return timeDelta

    def __getTimeStampFromHistoryEntry(self, entry):
        return entry[1]

    def __clearLatestActivity(self):
        print("clearactivity")
        threading.Timer(self.LATESTACTIVITYTIMESPAN.seconds, self.__clearLatestActivity).start()
        self.latestActivity = []

    # Callback function that has to be called on keypress
    def __onKeyPress(self, key):
        try:
            keyStr = str(key)
            # Add keypress to short time history and latest activity
            self.latestActivity.append((keyStr, datetime.datetime.now()))
            self.shortTimeHistory.append((keyStr, datetime.datetime.now()))
            if(len(self.shortTimeHistory) != 0):
                earliestTimeStampInHistory = self.__getTimeStampFromHistoryEntry(self.shortTimeHistory[0])
                shortTimeHistoryTimeSpan = self.__getTimeDeltaToNow(earliestTimeStampInHistory)
            else:
                shortTimeHistoryTimeSpan = timedelta(hours=0, minutes=0, seconds=0)
            # Remove elements as long as the time span in the shortTimeHistory is >5min
            while(shortTimeHistoryTimeSpan.seconds > self.MAX_SHORTIMEHISTORYTIMESPAN.seconds):
                self.shortTimeHistory.pop(0)
                if(len(self.shortTimeHistory) != 0):
                    earliestTimeStampInHistory = self.__getTimeStampFromHistoryEntry(self.shortTimeHistory[0])
                    shortTimeHistoryTimeSpan = self.__getTimeDeltaToNow(earliestTimeStampInHistory)
                else:
                    shortTimeHistoryTimeSpan = timedelta(hours=0, minutes=0, seconds=0)
        except Exception as inst:
            print("EXCEPTION CATCHED. TYPE: " + str(type(inst)))    # the exception type
            print("EXCEPTION CATCHED. ARGS: " + str(inst.args))     # arguments stored in .args
            print("EXCEPTION CATCHED. INSTANCE: " + str(inst))      # __str__ allows args to be printed directly,

    # Get short time history. The STH shows every keystroke in the configured time span
    def getShortTimeHistory(self):
        return self.shortTimeHistory

    # Get latest activity. Shows every keystroke in the configured time span
    def getLatestActivity(self):
        return self.latestActivity