import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Sparkles } from 'lucide-react';

export default function SearchBar({ defaultValue = '', className = '' }) {
    const [query, setQuery] = useState(defaultValue);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            navigate(`/search?q=${encodeURIComponent(query.trim())}`);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={`relative ${className}`}>
            <div className="border-border/60 bg-card flex items-center gap-2 rounded-2xl border p-2 shadow-lg transition-shadow focus-within:shadow-xl">
                <div className="text-muted-foreground flex items-center gap-2 pl-3">
                    <Search className="h-5 w-5" />
                </div>

                <Input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder='Try "3 bedroom villa in Bole near schools"'
                    className="flex-1 border-0 bg-transparent text-base shadow-none focus-visible:ring-0"
                />

                <div className="text-muted-foreground/50 hidden items-center gap-1 pr-2 text-xs sm:flex">
                    <Sparkles className="h-3 w-3" />
                    <span>AI-powered</span>
                </div>

                <Button
                    type="submit"
                    className="rounded-xl px-6 font-bold"
                >
                    Search
                </Button>
            </div>
        </form>
    );
}
