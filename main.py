from tray.firebaseclient import FirebaseClient
from SWA.windowlogger import WindowLogger
from tray.start_tray import Tray
import datetime
import time
import threading
from SWA.analyzer import Analyzer
import os
import pystray


def analyzerTask():
    SHORTTIMEHISTORYTIME_SECONDS = 10
    REFRESH_RATE_SECONDS = 5
    ourAnalyzer = Analyzer(REFRESH_RATE_SECONDS, SHORTTIMEHISTORYTIME_SECONDS)
    

def subsystem():
        #initialze the WindowLogger
    windowLogger = WindowLogger(datetime.timedelta(seconds=1))
    thread = threading.Thread(target=windowLogger.start)
    thread.start()
        
    #iniitalize the ANalyzer
    analyzerThread = threading.Thread(target=analyzerTask, args=(), kwargs={})
    analyzerThread.start()
    
    print("Started window logger and analyzer")
    while True:
        
        activeWindowHistory = windowLogger.getActiveWindowHistoryCompacted()
        
        for w in activeWindowHistory:
            fb.send_windowlogger_data_to_firestore(w[0], w[1])
        
        for i in range(0, 100, 1):
            if(i%10 == 0):
                print("Latest activity: ")
                with open( os.path.join(os.getcwd(), "log","shortTimeHistory.csv"), 'r') as file:
                    print(file.read())
            time.sleep(2)
        

    


if __name__ == '__main__':

    # Iniitlaize FirebaseClient
    fb = FirebaseClient()
    tray = Tray()

    worker_thread = threading.Thread(target=subsystem)
    worker_thread.daemon = True  # Daemonize the thread so it exits when the main program does
    worker_thread.start()
    
    tray.start()
    

