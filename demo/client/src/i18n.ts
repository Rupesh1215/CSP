import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Header
      home: "Home",
      camps: "Health Camps",
      vaccines: "Vaccines",
      schemes: "Schemes",
      adminLogin: "Admin Login",
      logout: "Logout",
      dashboard: "Dashboard",
      
      // Hero
      heroTitle: "Access Village Health Information",
      heroSubtitle: "Get the latest information on health camps, vaccination schedules, and government health schemes for your community",
      campsCta: "View Health Camps",
      faqCta: "Ask FAQ Bot",
      
      // Features
      featuresVaccinesTitle: "Vaccination Schedules",
      featuresVaccinesDesc: "Stay up-to-date with vaccination schedules for all age groups",
      featuresCampsTitle: "Health Camps",
      featuresCampsDesc: "Find upcoming health camps and medical services in your area",
      featuresSchemesTitle: "Government Schemes",
      featuresSchemesDesc: "Learn about health schemes and benefits available for villagers",
      
      // Search
      searchTitle: "Search Health Information",
      searchPlaceholder: "Search for camps, vaccines, or schemes...",
      searchButton: "Search",
      
      // Camps Page
      campsTitle: "Health Camps",
      campsSubtitle: "Browse upcoming and ongoing health camps in your area",
      viewDetails: "View Details",
      active: "Active",
      cancelled: "Cancelled",
      upcoming: "Upcoming",
      
      // Common
      loading: "Loading...",
      error: "An error occurred. Please try again.",
      empty: "No results found.",
      backTo: "Back to",
      
      // Chatbot
      chatbotTitle: "Health FAQ Assistant",
      chatbotScope: "I can only answer questions about health camps, vaccination schedules, and government schemes. I cannot provide medical advice.",
      chatbotPlaceholder: "Ask about camps, vaccines, or schemes...",
      send: "Send",
      sources: "Sources:",
      thinking: "Thinking...",
      
      // Admin
      adminTitle: "Admin Dashboard",
      adminSubtitle: "Manage health camps, vaccines, and schemes",
      addCamp: "Add Camp",
      addVaccine: "Add Vaccine",
      addScheme: "Add Scheme",
      edit: "Edit",
      delete: "Delete",
      save: "Save",
      cancel: "Cancel",
      confirm: "Confirm",
      
      // Forms
      title: "Title",
      date: "Date",
      time: "Time",
      location: "Location",
      type: "Type",
      status: "Status",
      description: "Description",
      imageUrl: "Image URL",
      name: "Name",
      ageGroup: "Age Group",
      scheduleNotes: "Schedule Notes",
      nextDoseInfo: "Next Dose Information",
      eligibility: "Eligibility",
      benefits: "Benefits",
      email: "Email",
      password: "Password",
      
      // Login
      loginTitle: "Admin Login",
      login: "Login",
      loggingIn: "Logging in...",
      invalidCredentials: "Invalid credentials. Please try again.",
      
      // Footer
      tagline: "Empowering villages with accessible health information",
      contact: "Contact",
      phone: "Phone: 1800-XXX-XXXX",
      emailContact: "Email: health@arogya.gov",
      disclaimer: "Disclaimer: This platform provides general health information only. For medical advice, please consult healthcare professionals.",
      rights: "© 2025 Arogya. All rights reserved."
    }
  },
  hi: {
    translation: {
      // Header
      home: "होम",
      camps: "स्वास्थ्य शिविर",
      vaccines: "टीके",
      schemes: "योजनाएं",
      adminLogin: "व्यवस्थापक लॉगिन",
      logout: "लॉग आउट",
      dashboard: "डैशबोर्ड",
      
      // Hero
      heroTitle: "ग्राम स्वास्थ्य जानकारी प्राप्त करें",
      heroSubtitle: "अपने समुदाय के लिए स्वास्थ्य शिविरों, टीकाकरण कार्यक्रम और सरकारी स्वास्थ्य योजनाओं पर नवीनतम जानकारी प्राप्त करें",
      campsCta: "स्वास्थ्य शिविर देखें",
      faqCta: "FAQ बॉट से पूछें",
      
      // Features
      featuresVaccinesTitle: "टीकाकरण कार्यक्रम",
      featuresVaccinesDesc: "सभी आयु समूहों के लिए टीकाकरण कार्यक्रम के साथ अप-टू-डेट रहें",
      featuresCampsTitle: "स्वास्थ्य शिविर",
      featuresCampsDesc: "अपने क्षेत्र में आगामी स्वास्थ्य शिविर और चिकित्सा सेवाएं खोजें",
      featuresSchemesTitle: "सरकारी योजनाएं",
      featuresSchemesDesc: "ग्रामीणों के लिए उपलब्ध स्वास्थ्य योजनाओं और लाभों के बारे में जानें",
      
      // Search
      searchTitle: "स्वास्थ्य जानकारी खोजें",
      searchPlaceholder: "शिविरों, टीकों या योजनाओं की खोज करें...",
      searchButton: "खोजें",
      
      // Camps Page
      campsTitle: "स्वास्थ्य शिविर",
      campsSubtitle: "अपने क्षेत्र में आगामी और चल रहे स्वास्थ्य शिविर ब्राउज़ करें",
      viewDetails: "विवरण देखें",
      active: "सक्रिय",
      cancelled: "रद्द",
      upcoming: "आगामी",
      
      // Common
      loading: "लोड हो रहा है...",
      error: "एक त्रुटि हुई। कृपया पुनः प्रयास करें।",
      empty: "कोई परिणाम नहीं मिला।",
      backTo: "वापस",
      
      // Chatbot
      chatbotTitle: "स्वास्थ्य FAQ सहायक",
      chatbotScope: "मैं केवल स्वास्थ्य शिविरों, टीकाकरण कार्यक्रम और सरकारी योजनाओं के बारे में प्रश्नों का उत्तर दे सकता हूं। मैं चिकित्सा सलाह प्रदान नहीं कर सकता।",
      chatbotPlaceholder: "शिविरों, टीकों या योजनाओं के बारे में पूछें...",
      send: "भेजें",
      sources: "स्रोत:",
      thinking: "सोच रहा हूँ...",
      
      // Admin (keeping English for admin interface)
      adminTitle: "Admin Dashboard",
      adminSubtitle: "Manage health camps, vaccines, and schemes",
      addCamp: "Add Camp",
      addVaccine: "Add Vaccine",
      addScheme: "Add Scheme",
      edit: "Edit",
      delete: "Delete",
      save: "Save",
      cancel: "Cancel",
      confirm: "Confirm",
      
      // Forms
      title: "Title",
      date: "Date",
      time: "Time",
      location: "Location",
      type: "Type",
      status: "Status",
      description: "Description",
      imageUrl: "Image URL",
      name: "Name",
      ageGroup: "Age Group",
      scheduleNotes: "Schedule Notes",
      nextDoseInfo: "Next Dose Information",
      eligibility: "Eligibility",
      benefits: "Benefits",
      email: "Email",
      password: "Password",
      
      // Login
      loginTitle: "व्यवस्थापक लॉगिन",
      login: "लॉगिन",
      loggingIn: "लॉगिन हो रहा है...",
      invalidCredentials: "अमान्य क्रेडेंशियल। कृपया पुनः प्रयास करें।",
      
      // Footer
      tagline: "सुलभ स्वास्थ्य जानकारी के साथ गांवों को सशक्त बनाना",
      contact: "संपर्क करें",
      phone: "फोन: 1800-XXX-XXXX",
      emailContact: "ईमेल: health@arogya.gov",
      disclaimer: "अस्वीकरण: यह प्लेटफ़ॉर्म केवल सामान्य स्वास्थ्य जानकारी प्रदान करता है। चिकित्सा सलाह के लिए, कृपया स्वास्थ्य पेशेवरों से परामर्श लें।",
      rights: "© 2025 आरोग्य। सर्वाधिकार सुरक्षित।"
    }
  },
  te: {
    translation: {
      // Header
      home: "హోమ్",
      camps: "ఆరోగ్య శిబిరాలు",
      vaccines: "టీకాలు",
      schemes: "పథకాలు",
      adminLogin: "అడ్మిన్ లాగిన్",
      logout: "లాగ్ అవుట్",
      dashboard: "డాష్‌బోర్డ్",
      
      // Hero
      heroTitle: "గ్రామ ఆరోగ్య సమాచారాన్ని యాక్సెస్ చేయండి",
      heroSubtitle: "మీ సమాజం కోసం ఆరోగ్య శిబిరాలు, టీకా షెడ్యూల్స్ మరియు ప్రభుత్వ ఆరోగ్య పథకాలపై తాజా సమాచారాన్ని పొందండి",
      campsCta: "ఆరోగ్య శిబిరాలు చూడండి",
      faqCta: "FAQ బాట్‌ని అడగండి",
      
      // Features
      featuresVaccinesTitle: "టీకా షెడ్యూల్స్",
      featuresVaccinesDesc: "అన్ని వయస్సు వర్గాల కోసం టీకా షెడ్యూల్స్‌తో నవీకరించబడి ఉండండి",
      featuresCampsTitle: "ఆరోగ్య శిబిరాలు",
      featuresCampsDesc: "మీ ప్రాంతంలో రాబోయే ఆరోగ్య శిబిరాలు మరియు వైద్య సేవలను కనుగొనండి",
      featuresSchemesTitle: "ప్రభుత్వ పథకాలు",
      featuresSchemesDesc: "గ్రామస్థులకు అందుబాటులో ఉన్న ఆరోగ్య పథకాలు మరియు ప్రయోజనాల గురించి తెలుసుకోండి",
      
      // Search
      searchTitle: "ఆరోగ్య సమాచారాన్ని శోధించండి",
      searchPlaceholder: "శిబిరాలు, టీకాలు లేదా పథకాల కోసం శోధించండి...",
      searchButton: "శోధించండి",
      
      // Camps Page
      campsTitle: "ఆరోగ్య శిబిరాలు",
      campsSubtitle: "మీ ప్రాంతంలో రాబోయే మరియు కొనసాగుతున్న ఆరోగ్య శిబిరాలను బ్రౌజ్ చేయండి",
      viewDetails: "వివరాలు చూడండి",
      active: "క్రియాశీలం",
      cancelled: "రద్దు చేయబడింది",
      upcoming: "రాబోయే",
      
      // Common
      loading: "లోడ్ అవుతోంది...",
      error: "లోపం సంభవించింది. దయచేసి మళ్ళీ ప్రయత్నించండి.",
      empty: "ఫలితాలు కనుగొనబడలేదు.",
      backTo: "తిరిగి",
      
      // Chatbot
      chatbotTitle: "ఆరోగ్య FAQ సహాయకుడు",
      chatbotScope: "నేను ఆరోగ్య శిబిరాలు, టీకా షెడ్యూల్స్ మరియు ప్రభుత్వ పథకాల గురించి మాత్రమే ప్రశ్నలకు సమాధానం ఇవ్వగలను. నేను వైద్య సలహా ఇవ్వలేను.",
      chatbotPlaceholder: "శిబిరాలు, టీకాలు లేదా పథకాల గురించి అడగండి...",
      send: "పంపండి",
      sources: "మూలాలు:",
      thinking: "ఆలోచిస్తున్నాను...",
      
      // Admin (keeping English for admin interface)
      adminTitle: "Admin Dashboard",
      adminSubtitle: "Manage health camps, vaccines, and schemes",
      addCamp: "Add Camp",
      addVaccine: "Add Vaccine",
      addScheme: "Add Scheme",
      edit: "Edit",
      delete: "Delete",
      save: "Save",
      cancel: "Cancel",
      confirm: "Confirm",
      
      // Forms
      title: "Title",
      date: "Date",
      time: "Time",
      location: "Location",
      type: "Type",
      status: "Status",
      description: "Description",
      imageUrl: "Image URL",
      name: "Name",
      ageGroup: "Age Group",
      scheduleNotes: "Schedule Notes",
      nextDoseInfo: "Next Dose Information",
      eligibility: "Eligibility",
      benefits: "Benefits",
      email: "Email",
      password: "Password",
      
      // Login
      loginTitle: "అడ్మిన్ లాగిన్",
      login: "లాగిన్",
      loggingIn: "లాగిన్ అవుతోంది...",
      invalidCredentials: "చెల్లని రుసుములు. దయచేసి మళ్ళీ ప్రయత్నించండి.",
      
      // Footer
      tagline: "అందుబాటులో ఉన్న ఆరోగ్య సమాచారంతో గ్రామాలను శక్తివంతం చేయడం",
      contact: "సంప్రదించండి",
      phone: "ఫోన్: 1800-XXX-XXXX",
      emailContact: "ఇమెయిల్: health@arogya.gov",
      disclaimer: "నిరాకరణ: ఈ ప్లాట్‌ఫారమ్ సాధారణ ఆరోగ్య సమాచారాన్ని మాత్రమే అందిస్తుంది. వైద్య సలహా కోసం, దయచేసి ఆరోగ్య నిపుణులను సంప్రదించండి.",
      rights: "© 2025 ఆరోగ్య. అన్ని హక్కులు భద్రపరచబడ్డాయి."
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('language') || 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
