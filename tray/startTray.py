import pystray
from PIL import Image
import os

# Function to be called when the system tray icon is clicked
def on_activate(icon, item):
    # Add your code here to perform an action when the icon is clicked
    pass

# Create a system tray icon
image = Image.open(os.path.join(os.getcwd(), 'tray', 'logitech.png'))  # Replace with the path to your icon image
menu = (pystray.MenuItem('Open', on_activate), pystray.MenuItem('Exit', lambda: icon.stop()))
icon = pystray.Icon("MyApp", image, menu=menu)

# Run the system tray application
icon.run()