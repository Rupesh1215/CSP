import { useQuery } from "@tanstack/react-query";
import { VaccineCard } from "@/components/VaccineCard";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle } from "lucide-react";
import type { Vaccine } from "@shared/schema";

interface VaccinesProps {
  language: 'en' | 'hi' | 'te';
}

const translations = {
  en: {
    title: "Vaccination Schedules",
    subtitle: "Stay informed about vaccination schedules for all age groups",
    loading: "Loading vaccination information...",
    error: "Failed to load vaccines. Please try again.",
    empty: "No vaccination information available at the moment."
  },
  hi: {
    title: "टीकाकरण कार्यक्रम",
    subtitle: "सभी आयु समूहों के लिए टीकाकरण कार्यक्रम के बारे में जानकारी रखें",
    loading: "टीकाकरण जानकारी लोड हो रही है...",
    error: "टीके लोड करने में विफल। कृपया पुनः प्रयास करें।",
    empty: "इस समय कोई टीकाकरण जानकारी उपलब्ध नहीं है।"
  },
  te: {
    title: "టీకా షెడ్యూల్స్",
    subtitle: "అన్ని వయస్సు వర్గాల కోసం టీకా షెడ్యూల్స్ గురించి సమాచారం పొందండి",
    loading: "టీకా సమాచారం లోడ్ అవుతోంది...",
    error: "టీకాలను లోడ్ చేయడంలో విఫలమైంది. దయచేసి మళ్ళీ ప్రయత్నించండి.",
    empty: "ప్రస్తుతం టీకా సమాచారం అందుబాటులో లేదు."
  }
};

export default function Vaccines({ language }: VaccinesProps) {
  const t = translations[language];
  
  const { data: vaccines, isLoading, error } = useQuery<Vaccine[]>({
    queryKey: ['/api/vaccines']
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

        {!isLoading && !error && vaccines && vaccines.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground text-center">{t.empty}</p>
          </div>
        )}

        {!isLoading && !error && vaccines && vaccines.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {vaccines.map((vaccine) => (
              <VaccineCard key={vaccine._id} vaccine={vaccine} language={language} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
