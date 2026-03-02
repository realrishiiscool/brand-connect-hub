import { useState } from "react";
import { DollarSign, ArrowUpRight, ArrowDownRight, CreditCard, Download } from "lucide-react";
import { cn } from "@/lib/utils";

interface WalletProps {
  role: "kol" | "company";
}

const kolTransactions = [
  { id: 1, description: "TechBrand - Summer Launch", amount: "+$3,500", date: "Aug 15, 2026", status: "Completed", type: "credit" },
  { id: 2, description: "Withdrawal to Bank", amount: "-$2,000", date: "Aug 10, 2026", status: "Completed", type: "debit" },
  { id: 3, description: "FitLife Co. - Product Review", amount: "+$1,800", date: "Aug 5, 2026", status: "Pending", type: "credit" },
  { id: 4, description: "StyleHaus - Collection Promo", amount: "+$2,000", date: "Jul 28, 2026", status: "Completed", type: "credit" },
  { id: 5, description: "Withdrawal to PayPal", amount: "-$3,000", date: "Jul 20, 2026", status: "Completed", type: "debit" },
];

const companyTransactions = [
  { id: 1, description: "Added Funds", amount: "+$10,000", date: "Aug 15, 2026", status: "Completed", type: "credit" },
  { id: 2, description: "Escrow - Summer Launch", amount: "-$3,500", date: "Aug 12, 2026", status: "In Escrow", type: "debit" },
  { id: 3, description: "Released - Product Review", amount: "-$1,800", date: "Aug 5, 2026", status: "Released", type: "debit" },
  { id: 4, description: "Added Funds", amount: "+$5,000", date: "Jul 25, 2026", status: "Completed", type: "credit" },
];

const Wallet = ({ role }: WalletProps) => {
  const [filter, setFilter] = useState("all");
  const isKol = role === "kol";
  const transactions = isKol ? kolTransactions : companyTransactions;

  const stats = isKol
    ? [
        { label: "Available Balance", value: "$5,300", icon: DollarSign },
        { label: "Pending Balance", value: "$1,800", icon: ArrowDownRight },
        { label: "Total Earned", value: "$18,400", icon: ArrowUpRight },
      ]
    : [
        { label: "Current Balance", value: "$9,700", icon: DollarSign },
        { label: "Funds in Escrow", value: "$3,500", icon: ArrowDownRight },
        { label: "Total Added", value: "$25,000", icon: ArrowUpRight },
      ];

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold">Wallet</h1>
        <button className="gradient-primary inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-primary-foreground">
          {isKol ? <><Download className="h-4 w-4" /> Withdraw</> : <><CreditCard className="h-4 w-4" /> Add Funds</>}
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl border border-border bg-card p-5">
            <div className="mb-2 inline-flex rounded-lg bg-primary/10 p-2 text-primary">
              <s.icon className="h-5 w-5" />
            </div>
            <p className="font-display text-2xl font-bold">{s.value}</p>
            <p className="text-sm text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Payment Methods */}
      <div className="rounded-xl border border-border bg-card p-5">
        <h3 className="mb-3 font-display text-base font-semibold">Payment Methods</h3>
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-3 rounded-lg border border-border px-4 py-3">
            <CreditCard className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm font-medium">•••• 4242</p>
              <p className="text-xs text-muted-foreground">Visa</p>
            </div>
          </div>
          <button className="rounded-lg border-2 border-dashed border-border px-6 py-3 text-sm text-muted-foreground hover:border-primary/30 hover:text-foreground">
            + Add Method
          </button>
        </div>
      </div>

      {/* Transactions */}
      <div className="rounded-xl border border-border bg-card p-5">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-display text-base font-semibold">Transaction History</h3>
          <select value={filter} onChange={(e) => setFilter(e.target.value)} className="h-8 rounded-lg border border-input bg-background px-2 text-xs focus:outline-none focus:ring-2 focus:ring-ring">
            <option value="all">All</option>
            <option value="credit">Credits</option>
            <option value="debit">Debits</option>
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-muted-foreground">
                <th className="pb-3 font-medium">Description</th>
                <th className="pb-3 font-medium">Amount</th>
                <th className="pb-3 font-medium">Date</th>
                <th className="pb-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.filter((t) => filter === "all" || t.type === filter).map((t) => (
                <tr key={t.id} className="border-b border-border last:border-0">
                  <td className="py-3 font-medium">{t.description}</td>
                  <td className={cn("py-3 font-medium", t.type === "credit" ? "text-success" : "text-foreground")}>{t.amount}</td>
                  <td className="py-3 text-muted-foreground">{t.date}</td>
                  <td className="py-3">
                    <span className={cn(
                      "rounded-full px-2.5 py-0.5 text-xs font-medium",
                      t.status === "Completed" ? "bg-success/10 text-success" :
                      t.status === "In Escrow" ? "bg-warning/10 text-warning" :
                      t.status === "Released" ? "bg-primary/10 text-primary" :
                      "bg-muted text-muted-foreground"
                    )}>{t.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
