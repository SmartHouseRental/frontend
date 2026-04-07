'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, User, MessageCircle } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

function OwnerChat() {
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef(null);

  // Sample conversation – in real app this comes from props / state / API
  const messages = [
    // {
    //   id: 1,
    //   sender: "owner",
    //   text: "Hello! Thanks for your interest in the apartment. How can I assist you today?",
    //   time: "2 min ago",
    // },
    // {
    //   id: 2,
    //   sender: "user",
    //   text: "Hi Abebe, is the apartment still available? Can I schedule a viewing this weekend?",
    //   time: "1 min ago",
    // },
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!message.trim()) return;
    // TODO: in real app → add to messages array + send to backend
    console.log('Sending:', message);
    setMessage('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const hasMessages = messages.length > 0;

  return (
    <Card className="gap-0 overflow-hidden border py-0">
      {/* Header */}
      <div className="flex items-center gap-4 px-5 py-4">
        <Avatar className="border-background ring-primary h-12 w-12 border-2 ring-1">
          <AvatarImage
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80"
            alt="Abebe Kebede"
          />
          <AvatarFallback className="bg-primary/10 text-primary">
            <User className="h-6 w-6" />
          </AvatarFallback>
        </Avatar>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-base leading-tight font-semibold text-zinc-900 dark:text-zinc-100">
              Abebe Kebede
            </h3>
            <Badge
              variant="outline"
              className="h-5 border-green-200 bg-green-50 px-2 py-0 text-xs font-medium text-green-700 dark:border-green-800/50 dark:bg-green-950/40 dark:text-green-400"
            >
              Verified Owner
            </Badge>
          </div>
          <p className="text-primary/90 mt-0.5 flex items-center gap-1.5 text-xs">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
            </span>
            Online •
          </p>
        </div>
      </div>

      <Separator />

      <div className="bg-muted relative h-[340px] overflow-y-auto px-5 py-5">
        {hasMessages ? (
          <div className="space-y-5">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn('group flex gap-3', msg.sender === 'user' && 'justify-end')}
              >
                {msg.sender === 'owner' && (
                  <Avatar className="mt-1 h-8 w-8 opacity-90">
                    <AvatarImage
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80"
                      alt="Abebe"
                    />
                    <AvatarFallback className="text-xs">AK</AvatarFallback>
                  </Avatar>
                )}

                <div
                  className={cn(
                    'relative max-w-[78%] rounded-2xl px-4 py-2.5 text-sm shadow-sm',
                    msg.sender === 'owner'
                      ? 'rounded-tl-none border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900'
                      : 'bg-primary text-primary-foreground rounded-tr-none',
                  )}
                >
                  <div
                    className={cn(
                      'absolute top-2.5 h-3 w-3 rotate-45 border-inherit bg-inherit',
                      msg.sender === 'owner'
                        ? '-left-1.5 border-b border-l'
                        : '-right-1.5 border-t border-r',
                    )}
                  />

                  <p className="leading-relaxed">{msg.text}</p>
                  <p className="mt-1.5 text-right text-[10px] opacity-70">{msg.time}</p>
                </div>

                {msg.sender === 'user' && (
                  <Avatar className="mt-1 h-8 w-8">
                    <AvatarFallback className="bg-primary/10 text-primary text-xs">
                      You
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
            <MessageCircle className="mb-4 h-12 w-12 text-zinc-300 dark:text-zinc-600" />
            <h4 className="mb-2 text-base font-medium text-zinc-700 dark:text-zinc-300">
              Start a conversation with Abebe
            </h4>
            <p className="max-w-xs text-sm text-zinc-500 dark:text-zinc-400">
              Ask about availability, viewing times, additional photos, or anything else about the
              property. Abebe usually replies quickly.
            </p>
            <p className="mt-4 text-xs text-zinc-400 dark:text-zinc-500">
              Your message will be private
            </p>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="border-t border-zinc-200 bg-white px-5 py-4 dark:border-zinc-800 dark:bg-zinc-950">
        <div className="flex items-end gap-3">
          <Textarea
            placeholder="Type your message to Abebe..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            className="focus-visible:ring-primary/40 min-h-[52px] resize-none px-4 py-3 text-sm shadow-sm"
            rows={1}
          />

          <Button
            size="icon"
            className="h-[52px] w-[52px] shrink-0 rounded-xl"
            disabled={!message.trim()}
            onClick={handleSend}
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </Card>
  );
}

export default OwnerChat;
