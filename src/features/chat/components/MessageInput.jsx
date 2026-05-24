import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Paperclip, Image, Send, X, FileText } from 'lucide-react';

export default function MessageInput({
  newMessage,
  onNewMessageChange,
  onSend,
  placeholder = 'Type your message...',
}) {
  const [attachedFile, setAttachedFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setAttachedFile(file);
    if (file.type.startsWith('image/')) {
      setFilePreview(URL.createObjectURL(file));
    } else {
      setFilePreview(null);
    }
  };

  const handleRemoveFile = () => {
    setAttachedFile(null);
    setFilePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const triggerFileSelect = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSendClick = () => {
    if (!newMessage.trim() && !attachedFile) return;
    onSend(newMessage, attachedFile);
    setAttachedFile(null);
    setFilePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendClick();
    }
  };

  return (
    <div className="px-6 py-4 border-t border-border bg-card flex flex-col gap-2">
      {/* File Preview Bar */}
      {attachedFile && (
        <div className="flex items-center gap-3 p-2 bg-muted/40 rounded-xl animate-in slide-in-from-bottom-2 duration-200">
          {filePreview ? (
            <img
              src={filePreview}
              alt="Preview"
              className="h-12 w-12 rounded-lg object-cover border border-border"
            />
          ) : (
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <FileText size={20} />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-foreground truncate">{attachedFile.name}</p>
            <p className="text-[10px] text-muted-foreground">
              {(attachedFile.size / 1024).toFixed(1)} KB
            </p>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-muted-foreground hover:text-destructive rounded-full"
            onClick={handleRemoveFile}
          >
            <X size={14} />
          </Button>
        </div>
      )}

      <div className="flex items-center gap-2">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />

        <div className="flex items-center gap-1">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-9 w-9 text-muted-foreground hover:text-foreground shrink-0"
            title="Attach file"
            onClick={triggerFileSelect}
          >
            <Paperclip size={16} />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-9 w-9 text-muted-foreground hover:text-foreground shrink-0"
            title="Upload image"
            onClick={triggerFileSelect}
          >
            <Image size={16} />
          </Button>
        </div>
        
        <input
          type="text"
          value={newMessage}
          onChange={(e) => onNewMessageChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="flex-1 h-10 rounded-xl border border-border bg-muted/30 px-4 text-sm outline-none transition-all focus:ring-2 focus:ring-primary/20 focus:border-primary/50 text-foreground placeholder:text-muted-foreground/60"
        />
        
        <Button
          size="icon"
          className={`h-10 w-10 rounded-xl shrink-0 transition-all ${
            newMessage.trim() || attachedFile ? 'opacity-100 scale-100' : 'opacity-50 scale-95'
          }`}
          onClick={handleSendClick}
          disabled={!newMessage.trim() && !attachedFile}
        >
          <Send size={16} />
        </Button>
      </div>
    </div>
  );
}
