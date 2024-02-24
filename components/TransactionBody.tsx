"use client";

import { get_clean_date } from '@/utils/main';
import { IconDeviceFloppy, IconX } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface Transaction {
  id: number,
  description: string,
  amount: GLfloat,
  payment_method: string,
  date: string,
  type?: string,
  createdAt?: Date;
}

enum TransactionType {
  INCOME = 'income',
  EXPENSE = 'expense'
}

function TransactionBody({transaction} : {transaction: Transaction}){
  const router = useRouter();
  const [transactionUpdated, setTransactionUpdated] = useState<Transaction>(transaction);
  const [transactionSelected, setTransactionSelected] = useState<number | null>(null);

  const handleDoubleClick = (id: number) => {
    setTransactionSelected(id);
  }

  const handleChange = async (e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, key: keyof Transaction) => {
    const value = e.target.value;
    const updatedTransaction = {...transactionUpdated, [key]: value};
    setTransactionUpdated(updatedTransaction);
  }

  const saveTransaction = async (id: number, transaction: Transaction) : Promise<Response> => {
    let {description, amount, date, payment_method} = transaction;
    amount = parseFloat(amount.toString());

    const response = await fetch(`/api/transaction/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ description, amount, date, payment_method })
    });

    setTransactionSelected(null);
    router.refresh();

    return response;
  }

  const deleteTransaction = async (id: number) : Promise<Response> => {
    const response = await fetch(`/api/transaction/${id}`, {
      method: 'DELETE'
    });

    const data = await response.json();

    router.refresh();

    return data;
  }

  return (
    <tr key={transaction.id} className="border" onDoubleClick={() => handleDoubleClick(transaction.id)}>
      <td className="px-4 py-2">
        {transactionSelected === transaction.id ? (
          <input type="text" className="rounded-md border-0 p-2 bg-zinc-800 max-w-36"  defaultValue={transaction.description} onChange={(e) =>
            handleChange(e, "description")
          } />
        ) : (
          transaction.description
        )}
      </td>
      <td className="px-4 py-2">
        {transactionSelected === transaction.id ? (
          <input type="number" className="rounded-md border-0 p-2 bg-zinc-800 max-w-36"  defaultValue={transaction.amount} onChange={(e) =>
            handleChange(e, "amount")
          } />
        ) : (
          <span className={`${transaction.type === TransactionType.INCOME ? "bg-zinc-800": "bg-red-600" } px-3 py-1 rounded-xl`}>
            S/{transaction.amount} </span>
        )}
      </td>
      <td className="px-4 py-2">
        {transactionSelected === transaction.id ? (
          <select className="rounded-md border-0 p-2 bg-zinc-800 max-w-36" defaultValue={transaction.payment_method} onChange={(e) =>
            handleChange(e, "payment_method")
          }>
            <option value="cash">Efectivo</option>
            <option value="yape">Yape</option>
          </select>
        ) : (
          transaction.payment_method == "cash" ? "efectivo" : "yape"
        )}
      </td>
      <td className="px-4 py-2">
        {transactionSelected === transaction.id ? (
          <input type="date" className="rounded-md border-0 p-2 bg-zinc-800 max-w-36" defaultValue={transaction.date} onChange={(e) =>
            handleChange(e, "date")
          } />
        ) : (
          get_clean_date(transaction.date)
        )}
      </td>
      <td className="flex px-4 py-2 gap-2 items-center">
        {transactionSelected && (
          <button className="text-green-600 hover:text-green-500 py-2 transition ease-in" onClick={()=> saveTransaction(transaction.id, transactionUpdated)}>
          <IconDeviceFloppy size={21} />
          </button>
        )}
        <button className="text-red-600 hover:text-red-500 py-2 transition ease-in" onClick={()=> deleteTransaction(transaction.id)}>
          <IconX size={21} />
        </button>
      </td>
    </tr>
  )
}

export default TransactionBody
