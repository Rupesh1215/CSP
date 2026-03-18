import { useQuery } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import { Calendar, Clock, MapPin, ArrowLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import type { Camp } from "@shared/schema";

interface CampDetailProps {
  language: 'en' | 'hi' | 'te';
}

const translations = {
  en: {
    back: "Back to Camps",
    active: "Active",
    cancelled: "Cancelled",
    upcoming: "Upcoming",
    loading: "Loading camp details...",
    notFound: "Camp not found"
  },
  hi: {
    back: "शिविरों पर वापस जाएं",
    active: "सक्रिय",
    cancelled: "रद्द",
    upcoming: "आगामी",
    loading: "शिविर विवरण लोड हो रहा है...",
    notFound: "शिविर नहीं मिला"
  },
  te: {
    back: "శిబిరాలకు తిరిగి వెళ్ళండి",
    active: "క్రియాశీలం",
    cancelled: "రద్దు చేయబడింది",
    upcoming: "రాబోయే",
    loading: "శిబిర వివరాలు లోడ్ అవుతున్నాయి...",
    notFound: "శిబిరం కనుగొనబడలేదు"
  }
};

export default function CampDetail({ language }: CampDetailProps) {
  const [, params] = useRoute("/camps/:id");
  const t = translations[language];
  
  const { data: camp, isLoading } = useQuery<Camp>({
    queryKey: ['/api/camps', params?.id],
    enabled: !!params?.id
  });

  const statusColors = {
    active: 'bg-green-500',
    cancelled: 'bg-red-500',
    upcoming: 'bg-blue-500'
  };

  const statusLabels = {
    active: t.active,
    cancelled: t.cancelled,
    upcoming: t.upcoming
  };

  const typeColors = {
    Vaccination: 'bg-purple-100 text-purple-800',
    General: 'bg-blue-100 text-blue-800',
    Specialty: 'bg-orange-100 text-orange-800'
  };

  if (isLoading) {
    return (
      <div className="min-h-screen py-12 px-4">
        <div className="mx-auto max-w-4xl">
          <Skeleton className="h-8 w-32 mb-8" />
          <Skeleton className="h-64 w-full mb-6" />
          <Skeleton className="h-8 w-3/4 mb-4" />
          <Skeleton className="h-24 w-full" />
        </div>
      </div>
    );
  }

  if (!camp) {
    return (
      <div className="min-h-screen py-12 px-4">
        <div className="mx-auto max-w-4xl">
          <Link href="/camps">
            <Button variant="ghost" className="mb-8" data-testid="button-back">
              <ArrowLeft className="mr-2" size={16} />
              {t.back}
            </Button>
          </Link>
          <p className="text-center text-muted-foreground">{t.notFound}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="mx-auto max-w-4xl">
        <Link href="/camps">
          <Button variant="ghost" className="mb-8" data-testid="button-back">
            <ArrowLeft className="mr-2" size={16} />
            {t.back}
          </Button>
        </Link>

        <Card>
          {camp.imageUrl && (
            <div className="aspect-video w-full overflow-hidden rounded-t-md">
              <img 
                src={camp.imageUrl} 
                alt={camp.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          <CardContent className="p-8">
            <div className="flex items-start justify-between gap-4 mb-4">
              <h1 className="text-3xl font-bold" data-testid="text-camp-title">
                {camp.title}
              </h1>
              <Badge className={`${statusColors[camp.status]} text-white shrink-0`}>
                {statusLabels[camp.status]}
              </Badge>
            </div>

            <Badge className={`${typeColors[camp.type]} mb-6`} variant="outline">
              {camp.type}
            </Badge>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <Calendar size={20} className="text-muted-foreground" />
                <div>
                  <p className="font-semibold">Date</p>
                  <p className="text-muted-foreground" data-testid="text-camp-date">
                    {new Date(camp.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Clock size={20} className="text-muted-foreground" />
                <div>
                  <p className="font-semibold">Time</p>
                  <p className="text-muted-foreground">{camp.time}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <MapPin size={20} className="text-muted-foreground" />
                <div>
                  <p className="font-semibold">Location</p>
                  <p className="text-muted-foreground" data-testid="text-camp-location">
                    {camp.location}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3">Description</h2>
              <p className="text-muted-foreground whitespace-pre-wrap">{camp.description}</p>
            </div>

            <p className="text-sm text-muted-foreground mt-6">
              Last updated: {new Date(camp.lastUpdated).toLocaleDateString()}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
