import pystray
import os
import webview
import qrcode
import uuid
from PIL import Image
from firebaseclient import FirebaseClient
from screeninfo import get_monitors
import sys




class JsApi:
    def __init__(self) -> None:
        pass
    
    def add_tray(self, tray):
        self.tray = tray
        
    def start_meditation():
        pass
        
    def close_meditation(self):
        self.tray.close_meditation_window()
        
    def close_qrcode(self):
        self.tray.close_qrcode_window()
        



class Tray:
    
    def __init__(self) -> None:
        
        self.open_window = None
        
        self.jsapi = JsApi()
        self.jsapi.add_tray(self)
        
        self.qrcode_window = None
        self.meditation_window = None
        
        
        
        self.menu = (
            pystray.MenuItem('QR Code', self.on_open_qrcode_window),
            pystray.MenuItem('Meditation', self.on_open_meditation_window),
            pystray.MenuItem('Exit', self.on_exit),
        )

        #self.firebase_client = FirebaseClient()

        self.image = Image.open(os.path.join(os.getcwd(), 'images', 'logo.png'))  # Replace with the path to your icon image
        self.icon = pystray.Icon("Bitwise", self.image, menu=self.menu)
                
        self.uuid = self.generate_uuid()
        self.generate_qrcode(self.uuid)
        
    
    def calculate_position_of_tray_view(self, dimensions) -> (int, int):
        for m in get_monitors():
            if m.is_primary:
                    
                if sys.platform == 'darwin':
                    return (round(m.width*0.6), 0)
                
                if sys.platform == 'win32' or sys.platform == 'cygwin' or sys.platform == 'msys':
                    return (round(m.width * 0.6), round(m.height-dimensions[1]))
                
    def init_firebase(self) -> None:    
        pass

    def generate_uuid(self) -> str:
        return uuid.uuid5(uuid.NAMESPACE_OID, str(uuid.getnode()))

    def generate_qrcode(self, user_uuid) -> None:
        img = qrcode.make('https://{}'.format(user_uuid))
        type(img) 
        img.save(os.path.join(os.getcwd(), "tray", "user_qrcode.png"))


    def on_open_qrcode_window(self):
        if self.open_window is None:
            
            self.qrcode_window = webview.create_window(
            'QRCODE', 
            'qrcode.html', 
            on_top=True, 
            resizable=False, 
            frameless=True, 
            draggable=False,
            width=250, 
            height=330, 
            y=0, 
            x=self.calculate_position_of_tray_view((250, 320))[0],
            js_api=self.jsapi
            )
            self.open_window = self.qrcode_window
            self.qrcode_window.events.closing +=  self.on_closed
            webview.start(self.qrcode_window)
            
            print(self.open_window)
        
        
    def on_open_meditation_window(self):
        if self.open_window is None:
            self.meditation_window = webview.create_window(
            'MEDITATION', 
            'meditation_question.html', 
            on_top=True, 
            resizable=False, 
            frameless=True, 
            draggable=False,
            width=250, 
            height=320, 
            y=0, 
            x=self.calculate_position_of_tray_view((250, 320))[0],
            js_api=self.jsapi
            )
            
            self.open_window = self.meditation_window
            self.meditation_window.events.closing +=  self.on_closed
            webview.start(self.meditation_window)


    def on_exit(self, icon):
        self.open_window = None
        icon.stop()

    def on_closed(self):
        self.open_window = None
    
    def run(self) -> None:
        self.icon.run()
        
    def destroy_open_window(self):
        self.open_window = None

    def close_meditation_window(self):
        self.open_window = None
        self.meditation_window.destroy()
        
    def close_qrcode_window(self):
        self.open_window = None
        self.qrcode_window.destroy()
        
if __name__ == '__main__':
    tray_app = Tray()
    tray_app.run()
