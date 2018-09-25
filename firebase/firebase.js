import * as firebase from 'firebase';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyCot2_e9YGErYfQxKwTdoQyYJ7vGQuP5wE",
    authDomain: "expensify-de4c5.firebaseapp.com",
    databaseURL: "https://expensify-de4c5.firebaseio.com",
    projectId: "expensify-de4c5",
    storageBucket: "expensify-de4c5.appspot.com",
    messagingSenderId: "563905121245"
};

firebase.initializeApp(config);

const database =  firebase.database();

export {firebase, database as default};


// const database =  firebase.database();
// database.ref('expenses')
//     .on('child_changed', (snapshot) => {
//         console.log(snapshot.key, snapshot.val())
//     });
// database.ref('expenses')
//     .on('child_added', (snapshot) => {
//         console.log(snapshot.key, snapshot.val())
//     });

// database.ref('expenses')
//     .on('value', (snapshot) => {
//         const expenses = [];
//         snapshot.forEach((child) => {
//             expenses.push({
//                 id: child.key,
//                 ...child.val()
//             })
//         })
//         console.log(expenses)
//     });

// database.ref('expenses').push({
//     description: 'Coffe',
//     note: 'I bought a coffee because I was sleeping',
//     amount: 3.27,
//     createdAt: 47238947
// })

// database.ref('expenses').push({
//     description: 'Rent',
//     note: '',
//     amount: 1200.00,
//     createdAt: 27368712 
// });

// database.ref().on('value', (snapshot) => {
//     const value = snapshot.val();
//     const {name, stressLevel} = snapshot.val();
//     const {title, company} = snapshot.child('job').val();
//     console.log(`Level of stress for ${name} is ${stressLevel}, ${name} is a ${title} at ${company}`);
//     console.log(`${value.name} is a ${value.job.title} at ${value.job.company}`);
// })

// database.ref().on('value', (snapshot) => {
//     console.log(snapshot.val()) 
// })

// database.ref()
//     .once('value')
//     .then((snapshot)=> {
//         const val = snapshot.val()
//         console.log(val) 
//     }).catch((error) => {
//        console.log('Error fetching data', e) 
//     })

// firebase.database().ref().set({
//     name: 'Anna',
//     age: 36,
//     stressLevel: 2,
//     job : {
//         title: 'Software developer',
//         company: 'Google'
//     },
//     location: {
//         city: 'London - Brent',
//         country: 'United States'
//     }
// }).then(() => {
//     console.log('Data is saved!')
// }).catch((error) => {
//     console.log('This failed', error)
// })

// firebase.database().ref('attributes').set({
//     height: 11,
//     weight: '97 kg'
// })
// .then(() => {
//     console.log('Attribute have been changed')
//     reject('Throwing and error')
// }).catch((error) => {
//     console.log('Error', error)
// })

// firebase.database().ref().update({
//     stressLevel : 9,
//     'job/company': 'Amazon',
//     'location/city': 'Seattle'
// })