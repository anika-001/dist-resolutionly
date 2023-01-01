"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.firebaseUtilities = void 0;
const initializeApp = require("firebase/app");
const firestore = require("firebase/firestore");
const Keys_1 = require("../support/Keys");
class Firebase {
    constructor() {
        this.app = initializeApp.initializeApp(Keys_1.keys.firebaseConfig);
        this.db = firestore.getFirestore(this.app);
        this.collection = firestore.collection;
        this.onSnapshot = firestore.onSnapshot;
        this.query = firestore.query;
        this.updateDoc = firestore.updateDoc;
        this.doc = firestore.doc;
        this.setDoc = firestore.setDoc;
        this.addDoc = firestore.addDoc;
    }
    addData() {
        return new Promise((resolve, reject) => {
            this.setDoc(this.doc(this.db, "cities", "LA"), {
                name: "Los Angeles",
                state: "CA",
                country: "USA"
            })
                .then((res) => {
                resolve(res);
            })
                .catch((err) => {
                reject(err);
            });
        });
    }
    addResolution(phoneNumber, resolution) {
        return new Promise((resolve, reject) => {
            this.addDoc(this.collection(this.db, `Users/${phoneNumber}/Resolutions/`), {
                resolution: resolution,
                progress: 0
            })
                .then((res) => {
                resolve(res);
            })
                .catch((err) => {
                reject(err);
            });
        });
    }
    addLetterToSelf(letter, date, phoneNumber) {
        return new Promise((resolve, reject) => {
            this.addDoc(this.collection(this.db, `Users/${phoneNumber}/LetterToSelf/`), {
                letter: letter,
                date: date
            })
                .then((res) => {
                resolve(res);
            })
                .catch((err) => {
                reject(err);
            });
        });
    }
}
exports.firebaseUtilities = new Firebase();
//# sourceMappingURL=FirebaseUtilities.js.map