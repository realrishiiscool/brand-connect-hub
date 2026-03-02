import { useState } from "react";
import { Send, Paperclip, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";

const conversations = [
  { id: 1, name: "TechBrand Inc.", lastMsg: "Can we discuss the timeline?", time: "2m ago", unread: 2, campaign: "Summer Launch" },
  { id: 2, name: "FitLife Co.", lastMsg: "The deliverables look great!", time: "1h ago", unread: 0, campaign: "Product Review" },
  { id: 3, name: "StyleHaus", lastMsg: "We'd like to increase the budget", time: "3h ago", unread: 1, campaign: "New Collection" },
  { id: 4, name: "EcoGreen", lastMsg: "Looking forward to the collab", time: "1d ago", unread: 0, campaign: "Sustainability" },
];

const messages = [
  { id: 1, sender: "them", text: "Hi Sarah! We loved your profile and would like to discuss a collaboration for our Summer Launch campaign.", time: "10:30 AM" },
  { id: 2, sender: "me", text: "Thank you! I'd love to hear more about the campaign details and expectations.", time: "10:32 AM" },
  { id: 3, sender: "them", text: "We're looking for 3 Instagram posts and 2 Stories over a 2-week period. Budget is $3,500.", time: "10:35 AM" },
  { id: 4, sender: "me", text: "That sounds interesting. Could we also include a Reel? I can offer a package with better engagement for $4,000.", time: "10:40 AM" },
  { id: 5, sender: "them", text: "That works! Let me send you a formal offer.", time: "10:42 AM" },
];

const Messages = () => {
  const [selected, setSelected] = useState(conversations[0]);
  const [input, setInput] = useState("");
  const [showMobileChat, setShowMobileChat] = useState(false);

  return (
    <div className="animate-fade-in">
      <h1 className="mb-6 font-display text-2xl font-bold">Messages</h1>
      <div className="flex h-[calc(100vh-12rem)] overflow-hidden rounded-xl border border-border bg-card">
        {/* Sidebar */}
        <div className={cn("w-80 flex-shrink-0 border-r border-border", showMobileChat ? "hidden md:block" : "block w-full md:w-80")}>
          <div className="border-b border-border p-4">
            <input type="text" placeholder="Search conversations..." className="h-9 w-full rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div className="overflow-y-auto">
            {conversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => { setSelected(conv); setShowMobileChat(true); }}
                className={cn(
                  "flex w-full items-start gap-3 border-b border-border p-4 text-left transition-colors hover:bg-secondary/50",
                  selected.id === conv.id && "bg-secondary"
                )}
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                  {conv.name.charAt(0)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <p className="truncate text-sm font-semibold">{conv.name}</p>
                    <span className="text-xs text-muted-foreground">{conv.time}</span>
                  </div>
                  <p className="truncate text-xs text-muted-foreground">{conv.lastMsg}</p>
                  <span className="mt-1 inline-flex rounded-full bg-secondary px-2 py-0.5 text-xs text-muted-foreground">{conv.campaign}</span>
                </div>
                {conv.unread > 0 && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    {conv.unread}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Panel */}
        <div className={cn("flex flex-1 flex-col", !showMobileChat ? "hidden md:flex" : "flex")}>
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border p-4">
            <div className="flex items-center gap-3">
              <button onClick={() => setShowMobileChat(false)} className="md:hidden text-sm text-primary">← Back</button>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                {selected.name.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-semibold">{selected.name}</p>
                <p className="text-xs text-muted-foreground">{selected.campaign}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-foreground hover:bg-secondary">
                <DollarSign className="mr-1 inline h-3 w-3" /> Send Offer
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg) => (
              <div key={msg.id} className={cn("flex", msg.sender === "me" ? "justify-end" : "justify-start")}>
                <div className={cn(
                  "max-w-[75%] rounded-2xl px-4 py-2.5 text-sm",
                  msg.sender === "me"
                    ? "gradient-primary text-primary-foreground"
                    : "bg-secondary text-foreground"
                )}>
                  <p>{msg.text}</p>
                  <p className={cn("mt-1 text-[10px]", msg.sender === "me" ? "text-primary-foreground/60" : "text-muted-foreground")}>{msg.time}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="border-t border-border p-4">
            <div className="flex items-center gap-2">
              <button className="rounded-lg p-2 text-muted-foreground hover:bg-secondary hover:text-foreground">
                <Paperclip className="h-5 w-5" />
              </button>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                className="h-10 flex-1 rounded-lg border border-input bg-background px-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <button className="gradient-primary rounded-lg p-2.5 text-primary-foreground">
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
