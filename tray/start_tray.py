from uuid import UUID

import pystray
import os
import webview
import qrcode
import uuid
from PIL import Image
from screeninfo import get_monitors
import sys
import time
from webview import window
from queue import Queue

class JsApi:
    def __init__(self, tray) -> None:
        self.tray = tray

    def add_tray(self, tray):
        self.tray = tray

    def start_meditation(self):
        self.close_meditation()
        self.tray.start_meditation()

    def close_meditation(self):
        self.tray.close_meditation_window()

    def close_qrcode(self):
        self.tray.close_qrcode_window()
        
    def close_afk(self):
        self.tray.close_afk()


class Tray:
    
    def __init__(self, q: Queue) -> None:
        
        self.q = q

        self.open_window = None

        self.jsapi = JsApi(self)

        self.qrcode_window = None
        self.meditation_window = None
        self.meditation_player = None
        self.afk_window = None

        self.windows = []

        self.menu = (
            pystray.MenuItem('QR Code', self.open_qrcode_window),
            pystray.MenuItem('Meditation', self.open_meditation_window),
            pystray.MenuItem('AFK', self.open_afk_window),
            pystray.MenuItem('Exit', self.on_exit),
        )

        # self.firebase_client = FirebaseClient()

        self.image = Image.open(
            os.path.join(os.getcwd(), 'images', 'logos','logo_512_transparent.png'))  # Replace with the path to your icon image
        self.icon = pystray.Icon("Bitwise", self.image, menu=self.menu)

        self.uuid = self.generate_uuid()
        self.generate_qrcode("https://hackzurich2023-2.web.app/")

    def calculate_position_of_tray_view(self, dimensions) -> (int, int):
        for m in get_monitors():
            if m.is_primary:

                if sys.platform == 'darwin':
                    return round(m.width * 0.6), 0

                if sys.platform == 'win32' or sys.platform == 'cygwin' or sys.platform == 'msys':
                    return round(m.width * 0.6), round(m.height - dimensions[1])

    def generate_uuid(self) -> UUID:
        return uuid.uuid5(uuid.NAMESPACE_OID, str(uuid.getnode()))

    def generate_qrcode(self, user_uuid) -> None:
        img = qrcode.make('https://{}'.format(user_uuid))
        type(img)
        img.save(os.path.join(os.getcwd(), 'tray', 'user_qrcode.png'))

    def start_meditation(self):
        self.meditation_player = webview.create_window(
            'MEDITATION-PLAYER',
            'https://www.youtube.com/embed/QtE00VP4W3Y?si=8gTq-pUmTC-k_FVM&controls=0&rel=0&autoplay=1',
            on_top=True,
            resizable=True,
            frameless=False,
            draggable=True,
            fullscreen=True,
            js_api=self.jsapi
        )

        self.open_window = self.meditation_player
        self.meditation_player.events.closed += self.on_closed_meditation_player
        if self.open_window is not None and self.open_window == self.meditation_window:
            self.meditation_window.destroy()


        webview.start()

    def on_closed_meditation_player(self):
        self.meditation_player.destroy()

    def open_qrcode_window(self):
        self.qrcode_window = webview.create_window(
            'QRCODE',
            os.path.join(os.getcwd(), 'tray', 'qrcode.html'),
            on_top=True,
            resizable=False,
            frameless=True,
            draggable=False,
            width=250,
            height=430,
            y=self.calculate_position_of_tray_view((250, 320))[1],
            x=self.calculate_position_of_tray_view((250, 320))[0],
            js_api=self.jsapi
        )

        self.open_window = self.qrcode_window
        if self.open_window is not None and self.open_window == self.meditation_window:
            self.meditation_window.destroy()

        webview.start()

    def open_meditation_window(self):
        self.meditation_window = webview.create_window(
            'MEDITATION-QUESTION',
            os.path.join(os.getcwd(), 'tray', 'meditation_question.html'),
            on_top=True,
            resizable=False,
            frameless=True,
            draggable=False,
            width=250,
            height=320,
            y=self.calculate_position_of_tray_view((250, 320))[1],
            x=self.calculate_position_of_tray_view((250, 320))[0],
            js_api=self.jsapi
        )

        self.open_window = self.meditation_window
        if self.open_window is not None and self.open_window == self.qrcode_window:
            self.qrcode_window.destroy()
        webview.start()
        
    
    def open_afk_window(self):
        self.afk_window = webview.create_window(
            'AFK-WINDOW',
            os.path.join(os.getcwd(), 'tray', 'afk.html'),
            on_top=True,
            resizable=False,
            frameless=True,
            draggable=False,
            width=350,
            height=50,
            y=self.calculate_position_of_tray_view((350, 50))[1],
            x=self.calculate_position_of_tray_view((350, 50))[0],
            js_api=self.jsapi
        )

        self.open_window = self.afk_window
        self.afk_window.show()
        if self.open_window is not None:
            self.qrcode_window.destroy()
            self.meditation_window.destroy()
            self.meditation_player.destroy()
        webview.start()

    def on_exit(self, icon):
        self.open_window = None
        icon.stop()

    def close_meditation_window(self):
        self.open_window = None
        self.meditation_window.hide()

    def close_qrcode_window(self):
        self.open_window = None
        self.qrcode_window.hide()
    
    def close_afk(self):
        self.open_window = None
        self.afk_window.hide()

    def start(self) -> None:
        self.icon.run_detached()
        
        #time.sleep(15)
        #print("try to open ")
        #self.open_meditation_window()
        #webview.start()
        
        while True:
            try:
                data = self.q.get()  # Wait for up to 1 second for new data
                # Process the data here
                print(f"Received data: {data}")
                
                if data == "AFK":
                    self.open_meditation_window()
                elif data == "BREAK":
                    self.open_meditation_window()
            except Exception:
                # Handle the case when the queue is empty
            
                pass
        
if __name__ == '__main__':
    tray = Tray()
    tray.start()