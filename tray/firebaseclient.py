import os 
import firebase_admin
import firebase_admin
from firebase_admin import firestore, db, credentials
from datetime import datetime
from datetime import date




class FirebaseClient:
    
    def __init__(self) -> None:
        # Initialize Firebase Admin SDK with your credentials file
        self.cred = credentials.Certificate(os.path.join(os.getcwd(), 'tray', 'firebase.json'))
        self.firebase = firebase_admin.initialize_app(self.cred)
        self.db = firestore.client()
    
    
    def test_connection(self, user, email)->None:
        # Example: Add a document to a collection
        data = {
            'name': user,
            'email': email
        }

        # Add a new document with a generated ID
        doc_ref = self.db.collection('users').add(data)
        print(f'Document added with ID: {doc_ref}')

        # Example: Query documents from a collection
        users_ref = self.db.collection('users')
        docs = users_ref.stream()

        for doc in docs:
            print(f'Document ID: {doc.id}')
            print(f'Name: {doc.to_dict()["name"]}')
            print(f'Email: {doc.to_dict()["email"]}')
            print()

    def send_windowlogger_data_to_firestore(self, key, time_spent)-> None:
        print("FBC --> "+key +" " + str(time_spent))
        
        application = key.split(os.path.sep)
        
        mail_data = { "foo": "bar" }
        date_data = { "dummy": "breakwise date field" }
        data = {
            "task": key,
            "taskType": "productive",
            "timeOpen": time_spent.isoformat()
        }

        mail_path = "users/test1234@gmail.com"
        date_path = "users/test1234@gmail.com/devices/deviceID1/records/"+date.today().strftime('%Y-%m-%d')
        document_path = "users/test1234@gmail.com/devices/deviceID1/records/"+date.today().strftime('%Y-%m-%d')+"/timestamps/"+ time_spent.strftime('%H:%M:%S')
        
        self.db.document(mail_path).set(mail_data, merge=True)
        self.db.document(date_path).set(date_data, merge=True)
        self.db.document(document_path).set(data, merge=True)
        
        
        print("Sent {} to Firebase --> {}".format(data, document_path))
