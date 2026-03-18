interface FooterProps {
  language: 'en' | 'hi' | 'te';
}

const translations = {
  en: {
    tagline: "Empowering villages with accessible health information",
    contact: "Contact",
    phone: "Phone: 1800-XXX-XXXX",
    email: "Email: health@arogya.gov",
    disclaimer: "Disclaimer: This platform provides general health information only. For medical advice, please consult healthcare professionals.",
    rights: "© 2025 Arogya. All rights reserved."
  },
  hi: {
    tagline: "सुलभ स्वास्थ्य जानकारी के साथ गांवों को सशक्त बनाना",
    contact: "संपर्क करें",
    phone: "फोन: 1800-XXX-XXXX",
    email: "ईमेल: health@arogya.gov",
    disclaimer: "अस्वीकरण: यह प्लेटफ़ॉर्म केवल सामान्य स्वास्थ्य जानकारी प्रदान करता है। चिकित्सा सलाह के लिए, कृपया स्वास्थ्य पेशेवरों से परामर्श लें।",
    rights: "© 2025 आरोग्य। सर्वाधिकार सुरक्षित।"
  },
  te: {
    tagline: "అందుబాటులో ఉన్న ఆరోగ్య సమాచారంతో గ్రామాలను శక్తివంతం చేయడం",
    contact: "సంప్రదించండి",
    phone: "ఫోన్: 1800-XXX-XXXX",
    email: "ఇమెయిల్: health@arogya.gov",
    disclaimer: "నిరాకరణ: ఈ ప్లాట్‌ఫారమ్ సాధారణ ఆరోగ్య సమాచారాన్ని మాత్రమే అందిస్తుంది. వైద్య సలహా కోసం, దయచేసి ఆరోగ్య నిపుణులను సంప్రదించండి.",
    rights: "© 2025 ఆరోగ్య. అన్ని హక్కులు భద్రపరచబడ్డాయి."
  }
};

export function Footer({ language }: FooterProps) {
  const t = translations[language];

  return (
    <footer className="border-t bg-card mt-auto">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="text-lg font-semibold mb-2">Arogya</h3>
            <p className="text-sm text-muted-foreground">{t.tagline}</p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2">{t.contact}</h3>
            <p className="text-sm text-muted-foreground">{t.phone}</p>
            <p className="text-sm text-muted-foreground">{t.email}</p>
          </div>

          <div>
            <p className="text-xs text-muted-foreground mb-4">{t.disclaimer}</p>
          </div>
        </div>
        
        <div className="mt-8 pt-4 border-t text-center">
          <p className="text-sm text-muted-foreground">{t.rights}</p>
        </div>
      </div>
    </footer>
  );
}
