import { useState, useEffect, useRef } from "react";
import { Send, Paperclip, DollarSign, ChevronLeft, X, Check, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { useCollaboration, type Collaboration, type Offer } from "@/contexts/CollaborationContext";
import { EmptyState } from "@/components/dashboard/EmptyState";

interface ChatMessage {
  id: string;
  sender: "me" | "them";
  text: string;
  time: string;
  type?: "message" | "offer" | "system";
  offer?: Offer;
}

const STATUS_LABELS: Record<string, string> = {
  proposal: "Proposal Sent",
  negotiation: "Negotiating",
  accepted: "Accepted",
  escrow: "Funds in Escrow",
  deliverable_submitted: "Deliverable Submitted",
  approved: "Approved",
  funds_released: "Completed",
  rejected: "Rejected",
};

const STATUS_COLORS: Record<string, string> = {
  proposal: "bg-info/10 text-info",
  negotiation: "bg-warning/10 text-warning",
  accepted: "bg-success/10 text-success",
  escrow: "bg-primary/10 text-primary",
  deliverable_submitted: "bg-accent/10 text-accent",
  approved: "bg-success/10 text-success",
  funds_released: "bg-success/10 text-success",
  rejected: "bg-destructive/10 text-destructive",
};

const Messages = () => {
  const { user } = useAuth();
  const { collaborations, sendOffer, acceptOffer, moveToEscrow, getCollaborationsForUser } = useCollaboration();
  const isKol = user?.role === "kol";

  const userCollabs = user ? getCollaborationsForUser(user.id, user.role as "kol" | "company") : [];
  
  const [selectedId, setSelectedId] = useState<string | null>(userCollabs[0]?.id || null);
  const [input, setInput] = useState("");
  const [showMobileChat, setShowMobileChat] = useState(false);
  const [showOfferPanel, setShowOfferPanel] = useState(false);
  const [offerAmount, setOfferAmount] = useState("");
  const [offerDeliverables, setOfferDeliverables] = useState("");
  const [offerMessage, setOfferMessage] = useState("");
  const [isFinalOffer, setIsFinalOffer] = useState(false);
  const [localMessages, setLocalMessages] = useState<Record<string, ChatMessage[]>>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const selected = userCollabs.find((c) => c.id === selectedId) || null;

  // Build chat messages from offers + local messages
  const buildMessages = (collab: Collaboration): ChatMessage[] => {
    const offerMsgs: ChatMessage[] = collab.offers.map((o) => ({
      id: o.id,
      sender: (isKol ? o.fromRole === "kol" : o.fromRole === "company") ? "me" : "them",
      text: o.message,
      time: o.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      type: "offer" as const,
      offer: o,
    }));
    const local = localMessages[collab.id] || [];
    return [...offerMsgs, ...local].sort((a, b) => {
      const timeA = a.offer?.timestamp?.getTime() || 0;
      const timeB = b.offer?.timestamp?.getTime() || 0;
      return timeA - timeB;
    });
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selectedId, localMessages]);

  const handleSendMessage = () => {
    if (!input.trim() || !selectedId) return;
    const msg: ChatMessage = {
      id: `msg_${Date.now()}`,
      sender: "me",
      text: input,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      type: "message",
    };
    setLocalMessages((prev) => ({
      ...prev,
      [selectedId]: [...(prev[selectedId] || []), msg],
    }));
    setInput("");
  };

  const handleSendOffer = () => {
    if (!selectedId || !offerAmount) return;
    sendOffer(selectedId, {
      fromRole: isKol ? "kol" : "company",
      amount: parseFloat(offerAmount),
      deliverables: offerDeliverables,
      message: offerMessage || `${isFinalOffer ? "Final offer" : "Offer"}: $${offerAmount}`,
      isFinal: isFinalOffer,
    });
    setShowOfferPanel(false);
    setOfferAmount("");
    setOfferDeliverables("");
    setOfferMessage("");
    setIsFinalOffer(false);
  };

  const handleAcceptOffer = (offerId: string) => {
    if (!selectedId) return;
    acceptOffer(selectedId, offerId);
  };

  if (userCollabs.length === 0) {
    return (
      <div className="animate-fade-in">
        <h1 className="mb-6 font-display text-2xl font-bold">Messages</h1>
        <EmptyState
          title="No conversations yet"
          description={isKol ? "Apply to campaigns to start chatting with brands." : "Invite KOLs to start conversations."}
        />
      </div>
    );
  }

  const chatMessages = selected ? buildMessages(selected) : [];

  return (
    <div className="animate-fade-in">
      <h1 className="mb-6 font-display text-2xl font-bold">Messages</h1>
      <div className="flex h-[calc(100vh-12rem)] overflow-hidden rounded-xl border border-border bg-card">
        {/* Conversation list */}
        <div className={cn("w-80 flex-shrink-0 border-r border-border", showMobileChat ? "hidden md:block" : "block w-full md:w-80")}>
          <div className="border-b border-border p-4">
            <input type="text" placeholder="Search conversations..." className="h-9 w-full rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div className="overflow-y-auto">
            {userCollabs.map((collab) => (
              <button
                key={collab.id}
                onClick={() => { setSelectedId(collab.id); setShowMobileChat(true); }}
                className={cn(
                  "flex w-full items-start gap-3 border-b border-border p-4 text-left transition-colors hover:bg-secondary/50",
                  selectedId === collab.id && "bg-secondary"
                )}
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                  {(isKol ? collab.companyName : collab.kolName).charAt(0)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <p className="truncate text-sm font-semibold">{isKol ? collab.companyName : collab.kolName}</p>
                    <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-medium", STATUS_COLORS[collab.status])}>
                      {STATUS_LABELS[collab.status]}
                    </span>
                  </div>
                  <p className="truncate text-xs text-muted-foreground">{collab.campaignTitle}</p>
                  {collab.offers.length > 0 && (
                    <p className="truncate text-xs text-muted-foreground mt-0.5">
                      Last offer: ${collab.offers[collab.offers.length - 1].amount.toLocaleString()}
                    </p>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat + Summary */}
        <div className={cn("flex flex-1", !showMobileChat ? "hidden md:flex" : "flex")}>
          {/* Chat panel */}
          <div className="flex flex-1 flex-col">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border p-4">
              <div className="flex items-center gap-3">
                <button onClick={() => setShowMobileChat(false)} className="md:hidden text-sm text-primary">
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                  {selected ? (isKol ? selected.companyName : selected.kolName).charAt(0) : "?"}
                </div>
                <div>
                  <p className="text-sm font-semibold">{selected ? (isKol ? selected.companyName : selected.kolName) : ""}</p>
                  <p className="text-xs text-muted-foreground">{selected?.campaignTitle}</p>
                </div>
              </div>
              <div className="flex gap-2">
                {selected && (selected.status === "negotiation" || selected.status === "proposal") && (
                  <button
                    onClick={() => setShowOfferPanel(true)}
                    className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-foreground hover:bg-secondary"
                  >
                    <DollarSign className="mr-1 inline h-3 w-3" />
                    {isFinalOffer ? "Final Offer" : "Send Offer"}
                  </button>
                )}
                {selected?.status === "accepted" && !isKol && (
                  <button
                    onClick={() => selected && moveToEscrow(selected.id)}
                    className="gradient-primary rounded-lg px-3 py-1.5 text-xs font-semibold text-primary-foreground"
                  >
                    Fund Escrow
                  </button>
                )}
              </div>
            </div>

            {/* Messages area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {chatMessages.length === 0 && (
                <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                  Start the conversation...
                </div>
              )}
              {chatMessages.map((msg) => (
                <div key={msg.id} className={cn("flex", msg.sender === "me" ? "justify-end" : "justify-start")}>
                  {msg.type === "offer" && msg.offer ? (
                    <div className={cn(
                      "max-w-[80%] rounded-2xl border-2 px-4 py-3 text-sm",
                      msg.sender === "me" ? "border-primary/30 bg-primary/5" : "border-accent/30 bg-accent/5"
                    )}>
                      <div className="flex items-center gap-2 mb-1">
                        <DollarSign className="h-4 w-4 text-primary" />
                        <span className="font-display font-bold text-lg">${msg.offer.amount.toLocaleString()}</span>
                        {msg.offer.isFinal && <span className="rounded-full bg-warning/10 px-2 py-0.5 text-[10px] font-bold text-warning">FINAL</span>}
                        {msg.offer.accepted && <span className="rounded-full bg-success/10 px-2 py-0.5 text-[10px] font-bold text-success">ACCEPTED</span>}
                      </div>
                      {msg.offer.deliverables && <p className="text-xs text-muted-foreground mb-1">📦 {msg.offer.deliverables}</p>}
                      <p className="text-sm">{msg.offer.message}</p>
                      <p className="mt-1 text-[10px] text-muted-foreground">{msg.time}</p>
                      {msg.sender === "them" && !msg.offer.accepted && selected?.status !== "accepted" && (
                        <div className="mt-2 flex gap-2">
                          <button
                            onClick={() => handleAcceptOffer(msg.offer!.id)}
                            className="gradient-primary inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-semibold text-primary-foreground"
                          >
                            <Check className="h-3 w-3" /> Accept
                          </button>
                          <button
                            onClick={() => setShowOfferPanel(true)}
                            className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium hover:bg-secondary"
                          >
                            Counter
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className={cn(
                      "max-w-[75%] rounded-2xl px-4 py-2.5 text-sm",
                      msg.sender === "me" ? "gradient-primary text-primary-foreground" : "bg-secondary text-foreground"
                    )}>
                      <p>{msg.text}</p>
                      <p className={cn("mt-1 text-[10px]", msg.sender === "me" ? "text-primary-foreground/60" : "text-muted-foreground")}>{msg.time}</p>
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Offer panel */}
            {showOfferPanel && (
              <div className="border-t border-border bg-secondary/30 p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-semibold">Send Offer</h4>
                  <button onClick={() => setShowOfferPanel(false)} className="text-muted-foreground hover:text-foreground">
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div className="grid gap-2 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-medium mb-1">Amount ($)</label>
                    <input
                      type="number"
                      value={offerAmount}
                      onChange={(e) => setOfferAmount(e.target.value)}
                      className="h-9 w-full rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                      placeholder="3500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1">Deliverables</label>
                    <input
                      type="text"
                      value={offerDeliverables}
                      onChange={(e) => setOfferDeliverables(e.target.value)}
                      className="h-9 w-full rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                      placeholder="3 posts + 2 stories"
                    />
                  </div>
                </div>
                <textarea
                  value={offerMessage}
                  onChange={(e) => setOfferMessage(e.target.value)}
                  className="mt-2 w-full rounded-lg border border-input bg-background p-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Add a message..."
                  rows={2}
                />
                <div className="mt-2 flex items-center justify-between">
                  <label className="flex items-center gap-2 text-xs">
                    <input type="checkbox" checked={isFinalOffer} onChange={(e) => setIsFinalOffer(e.target.checked)} className="rounded border-input" />
                    <span className="font-medium">Mark as Final Offer</span>
                  </label>
                  <button
                    onClick={handleSendOffer}
                    disabled={!offerAmount}
                    className="gradient-primary rounded-lg px-4 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-50"
                  >
                    Send {isFinalOffer ? "Final " : ""}Offer
                  </button>
                </div>
              </div>
            )}

            {/* Message input */}
            <div className="border-t border-border p-4">
              <div className="flex items-center gap-2">
                <button className="rounded-lg p-2 text-muted-foreground hover:bg-secondary hover:text-foreground">
                  <Paperclip className="h-5 w-5" />
                </button>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Type a message..."
                  className="h-10 flex-1 rounded-lg border border-input bg-background px-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <button onClick={handleSendMessage} className="gradient-primary rounded-lg p-2.5 text-primary-foreground">
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Campaign summary sidebar */}
          {selected && (
            <div className="hidden w-72 flex-shrink-0 border-l border-border overflow-y-auto lg:block">
              <div className="p-4 space-y-4">
                <h4 className="font-display text-sm font-bold">Campaign Summary</h4>
                <div className="space-y-3">
                  <div className="rounded-lg bg-secondary p-3">
                    <p className="text-xs text-muted-foreground">Campaign</p>
                    <p className="text-sm font-semibold">{selected.campaignTitle}</p>
                  </div>
                  <div className="rounded-lg bg-secondary p-3">
                    <p className="text-xs text-muted-foreground">Status</p>
                    <span className={cn("inline-flex rounded-full px-2 py-0.5 text-xs font-medium mt-1", STATUS_COLORS[selected.status])}>
                      {STATUS_LABELS[selected.status]}
                    </span>
                  </div>
                  <div className="rounded-lg bg-secondary p-3">
                    <p className="text-xs text-muted-foreground">Budget</p>
                    <p className="text-sm font-display font-bold">
                      {selected.agreedBudget ? `$${selected.agreedBudget.toLocaleString()}` : `$${selected.budget.toLocaleString()}`}
                      {selected.agreedBudget && <span className="ml-1 text-xs text-success font-normal">Agreed</span>}
                    </p>
                  </div>
                  <div className="rounded-lg bg-secondary p-3">
                    <p className="text-xs text-muted-foreground">Timeline</p>
                    <p className="text-sm font-medium">{selected.timeline}</p>
                  </div>
                </div>

                {/* Deliverables */}
                <div>
                  <h4 className="font-display text-sm font-bold mb-2">Deliverables</h4>
                  <div className="space-y-2">
                    {selected.deliverables.map((d) => (
                      <div key={d.id} className="flex items-center gap-2 rounded-lg bg-secondary p-2.5">
                        <div className={cn(
                          "h-4 w-4 rounded-full border-2 flex items-center justify-center",
                          d.approvedByCompany ? "border-success bg-success" : d.completed ? "border-primary bg-primary" : "border-muted-foreground"
                        )}>
                          {(d.completed || d.approvedByCompany) && <Check className="h-2.5 w-2.5 text-primary-foreground" />}
                        </div>
                        <span className={cn("text-xs", d.approvedByCompany ? "line-through text-muted-foreground" : "")}>{d.title}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Offers history */}
                {selected.offers.length > 0 && (
                  <div>
                    <h4 className="font-display text-sm font-bold mb-2">Offer History</h4>
                    <div className="space-y-2">
                      {selected.offers.map((o) => (
                        <div key={o.id} className={cn("rounded-lg p-2.5 text-xs", o.accepted ? "bg-success/10" : "bg-secondary")}>
                          <div className="flex justify-between">
                            <span className="font-semibold">${o.amount.toLocaleString()}</span>
                            <span className="text-muted-foreground">{o.fromRole}</span>
                          </div>
                          {o.accepted && <span className="text-success font-medium">✓ Accepted</span>}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;
