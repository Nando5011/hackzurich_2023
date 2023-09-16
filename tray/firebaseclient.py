import os 
import firebase_admin
import firebase_admin
from firebase_admin import firestore, db, credentials




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

    def send_data_to_firestore(self, data)-> None:
        print(data)