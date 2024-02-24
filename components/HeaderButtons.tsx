"use client";

import { useState } from 'react'
import Modal from "@/components/Modal";

enum TransactionType {
    INCOME = 'income',
    EXPENSE = 'expense'
}

function HeaderButtons() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [transactionType, setTransactionType] = useState(TransactionType.INCOME);

    return (
        <section className="buttons flex justify-end gap-2 pt-10 pb-5">
            <button onClick={() => {
                setIsModalOpen(true);
                setTransactionType(TransactionType.INCOME);
            }} className="text-white px-3 py-1 rounded-md border border-zinc-800 hover:bg-zinc-800 transition ease-in">+</button>
            <button onClick={() => {
                setIsModalOpen(true);
                setTransactionType(TransactionType.EXPENSE);
            }}  className="text-white px-3 py-1 rounded-md border border-red-600 hover:bg-red-600 transition ease-in">-</button>
            {isModalOpen && <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} transactionType={transactionType} />}
        </section>
    )
}

export default HeaderButtons
