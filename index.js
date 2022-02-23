
import credentials from './credentials.js';

//npm i firebase-admin
import admin from 'firebase-admin';

admin.initializeApp({ credential: admin.credential.cert(credentials) });

const db = admin.firestore();

const createCar = async (car) => {
    const carCol = db.collection('cars');
    const result = await carCol.add(car);

    console.log(result);
    return result;
}

createCar({make: 'Dogde', model: 'Charge'});


