import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import credentials from "./credentials-v8.js";

const db = () => {
    if (!getApps().length) {
        const app = initializeApp({
            credential: cert(credentials)
        })
    }
    return getFirestore()
}

const carCollection = db().collection('cars')

const getAllCars = async () => {
    const result = await carCollection.get()
    
    const cars = result.docs.map(car =>{
        return {id: car.id, ...car.data()}
    })
    console.log(...cars)
    return cars
}

const createCar = async (car) => {
    const result = await carCollection.add(car)
    console.log(result)
}

const deleteCar = async (carId) => {
    const result = await carCollection.doc(carId).delete()
    console.log(result)
    return "car deleted"
}

// deleteCar('FGtdEvIKetLkGFXUHRYg')


// createCar({
//     make: "Toyota",
//     model: "Hilux",
//     year: "2018"
// })



const updateCarModel = async (carId, model) => {
    const result = await carCollection.doc(carId).update({
        model: model
    })
    console.log(result)
}

updateCarModel("H4fXUgi0OizWr7OgRBy8", "charger")

getAllCars()