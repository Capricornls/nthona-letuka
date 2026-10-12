// The transaction history log (newest first)
function TransactionTable({ transactions }) {
  if (transactions.length === 0) {
    return <p className="empty">No transactions yet.</p>;
  }

  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Book</th>
            <th>Type</th>
            <th>Quantity</th>
            <th>Recorded by</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => (
            <tr key={tx.id}>
              <td>{tx.date}</td>
              <td>{tx.bookTitle}</td>
              <td>{tx.type === "add" ? "Stock added" : "Borrowed"}</td>
              <td>{tx.quantity}</td>
              <td>{tx.by}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionTable;
