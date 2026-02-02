# RealTurf Lead Generation & Installer Network System
## Battle Plan - Operation Turf Domination

---

## EXECUTIVE SUMMARY

**The Problem:** RealTurf supplies artificial turf to installers across 4 locations (Houston HQ, Dallas, Las Vegas, West Palm Beach). They need:
1. More qualified leads (homeowners wanting turf)
2. Better installer network management
3. Las Vegas market awareness (new location, nobody knows)
4. Repetitive installer customers who buy in bulk

**The Solution:** A complete lead-to-revenue system that:
- Captures & pre-qualifies homeowner leads
- Automatically routes leads to local installers
- Tracks installer performance & purchases
- Generates leads through multiple channels

**Key Insight:** NO AI CHATBOTS. Homeowners want human conversation. AI is used ONLY for:
- Estimating square footage from photos
- Pre-qualifying leads
- Routing automation
- Internal analytics

---

## SYSTEM ARCHITECTURE

```
                    LEAD SOURCES
                         │
    ┌────────────────────┼────────────────────┐
    │                    │                    │
[Website]           [Ads/SEO]           [Scraping]
    │                    │                    │
    └────────────────────┼────────────────────┘
                         │
                         ▼
              ┌─────────────────────┐
              │   LEAD CAPTURE      │
              │   (Quote Form)      │
              │   - Location        │
              │   - Sq ft estimate  │
              │   - Budget range    │
              │   - Timeline        │
              │   - Contact info    │
              └─────────┬───────────┘
                        │
                        ▼
              ┌─────────────────────┐
              │   LEAD ROUTING      │
              │   - Match to zone   │
              │   - Score lead      │
              │   - SMS installer   │
              │   - Track response  │
              └─────────┬───────────┘
                        │
           ┌────────────┼────────────┐
           │            │            │
           ▼            ▼            ▼
    [Installer 1] [Installer 2] [Installer 3]
           │            │            │
           └────────────┼────────────┘
                        │
                        ▼
              ┌─────────────────────┐
              │   INSTALLER PORTAL  │
              │   - Claim leads     │
              │   - Order turf      │
              │   - Track jobs      │
              └─────────────────────┘
                        │
                        ▼
              ┌─────────────────────┐
              │   ADMIN DASHBOARD   │
              │   - All leads       │
              │   - Installer stats │
              │   - Revenue tracking│
              │   - Location KPIs   │
              └─────────────────────┘
```

---

## PHASE 1: QUICK WINS (Week 1-2)
### Goal: Show immediate value, get the contract

### 1.1 Update Existing Website
**Time: 2-3 days**

- [ ] Remove/hide AI chat widget
- [ ] Rebrand "AI Quote" to "Get Free Estimate"
- [ ] Add location selector (Houston, Dallas, Vegas, West Palm Beach)
- [ ] Improve quote form:
  - Property type (Residential/Commercial)
  - Square footage (keep AI estimate from photo)
  - Primary use (Pets, Kids, Pool area, etc.)
  - Budget range (dropdown, not exact)
  - Timeline (This month, 1-3 months, Just researching)
  - Contact info (Name, Phone, Email, Address)
- [ ] Add "A local installer will contact you within 24 hours" messaging
- [ ] Thank you page with next steps

### 1.2 Basic Lead Notification System
**Time: 2-3 days**

- [ ] Set up Twilio for SMS
- [ ] When lead submits → Send SMS to designated installer for that zone
- [ ] SMS format:
  ```
  NEW LEAD - [City]
  800 sq ft backyard
  Budget: $10-15K
  Timeline: This month
  Has pets: Yes

  Claim: [link]
  ```
- [ ] Simple claim link → Shows contact info
- [ ] Email backup notification

### 1.3 Simple Admin View
**Time: 1-2 days**

- [ ] Google Sheet or Airtable integration for MVP
- [ ] All leads logged with:
  - Timestamp
  - Location
  - Contact info
  - Lead details
  - Assigned installer
  - Status (New, Claimed, Converted, Lost)

**PHASE 1 DELIVERABLE:** Working lead capture → SMS to installer → Admin tracking

---

## PHASE 2: INSTALLER PORTAL (Week 3-4)
### Goal: Make installers love the system

### 2.1 Installer Dashboard
- [ ] Login system for installers
- [ ] View available leads in their zone
- [ ] Claim leads (first-come-first-serve or round-robin)
- [ ] Lead details page with all info
- [ ] Update lead status (Contacted, Quoted, Won, Lost)
- [ ] See their performance stats

### 2.2 Bulk Ordering System
- [ ] Product catalog (all RealTurf products)
- [ ] Add to cart functionality
- [ ] Bulk pricing tiers displayed
- [ ] Order history
- [ ] Reorder previous orders
- [ ] Invoice generation

### 2.3 Installer Incentives
- [ ] Lead credits for high performers
- [ ] Bulk discount tiers
- [ ] Referral bonuses for bringing other installers
- [ ] "Preferred Installer" badge system

**PHASE 2 DELIVERABLE:** Full installer portal with leads + ordering

---

## PHASE 3: ADMIN COMMAND CENTER (Week 5-6)
### Goal: Give owner complete visibility

### 3.1 Lead Analytics Dashboard
- [ ] Total leads by location
- [ ] Lead source tracking (website, ads, referral)
- [ ] Conversion funnel visualization
- [ ] Lead quality scoring
- [ ] Response time metrics

### 3.2 Installer Management
- [ ] All installers list with performance
- [ ] Lead assignment rules (auto vs manual)
- [ ] Installer territory mapping
- [ ] Performance rankings
- [ ] Flag underperformers

### 3.3 Revenue Tracking
- [ ] Turf orders by installer
- [ ] Revenue by location
- [ ] Monthly/quarterly trends
- [ ] Forecasting
- [ ] Goal tracking (new Austin location metrics)

### 3.4 Location Management
- [ ] Houston (HQ) stats
- [ ] Dallas stats
- [ ] Las Vegas stats (NEW - needs attention)
- [ ] West Palm Beach stats
- [ ] Compare locations side-by-side

**PHASE 3 DELIVERABLE:** Complete admin dashboard

---

## PHASE 4: LEAD GENERATION ENGINE (Week 7-8+)
### Goal: Fill the funnel with qualified leads

### 4.1 SEO & Content
- [ ] Location-specific landing pages
  - realturf.com/las-vegas-artificial-turf
  - realturf.com/houston-turf-installation
  - etc.
- [ ] Blog content for local keywords
- [ ] Google Business Profile optimization for each location
- [ ] Review generation system

### 4.2 Paid Advertising
- [ ] Google Ads campaigns by location
- [ ] Facebook/Instagram ads (use @realturfusa content)
- [ ] Retargeting pixels
- [ ] Lead form ads (capture directly in platform)

### 4.3 Lead Scraping (Vegas Awareness)
- [ ] Scrape home improvement permits in Vegas
- [ ] Identify new construction/renovations
- [ ] Pool installation permits (pool area = turf opportunity)
- [ ] Real estate listings with "needs landscaping"
- [ ] Competitor review mining (unhappy customers)

### 4.4 Partnership Development
- [ ] Landscaping company partnerships
- [ ] Pool builders partnerships
- [ ] Real estate agent referral program
- [ ] HOA relationships
- [ ] Property management companies

**PHASE 4 DELIVERABLE:** Multi-channel lead generation machine

---

## TECH STACK RECOMMENDATION

### Frontend (Keep existing + enhance)
- React + Vite (already built)
- Tailwind CSS (already using)
- Framer Motion (already using)

### Backend (NEW)
- **Supabase** (PostgreSQL + Auth + Realtime)
  - User auth for installers/admin
  - Lead database
  - Order management
  - Real-time updates

### Integrations
- **Twilio** - SMS notifications
- **SendGrid** - Email notifications
- **Stripe** - Payments for bulk orders
- **Google Maps API** - Location/zone matching
- **Airtable** - Quick MVP before full backend (optional)

### Analytics
- **Mixpanel** or **PostHog** - User behavior
- **Google Analytics** - Traffic
- **Custom dashboard** - Business metrics

---

## PRICING MODEL FOR YOU

### Option A: Project-Based
| Phase | Deliverable | Price |
|-------|-------------|-------|
| Phase 1 | Lead Capture + SMS Routing | $3,000 |
| Phase 2 | Installer Portal | $5,000 |
| Phase 3 | Admin Dashboard | $4,000 |
| Phase 4 | Lead Gen Setup | $3,000 |
| **Total** | **Complete System** | **$15,000** |

### Option B: Retainer + Revenue Share
- $2,000/month base retainer
- +2% of turf sales from system-generated leads
- Aligns your incentives with their growth

### Option C: Performance-Based
- $500 setup fee
- $50 per qualified lead delivered
- $200 per converted sale
- High risk, high reward

**RECOMMENDATION:** Start with Phase 1 at $3,000 to prove value, then negotiate retainer for ongoing work.

---

## SUCCESS METRICS (KPIs)

### Lead Metrics
- Leads captured per week
- Lead-to-claim rate (installer response)
- Claim-to-contact rate
- Contact-to-quote rate
- Quote-to-close rate

### Installer Metrics
- Active installers per location
- Average response time
- Conversion rate by installer
- Repeat order rate
- Average order value

### Revenue Metrics
- Revenue per location
- Revenue per lead
- Customer acquisition cost
- Lifetime value per installer

### Location-Specific (Vegas Focus)
- Vegas lead volume (target: 50/month by Q2)
- Vegas installer sign-ups (target: 10 active)
- Vegas market awareness (track search volume)

---

## VEGAS AWARENESS CAMPAIGN
### Special Focus (Owner Priority)

### Immediate Actions
1. **Google Business Profile** - Claim & optimize Vegas location
2. **Local SEO** - "artificial turf las vegas" "turf installation vegas"
3. **Facebook Local** - Target Vegas homeowners, 30-65, homeowner status
4. **Nextdoor** - Vegas neighborhoods, homeowner groups
5. **Instagram Geo-tags** - All Vegas install photos tagged

### Content Strategy
- Before/after Vegas installs
- Vegas-specific benefits (water savings, desert heat)
- Local installer spotlights
- Customer testimonials (video)

### Partnerships
- Vegas landscaping companies
- Vegas pool builders
- Vegas real estate agents
- Vegas HOAs (water conservation angle)

---

## IMMEDIATE NEXT STEPS

### This Week
1. [ ] Present this battle plan to owner
2. [ ] Get approval on Phase 1 scope
3. [ ] Remove AI chat from current site
4. [ ] Set up Twilio account
5. [ ] Create simple lead notification flow

### Next Week
1. [ ] Deploy updated lead capture form
2. [ ] Test SMS routing with 1-2 installers
3. [ ] Set up basic admin tracking (Airtable/Sheet)
4. [ ] Gather feedback, iterate

### Week 3+
1. [ ] Begin Phase 2 based on learnings
2. [ ] Onboard more installers
3. [ ] Start Vegas awareness push

---

## TALKING POINTS FOR OWNER

### What Changed (Based on Feedback)
> "I heard you loud and clear - homeowners want human conversation. The AI is now invisible. It only helps estimate square footage and routes leads. The installer makes the call, builds the relationship, closes the deal."

### The Value Proposition
> "Every lead that comes through this system is pre-qualified with budget, timeline, and project details. Your installers spend zero time on tire-kickers. They only talk to people ready to buy."

### Vegas Solution
> "For Vegas awareness, we're building location-specific landing pages, local SEO, and a targeted ad campaign. Every Vegas lead goes straight to your Vegas installers."

### Long-Term Partnership
> "This isn't a one-time project. As you open Austin and beyond, the system scales. Each new location plugs right in. I want to grow with RealTurf."

---

## COMPETITIVE ADVANTAGE

What makes this system different from just "a website":

1. **AI Square Footage Estimation** - Photo upload → instant estimate (unique)
2. **Automatic Lead Routing** - No manual assignment needed
3. **Installer Performance Tracking** - Know who's closing
4. **Bulk Ordering Integration** - Leads → Orders in one system
5. **Multi-Location Ready** - Built for expansion

---

*Document Version: 1.0*
*Created: February 2026*
*Author: [Your Name]*
*For: RealTurf USA*
