import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowLeft, Loader2, MessageCircle, Search, Send } from "lucide-react";
import api from "../api/axiosInstance";
import { useAuth } from "./context/authContext";

// ---------------------------------------------------------------------------
// Messenger — full-screen direct-messaging UI.
// Two-column: contact sidebar (search + conversations) and a chat area.
// Real-time via polling (3s) — no Socket.io needed.
// ---------------------------------------------------------------------------

const ROLE_OPTIONS = [
  { value: "", label: "Everyone" },
  { value: "EMPLOYER", label: "Employers" },
  { value: "STUDENT", label: "Students" },
];

const AVATAR_PALETTE = [
  "bg-gradient-to-br from-[#0D1F4C] to-[#2563EB]",
  "bg-gradient-to-br from-emerald-600 to-emerald-400",
  "bg-gradient-to-br from-slate-700 to-slate-500",
];

const getInitials = (name = "") =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() || "")
    .join("") || "?";

const formatTime = (iso) => {
  if (!iso) return "";
  return new Date(iso).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

function Avatar({ name, index = 0, size = "h-10 w-10", textSize = "text-sm" }) {
  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-full text-white font-bold ${size} ${textSize} ${
        AVATAR_PALETTE[index % AVATAR_PALETTE.length]
      }`}
    >
      {getInitials(name)}
    </div>
  );
}

function RoleBadge({ role }) {
  const styles = {
    STUDENT: "bg-emerald-100 text-emerald-700",
    EMPLOYER: "bg-blue-100 text-blue-700",
    ADMIN: "bg-slate-200 text-slate-700",
  };
  return (
    <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${styles[role] || styles.ADMIN}`}>
      {role}
    </span>
  );
}

export default function Messenger() {
  const { user } = useAuth();
  const scrollRef = useRef(null);
  const [searchParams] = useSearchParams();
  // Deep link from a listing card's message icon — read once so the load
  // effect stays dependency-free (the URL query won't change mid-session).
  const deepLinkRef = useRef({
    userId: searchParams.get("user"),
    name: searchParams.get("name"),
    role: searchParams.get("role") || "STUDENT",
  });

  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const [activeConversation, setActiveConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [messageInput, setMessageInput] = useState("");
  const [sending, setSending] = useState(false);

  const isSearchActive = searchQuery.trim().length > 0 || roleFilter !== "";
  const displayedContacts = isSearchActive ? searchResults : conversations;
  const activeConvId = activeConversation?.id;

  const homeHref =
    user?.role === "STUDENT"
      ? "/student/home"
      : user?.role === "EMPLOYER"
      ? "/employer-dashboard"
      : "/dashboard";

  // Initial load: conversation list
  useEffect(() => {
    let cancelled = false;
    api
      .get("/chat/conversations")
      .then((res) => {
        if (cancelled) return;
        const convList = res.data.data || [];
        setConversations(convList);

        // Deep link from a listing card's message icon: open a chat with that user.
        const targetUserId = deepLinkRef.current.userId;
        if (targetUserId) {
          const existing = convList.find((c) => c.otherParticipant?.id === targetUserId);
          if (existing) {
            setActiveConversation(existing);
            setMessagesLoading(true);
            api
              .get(`/chat/conversations/${existing.id}/messages`)
              .then((mres) => {
                if (!cancelled) setMessages(mres.data.data || []);
              })
              .catch(() => {
                if (!cancelled) setMessages([]);
              })
              .finally(() => {
                if (!cancelled) setMessagesLoading(false);
              });
          } else {
            setActiveConversation({
              id: null,
              otherParticipant: {
                id: targetUserId,
                name: deepLinkRef.current.name || "Freelancer",
                role: deepLinkRef.current.role,
              },
            });
            setMessagesLoading(false);
          }
        }
      })
      .catch(() => {
        if (!cancelled) setError("Could not load conversations. Please try again.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // Debounced user search
  useEffect(() => {
    const query = searchQuery.trim();
    if (!query && !roleFilter) return;
    const timer = setTimeout(() => {
      api
        .get("/chat/users", {
          params: {
            search: query || undefined,
            roleFilter: roleFilter || undefined,
          },
        })
        .then((res) => setSearchResults(res.data.data || []))
        .catch(() => setSearchResults([]));
    }, 400);
    return () => clearTimeout(timer);
  }, [searchQuery, roleFilter]);

  // Poll active conversation every 3s + refresh sidebar previews
  useEffect(() => {
    if (!activeConvId) return;
    let cancelled = false;
    const poll = () => {
      api
        .get(`/chat/conversations/${activeConvId}/messages`)
        .then((res) => {
          if (!cancelled) setMessages(res.data.data || []);
        })
        .catch(() => {});
      api
        .get("/chat/conversations")
        .then((res) => {
          if (!cancelled) setConversations(res.data.data || []);
        })
        .catch(() => {});
    };
    const interval = setInterval(poll, 3000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [activeConvId]);

  // Auto-scroll to newest message
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, activeConvId]);

  const openConversation = async (conv) => {
    setActiveConversation(conv);
    setMessages([]);
    setMessagesLoading(true);
    setSearchQuery("");
    setRoleFilter("");
    try {
      const res = await api.get(`/chat/conversations/${conv.id}/messages`);
      setMessages(res.data.data || []);
    } catch (err) {
      console.error("Failed to load messages:", err);
    } finally {
      setMessagesLoading(false);
    }
  };

  const startChat = (contact) => {
    const existing = conversations.find((c) => c.otherParticipant?.id === contact.id);
    if (existing) {
      openConversation(existing);
    } else {
      setActiveConversation({ id: null, otherParticipant: contact });
      setMessages([]);
      setSearchQuery("");
      setRoleFilter("");
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    const content = messageInput.trim();
    if (!content || !activeConversation?.otherParticipant) return;
    setSending(true);
    try {
      const res = await api.post("/chat/messages", {
        receiverId: activeConversation.otherParticipant.id,
        content,
      });
      setMessageInput("");
      if (!activeConversation.id) {
        const convRes = await api.get("/chat/conversations");
        setConversations(convRes.data.data || []);
        const fresh = convRes.data.data.find(
          (c) => c.otherParticipant?.id === activeConversation.otherParticipant.id
        );
        if (fresh) setActiveConversation(fresh);
      }
      setMessages((prev) => [...prev, res.data.data]);
    } catch (err) {
      console.error("Failed to send message:", err);
    } finally {
      setSending(false);
    }
  };

  const renderEmptyChat = () => (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 p-10 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
        <MessageCircle className="h-8 w-8" />
      </div>
      <p className="text-sm font-semibold text-slate-700">Select a conversation</p>
      <p className="max-w-xs text-xs text-slate-500">
        Pick a conversation from the sidebar, or search for a student or employer to start a new chat.
      </p>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top bar */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <Link
              to={homeHref}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50 hover:text-slate-900"
              aria-label="Back to home"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0D1F4C] text-white">
              <MessageCircle className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-lg font-extrabold text-slate-900">Messenger</h1>
              <span className="text-xs text-slate-500">Direct messages — real-time</span>
            </div>
          </div>
          <span className="hidden items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-[11px] font-bold text-emerald-700 sm:flex">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Live
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-6xl p-4 sm:p-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[340px_1fr]">
          {/* ── Sidebar ─────────────────────────────────────── */}
          <aside className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:max-h-[calc(100vh-150px)] lg:flex lg:flex-col">
            <div className="border-b border-slate-100 p-4">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search people..."
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm text-slate-800 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-200"
                  />
                </div>
                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  aria-label="Filter by role"
                  className="rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-2 text-xs font-semibold text-slate-600 outline-none transition focus:border-emerald-500"
                >
                  {ROLE_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
              <p className="mt-2.5 text-[11px] text-slate-400">
                {isSearchActive ? "Search results" : "Conversations"}
              </p>
            </div>

            <div className="flex-1 overflow-y-auto">
              {loading && !isSearchActive ? (
                <div className="flex items-center justify-center gap-2 py-12 text-sm text-slate-400">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Loading...
                </div>
              ) : error ? (
                <p className="px-4 py-12 text-center text-xs text-red-500">{error}</p>
              ) : displayedContacts.length === 0 ? (
                <p className="px-4 py-12 text-center text-xs text-slate-400">
                  {isSearchActive ? "No users found." : "No conversations yet. Search for someone to start chatting."}
                </p>
              ) : (
                <ul className="divide-y divide-slate-100">
                  {displayedContacts.map((contact, index) => {
                    const isActive = activeConversation?.id === contact.id;
                    const otherParticipant = isSearchActive ? contact : contact.otherParticipant;
                    if (!otherParticipant) return null;
                    const latest = contact.latestMessage || null;
                    const unread =
                      !isSearchActive &&
                      latest &&
                      latest.senderId !== user?.id &&
                      !latest.isRead;
                    return (
                      <li key={contact.id || otherParticipant.id}>
                        <button
                          type="button"
                          onClick={() => (isSearchActive ? startChat(contact) : openConversation(contact))}
                          className={`flex w-full items-center gap-3 px-4 py-3 text-left transition ${
                            isActive
                              ? "bg-emerald-50"
                              : "hover:bg-slate-50"
                          }`}
                        >
                          <Avatar name={otherParticipant.name} index={index} />
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-2">
                              <span className="truncate text-sm font-bold text-slate-900">
                                {otherParticipant.name}
                              </span>
                              {!isSearchActive && latest && (
                                <span className="shrink-0 text-[10px] text-slate-400">
                                  {formatTime(latest.createdAt)}
                                </span>
                              )}
                            </div>
                            <div className="mt-0.5 flex items-center justify-between gap-2">
                              <span className="truncate text-xs text-slate-500">
                                {isSearchActive
                                  ? otherParticipant.university_id || otherParticipant.email || ""
                                  : latest
                                  ? `${latest.senderId === user?.id ? "You: " : ""}${latest.content}`
                                  : "No messages yet"}
                              </span>
                              {isSearchActive && (
                                <RoleBadge role={otherParticipant.role} />
                              )}
                            </div>
                          </div>
                          {unread && (
                            <span className="ml-auto h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-500" />
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </aside>

          {/* ── Chat area ───────────────────────────────────── */}
          <section className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:max-h-[calc(100vh-150px)]">
            {!activeConversation ? (
              renderEmptyChat()
            ) : (
              <>
                <div className="flex items-center gap-3 border-b border-slate-100 bg-slate-50/60 px-4 py-3">
                  <Avatar name={activeConversation.otherParticipant?.name} index={2} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold text-slate-900">
                      {activeConversation.otherParticipant?.name}
                    </p>
                    <p className="truncate text-xs text-slate-500">
                      {activeConversation.otherParticipant?.university_id ||
                        activeConversation.otherParticipant?.email}
                    </p>
                  </div>
                  {activeConversation.otherParticipant?.role && (
                    <RoleBadge role={activeConversation.otherParticipant.role} />
                  )}
                </div>

                <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-slate-50/40 p-4">
                  {messagesLoading ? (
                    <div className="flex items-center justify-center gap-2 py-12 text-sm text-slate-400">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Loading messages...
                    </div>
                  ) : messages.length === 0 ? (
                    <p className="py-12 text-center text-xs text-slate-400">
                      No messages yet. Say hello!
                    </p>
                  ) : (
                    messages.map((msg) => {
                      const mine = msg.senderId === user?.id;
                      return (
                        <div key={msg.id} className={`flex ${mine ? "justify-end" : "justify-start"}`}>
                          <div
                            className={`max-w-[78%] rounded-2xl px-4 py-2.5 text-sm shadow-sm ${
                              mine
                                ? "rounded-br-md bg-[#0D1F4C] text-white"
                                : "rounded-bl-md border border-slate-200 bg-white text-slate-800"
                            }`}
                          >
                            <p className="whitespace-pre-wrap break-words">{msg.content}</p>
                            <span
                              className={`mt-1 block text-[10px] ${
                                mine ? "text-white/60" : "text-slate-400"
                              }`}
                            >
                              {formatTime(msg.createdAt)}
                              {msg.isRead && mine && <span className="ml-1">· Read</span>}
                            </span>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

                <form
                  onSubmit={handleSend}
                  className="flex items-center gap-2 border-t border-slate-200 bg-white p-3"
                >
                  <input
                    type="text"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-200"
                  />
                  <button
                    type="submit"
                    disabled={sending || !messageInput.trim()}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0D1F4C] text-white transition hover:bg-[#1A3268] disabled:cursor-not-allowed disabled:opacity-50"
                    aria-label="Send message"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </form>
              </>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
