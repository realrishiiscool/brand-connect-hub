import { useState } from "react";
import { DollarSign, ArrowUpRight, ArrowDownRight, CreditCard, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { useCollaboration } from "@/contexts/CollaborationContext";
import { EmptyState } from "@/components/dashboard/EmptyState";

interface WalletProps {
  role: "kol" | "company";
}

const Wallet = ({ role }: WalletProps) => {
  const { user } = useAuth();
  const { getWallet, addFunds, withdrawFunds } = useCollaboration();
  const [filter, setFilter] = useState("all");
  const [showAddFunds, setShowAddFunds] = useState(false);
  const [fundsAmount, setFundsAmount] = useState("");
  const isKol = role === "kol";

  const wallet = user ? getWallet(user.id, role) : null;

  const handleAction = () => {
    if (!user) return;
    if (isKol) {
      const amount = Math.min(wallet?.available || 0, 1000);
      if (amount > 0) withdrawFunds(user.id, amount);
    } else {
      setShowAddFunds(true);
    }
  };

  const handleAddFunds = () => {
    if (!user || !fundsAmount) return;
    addFunds(user.id, parseFloat(fundsAmount));
    setFundsAmount("");
    setShowAddFunds(false);
  };

  if (!wallet) return null;

  const stats = isKol
    ? [
        { label: "Available Balance", value: `$${wallet.available.toLocaleString()}`, icon: DollarSign },
        { label: "Pending Balance", value: `$${wallet.pending.toLocaleString()}`, icon: ArrowDownRight },
        { label: "Total Earned", value: `$${wallet.totalEarned.toLocaleString()}`, icon: ArrowUpRight },
      ]
    : [
        { label: "Current Balance", value: `$${wallet.available.toLocaleString()}`, icon: DollarSign },
        { label: "Funds in Escrow", value: `$${wallet.escrow.toLocaleString()}`, icon: ArrowDownRight },
        { label: "Total Added", value: `$${wallet.totalAdded.toLocaleString()}`, icon: ArrowUpRight },
      ];

  const filteredTx = wallet.transactions.filter((t) => filter === "all" || t.type === filter);

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold">Wallet</h1>
        <button onClick={handleAction} className="gradient-primary inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-primary-foreground">
          {isKol ? <><Download className="h-4 w-4" /> Withdraw</> : <><CreditCard className="h-4 w-4" /> Add Funds</>}
        </button>
      </div>

      {/* Add funds modal */}
      {showAddFunds && (
        <div className="rounded-xl border border-primary/30 bg-primary/5 p-5">
          <h3 className="mb-3 font-display text-sm font-semibold">Add Funds</h3>
          <div className="flex gap-3">
            <input
              type="number"
              value={fundsAmount}
              onChange={(e) => setFundsAmount(e.target.value)}
              placeholder="Enter amount"
              className="h-10 flex-1 rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <button onClick={handleAddFunds} className="gradient-primary rounded-lg px-6 py-2 text-sm font-semibold text-primary-foreground">
              Add
            </button>
            <button onClick={() => setShowAddFunds(false)} className="rounded-lg border border-border px-4 py-2 text-sm hover:bg-secondary">
              Cancel
            </button>
          </div>
        </div>
      )}

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

      <div className="rounded-xl border border-border bg-card p-5">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-display text-base font-semibold">Transaction History</h3>
          <select value={filter} onChange={(e) => setFilter(e.target.value)} className="h-8 rounded-lg border border-input bg-background px-2 text-xs focus:outline-none focus:ring-2 focus:ring-ring">
            <option value="all">All</option>
            <option value="credit">Credits</option>
            <option value="debit">Debits</option>
          </select>
        </div>
        {filteredTx.length === 0 ? (
          <EmptyState title="No transactions" description="Your transaction history will appear here." className="border-0 py-8" />
        ) : (
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
                {filteredTx.map((t) => (
                  <tr key={t.id} className="border-b border-border last:border-0">
                    <td className="py-3 font-medium">{t.description}</td>
                    <td className={cn("py-3 font-medium", t.amount > 0 ? "text-success" : "text-foreground")}>
                      {t.amount > 0 ? "+" : ""}${Math.abs(t.amount).toLocaleString()}
                    </td>
                    <td className="py-3 text-muted-foreground">{t.date.toLocaleDateString()}</td>
                    <td className="py-3">
                      <span className={cn(
                        "rounded-full px-2.5 py-0.5 text-xs font-medium",
                        t.status === "completed" ? "bg-success/10 text-success" :
                        t.status === "in_escrow" ? "bg-warning/10 text-warning" :
                        t.status === "released" ? "bg-primary/10 text-primary" :
                        "bg-muted text-muted-foreground"
                      )}>{t.status.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wallet;
