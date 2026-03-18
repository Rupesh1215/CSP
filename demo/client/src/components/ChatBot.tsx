import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { FAQResponse } from "@shared/schema";

interface Message {
  role: 'user' | 'bot';
  content: string;
  sources?: FAQResponse['sources'];
  outOfScope?: boolean;
}

interface ChatBotProps {
  language: 'en' | 'hi' | 'te';
}

const translations = {
  en: {
    title: "Health FAQ Assistant",
    scopeNotice: "I can only answer questions about health camps, vaccination schedules, and government schemes. I cannot provide medical advice.",
    placeholder: "Ask about camps, vaccines, or schemes...",
    send: "Send",
    sources: "Sources:",
    thinking: "Thinking...",
    error: "Sorry, something went wrong. Please try again."
  },
  hi: {
    title: "स्वास्थ्य FAQ सहायक",
    scopeNotice: "मैं केवल स्वास्थ्य शिविरों, टीकाकरण कार्यक्रम और सरकारी योजनाओं के बारे में प्रश्नों का उत्तर दे सकता हूं। मैं चिकित्सा सलाह प्रदान नहीं कर सकता।",
    placeholder: "शिविरों, टीकों या योजनाओं के बारे में पूछें...",
    send: "भेजें",
    sources: "स्रोत:",
    thinking: "सोच रहा हूँ...",
    error: "क्षमा करें, कुछ गलत हो गया। कृपया पुनः प्रयास करें।"
  },
  te: {
    title: "ఆరోగ్య FAQ సహాయకుడు",
    scopeNotice: "నేను ఆరోగ్య శిబిరాలు, టీకా షెడ్యూల్స్ మరియు ప్రభుత్వ పథకాల గురించి మాత్రమే ప్రశ్నలకు సమాధానం ఇవ్వగలను. నేను వైద్య సలహా ఇవ్వలేను.",
    placeholder: "శిబిరాలు, టీకాలు లేదా పథకాల గురించి అడగండి...",
    send: "పంపండి",
    sources: "మూలాలు:",
    thinking: "ఆలోచిస్తున్నాను...",
    error: "క్షమించండి, ఏదో తప్పు జరిగింది. దయచేసి మళ్ళీ ప్రయత్నించండి."
  }
};

export function ChatBot({ language }: ChatBotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const t = translations[language];

  const faqMutation = useMutation({
    mutationFn: async (query: string) => {
      const response = await apiRequest<FAQResponse>('POST', '/api/faq/query', { 
        query, 
        language 
      });
      return response;
    },
    onSuccess: (data) => {
      setMessages(prev => [...prev, {
        role: 'bot',
        content: data.answer,
        sources: data.sources,
        outOfScope: data.outOfScope
      }]);
    },
    onError: () => {
      setMessages(prev => [...prev, {
        role: 'bot',
        content: t.error,
        outOfScope: false
      }]);
    }
  });

  const handleSend = () => {
    if (!input.trim() || faqMutation.isPending) return;

    setMessages(prev => [...prev, { role: 'user', content: input }]);
    faqMutation.mutate(input);
    setInput("");
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      {!isOpen && (
        <Button
          size="icon"
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-40"
          onClick={() => setIsOpen(true)}
          data-testid="button-open-chatbot"
        >
          <MessageCircle size={24} />
        </Button>
      )}

      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-96 max-w-[calc(100vw-3rem)] h-[600px] max-h-[calc(100vh-3rem)] flex flex-col shadow-xl z-40 md:w-[400px]">
          <div className="flex items-center justify-between p-4 border-b bg-primary text-primary-foreground rounded-t-md">
            <h3 className="font-semibold">{t.title}</h3>
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/10"
              onClick={() => setIsOpen(false)}
              data-testid="button-close-chatbot"
            >
              <X size={18} />
            </Button>
          </div>

          <div className="p-3 bg-blue-50 border-b">
            <div className="flex items-start gap-2">
              <AlertCircle size={16} className="text-blue-600 mt-0.5 shrink-0" />
              <p className="text-xs text-blue-900">{t.scopeNotice}</p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    msg.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                  data-testid={`message-${msg.role}-${idx}`}
                >
                  <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                  
                  {msg.sources && msg.sources.length > 0 && (
                    <div className="mt-2 pt-2 border-t border-muted-foreground/20">
                      <p className="text-xs font-semibold mb-1">{t.sources}</p>
                      <div className="flex flex-wrap gap-1">
                        {msg.sources.map((source, sidx) => (
                          <Badge 
                            key={sidx} 
                            variant="outline" 
                            className="text-xs"
                            data-testid={`source-${source.type}-${source.id}`}
                          >
                            {source.type}: {source.title}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {faqMutation.isPending && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-lg p-3">
                  <p className="text-sm text-muted-foreground">{t.thinking}</p>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder={t.placeholder}
                disabled={faqMutation.isPending}
                className="flex-1"
                data-testid="input-chat-message"
              />
              <Button
                size="icon"
                onClick={handleSend}
                disabled={!input.trim() || faqMutation.isPending}
                data-testid="button-send-message"
              >
                <Send size={18} />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </>
  );
}
