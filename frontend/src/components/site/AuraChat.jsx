import React from "react";
import { MessageCircle, X, Send, Sparkles, Loader2 } from "lucide-react";
import axios from "axios";
import { auth, endpoints } from "../../lib/apiClient";

const API_BASE = process.env.REACT_APP_API_BASE || "https://endpoint.afinity.ai";

/**
 * Floating Aura chat widget. Anonymous visitors get a guest account
 * created on first message (so the AI endpoint can authenticate).
 * Falls back to a friendly canned reply if the backend AI is unreachable.
 */
export default function AuraChat() {
  const [open, setOpen] = React.useState(false);
  const [busy, setBusy] = React.useState(false);
  const [input, setInput] = React.useState("");
  const sessionId = React.useMemo(
    () => "aura-" + Math.random().toString(36).slice(2, 10),
    []
  );
  const [messages, setMessages] = React.useState([
    {
      from: "Afinity.AI",
      text:
        "Hi, I'm Afinity.AI — your AI insurance copilot. Ask me anything about Travel, Health, Motor, PA or Home cover.",
    },
  ]);
  const scrollRef = React.useRef(null);

  React.useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener("aura:open", onOpen);
    return () => window.removeEventListener("aura:open", onOpen);
  }, []);

  React.useEffect(() => {
    if (scrollRef.current)
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, open]);

  const ensureGuestSession = async () => {
    if (auth.getToken()) return auth.getToken();
    const ts = Date.now();
    const res = await endpoints.signup({
      email: `guest_${ts}@aura.afinity.ai`,
      phone: `+60100${ts.toString().slice(-7)}`,
      full_name: "Afinity.AI Guest",
      password: "Afinity.AI" + Math.random().toString(36).slice(-8) + "!1",
      role: "customer",
    });
    auth.setSession(res.data.token, res.data.user);
    return res.data.token;
  };

  const send = async () => {
    const text = input.trim();
    if (!text || busy) return;
    setMessages((m) => [...m, { from: "user", text }]);
    setInput("");
    setBusy(true);
    try {
      const token = await ensureGuestSession();
      const res = await axios.post(
        `${API_BASE}/api/ai/chat`,
        { session_id: sessionId, message: text },
        { headers: { Authorization: `Bearer ${token}` }, timeout: 30000 }
      );
      const reply =
        res.data?.message || res.data?.reply || res.data?.response || JSON.stringify(res.data);
      setMessages((m) => [...m, { from: "Afinity.AI", text: reply }]);
    } catch (err) {
      setMessages((m) => [
        ...m,
        {
          from: "Afinity.AI",
          text:
            "Afinity.AI's AI engine is briefly offline. In the meantime, here's a quick steer: for short trips → Travel Shield Global from RM 29; for car cover → Motor Easy with 10% online rebate; for KLIA hospital cashless → Health Secure Plus. Or tap any shield on the home page to start a 60-second quote.",
        },
      ]);
    } finally {
      setBusy(false);
    }
  };

  const onKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        data-testid="aura-chat-fab"
        className="fixed bottom-6 right-6 z-40 w-16 h-16 rounded-full bg-ink text-lime flex items-center justify-center shadow-xl hover:scale-105 transition"
        aria-label="Chat with Afinity.AI"
      >
        {open ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
        {!open && (
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-lime border-2 border-ink animate-pulse" />
        )}
      </button>

      <div
        className={`fixed bottom-24 right-6 z-40 w-[min(380px,calc(100vw-2rem))] h-[520px] bg-cream rounded-3xl border border-ink/10 shadow-2xl flex flex-col overflow-hidden transition-all duration-500 origin-bottom-right ${
          open ? "scale-100 opacity-100" : "scale-90 opacity-0 pointer-events-none"
        }`}
        data-testid="aura-chat-panel"
      >
        <header className="bg-ink text-cream px-5 py-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-lime/30 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-lime" />
          </div>
          <div className="flex-1">
            <div className="font-display text-lg leading-none">Afinity.AI</div>
            <div className="text-[11px] text-cream/60 uppercase tracking-widest mt-0.5">
              AI insurance copilot
            </div>
          </div>
          <span className="flex items-center gap-1.5 text-[10px] text-lime">
            <span className="w-1.5 h-1.5 rounded-full bg-lime animate-pulse" />
            Online
          </span>
        </header>

        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                  m.from === "user"
                    ? "bg-ink text-cream rounded-br-sm"
                    : "bg-white border border-ink/10 rounded-bl-sm"
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}
          {busy && (
            <div className="flex justify-start">
              <div className="bg-white border border-ink/10 rounded-2xl rounded-bl-sm px-4 py-2.5">
                <Loader2 className="w-4 h-4 animate-spin text-ink/50" />
              </div>
            </div>
          )}
        </div>

        <div className="p-3 border-t border-ink/10 bg-cream flex items-end gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKey}
            data-testid="aura-chat-input"
            rows={1}
            placeholder="Ask Afinity.AI anything…"
            className="flex-1 resize-none px-4 py-3 rounded-2xl border border-ink/10 bg-white text-sm focus:border-ink outline-none max-h-24"
          />
          <button
            onClick={send}
            disabled={busy || !input.trim()}
            data-testid="aura-chat-send"
            className="w-11 h-11 shrink-0 rounded-full bg-lime text-ink flex items-center justify-center disabled:opacity-40 hover:bg-ink hover:text-lime transition"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </>
  );
}
