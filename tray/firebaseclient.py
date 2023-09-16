from firebase import firebase
import firebase_admin
from firebase_admin import credentials, db
from dotenv import load_dotenv
import os 

"""
import firebase_admin
from firebase_admin import credentials

cred = credentials.Certificate("path/to/serviceAccountKey.json")
firebase_admin.initialize_app(cred)
"""


class FirebaseClient:


    def __init__(self) -> None:
        
        load_dotenv()

        self.firebase_credentials = credentials.Certificate({
            "apiKey": "AIzaSyCzUSeLToQ1X1vNW1brnkcHcWJif33HRxE",
            "authDomain": "hackzurich23-8212.firebaseapp.com",
            "projectId": "hackzurich23-8212",
            "storageBucket": "hackzurich23-8212.appspot.com",
            "messagingSenderId": "432778287112",
            "appId": "1:432778287112:web:57017c368ff6c03d4899bd",
        })
        
        self.firebase = firebase_admin.initialize_app(self.firebase_credentials)
        self.ref = db.reference('/users')
        print(self.ref)
    
    def authenticate(self)->None:
        pass
    
    def get_users(self) -> None:
        pass




