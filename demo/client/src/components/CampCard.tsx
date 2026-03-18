import { Link } from "wouter";
import { Calendar, Clock, MapPin } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Camp } from "@shared/schema";

interface CampCardProps {
  camp: Camp;
  language: 'en' | 'hi' | 'te';
}

const translations = {
  en: {
    viewDetails: "View Details",
    active: "Active",
    cancelled: "Cancelled",
    upcoming: "Upcoming"
  },
  hi: {
    viewDetails: "विवरण देखें",
    active: "सक्रिय",
    cancelled: "रद्द",
    upcoming: "आगामी"
  },
  te: {
    viewDetails: "వివరాలు చూడండి",
    active: "క్రియాశీలం",
    cancelled: "రద్దు చేయబడింది",
    upcoming: "రాబోయే"
  }
};

export function CampCard({ camp, language }: CampCardProps) {
  const t = translations[language];
  
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

  return (
    <Card className="h-full flex flex-col hover-elevate transition-shadow" data-testid={`card-camp-${camp._id}`}>
      {camp.imageUrl && (
        <div className="aspect-video w-full overflow-hidden rounded-t-md">
          <img 
            src={camp.imageUrl} 
            alt={camp.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      )}
      
      <CardContent className="flex-1 p-6">
        <div className="flex items-start justify-between gap-2 mb-3">
          <h3 className="text-lg font-semibold leading-tight" data-testid={`text-camp-title-${camp._id}`}>
            {camp.title}
          </h3>
          <Badge 
            className={`${statusColors[camp.status]} text-white shrink-0`}
            data-testid={`badge-status-${camp._id}`}
          >
            {statusLabels[camp.status]}
          </Badge>
        </div>

        <Badge className={`${typeColors[camp.type]} mb-4`} variant="outline">
          {camp.type}
        </Badge>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar size={16} />
            <span data-testid={`text-camp-date-${camp._id}`}>
              {new Date(camp.date).toLocaleDateString()}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock size={16} />
            <span>{camp.time}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin size={16} />
            <span data-testid={`text-camp-location-${camp._id}`}>{camp.location}</span>
          </div>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-3">
          {camp.description}
        </p>
      </CardContent>

      <CardFooter className="p-6 pt-0">
        <Link href={`/camps/${camp._id}`} className="w-full">
          <Button className="w-full" data-testid={`button-view-camp-${camp._id}`}>
            {t.viewDetails}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
