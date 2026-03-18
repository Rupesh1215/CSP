import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { CampCard } from "@/components/CampCard";
import { VaccineCard } from "@/components/VaccineCard";
import { SchemeCard } from "@/components/SchemeCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search as SearchIcon, AlertCircle, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import type { Camp, Vaccine, Scheme } from "@shared/schema";

interface SearchProps {
  language: 'en' | 'hi' | 'te';
}

interface AIAnswer {
  answer: string;
  sources: Array<{ type: string; id: string; title: string }>;
  outOfScope: boolean;
}

interface SearchResults {
  camps: Camp[];
  vaccines: Vaccine[];
  schemes: Scheme[];
  aiAnswer?: AIAnswer | null;
  usedAI?: boolean;
}

const translations = {
  en: {
    title: "Search Results",
    placeholder: "Search for camps, vaccines, or schemes...",
    search: "Search",
    camps: "Health Camps",
    vaccines: "Vaccines",
    schemes: "Government Schemes",
    noResults: "No results found for your search.",
    error: "Failed to perform search. Please try again.",
    aiAssistant: "AI Assistant Answer",
    aiHelp: "Our AI assistant analyzed your question:"
  },
  hi: {
    title: "खोज परिणाम",
    placeholder: "शिविरों, टीकों या योजनाओं की खोज करें...",
    search: "खोजें",
    camps: "स्वास्थ्य शिविर",
    vaccines: "टीके",
    schemes: "सरकारी योजनाएं",
    noResults: "आपकी खोज के लिए कोई परिणाम नहीं मिला।",
    error: "खोज करने में विफल। कृपया पुनः प्रयास करें।",
    aiAssistant: "AI सहायक उत्तर",
    aiHelp: "हमारे AI सहायक ने आपके प्रश्न का विश्लेषण किया:"
  },
  te: {
    title: "శోధన ఫలితాలు",
    placeholder: "శిబిరాలు, టీకాలు లేదా పథకాల కోసం శోధించండి...",
    search: "శోధించండి",
    camps: "ఆరోగ్య శిబిరాలు",
    vaccines: "టీకాలు",
    schemes: "ప్రభుత్వ పథకాలు",
    noResults: "మీ శోధన కోసం ఫలితాలు కనుగొనబడలేదు.",
    error: "శోధన చేయడంలో విఫలమైంది. దయచేసి మళ్ళీ ప్రయత్నించండి.",
    aiAssistant: "AI సహాయక సమాధానం",
    aiHelp: "మా AI సహాయకుడు మీ ప్రశ్నను విశ్లేషించారు:"
  }
};

export default function Search({ language }: SearchProps) {
  const [location, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const t = translations[language];

  // Extract query parameter from URL
  const queryParam = new URLSearchParams(window.location.search).get('q') || '';

  useEffect(() => {
    setSearchQuery(queryParam);
  }, [queryParam]);

  const { data: results, isLoading, error } = useQuery<SearchResults>({
    queryKey: ['/api/search', queryParam, language],
    queryFn: async () => {
      const response = await fetch(`/api/search?q=${encodeURIComponent(queryParam)}&lang=${language}`);
      if (!response.ok) throw new Error('Search failed');
      return response.json();
    },
    enabled: queryParam.length > 0
  });

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setLocation(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const totalResults = results 
    ? (results.camps?.length || 0) + (results.vaccines?.length || 0) + (results.schemes?.length || 0)
    : 0;

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-6" data-testid="text-page-title">
            {t.title}
          </h1>
          
          <div className="flex gap-2 max-w-2xl">
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder={t.placeholder}
              className="flex-1"
              data-testid="input-search"
            />
            <Button onClick={handleSearch} data-testid="button-search">
              <SearchIcon size={18} className="mr-2" />
              {t.search}
            </Button>
          </div>
        </div>

        {isLoading && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-48 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        )}

        {error && (
          <div className="flex flex-col items-center justify-center py-12">
            <AlertCircle className="w-12 h-12 text-destructive mb-4" />
            <p className="text-muted-foreground">{t.error}</p>
          </div>
        )}

        {!isLoading && !error && totalResults === 0 && queryParam && (
          <div className="flex flex-col items-center justify-center py-12">
            <SearchIcon className="w-12 h-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground text-center">{t.noResults}</p>
          </div>
        )}

        {!isLoading && !error && results?.aiAnswer && (
          <Card className="mb-8 border-primary/20 bg-primary/5" data-testid="card-ai-answer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                {t.aiAssistant}
              </CardTitle>
              <p className="text-sm text-muted-foreground">{t.aiHelp}</p>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none">
                <p className="whitespace-pre-wrap">{results.aiAnswer.answer}</p>
              </div>
              {results.aiAnswer.sources && results.aiAnswer.sources.length > 0 && (
                <div className="mt-4 pt-4 border-t">
                  <p className="text-sm font-medium mb-2">Sources:</p>
                  <div className="flex flex-wrap gap-2">
                    {results.aiAnswer.sources.map((source, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {source.title}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {!isLoading && !error && results && (
          <div className="space-y-12">
            {results.camps && results.camps.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold mb-6">{t.camps}</h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {results.camps.map((camp) => (
                    <CampCard key={camp._id} camp={camp} language={language} />
                  ))}
                </div>
              </section>
            )}

            {results.vaccines && results.vaccines.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold mb-6">{t.vaccines}</h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {results.vaccines.map((vaccine) => (
                    <VaccineCard key={vaccine._id} vaccine={vaccine} language={language} />
                  ))}
                </div>
              </section>
            )}

            {results.schemes && results.schemes.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold mb-6">{t.schemes}</h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {results.schemes.map((scheme) => (
                    <SchemeCard key={scheme._id} scheme={scheme} language={language} />
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
