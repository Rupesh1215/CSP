import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Calendar } from "lucide-react";
import type { Vaccine } from "@shared/schema";

interface VaccineCardProps {
  vaccine: Vaccine;
  language: 'en' | 'hi' | 'te';
}

const translations = {
  en: {
    schedule: "Schedule",
    nextDose: "Next Dose Information",
    lastUpdated: "Last updated"
  },
  hi: {
    schedule: "कार्यक्रम",
    nextDose: "अगली खुराक की जानकारी",
    lastUpdated: "अंतिम अपडेट"
  },
  te: {
    schedule: "షెడ్యూల్",
    nextDose: "తదుపరి మోతాదు సమాచారం",
    lastUpdated: "చివరిగా నవీకరించబడింది"
  }
};

export function VaccineCard({ vaccine, language }: VaccineCardProps) {
  const t = translations[language];
  
  return (
    <Card className="h-full hover-elevate transition-shadow" data-testid={`card-vaccine-${vaccine._id}`}>
      <CardHeader>
        <CardTitle className="text-lg" data-testid={`text-vaccine-name-${vaccine._id}`}>
          {vaccine.name}
        </CardTitle>
        <Badge variant="outline" className="w-fit">
          <Users size={14} className="mr-1" />
          {vaccine.ageGroup}
        </Badge>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Calendar size={16} className="text-muted-foreground" />
            <h4 className="font-semibold text-sm">{t.schedule}</h4>
          </div>
          <p className="text-sm text-muted-foreground">{vaccine.scheduleNotes}</p>
        </div>

        {vaccine.nextDoseInfo && (
          <div>
            <h4 className="font-semibold text-sm mb-1">{t.nextDose}</h4>
            <p className="text-sm text-muted-foreground">{vaccine.nextDoseInfo}</p>
          </div>
        )}

        <p className="text-xs text-muted-foreground">
          {t.lastUpdated}: {new Date(vaccine.lastUpdated).toLocaleDateString()}
        </p>
      </CardContent>
    </Card>
  );
}
