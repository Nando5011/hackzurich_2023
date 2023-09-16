from keylogger import KeyLogger
import time

# Create a keylogger object
klogger = KeyLogger(300)

while True:
    # Get the short time history
    shortTimeHistory = klogger.getShortTimeHistory()
    #calcuilate cpm
    cpm = len(shortTimeHistory) / 5
    # Print cpm
    print("CPM: " + str(cpm))
    # Sleep 1 second
    time.sleep(5)