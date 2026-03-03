import React, { createContext, useContext, useState, useCallback } from "react";

export type CollaborationStatus =
  | "proposal"
  | "negotiation"
  | "accepted"
  | "escrow"
  | "deliverable_submitted"
  | "approved"
  | "funds_released"
  | "rejected";

export interface Offer {
  id: string;
  fromRole: "kol" | "company";
  amount: number;
  deliverables: string;
  message: string;
  timestamp: Date;
  isFinal: boolean;
  accepted: boolean;
}

export interface Deliverable {
  id: string;
  title: string;
  completed: boolean;
  approvedByCompany: boolean;
  submittedAt?: Date;
  approvedAt?: Date;
}

export interface Collaboration {
  id: string;
  campaignId: string;
  campaignTitle: string;
  companyId: string;
  companyName: string;
  kolId: string;
  kolName: string;
  status: CollaborationStatus;
  budget: number;
  agreedBudget?: number;
  timeline: string;
  deliverables: Deliverable[];
  offers: Offer[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Campaign {
  id: string;
  companyId: string;
  companyName: string;
  title: string;
  description: string;
  deliverables: string;
  budgetMin: number;
  budgetMax: number;
  deadline: string;
  platform: string;
  country: string;
  audience: string;
  status: "draft" | "active" | "completed" | "paused";
  appliedKols: string[];
  approvedKols: string[];
  createdAt: Date;
}

export interface WalletState {
  available: number;
  pending: number;
  escrow: number;
  totalEarned: number;
  totalAdded: number;
  transactions: Transaction[];
}

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  date: Date;
  status: "completed" | "pending" | "in_escrow" | "released";
  type: "credit" | "debit";
  collaborationId?: string;
}

interface CollaborationContextType {
  collaborations: Collaboration[];
  campaigns: Campaign[];
  wallets: Record<string, WalletState>;
  // Campaign actions
  createCampaign: (campaign: Omit<Campaign, "id" | "createdAt" | "appliedKols" | "approvedKols">) => Campaign;
  // KOL actions
  applyToCampaign: (campaignId: string, kolId: string, kolName: string) => void;
  // Company actions
  inviteKol: (campaignId: string, kolId: string, kolName: string) => void;
  approveKol: (collaborationId: string) => void;
  // Negotiation
  sendOffer: (collaborationId: string, offer: Omit<Offer, "id" | "timestamp" | "accepted">) => void;
  acceptOffer: (collaborationId: string, offerId: string) => void;
  rejectCollaboration: (collaborationId: string) => void;
  // Lifecycle
  moveToEscrow: (collaborationId: string) => void;
  submitDeliverable: (collaborationId: string, deliverableId: string) => void;
  approveDeliverable: (collaborationId: string, deliverableId: string) => void;
  markDeliverableComplete: (collaborationId: string, deliverableId: string) => void;
  releaseFunds: (collaborationId: string) => void;
  // Wallet
  getWallet: (userId: string, role: "kol" | "company") => WalletState;
  addFunds: (userId: string, amount: number) => void;
  withdrawFunds: (userId: string, amount: number) => void;
  // Helpers
  getCollaborationsForUser: (userId: string, role: "kol" | "company") => Collaboration[];
  getCampaignById: (id: string) => Campaign | undefined;
  getCollaborationById: (id: string) => Collaboration | undefined;
}

const CollaborationContext = createContext<CollaborationContextType | undefined>(undefined);

// --- Mock seed data ---
const SEED_DELIVERABLES: Deliverable[] = [
  { id: "d1", title: "Instagram Post #1", completed: false, approvedByCompany: false },
  { id: "d2", title: "Instagram Story", completed: false, approvedByCompany: false },
  { id: "d3", title: "Instagram Reel", completed: false, approvedByCompany: false },
];

const SEED_CAMPAIGNS: Campaign[] = [
  {
    id: "camp1", companyId: "2", companyName: "TechBrand Inc.", title: "Summer Product Launch",
    description: "Promote our new smart devices through engaging social media content.",
    deliverables: "3 Instagram posts, 2 Stories, 1 Reel", budgetMin: 2000, budgetMax: 5000,
    deadline: "2026-07-15", platform: "Instagram", country: "US", audience: "18-34, tech enthusiasts",
    status: "active", appliedKols: ["1"], approvedKols: ["1"], createdAt: new Date("2026-01-15"),
  },
  {
    id: "camp2", companyId: "2", companyName: "TechBrand Inc.", title: "Brand Awareness Q3",
    description: "Build brand awareness through influencer partnerships across platforms.",
    deliverables: "5 posts, 3 Stories, 2 Reels", budgetMin: 5000, budgetMax: 10000,
    deadline: "2026-09-30", platform: "Instagram", country: "US", audience: "25-44, professionals",
    status: "active", appliedKols: [], approvedKols: [], createdAt: new Date("2026-02-01"),
  },
  {
    id: "camp3", companyId: "2", companyName: "TechBrand Inc.", title: "Holiday Season Promo",
    description: "Year-end promotional campaign for holiday season.",
    deliverables: "2 YouTube videos, 3 Instagram posts", budgetMin: 3000, budgetMax: 8000,
    deadline: "2026-12-15", platform: "YouTube", country: "US", audience: "18-45, shoppers",
    status: "draft", appliedKols: [], approvedKols: [], createdAt: new Date("2026-02-20"),
  },
];

const SEED_COLLABORATIONS: Collaboration[] = [
  {
    id: "collab1", campaignId: "camp1", campaignTitle: "Summer Product Launch",
    companyId: "2", companyName: "TechBrand Inc.", kolId: "1", kolName: "Sarah Chen",
    status: "negotiation", budget: 3500, timeline: "Jun 1 – Jul 15",
    deliverables: [...SEED_DELIVERABLES],
    offers: [
      { id: "o1", fromRole: "company", amount: 3000, deliverables: "3 IG posts + 2 Stories", message: "We'd love to work with you!", timestamp: new Date("2026-03-01T10:30:00"), isFinal: false, accepted: false },
      { id: "o2", fromRole: "kol", amount: 4000, deliverables: "3 IG posts + 2 Stories + 1 Reel", message: "I can add a Reel for better engagement.", timestamp: new Date("2026-03-01T10:40:00"), isFinal: false, accepted: false },
    ],
    createdAt: new Date("2026-03-01"), updatedAt: new Date("2026-03-01"),
  },
  {
    id: "collab2", campaignId: "camp1", campaignTitle: "Summer Product Launch",
    companyId: "2", companyName: "TechBrand Inc.", kolId: "1", kolName: "Sarah Chen",
    status: "escrow", budget: 1800, agreedBudget: 1800, timeline: "May 15 – Jun 30",
    deliverables: [
      { id: "d4", title: "Product Review Video", completed: true, approvedByCompany: true, submittedAt: new Date(), approvedAt: new Date() },
      { id: "d5", title: "Instagram Story Set", completed: false, approvedByCompany: false },
    ],
    offers: [],
    createdAt: new Date("2026-02-15"), updatedAt: new Date("2026-03-01"),
  },
  {
    id: "collab3", campaignId: "camp2", campaignTitle: "Brand Awareness Q3",
    companyId: "2", companyName: "TechBrand Inc.", kolId: "1", kolName: "Sarah Chen",
    status: "funds_released", budget: 2500, agreedBudget: 2500, timeline: "Mar 1 – Apr 15",
    deliverables: [
      { id: "d6", title: "App Launch Post", completed: true, approvedByCompany: true },
    ],
    offers: [],
    createdAt: new Date("2026-01-01"), updatedAt: new Date("2026-02-15"),
  },
];

const defaultWallet = (role: "kol" | "company"): WalletState =>
  role === "kol"
    ? { available: 5300, pending: 1800, escrow: 0, totalEarned: 18400, totalAdded: 0, transactions: [] }
    : { available: 9700, pending: 0, escrow: 3500, totalEarned: 0, totalAdded: 25000, transactions: [] };

export const CollaborationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [collaborations, setCollaborations] = useState<Collaboration[]>(SEED_COLLABORATIONS);
  const [campaigns, setCampaigns] = useState<Campaign[]>(SEED_CAMPAIGNS);
  const [wallets, setWallets] = useState<Record<string, WalletState>>({
    "1": defaultWallet("kol"),
    "2": defaultWallet("company"),
  });

  const getWallet = useCallback((userId: string, role: "kol" | "company") => {
    return wallets[userId] || defaultWallet(role);
  }, [wallets]);

  const updateWallet = useCallback((userId: string, updater: (w: WalletState) => WalletState) => {
    setWallets((prev) => ({
      ...prev,
      [userId]: updater(prev[userId] || defaultWallet("kol")),
    }));
  }, []);

  const createCampaign = useCallback((data: Omit<Campaign, "id" | "createdAt" | "appliedKols" | "approvedKols">) => {
    const campaign: Campaign = { ...data, id: `camp_${Date.now()}`, createdAt: new Date(), appliedKols: [], approvedKols: [] };
    setCampaigns((prev) => [...prev, campaign]);
    return campaign;
  }, []);

  const applyToCampaign = useCallback((campaignId: string, kolId: string, kolName: string) => {
    setCampaigns((prev) =>
      prev.map((c) => c.id === campaignId ? { ...c, appliedKols: [...c.appliedKols, kolId] } : c)
    );
    const campaign = campaigns.find((c) => c.id === campaignId);
    if (campaign) {
      const collab: Collaboration = {
        id: `collab_${Date.now()}`, campaignId, campaignTitle: campaign.title,
        companyId: campaign.companyId, companyName: campaign.companyName,
        kolId, kolName, status: "proposal", budget: campaign.budgetMin,
        timeline: `Now – ${campaign.deadline}`,
        deliverables: campaign.deliverables.split(",").map((d, i) => ({
          id: `d_${Date.now()}_${i}`, title: d.trim(), completed: false, approvedByCompany: false,
        })),
        offers: [], createdAt: new Date(), updatedAt: new Date(),
      };
      setCollaborations((prev) => [...prev, collab]);
    }
  }, [campaigns]);

  const inviteKol = useCallback((campaignId: string, kolId: string, kolName: string) => {
    const campaign = campaigns.find((c) => c.id === campaignId);
    if (!campaign) return;
    const collab: Collaboration = {
      id: `collab_${Date.now()}`, campaignId, campaignTitle: campaign.title,
      companyId: campaign.companyId, companyName: campaign.companyName,
      kolId, kolName, status: "proposal", budget: campaign.budgetMin,
      timeline: `Now – ${campaign.deadline}`,
      deliverables: campaign.deliverables.split(",").map((d, i) => ({
        id: `d_${Date.now()}_${i}`, title: d.trim(), completed: false, approvedByCompany: false,
      })),
      offers: [], createdAt: new Date(), updatedAt: new Date(),
    };
    setCollaborations((prev) => [...prev, collab]);
  }, [campaigns]);

  const approveKol = useCallback((collaborationId: string) => {
    setCollaborations((prev) =>
      prev.map((c) => c.id === collaborationId ? { ...c, status: "negotiation" as CollaborationStatus, updatedAt: new Date() } : c)
    );
  }, []);

  const sendOffer = useCallback((collaborationId: string, offer: Omit<Offer, "id" | "timestamp" | "accepted">) => {
    const newOffer: Offer = { ...offer, id: `offer_${Date.now()}`, timestamp: new Date(), accepted: false };
    setCollaborations((prev) =>
      prev.map((c) =>
        c.id === collaborationId
          ? { ...c, offers: [...c.offers, newOffer], status: "negotiation" as CollaborationStatus, updatedAt: new Date() }
          : c
      )
    );
  }, []);

  const acceptOffer = useCallback((collaborationId: string, offerId: string) => {
    setCollaborations((prev) =>
      prev.map((c) => {
        if (c.id !== collaborationId) return c;
        const offer = c.offers.find((o) => o.id === offerId);
        return {
          ...c,
          status: "accepted" as CollaborationStatus,
          agreedBudget: offer?.amount || c.budget,
          offers: c.offers.map((o) => o.id === offerId ? { ...o, accepted: true } : o),
          updatedAt: new Date(),
        };
      })
    );
  }, []);

  const rejectCollaboration = useCallback((collaborationId: string) => {
    setCollaborations((prev) =>
      prev.map((c) => c.id === collaborationId ? { ...c, status: "rejected" as CollaborationStatus, updatedAt: new Date() } : c)
    );
  }, []);

  const moveToEscrow = useCallback((collaborationId: string) => {
    setCollaborations((prev) =>
      prev.map((c) => {
        if (c.id !== collaborationId) return c;
        const amount = c.agreedBudget || c.budget;
        // Move funds to escrow for the company
        updateWallet(c.companyId, (w) => ({
          ...w,
          available: w.available - amount,
          escrow: w.escrow + amount,
          transactions: [
            { id: `tx_${Date.now()}`, description: `Escrow - ${c.campaignTitle}`, amount: -amount, date: new Date(), status: "in_escrow", type: "debit", collaborationId },
            ...w.transactions,
          ],
        }));
        // Add pending for KOL
        updateWallet(c.kolId, (w) => ({
          ...w,
          pending: w.pending + amount,
          transactions: [
            { id: `tx_${Date.now()}_k`, description: `Escrow held - ${c.campaignTitle}`, amount, date: new Date(), status: "pending", type: "credit", collaborationId },
            ...w.transactions,
          ],
        }));
        return { ...c, status: "escrow" as CollaborationStatus, updatedAt: new Date() };
      })
    );
  }, [updateWallet]);

  const submitDeliverable = useCallback((collaborationId: string, deliverableId: string) => {
    setCollaborations((prev) =>
      prev.map((c) => {
        if (c.id !== collaborationId) return c;
        const deliverables = c.deliverables.map((d) =>
          d.id === deliverableId ? { ...d, completed: true, submittedAt: new Date() } : d
        );
        const allSubmitted = deliverables.every((d) => d.completed);
        return {
          ...c,
          deliverables,
          status: allSubmitted ? "deliverable_submitted" as CollaborationStatus : c.status,
          updatedAt: new Date(),
        };
      })
    );
  }, []);

  const approveDeliverable = useCallback((collaborationId: string, deliverableId: string) => {
    setCollaborations((prev) =>
      prev.map((c) => {
        if (c.id !== collaborationId) return c;
        const deliverables = c.deliverables.map((d) =>
          d.id === deliverableId ? { ...d, approvedByCompany: true, approvedAt: new Date() } : d
        );
        const allApproved = deliverables.every((d) => d.approvedByCompany);
        return {
          ...c,
          deliverables,
          status: allApproved ? "approved" as CollaborationStatus : c.status,
          updatedAt: new Date(),
        };
      })
    );
  }, []);

  const markDeliverableComplete = useCallback((collaborationId: string, deliverableId: string) => {
    submitDeliverable(collaborationId, deliverableId);
  }, [submitDeliverable]);

  const releaseFunds = useCallback((collaborationId: string) => {
    setCollaborations((prev) =>
      prev.map((c) => {
        if (c.id !== collaborationId) return c;
        const amount = c.agreedBudget || c.budget;
        // Release escrow from company
        updateWallet(c.companyId, (w) => ({
          ...w,
          escrow: w.escrow - amount,
          transactions: [
            { id: `tx_${Date.now()}_r`, description: `Released - ${c.campaignTitle}`, amount: -amount, date: new Date(), status: "released", type: "debit", collaborationId },
            ...w.transactions,
          ],
        }));
        // Credit KOL
        updateWallet(c.kolId, (w) => ({
          ...w,
          pending: w.pending - amount,
          available: w.available + amount,
          totalEarned: w.totalEarned + amount,
          transactions: [
            { id: `tx_${Date.now()}_kr`, description: `Payment - ${c.campaignTitle}`, amount, date: new Date(), status: "completed", type: "credit", collaborationId },
            ...w.transactions,
          ],
        }));
        return { ...c, status: "funds_released" as CollaborationStatus, updatedAt: new Date() };
      })
    );
  }, [updateWallet]);

  const addFunds = useCallback((userId: string, amount: number) => {
    updateWallet(userId, (w) => ({
      ...w,
      available: w.available + amount,
      totalAdded: w.totalAdded + amount,
      transactions: [
        { id: `tx_${Date.now()}`, description: "Added Funds", amount, date: new Date(), status: "completed", type: "credit" },
        ...w.transactions,
      ],
    }));
  }, [updateWallet]);

  const withdrawFunds = useCallback((userId: string, amount: number) => {
    updateWallet(userId, (w) => ({
      ...w,
      available: w.available - amount,
      transactions: [
        { id: `tx_${Date.now()}`, description: "Withdrawal", amount: -amount, date: new Date(), status: "completed", type: "debit" },
        ...w.transactions,
      ],
    }));
  }, [updateWallet]);

  const getCollaborationsForUser = useCallback((userId: string, role: "kol" | "company") => {
    return collaborations.filter((c) => role === "kol" ? c.kolId === userId : c.companyId === userId);
  }, [collaborations]);

  const getCampaignById = useCallback((id: string) => campaigns.find((c) => c.id === id), [campaigns]);
  const getCollaborationById = useCallback((id: string) => collaborations.find((c) => c.id === id), [collaborations]);

  return (
    <CollaborationContext.Provider
      value={{
        collaborations, campaigns, wallets,
        createCampaign, applyToCampaign, inviteKol, approveKol,
        sendOffer, acceptOffer, rejectCollaboration,
        moveToEscrow, submitDeliverable, approveDeliverable, markDeliverableComplete, releaseFunds,
        getWallet, addFunds, withdrawFunds,
        getCollaborationsForUser, getCampaignById, getCollaborationById,
      }}
    >
      {children}
    </CollaborationContext.Provider>
  );
};

export const useCollaboration = () => {
  const ctx = useContext(CollaborationContext);
  if (!ctx) throw new Error("useCollaboration must be used within CollaborationProvider");
  return ctx;
};
