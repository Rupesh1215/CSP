# Arogya Design Guidelines

## Design Approach
**Reference-Based Approach**: Drawing inspiration from government information portals and healthcare platforms with emphasis on accessibility, clarity, and trustworthiness. Think gov.uk, healthcare.gov combined with the clean card aesthetics of modern health platforms.

## Core Design Principles
1. **Official & Trustworthy**: Government health portal aesthetic with calm, reassuring visual language
2. **Accessibility First**: High contrast, clear typography, keyboard navigation, screen reader friendly
3. **Multi-lingual Ready**: Design accommodates English, Hindi, and Telugu with appropriate text scaling
4. **Mobile-First**: Responsive layouts optimized for village users on mobile devices

---

## Typography System

**Font Families**:
- Primary: Roboto or system sans-serif stack
- Fallback: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif

**Type Scale**:
- Page Titles: 32px (mobile: 24px), weight 700
- Section Headings: 24px (mobile: 20px), weight 600
- Card Titles: 18px, weight 600
- Body Text: 16px, weight 400, line-height 1.6
- Small Text/Labels: 14px, weight 400
- Buttons: 16px, weight 500

---

## Layout System

**Spacing Units**: Use multiples of 4px (4, 8, 12, 16, 24, 32, 48px) for consistent rhythm

**Container Widths**:
- Max content width: 1200px centered
- Card containers: 100% within max-width
- Form inputs: max 600px width for readability
- Chat window: 400px wide (desktop), full-width (mobile)

**Grid Patterns**:
- Camp/Vaccine/Scheme cards: 3-column grid (desktop), 1-column (mobile)
- Admin dashboard: 2-column layout for forms + preview
- Statistics/highlights: 4-column (desktop), 2-column (tablet), 1-column (mobile)

---

## Component Library

### Navigation Header
- Fixed top navigation with logo (left), main nav links (center/right)
- Height: 64px
- Admin login button in top-right corner (public view)
- Hamburger menu for mobile
- Subtle bottom border for visual separation

### Cards (Primary Content Container)
- White background with subtle shadow (0 2px 8px rgba(0,0,0,0.1))
- Border-radius: 8px
- Padding: 24px (desktop), 16px (mobile)
- Hover state: slight shadow increase
- Title at top, metadata (date/location) below, description text, action button at bottom

### Health Camp Cards
- Status indicator badge (Active: green, Cancelled: red, Upcoming: blue)
- Date/time prominently displayed with icon
- Location with map pin icon
- Camp type tag (Vaccination/General/Specialty)
- Optional image thumbnail at top (if media uploaded)

### Forms (Admin & Public)
- Labels above inputs, 8px spacing
- Input fields: 48px height, 12px padding, 1px border, 4px border-radius
- Validation messages: inline below field, small red text for errors, green for success
- Required field indicator: red asterisk
- Submit buttons: prominent, right-aligned, 48px height

### Chatbot Interface
- Fixed bottom-right (desktop) or full-screen modal (mobile)
- Chat window: white background, 500px max height, scrollable message area
- Scope notice banner at top: light blue background, clear text explaining limitations
- Message bubbles: User (blue, right-aligned), Bot (light gray, left-aligned)
- Source attribution: small text below bot messages linking to database records
- Input field with send button at bottom, 56px height

### Buttons
**Primary**: Solid blue background, white text, 48px height, 16px horizontal padding, 4px border-radius
**Secondary**: White background, blue border and text
**Danger**: Red for delete actions
**All buttons**: Large touch targets (minimum 44px), clear hover states (slight darkening)

### Data Tables (Admin)
- Zebra striping for row readability
- Sticky header row
- Action buttons (Edit/Delete) in last column
- Mobile: convert to stacked cards

### Modals
- Confirmation modals for destructive actions
- Overlay: semi-transparent dark background (rgba(0,0,0,0.5))
- Modal: white, centered, max 500px width, 24px padding
- Close button (X) in top-right corner

### Search Bar
- Prominent on public pages
- Icon prefix (magnifying glass)
- Placeholder text indicating searchable content
- Real-time results dropdown below input

---

## Page-Specific Layouts

### Public Homepage
- Hero section: 60vh height, background gradient (light to medium blue), centered content
- Headline: "Access Village Health Information" or similar
- Sub-headline explaining purpose
- Two CTA buttons: "View Health Camps" and "Ask FAQ Bot"
- Three-column feature cards below hero: Vaccination Schedules, Health Camps, Government Schemes
- Search bar section
- Footer with contact info and attribution

### Camps/Vaccines/Schemes List Pages
- Page header with title and search/filter options
- Grid of cards showing all entries
- Pagination at bottom (if needed)
- "No results" state with helpful message

### Admin Dashboard
- Sidebar navigation (desktop) or top tabs (mobile)
- Main content area with data tables
- "Add New" button prominent in top-right
- Recent activity/logs section at bottom
- Logout button in header

### Admin CRUD Forms
- Two-column layout: Form (left 60%), Preview (right 40%)
- Form sections with clear headings
- Image upload area with drag-drop zone
- Save and Cancel buttons at bottom
- Success/error toast notifications

---

## Visual Design Language

**Color Palette** (to be defined by engineer, but suggest):
- Primary Blue: Government/healthcare trust color
- Success Green: For confirmations, active status
- Warning Red: For destructive actions, cancelled status
- Neutral Grays: For text hierarchy and borders
- Background: Off-white or very light gray for page background

**Imagery**:
- Hero section: Abstract health/community illustration or photo of village healthcare setting
- Camp cards: Optional photos of health camps, vaccination drives
- Icons: Simple, outlined style for navigation and feature indicators
- Empty states: Friendly illustrations for "no data" scenarios

**Shadows & Depth**:
- Minimal use: subtle card shadows only
- No dramatic depth effects
- Flat, clean aesthetic prioritizing content

**Accessibility Requirements**:
- Color contrast ratio: minimum 4.5:1 for text
- Focus indicators: visible blue outline on all interactive elements
- Form labels: always present, never placeholder-only
- Error messages: never rely on color alone, include icons/text

---

## Responsive Behavior

**Breakpoints**:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

**Mobile Adaptations**:
- Single-column layouts throughout
- Hamburger navigation menu
- Stacked form fields
- Full-width cards with adequate touch targets
- Bottom navigation for key actions
- Chat interface: full-screen takeover

**Performance**:
- Lazy load images on scroll
- Optimize for 3G connections (village context)
- Minimal animations to reduce load

---

## Multi-Language Considerations
- Text expansion: Design allows 30% text growth for Hindi/Telugu
- Font support: Ensure Roboto or system fonts support Devanagari and Telugu scripts
- RTL not required but design should be flexible
- Language selector in header (flag icons or text labels)