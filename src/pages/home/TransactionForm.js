import { useEffect } from "react"
import { useState } from "react"
//hooks
import { useFirestore } from "../../hooks/useFirestore"

export default function TransactionForm({ uid }) {
    const [name, setName] = useState('')
    const [amount, setAmount] = useState('')
    const { addDocument, deleteDocument, state } = useFirestore('transactions')

    const handleSubmit = (e) => {
        e.preventDefault()
        addDocument(
            { name, amount, uid }
        )
    }

    useEffect(() => {
        if (state.success) {
            setName('')
            setAmount('')
        }
    }, [state.success])

    return (
        <>
            <h3>Add a Transaction</h3>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Transaction Name:</span>
                    <input
                        type="text"
                        required
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />
                </label>
                <label>
                    <span>Amount ($):</span>
                    <input
                        type="number"
                        required
                        onChange={(e) => setAmount(e.target.value)}
                        value={amount}
                    />
                </label>
                {!state.isPending && <button className="btn">Add Transaction</button>}
                {state.isPending && <button className="btn" disabled>Processing</button>}
            </form>
        </>
    )
}
