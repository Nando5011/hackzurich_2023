from firebase import firebase


class FirebaseClient:

    def __init__(self) -> None:
        self.firebase_project = "hackzurich23-8212"
        self.firebase  = firebase.FirebaseApplication('https://firestore.googleapis.com/v1/projects/{}/databases/'.format(self.firebase_project), None)
    
    def authenticate(self)->None:
        pass
    
    def get_users(self) -> None:
        result = self.firebase.get('https://firestore.googleapis.com/v1/projects/{}/firestore/users'.format(self.firebase_project), None)
        print(result)
