# 2EMME Insider Guide Milano

Mobile-first web guide for guests of 2EMME Apartments in Milan.

## Overview

This project is a single-page HTML guide designed for smartphone use. It organizes Milan recommendations into clear macro areas with large buttons, strong contrast, and a visual identity aligned with the 2EMME brand palette.

## Live content areas

The guide includes:

- Food & Drink
  - Milanese traditional restaurants
  - Ethnic and NoLo places
  - Pizza
  - Cocktail bars
- Culture
  - Always-free museums
  - First Sunday free museum reminder
  - FAI and house museums
- Itineraries
  - Cimitero Monumentale walking tour
  - Monumentale voices
  - Chiaravalle Abbey extra itinerary
- Churches
  - The 10 major churches of Milan
- Hidden Milan
  - Secret courtyards, legends, unusual places
- Skyline & Views
  - Rooftops, terraces and panoramic viewpoints
- Day Trips
  - Easy trips outside Milan
- Nightlife
  - Porta Venezia, NoLo, LGBTQ+ venues, clubs and listening bars
- Safety & Emergency
  - Emergency numbers
  - Lost documents guidance
  - Consulates
  - Common scams and how to avoid them

## Current content count

Approximate content included in the guide:

| Area | Items |
|---|---:|
| Traditional restaurants | 5 |
| Ethnic / NoLo | 8 |
| Pizza | 6 |
| Cocktail bars | 10 |
| Always-free museums | 5 |
| FAI & house museums | 4 |
| Monumentale walking tour stops | 5 |
| Monumentale voices | 8 |
| Churches | 10 |
| Hidden Milan | 9 |
| Skyline & views | 7 |
| Day trips | 7 |
| Nightlife | 17 |
| Safety & emergency | 12 |

Total visible cards/items: approximately 113.

## Tech stack

- Static HTML
- Tailwind CDN
- Vanilla JavaScript
- Google Fonts: Plus Jakarta Sans
- Google Translate widget
- Google Maps search links
- No build step required

## Main file

```text
index.html
```

The entire application is contained in `index.html`.

## Development

Open the file directly in a browser or serve it locally:

```bash
python3 -m http.server 8080
```

Then open:

```text
http://localhost:8080
```

## Notes

- Google Translate may not always appear when opened as a local `file://` URL. It is more reliable when served via localhost or deployed online.
- The guide is intentionally mobile-first and avoids horizontal scrolling.
- All content cards are rendered from JavaScript arrays inside `index.html`.
- Basic smoke tests run in the browser console to catch missing render targets or tabs.

## Brand palette

```text
Dark:       #001f24
Ottanio:   #004D54
Magenta:   #DB4F61
Soft Pink: #F5C9D1
Mint:      #54C4A6
Ice Blue:  #BFEBFF
```

## Repository

```text
matteomasella-svg/INSIDEMILANO
```

## Author

Created for 2EMME Apartments.
