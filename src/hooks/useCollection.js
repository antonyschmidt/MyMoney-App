import { useEffect, useState, useRef } from 'react'
import { projectFirestore } from '../firebase/config'

export const useCollection = (collection, _query, _order) => {
    const [documents, setDocuments] = useState(null)
    const [error, setError] = useState(null)


    // if we dont use a useRef infinite loop is going to happen
    // bcs _query is an array 
    const query = useRef(_query).current
    const order = useRef(_order).current

    useEffect(() => {
        let ref = projectFirestore.collection(collection)

        if (query) {
            ref = ref.where(...query)
        }
        if (order) {
            ref = ref.orderBy(...order)
        }

        const unsubscribe = ref.onSnapshot((snapshot) => {
            let results = []
            snapshot.docs.forEach(doc => {
                results.push({ ...doc.data(), id: doc.id })
            })

            //update state
            setDocuments(results)
            setError(null)
        }, (error) => {
            console.log(error)
            setError('Could not fetch the data')
        })

        // unsubscribe on unmount

        return () => unsubscribe()

    }, [collection, query, order])

    return { documents, error }
}