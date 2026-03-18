import { useQuery } from "@tanstack/react-query";
import { SchemeCard } from "@/components/SchemeCard";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle } from "lucide-react";
import type { Scheme } from "@shared/schema";

interface SchemesProps {
  language: 'en' | 'hi' | 'te';
}

const translations = {
  en: {
    title: "Government Health Schemes",
    subtitle: "Learn about health schemes and benefits available for your community",
    loading: "Loading schemes...",
    error: "Failed to load schemes. Please try again.",
    empty: "No government schemes available at the moment."
  },
  hi: {
    title: "सरकारी स्वास्थ्य योजनाएं",
    subtitle: "अपने समुदाय के लिए उपलब्ध स्वास्थ्य योजनाओं और लाभों के बारे में जानें",
    loading: "योजनाएं लोड हो रही हैं...",
    error: "योजनाओं को लोड करने में विफल। कृपया पुनः प्रयास करें।",
    empty: "इस समय कोई सरकारी योजना उपलब्ध नहीं है।"
  },
  te: {
    title: "ప్రభుత్వ ఆరోగ్య పథకాలు",
    subtitle: "మీ సమాజం కోసం అందుబాటులో ఉన్న ఆరోగ్య పథకాలు మరియు ప్రయోజనాల గురించి తెలుసుకోండి",
    loading: "పథకాలు లోడ్ అవుతున్నాయి...",
    error: "పథకాలను లోడ్ చేయడంలో విఫలమైంది. దయచేసి మళ్ళీ ప్రయత్నించండి.",
    empty: "ప్రస్తుతం ప్రభుత్వ పథకాలు అందుబాటులో లేవు."
  }
};

export default function Schemes({ language }: SchemesProps) {
  const t = translations[language];
  
  const { data: schemes, isLoading, error } = useQuery<Scheme[]>({
    queryKey: ['/api/schemes']
  });

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2" data-testid="text-page-title">
            {t.title}
          </h1>
          <p className="text-muted-foreground">{t.subtitle}</p>
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

        {!isLoading && !error && schemes && schemes.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground text-center">{t.empty}</p>
          </div>
        )}

        {!isLoading && !error && schemes && schemes.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {schemes.map((scheme) => (
              <SchemeCard key={scheme._id} scheme={scheme} language={language} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
