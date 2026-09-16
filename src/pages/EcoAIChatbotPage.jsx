import React, { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles, RefreshCw, MessageSquare, ShieldCheck } from "lucide-react";
import { MOCK_BOT_RESPONSES } from "../data/mockData";
import { DemoBadge, LeafDecoration } from "../components/HandDrawnDoodles";

export default function EcoAIChatbotPage({ user, budget, activities }) {
  const [messages, setMessages] = useState([
    {
      id: "msg-1",
      sender: "bot",
      text: "Hey! I'm EcoAI 🌿. Want to discover an easy way to reduce your footprint today?",
      time: "Just now",
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = (textToSend = inputText) => {
    if (!textToSend.trim()) return;

    const userMsg = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsTyping(true);

    // AI Engine Response Logic (Mock engine with API extension hooks)
    setTimeout(() => {
      const lower = textToSend.toLowerCase();
      let matchedReply = null;

      for (const item of MOCK_BOT_RESPONSES) {
        if (item.keywords.some((k) => lower.includes(k))) {
          matchedReply = item.reply;
          break;
        }
      }

      if (!matchedReply) {
        matchedReply = `Great question! Based on your current monthly budget of ${budget.monthlyLimitKg} kg CO₂e (${budget.usedKg} kg used), making small adjustments like choosing local produce, combining errands, or reducing standby power draws can easily save 5-10 kg CO₂e every week!`;
      }

      const botMsg = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: matchedReply,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 1200);
  };

  const samplePrompts = [
    "How can I reduce my carbon footprint?",
    "Which of my habits has the biggest impact?",
    "What can I change this week?",
    "Suggest greener travel options.",
  ];

  return (
    <div className="space-y-6 p-4 lg:p-8 max-w-5xl mx-auto">
      
      {/* Header Banner */}
      <div className="bg-[#F6EFE0] p-6 rounded-3xl border-3 border-[#20251F] shadow-[6px_6px_0px_#0B2418] relative overflow-hidden">
        <LeafDecoration className="absolute -top-3 -right-3 w-16 h-16 text-[#A7C98F]/40" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="font-heading text-2xl lg:text-3xl font-extrabold text-[#0B2418]">
                EcoAI Assistant 🌿
              </h1>
              <DemoBadge />
            </div>
            <p className="text-sm font-medium text-[#173D28]">
              Your personal AI climate advisor. Ask questions and get customized carbon advice.
            </p>
          </div>

          <span className="bg-[#173D28] text-[#C4E89A] border-2 border-[#20251F] text-xs font-black px-3 py-1.5 rounded-full shadow-[2px_2px_0px_#0B2418] shrink-0 self-start md:self-auto flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Smart Climate Engine</span>
          </span>
        </div>
      </div>

      {/* Main Chat Box Container */}
      <div className="sketch-card bg-[#FFF8E8] p-4 lg:p-6 border-3 border-[#20251F] shadow-[8px_8px_0px_#0B2418] min-h-[500px] flex flex-col justify-between">
        
        {/* Messages Feed */}
        <div className="space-y-4 overflow-y-auto max-h-[420px] pr-2 pb-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 max-w-xl ${
                msg.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
              }`}
            >
              <div
                className={`w-9 h-9 rounded-2xl border-2 border-[#20251F] flex items-center justify-center font-bold text-sm shrink-0 ${
                  msg.sender === "user"
                    ? "bg-[#173D28] text-[#C4E89A]"
                    : "bg-[#C4E89A] text-[#0B2418]"
                }`}
              >
                {msg.sender === "user" ? "👤" : "🌿"}
              </div>

              <div
                className={`p-4 rounded-2xl border-2 border-[#20251F] text-xs font-semibold leading-relaxed shadow-[3px_3px_0px_#0B2418] ${
                  msg.sender === "user"
                    ? "bg-[#173D28] text-[#FFF8E8]"
                    : "bg-[#F6EFE0] text-[#0B2418]"
                }`}
              >
                <p>{msg.text}</p>
                <span className="block text-[10px] opacity-70 mt-1.5 text-right font-mono">
                  {msg.time}
                </span>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex items-center gap-3 mr-auto">
              <div className="w-9 h-9 rounded-2xl bg-[#C4E89A] text-[#0B2418] border-2 border-[#20251F] flex items-center justify-center text-sm font-bold">
                🌿
              </div>
              <div className="p-3 bg-[#F6EFE0] rounded-2xl border-2 border-[#20251F] flex items-center gap-1.5 shadow-[2px_2px_0px_#0B2418]">
                <span className="w-2 h-2 rounded-full bg-[#173D28] animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-[#173D28] animate-bounce [animation-delay:0.2s]" />
                <span className="w-2 h-2 rounded-full bg-[#173D28] animate-bounce [animation-delay:0.4s]" />
                <span className="text-[11px] font-bold text-[#173D28] ml-2">EcoAI is thinking...</span>
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Quick Sample Prompts */}
        <div className="pt-3 border-t-2 border-[#20251F]/20 space-y-3">
          <p className="text-[11px] font-extrabold text-[#173D28] uppercase tracking-wider">
            Suggested Prompts:
          </p>
          <div className="flex flex-wrap gap-2">
            {samplePrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(prompt)}
                className="text-xs font-extrabold bg-[#F6EFE0] hover:bg-[#C4E89A] border-1.5 border-[#20251F] px-3 py-1.5 rounded-xl transition-all text-[#0B2418] hover:-translate-y-0.5"
              >
                💬 "{prompt}"
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2 pt-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask EcoAI anything about your carbon budget..."
              className="flex-1 bg-[#F6EFE0] border-2 border-[#20251F] rounded-2xl px-4 py-3 text-xs font-bold text-[#0B2418] focus:outline-none"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="sketch-button-accent px-5 py-3 rounded-2xl font-black text-xs flex items-center gap-1.5 disabled:opacity-50"
            >
              <span>Send</span>
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

      </div>

    </div>
  );
}
