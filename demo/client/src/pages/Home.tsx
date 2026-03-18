import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Syringe, FileText, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useLocation } from "wouter";

interface HomeProps {
  language: 'en' | 'hi' | 'te';
}

const translations = {
  en: {
    hero: {
      title: "Access Village Health Information",
      subtitle: "Get the latest information on health camps, vaccination schedules, and government health schemes for your community",
      campsCta: "View Health Camps",
      faqCta: "Ask FAQ Bot"
    },
    features: {
      vaccines: {
        title: "Vaccination Schedules",
        description: "Stay up-to-date with vaccination schedules for all age groups"
      },
      camps: {
        title: "Health Camps",
        description: "Find upcoming health camps and medical services in your area"
      },
      schemes: {
        title: "Government Schemes",
        description: "Learn about health schemes and benefits available for villagers"
      }
    },
    search: {
      title: "Search Health Information",
      placeholder: "Search for camps, vaccines, or schemes...",
      button: "Search"
    }
  },
  hi: {
    hero: {
      title: "ग्राम स्वास्थ्य जानकारी प्राप्त करें",
      subtitle: "अपने समुदाय के लिए स्वास्थ्य शिविरों, टीकाकरण कार्यक्रम और सरकारी स्वास्थ्य योजनाओं पर नवीनतम जानकारी प्राप्त करें",
      campsCta: "स्वास्थ्य शिविर देखें",
      faqCta: "FAQ बॉट से पूछें"
    },
    features: {
      vaccines: {
        title: "टीकाकरण कार्यक्रम",
        description: "सभी आयु समूहों के लिए टीकाकरण कार्यक्रम के साथ अप-टू-डेट रहें"
      },
      camps: {
        title: "स्वास्थ्य शिविर",
        description: "अपने क्षेत्र में आगामी स्वास्थ्य शिविर और चिकित्सा सेवाएं खोजें"
      },
      schemes: {
        title: "सरकारी योजनाएं",
        description: "ग्रामीणों के लिए उपलब्ध स्वास्थ्य योजनाओं और लाभों के बारे में जानें"
      }
    },
    search: {
      title: "स्वास्थ्य जानकारी खोजें",
      placeholder: "शिविरों, टीकों या योजनाओं की खोज करें...",
      button: "खोजें"
    }
  },
  te: {
    hero: {
      title: "గ్రామ ఆరోగ్య సమాచారాన్ని యాక్సెస్ చేయండి",
      subtitle: "మీ సమాజం కోసం ఆరోగ్య శిబిరాలు, టీకా షెడ్యూల్స్ మరియు ప్రభుత్వ ఆరోగ్య పథకాలపై తాజా సమాచారాన్ని పొందండి",
      campsCta: "ఆరోగ్య శిబిరాలు చూడండి",
      faqCta: "FAQ బాట్‌ని అడగండి"
    },
    features: {
      vaccines: {
        title: "టీకా షెడ్యూల్స్",
        description: "అన్ని వయస్సు వర్గాల కోసం టీకా షెడ్యూల్స్‌తో నవీకరించబడి ఉండండి"
      },
      camps: {
        title: "ఆరోగ్య శిబిరాలు",
        description: "మీ ప్రాంతంలో రాబోయే ఆరోగ్య శిబిరాలు మరియు వైద్య సేవలను కనుగొనండి"
      },
      schemes: {
        title: "ప్రభుత్వ పథకాలు",
        description: "గ్రామస్థులకు అందుబాటులో ఉన్న ఆరోగ్య పథకాలు మరియు ప్రయోజనాల గురించి తెలుసుకోండి"
      }
    },
    search: {
      title: "ఆరోగ్య సమాచారాన్ని శోధించండి",
      placeholder: "శిబిరాలు, టీకాలు లేదా పథకాల కోసం శోధించండి...",
      button: "శోధించండి"
    }
  }
};

export default function Home({ language }: HomeProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [, setLocation] = useLocation();
  const t = translations[language];

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setLocation(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const features = [
    {
      icon: Syringe,
      title: t.features.vaccines.title,
      description: t.features.vaccines.description,
      link: "/vaccines",
      color: "bg-purple-100 text-purple-600"
    },
    {
      icon: Calendar,
      title: t.features.camps.title,
      description: t.features.camps.description,
      link: "/camps",
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: FileText,
      title: t.features.schemes.title,
      description: t.features.schemes.description,
      link: "/schemes",
      color: "bg-green-100 text-green-600"
    }
  ];

  return (
    <div className="min-h-screen">
      <section 
        className="relative bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 py-24 px-4"
        style={{ minHeight: '60vh' }}
      >
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6" data-testid="text-hero-title">
            {t.hero.title}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            {t.hero.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/camps">
              <Button size="lg" className="w-full sm:w-auto" data-testid="button-hero-camps">
                {t.hero.campsCta}
              </Button>
            </Link>
            <Button 
              size="lg" 
              variant="outline" 
              className="w-full sm:w-auto bg-white/50 backdrop-blur-sm"
              onClick={() => {
                const chatButton = document.querySelector('[data-testid="button-open-chatbot"]') as HTMLButtonElement;
                chatButton?.click();
              }}
              data-testid="button-hero-faq"
            >
              {t.hero.faqCta}
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-background">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 md:grid-cols-3">
            {features.map((feature, idx) => (
              <Link key={idx} href={feature.link}>
                <Card className="h-full hover-elevate active-elevate-2 transition-all cursor-pointer" data-testid={`card-feature-${idx}`}>
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-4`}>
                      <feature.icon size={24} />
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-card">
        <div className="mx-auto max-w-2xl text-center">
          <Search className="w-12 h-12 mx-auto mb-4 text-primary" />
          <h2 className="text-2xl md:text-3xl font-bold mb-4">{t.search.title}</h2>
          <div className="flex gap-2">
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder={t.search.placeholder}
              className="flex-1"
              data-testid="input-home-search"
            />
            <Button onClick={handleSearch} data-testid="button-home-search">
              {t.search.button}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
