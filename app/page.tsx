import HeaderButtons from "@/components/HeaderButtons";
import TransactionBody from "@/components/TransactionBody";
import { prisma } from "@/libs/prisma";

interface Transaction {
  id: number,
  description: string,
  amount: GLfloat,
  payment_method: string,
  date: string,
  type: string,
  createdAt?: Date;
}

const getTransactions = async () : Promise<Transaction[]> => await prisma.transaction.findMany();

export default async function Home() {
  const transactions = await getTransactions();

  return (
    <main className="'min-h-screen max-w-[1000px] m-auto p-5 md:p-10">
      <section className="text-center font-bold text-lg">
        CASH FLOW
      </section>
      <HeaderButtons />
      <section className="overflow-x-auto space-y-5">
        <table className="table-auto w-full">
          <thead className="bg-zinc-800 border">
            <tr>
              <th className="px-4 py-2 text-left">Descripción</th>
              <th className="px-4 py-2 text-left">Monto</th>
              <th className="px-4 py-2 text-left">M.Pago</th>
              <th className="px-4 py-2 text-left">Fecha</th>
              <th className="px-4 py-2 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
          {transactions.map((transaction: Transaction) => (
            <TransactionBody key={transaction.id} transaction={transaction} />
          ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}
