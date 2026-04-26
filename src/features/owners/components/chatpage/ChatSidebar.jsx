export default function ChatSidebar() {
  return (
    <aside className="w-80 hidden md:flex flex-col border-r border-border bg-card">
      
      {/* Header */}
      <div className="p-4 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">Active Chats</h1>
          <button className="p-2 rounded-full bg-primary/10 text-primary">
            <span className="material-symbols-outlined">edit_square</span>
          </button>
        </div>

        <div className="flex gap-2">
          <button className="flex-1 bg-primary text-white text-xs font-bold py-1.5 rounded-full">
            All
          </button>
          <button className="flex-1 bg-muted text-muted-foreground text-xs font-bold py-1.5 rounded-full">
            Unread
          </button>
          <button className="flex-1 bg-muted text-muted-foreground text-xs font-bold py-1.5 rounded-full">
            Archived
          </button>
        </div>
      </div>

      {/* Chats */}
      <div className="flex-1 overflow-y-auto">
        {[
          {
            name: "Abebe Family",
            message: "Yes, the coffee ceremony table fits...",
            active: true,
          },
          {
            name: "Selamawit G.",
            message: "I've sent the utility documents.",
          },
          {
            name: "Kebede Household",
            message: "Thank you for the warm welcome!",
          },
        ].map((chat, i) => (
          <div
            key={i}
            className={`flex gap-3 p-4 cursor-pointer border-l-4 ${
              chat.active
                ? "bg-primary/5 border-primary"
                : "border-transparent hover:bg-muted"
            }`}
          >
            <div className="size-12 rounded-xl bg-muted" />

            <div className="flex flex-col overflow-hidden">
              <div className="flex justify-between">
                <span className="text-sm font-bold truncate">
                  {chat.name}
                </span>
                <span className="text-xs text-muted-foreground">
                  2m
                </span>
              </div>
              <p className="text-xs text-muted-foreground truncate">
                {chat.message}
              </p>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}