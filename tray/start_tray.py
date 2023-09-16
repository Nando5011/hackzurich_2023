import pystray
import os
import webview
import qrcode
import uuid
from PIL import Image
from firebaseclient import FirebaseClient


class Tray:

    def __init__(self) -> None:
        self.menu = (
            pystray.MenuItem('QR Code', self.on_open_qrcode_window),
            pystray.MenuItem('Exit', self.on_exit),
        )

        self.firebase_client = FirebaseClient()
        self.firebase_client.get_users()

        self.image = Image.open(os.path.join(os.getcwd(), 'tray', 'logitech.png'))  # Replace with the path to your icon image
        self.icon = pystray.Icon("MyApp", self.image, menu=self.menu)

        self.qrcode_window = webview.create_window('Woah dude!', html='<h1>Woah dude! Take a Break<h1>', on_top=True, resizable=False, frameless=True)
        self.qrcode_window.events.closing += self.on_closing
        self.qrcode_window_is_open = False

        self.uuid = self.generate_uuid()
        self.generate_qrcode(self.uuid)
    
    def init_firebase() -> None:
        pass

    def generate_uuid(self) -> str:
        return uuid.uuid5(uuid.NAMESPACE_OID, str(uuid.getnode()))

    def generate_qrcode(self, user_uuid) -> None:
        img = qrcode.make('https://{}'.format(user_uuid))
        type(img) 
        img.save(os.path.join(os.getcwd(), "tray", "user_qrcode.png"))


    def on_open_qrcode_window(self):
        if not self.qrcode_window_is_open:
            webview.start(self.qrcode_window)
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


