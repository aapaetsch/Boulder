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

export async function getUID(userName){
    let docRef = (await db.collection('UserName').doc(userName).get()).data();
    return await docRef.get();
}

export async function createUser(uid){
    let currentTime = new Date();
    let name = auth().currentUser.displayName;
    let email = auth().currentUser.email;
    let usrName = email.split('@')[0];

    if (name === null){
        name = usrName;
    }

    const newProfile = {
        name: name,
        usrName: usrName,
        location: 'undefined',
        creationDate: currentTime,
        followers: [],
        following: [],
        photo: auth().currentUser.photoURL,
        skill: "V0 - V1",
        posts: [],
    };

    return db.collection('Users').doc(uid.toString()).set(
        newProfile
    )
        .then(function(){
        console.log("Document successfully written!");
        return newProfile;
    }).catch(function(error){
        console.log("Error writing document: ", error);
        return false;
    })
}

export async function updateUserProfile(values, uid){
    const userRef = db.collection('Users').doc(uid.toString());
    return userRef.update({
        name: values.name,
        location: values.location,
        usrName: values.usrName,
        skill: values.skill})
        .then( () => {return true;})
        .catch(function (error) {
            return false;
            });
}

