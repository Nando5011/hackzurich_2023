from tray.firebaseclient import FirebaseClient
from datetime import datetime



if __name__ == '__main__':
    
    unix_timestamp = (datetime.now() - datetime(1970, 1, 1)).total_seconds() # Just for testing puirposes     
    
    
    fb = FirebaseClient()
    fb.test_connection(unix_timestamp, str(unix_timestamp)+"@check.mate")
    
    
    

