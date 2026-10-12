import TransactionForm from "../components/TransactionForm";
import TransactionTable from "../components/TransactionTable";

function Transactions({ books, transactions, onRecord }) {
  return (
    <div>
      <h2>Transactions</h2>

      <TransactionForm books={books} onRecord={onRecord} />

      <h3>Transaction History</h3>
      <TransactionTable transactions={transactions} />
    </div>
  );
}

export default Transactions;
