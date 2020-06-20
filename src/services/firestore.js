import { auth, db } from '../services/firebase';


export async function getUser(uid){
  let docRef = db.collection('Users').doc(uid.toString());
  return await docRef.get().then(function (doc) {
      if (doc.exists) {
          console.log('User Data', doc.data());
          return doc.data();
      } else {
          console.log('User Does Not Exist!');
          return false;
      }
  }).catch(function(error){
      console.log(error);
      return false;
  });
}

export async function getUID(){

}

export async function createUser(uid){
    let currentTime = new Date();
    let name = auth().currentUser.displayName;
    let email = auth().currentUser.email;
    let usrName = email.split('@')[0];
    console.log(uid);

    if (name === null){
        name = usrName;
    }

    const newProfile = {
        name: name,
        usrName: usrName,
        location: 'undefined',
        creationDate: currentTime,
        followers: 0,
        following: 0,
        photo: auth().currentUser.photoURL,
        skill: "V0 - V1",
        posts: [],
        chatThreads: [],
    };

    return db.collection('Users').doc(uid.toString()).set(
        newProfile
    ).then(function(){
        console.log("Document successfully written!");
        return newProfile;
    }).catch(function(error){
        console.log("Error writting document: ", error);
        return false;
    })
}

export function updateUser(){

};

export function deleteUser(){

};
