import { useReducer, useEffect, useState } from "react"
import { projectFirestore, timestamp } from "../firebase/config"

let initialState = {
    document: null,
    isPending: false,
    error: null,
    success: null
}

const firestoreReducer = (state, action) => {
    switch (action.type) {
        case 'IS_PENDING':
            return { isPending: true, document: null, success: null, error: null }
        case 'ADDED_DOCUMENT':
            return { isPending: false, document: addedDocument, success: true, error: null }
        case 'ERROR':
            return { isPending: false, ducument: null, error: err.message, success: false }
        default:
            return state
    }
}

export const useFirestore = (collection) => {
    const [state, dispatch] = useReducer(firestoreReducer, initialState)
    const [isCancelled, setIsCancelled] = useState(false)

    // collection

    const ref = projectFirestore.collection(collection)

    // only dispatch if not cancelled

    const dispatchIfNotCancelled = (action) => {
        if (!isCancelled) {
            dispatch(action)
        }
    }

    // add a document

    const addDocument = async (doc) => {
        dispatch({ type: 'IS_PENDING' })

        try {
            const createdAt = timestamp.fromDate(new Date())
            const addedDocument = await ref.add({ ...doc, createdAt })
            dispatchIfNotCancelled({ type: 'ADDED_DOCUMENT', payload: addedDocument })
        } catch (err) {
            dispatch({ type: 'ERROR', payload: err.message })
        }
    }

    // delete a document

    const deleteDocument = async (id) => {

    }

    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])

    return { addDocument, deleteDocument, state }
}