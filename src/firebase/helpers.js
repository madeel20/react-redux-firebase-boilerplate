import { firestore } from "./index";

export const getFirestoreCollection =async collection =>{
    return await firestore.collection(collection).get().then(res=>{
        return res.docs;
    }).catch(err=>{
        console.log(err);
        return [];
    })
}

export const getFirestoreCollectionByField = async (
    collection,
    fieldName,
    fieldValue,
) => {
    return await firestore
        .collection(collection) 
        .where(fieldName, '==', fieldValue)
        .get()
        .then((res) => {
            return res.docs;
        })
        .catch((res) => {
            console.log(res);
            return [];
        });
};


