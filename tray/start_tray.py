import pystray
import os
import webview
import qrcode
import uuid
from PIL import Image
from firebaseclient import FirebaseClient
from screeninfo import get_monitors
import sys


class QRApi:
    def window_blur(self):
        print("blurred")


class Tray:

    def __init__(self) -> None:
        
        self.menu = (
            pystray.MenuItem('QR Code', self.on_open_qrcode_window),
            pystray.MenuItem('Exit', self.on_exit),
        )

        #self.firebase_client = FirebaseClient()


        self.image = Image.open(os.path.join(os.getcwd(), 'tray', 'logitech.png'))  # Replace with the path to your icon image
        self.icon = pystray.Icon("MyApp", self.image, menu=self.menu)

        self.qrcode_window = webview.create_window(
            'QRCode', 
            'qrcode.html', 
            on_top=True, 
            resizable=False, 
            frameless=True, 
            width=250, 
            height=320, 
            y=0, 
            x=self.calculate_position_of_tray_view((250, 320))[0],
            js_api=QRApi()
            )
        self.qrcode_window.events.closing += self.on_closing
        self.qrcode_window_is_open = False

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
        if not self.qrcode_window_is_open:
            webview.start(self.qrcode_window, debug=True)
            self.qrcode_window_is_open = True


    def on_exit(self, icon, item):
        icon.stop()

    def on_closing(self):
        pass
    
    def run(self) -> None:
        self.icon.run()



if __name__ == '__main__':
    tray_app = Tray()
    tray_app.run()


