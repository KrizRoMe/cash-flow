"use client";

import { useEffect, useState } from 'react'
import Modal from "@/components/Modal";

interface Transaction {
    id: number,
    description: string,
    amount: GLfloat,
    payment_method: string,
    date: string,
    type: string,
    createdAt?: Date;
  }

enum TransactionType {
    INCOME = 'income',
    EXPENSE = 'expense'
}

function HeaderButtons({transactions} : {transactions: Transaction[]}) {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [transactionType, setTransactionType] = useState(TransactionType.INCOME);
    const [totalAmount, setTotalAmount] = useState<number>(0);

    const get_total_amount = (transactions: Transaction[]) => {
        return transactions.reduce((acc, transaction) => {
          return acc + transaction.amount;
        }, 0);
    }

    useEffect(() => {
        const __totalAmount = get_total_amount(transactions);
        setTotalAmount(__totalAmount)
    }, [transactions])

    return (
        <section className="flex justify-between pt-10 pb-5 items-center">
            <span className='bg-zinc-800 px-3 py-1 rounded-md'>S/{totalAmount} </span>

            <div className='buttons space-x-2'>
                <button onClick={() => {
                    setIsModalOpen(true);
                    setTransactionType(TransactionType.INCOME);
                }} className="text-white px-3 py-1 rounded-md border border-zinc-800 hover:bg-zinc-800 transition ease-in">+</button>
                <button onClick={() => {
                    setIsModalOpen(true);
                    setTransactionType(TransactionType.EXPENSE);
                }}  className="text-white px-3 py-1 rounded-md border border-red-600 hover:bg-red-600 transition ease-in">-</button>
                </div>
            {isModalOpen && <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} transactionType={transactionType} />}
        </section>
    )
}

export default HeaderButtons
