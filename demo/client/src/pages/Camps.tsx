import { useQuery } from "@tanstack/react-query";
import { CampCard } from "@/components/CampCard";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle } from "lucide-react";
import type { Camp } from "@shared/schema";

interface CampsProps {
  language: 'en' | 'hi' | 'te';
}

const translations = {
  en: {
    title: "Health Camps",
    subtitle: "Browse upcoming and ongoing health camps in your area",
    loading: "Loading camps...",
    error: "Failed to load camps. Please try again.",
    empty: "No health camps available at the moment. Check back later for updates."
  },
  hi: {
    title: "स्वास्थ्य शिविर",
    subtitle: "अपने क्षेत्र में आगामी और चल रहे स्वास्थ्य शिविर ब्राउज़ करें",
    loading: "शिविर लोड हो रहे हैं...",
    error: "शिविर लोड करने में विफल। कृपया पुनः प्रयास करें।",
    empty: "इस समय कोई स्वास्थ्य शिविर उपलब्ध नहीं है। अपडेट के लिए बाद में जांचें।"
  },
  te: {
    title: "ఆరోగ్య శిబిరాలు",
    subtitle: "మీ ప్రాంతంలో రాబోయే మరియు కొనసాగుతున్న ఆరోగ్య శిబిరాలను బ్రౌజ్ చేయండి",
    loading: "శిబిరాలు లోడ్ అవుతున్నాయి...",
    error: "శిబిరాలను లోడ్ చేయడంలో విఫలమైంది. దయచేసి మళ్ళీ ప్రయత్నించండి.",
    empty: "ప్రస్తుతం ఆరోగ్య శిబిరాలు అందుబాటులో లేవు. నవీకరణల కోసం తర్వాత తనిఖీ చేయండి."
  }
};

export default function Camps({ language }: CampsProps) {
  const t = translations[language];
  
  const { data: camps, isLoading, error } = useQuery<Camp[]>({
    queryKey: ['/api/camps']
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

        {!isLoading && !error && camps && camps.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground text-center">{t.empty}</p>
          </div>
        )}

        {!isLoading && !error && camps && camps.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {camps.map((camp) => (
              <CampCard key={camp._id} camp={camp} language={language} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
