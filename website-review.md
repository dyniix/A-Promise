# Birthday Website — Full Content Review

## OVERVIEW
- **For:** Shreya (1 August)
- **Pages:** 4 (Hero → Memories → Message → Final)
- **Entrance:** IntroGate with "Open" button
- **Colors:** Pink (#f472b6) + Sky Blue (#038fa4)
- **Font:** Playfair Display (italic, uppercase)
- **Framework:** Vite + React + TypeScript + Tailwind v4 + Motion

---

## 1. INTRO GATE

**What shows before entering the site:**

### Loading Phase (3.2 sec)
- "Shreya" letters animate in one-by-one (pulsing opacity)
- Gradient loading bar with glowing dot at the end
- Status messages cycling (every 1.8s):
  > "Preparing something special..."
  > "Gathering the right words..."
  > "Wrapping it with care..."
  > "Almost ready..."

### Ready Phase (after loading)
- Label: "A BIRTHDAY WISH"
- Button: **"Open"** (ghost glass button, pink+sky blue glow on hover)
- Subtext: "A little something, just for you"
- Corner frame lines animate in (pink→sky gradient)

### Transition
- Click "Open" → IntroGate blurs out + scales down
- Main site fades in with scale 0.98→1

---

## 2. HERO PAGE (Page 1/4 — "Hey")

### Current Content
| Element | Text |
|---|---|
| Label | "A SPECIAL BIRTHDAY WISH" |
| Title | **"Shreya"** (letter-by-letter, S = pink gradient, rest = white/90) |
| Tagline | "A little something, just for you" |
| Scroll Indicator | 4 dots (1st active = pink→sky gradient) + double chevron + "Continue" |

### Notes
- Title animates after 0.6s delay, each letter every 0.1s
- Tagline reveals after 2.8s
- Background: sky glow (center) + pink glow (top-right)
- **ACTION NEEDED:** Tagline could be more personal

---

## 3. MEMORIES PAGE (Page 2/4 — "Moments")

### Current Content
| Element | Text |
|---|---|
| Label | "SOME MOMENTS" |
| Title | "Little **Memories**" |
| Memory 1 | Title: "Memory One" / Text: "This is where a memory will go. Something that matters." / Icon: ✦ |
| Memory 2 | Title: "Memory Two" / Text: "This is where another memory will go. Replace this text." / Icon: ✧ |
| Memory 3 | Title: "Memory Three" / Text: "One more memory slot. Fill when ready." / Icon: ☆ |
| Navigation | ← SVG chevron / 3 gradient dots / → SVG chevron |

### Notes
- Glass card carousel with slide animation
- Dots show active memory (pink→sky gradient when active)
- **⚠️ PLACEHOLDER CONTENT — needs 2-3 real memories from you**

---

## 4. MESSAGE PAGE (Page 3/4 — "Message")

### Current Content
| Element | Text |
|---|---|
| Label | "A MESSAGE FOR YOU" |
| Title | "Just **For You**" |
| Message | "Happy Birthday, Shreya.\n\nThis is a small wish from someone who remembers you. May your year ahead be filled with everything that makes you smile — laughter, warmth, and moments that stay with you.\n\nYou deserve a day as beautiful as you are." |
| Hidden Hint | "— The depth was always the signal." (bottom-right, 8px, white/15, italic) |
| Footer | "WITH WARMTH, SOMEONE WHO REMEMBERS" |

### Notes
- Glass card with message
- Hidden hint is subtle — only someone who knows the reference will understand
- Hovering over hint brightens it slightly (white/15 → white/25)
- **Hidden hint** is DYNIX's core metaphor — connects back to Nikhil if she remembers

---

## 5. FINAL PAGE (Page 4/4 — "Celebrate")

### Current Content
| Element | Text |
|---|---|
| Row 1 (pink gradient) | **"Happy"** (5 letters, staggered entrance) |
| Row 2 (sky gradient) | **"Birthday"** (8 letters, staggered entrance) |
| Blessing | "May every moment ahead feel as special as you are." |
| Footer | "01 · 08" |

### Effects
- 3 ambient orbs (pink + sky, blur-3xl, floating animation)
- 8 sparkle dots (drift + scale + opacity animation)
- Pink→sky divider line
- Radial gradient backgrounds (pink + sky mix)

### Notes
- "Happy" and "Birthday" in two rows (ensures no overflow on any screen)
- Letter stagger delay: 0.08s each, "Birthday" starts 0.5s after "Happy"

---

## 6. SCROLL INDICATOR (on every page except Final)

Each non-last page has at bottom:
- 4 page dots (current page = pink→sky gradient + glow, others = white/12)
- Double chevron arrow (staggered opacity animation)
- "Scroll" label (6px, uppercase, tracking)

| Page | Current Dot |
|---|---|
| Hero (1) | Dot 1 active |
| Memories (2) | Dot 2 active |
| Message (3) | Dot 3 active |
| Final (4) | **No indicator** (last page) |

---

## 7. DESIGN SYSTEM

### Colors
| Token | Value | Usage |
|---|---|---|
| --color-pink | #f472b6 | Main accent, S letter, active dots |
| --color-pink-dark | #db2777 | Pink gradient end |
| --color-pink-light | #f9a8d4 | Soft pink |
| --color-sky | #038fa4 | Secondary accent, "Birthday" letters |
| --color-sky-dark | #026d7d | Sky gradient end |
| --color-bg | #0a0a0f | Page background |
| --color-surface | #12121a | Glass card base |
| --color-text | #e5e7eb | Body text |

### CSS Classes
| Class | Effect |
|---|---|
| `.glass` | Backdrop-blur card (rgba(18,18,26,0.45) + blur-24px) |
| `.text-gradient-pink` | Pink linear gradient text |
| `.text-gradient-sky` | Sky blue linear gradient text |
| `.text-gradient-mix` | Pink→sky gradient text |
| `.glow-pink` | Pink box-shadow glow |
| `.glow-sky` | Sky blue box-shadow glow |
| `.page` | Full viewport centered section |

### Typography
| Font | Weight Range | Usage |
|---|---|---|
| Playfair Display | 400-700 | Display headings (italic, uppercase) |
| Inter | 200-600 | Body text, labels |
| JetBrains Mono | 200-600 | UI labels, tracking text |

### Animations
| Name | Duration | Purpose |
|---|---|---|
| float | 6s | Floating orbs |
| pulse-soft | 4s | Soft opacity pulse |
| sparkle | 2s | Sparkle effect |
| fade-in | 1.2s | Standard entrance |
| glow-breathe | 3s | Glow scale pulse |
| Standard ease | `[0.16, 1, 0.3, 1]` | All cinematic transitions |

---

## ⚠️ ACTION ITEMS

### Content Needed (You Fill)
1. **Memories (2-3)** — Real moments with Shreya for the carousel
2. **Song selection** — Background music for the site (or no song?)
3. **Message** — Do you want to change the generic birthday message?
4. **Hidden hint** — Current: "The depth was always the signal." Keep or change?

### Technical Status
- [x] Intro gate with loading animation
- [x] Hero with letter-by-letter reveal
- [x] Memories carousel (3 slots, placeholder content)
- [x] Message with hidden hint
- [x] Final page with Happy Birthday + orbs
- [x] Page dots + scroll indicators
- [x] Mobile responsive
- [x] Snap scroll
- [x] Build passing
- [ ] Real memories content
- [ ] Song selection
- [ ] Deployment
