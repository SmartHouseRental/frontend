import { useState } from "react";

export default function ChatWindow() {
  const [message, setMessage] = useState("");

  return (
    <section className="flex flex-1 flex-col bg-background">
      
      {/* Header */}
      <div className="flex justify-between items-center border-b border-border bg-card px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-full bg-primary text-white flex items-center justify-center">
            AF
          </div>

          <div>
            <h3 className="font-bold text-sm">Abebe Family</h3>
            <p className="text-xs text-muted-foreground">
              Bole Apartment • Online
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <button className="px-3 py-1.5 border border-border rounded-lg text-xs font-semibold">
            Call
          </button>
          <button className="px-3 py-1.5 bg-primary/10 text-primary rounded-lg text-xs font-semibold">
            Property Details
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">

        {/* Incoming */}
        <div className="flex gap-2 max-w-[80%]">
          <div className="size-8 rounded-full bg-muted" />
          <div>
            <div className="bg-muted p-4 rounded-2xl rounded-bl-none">
              Hello! Is there space for a coffee ceremony table?
            </div>
            <span className="text-xs text-muted-foreground">
              10:15 AM
            </span>
          </div>
        </div>

        {/* Outgoing */}
        <div className="self-end max-w-[80%]">
          <div className="bg-primary text-white p-4 rounded-2xl rounded-br-none">
            Yes, absolutely! Plenty of space for it.
          </div>
          <span className="text-xs text-muted-foreground">
            10:22 AM
          </span>
        </div>
      </div>

      {/* Input */}
      <div className="border-t border-border bg-card p-4 flex gap-3">
        
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write your message..."
          className="flex-1 h-12 px-4 rounded-xl bg-muted outline-none"
        />

        <button className="h-12 w-12 flex items-center justify-center bg-primary text-white rounded-xl">
          <span className="material-symbols-outlined">send</span>
        </button>
      </div>
    </section>
  );
}