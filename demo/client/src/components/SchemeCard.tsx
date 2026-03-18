import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Info } from "lucide-react";
import type { Scheme } from "@shared/schema";

interface SchemeCardProps {
  scheme: Scheme;
  language: 'en' | 'hi' | 'te';
}

const translations = {
  en: {
    eligibility: "Eligibility",
    benefits: "Benefits",
    lastUpdated: "Last updated"
  },
  hi: {
    eligibility: "पात्रता",
    benefits: "लाभ",
    lastUpdated: "अंतिम अपडेट"
  },
  te: {
    eligibility: "అర్హత",
    benefits: "ప్రయోజనాలు",
    lastUpdated: "చివరిగా నవీకరించబడింది"
  }
};

export function SchemeCard({ scheme, language }: SchemeCardProps) {
  const t = translations[language];
  
  return (
    <Card className="h-full hover-elevate transition-shadow" data-testid={`card-scheme-${scheme._id}`}>
      <CardHeader>
        <CardTitle className="text-lg" data-testid={`text-scheme-name-${scheme._id}`}>
          {scheme.name}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Info size={16} className="text-muted-foreground" />
            <h4 className="font-semibold text-sm">{t.eligibility}</h4>
          </div>
          <p className="text-sm text-muted-foreground">{scheme.eligibility}</p>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 size={16} className="text-muted-foreground" />
            <h4 className="font-semibold text-sm">{t.benefits}</h4>
          </div>
          <p className="text-sm text-muted-foreground">{scheme.benefits}</p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">{scheme.description}</p>
        </div>

        <p className="text-xs text-muted-foreground">
          {t.lastUpdated}: {new Date(scheme.lastUpdated).toLocaleDateString()}
        </p>
      </CardContent>
    </Card>
  );
}
