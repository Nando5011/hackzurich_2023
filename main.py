from tray.firebaseclient import FirebaseClient
from SWA.windowlogger import WindowLogger
import datetime
import time
import threading



if __name__ == '__main__':

    fb = FirebaseClient()
    
    windowLogger = WindowLogger(datetime.timedelta(seconds=1))
    thread = threading.Thread(target=windowLogger.start)
    thread.start()
    print("Started window logger")
    while True:
        # pretty print the time per window
        #timePerWindow = windowLogger.getTimePerWindow()
        #print("Time per window:")
        #for key in timePerWindow:
        #    fb.send_windowlogger_data_to_firestore(key, str(timePerWindow[key]))
            
        
        activeWindowHistory = windowLogger.getActiveWindowHistoryCompacted()
        
        for w in activeWindowHistory:
            fb.send_windowlogger_data_to_firestore(w[0], w[1])
            
        
        #print(windowLogger.getActiveWindowHistoryCompacted())
            
        time.sleep(10)