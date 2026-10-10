# Seats Page Design Fidelity Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove the hidden horizontal scroll from the seat map and bring the Seats page in line with the Figma design.

**Architecture:** Seat size becomes a CSS custom property derived from the hall's widest row, so the map always fits its 720px column — reproducing the design's 52px seats exactly for the hall the design was drawn against, and shrinking only when real data is wider. Everything else is a styling pass: measured value in, design value out, with one structural addition (the column divider the design has and we lack).

**Tech Stack:** React 19, Tailwind CSS v4 (`@theme` tokens in `src/index.css`), Vite 8, `cn` from `@/helpers`.

**Spec:** No written spec. This implements Figma node `291:21072` ("SEATS" screen) in file `d7jcg4mfmfv4ejhPpvGSnr`, captured via `get_design_context` and compared against the rendered page at `localhost:5173/sessions/1365/seats`. Every "Design" value below is quoted from that capture; every "Current" value was measured on the running app.

## Global Constraints

See `CLAUDE.md` for project conventions. The ones that bite here:

- **1rem = 16 design px.** `html { font-size: calc(100vw / 108) }` and Figma frames are 1728px wide. A Figma px maps to a Tailwind step by dividing by 4 — 52px -> `size-13`, 32px -> `gap-8`.
- Tailwind utilities only; `cn` from `@/helpers` for conditionals. No fixed `px` values — they break the viewport scaling. Use a rem arbitrary value (`rounded-[0.3125rem]`) when no token fits.
- Destructure props in the parameter list.
- **Do not commit.** Every task ends at a working tree, not a commit.

## How to check

`npm run dev`, open `http://localhost:5173/sessions/1365/seats`, compare against the Figma frame side by side. Session `1365` is the widest real hall — Stalls 6x12 with 2 aisles, Balcony 2x10 with 1 aisle — and the one that currently overflows.

The scroll bug is visible without tooling: today the right-hand seats of each row are cut off at the panel edge with no scrollbar to reveal them. After Task 1 every seat in every row is visible at any window width.

Run `npm run lint` after each task.

## Things to watch

Conditions the design does not depict:

- **A hall wider than ~17 seats per row** hits the clamp floor and overflows again. Task 1 keeps `overflow-x-auto` as a fallback and drops `scrollbar-none`, so it scrolls *visibly* instead of clipping.
- **Sections of different widths** (Stalls 12, Balcony 10) must share one seat size, or the map reads as two grids. Task 1 derives the vars from the max across all sections, not per section.
- **`unavailable` seats** render as spacers and must match the seat width, or rows misalign. Row H of session 1365 has two.
- **Empty `ticketTypes`** (every type blocked by age rating) renders an empty pill row. The seat row and divider above it are unconditional, so the card still renders — confirm when touching `TicketTypeOptions`.

---

### Task 1: Adaptive seat sizing — removes the horizontal scroll

The map overflows its column by 108 design px. The design assumes 10 seats + 1 aisle (644px, fits the 680px track); the API serves 12 seats + 2 aisles (788px, does not). `overflow-x-auto` hides this and `scrollbar-none` removes the scrollbar, so seats are silently clipped.

**Files:** `src/index.css`, `src/pages/Seats/components/SeatMap/{helpers.js,SeatMap.jsx,SeatRow.jsx,SeatButton.jsx}`

- [ ] **Step 1: Add the `seat-grid` utility to `src/index.css`**

Next to the existing `@utility` blocks. The subtracted terms are the `w-5` row label, the aisle spacers, and the `gap-2` gaps (one per child boundary, so `cols + aisles` of them).

```css
@utility seat-grid {
  --seat-size: clamp(
    1.75rem,
    calc(
      (100% - 1.25rem - var(--seat-aisles) * 1rem -
        (var(--seat-cols) + var(--seat-aisles)) * 0.5rem) / var(--seat-cols)
    ),
    3.25rem
  );
}
```

- [ ] **Step 2: Add `getSeatGridVars` to `SeatMap/helpers.js`**

Taking the max across *all* sections is what keeps both sections on one seat size. `Math.max(1, ...)` guards the empty case — a zero would divide the calc by zero and collapse every seat.

```js
export const getSeatGridVars = (sections) => {
  const rows = sections.flatMap(({ rows }) => rows);
  const cols = Math.max(1, ...rows.map(({ seats }) => seats.length));
  const aisles = Math.max(
    0,
    ...rows.map(
      ({ seats }) => seats.filter(({ aisleAfter }) => aisleAfter).length
    )
  );

  return { '--seat-cols': cols, '--seat-aisles': aisles };
};
```

- [ ] **Step 3: Rewrite `SeatMap.jsx`**

`scrollbar-none` goes (a hall too wide for the clamp floor must show its scrollbar). `w-fit min-w-full` goes — it is what let the content size to itself instead of to the track. Both gaps become `gap-8`; see Task 2.

```jsx
import ScreenBar from './ScreenBar';
import SeatLegend from './SeatLegend';
import SeatSection from './SeatSection';
import { getSeatGridVars } from './helpers';

const SeatMap = ({ sections, selectedIds, isFull, onToggle }) => {
  return (
    <div className="flex flex-col gap-8">
      <div className="overflow-x-auto">
        <div
          style={getSeatGridVars(sections)}
          className="seat-grid flex flex-col gap-8 px-5"
        >
          <ScreenBar />

          {sections.map((section) => (
            <SeatSection
              key={section.name}
              section={section}
              selectedIds={selectedIds}
              isFull={isFull}
              onToggle={onToggle}
            />
          ))}
        </div>
      </div>

      <SeatLegend />
    </div>
  );
};

export default SeatMap;
```

- [ ] **Step 4: Make rows fill the track in `SeatRow.jsx`**

Without `w-full` the row shrinks to its content and `100%` in the calc resolves against the wrong width. Without `justify-center` a row that hits the 3.25rem cap sits left-aligned. The label changes are Task 2's, included here so the file is written once.

```jsx
import { Fragment } from 'react';
import SeatButton from './SeatButton';

const SeatRow = ({ row, selectedIds, isFull, onToggle }) => {
  return (
    <div className="flex w-full items-center justify-center gap-2">
      <span className="w-5 text-center text-xs font-semibold">{row.label}</span>

      {row.seats.map((seat) => (
        <Fragment key={seat.id}>
          <SeatButton
            seat={seat}
            isSelected={selectedIds.includes(seat.id)}
            isFull={isFull}
            onToggle={onToggle}
          />

          {seat.aisleAfter && <span aria-hidden="true" className="w-4" />}
        </Fragment>
      ))}
    </div>
  );
};

export default SeatRow;
```

- [ ] **Step 5: Size seats from the variable in `SeatButton.jsx`**

Both branches must change — if the spacer keeps `size-13` the `unavailable` seats stay 52px and rows misalign.

```jsx
import { cn } from '@/helpers';
import { getSeatClasses, getSeatLabel, getSeatState } from './helpers';

const SeatButton = ({ seat, isSelected, isFull, onToggle }) => {
  if (seat.state === 'unavailable') {
    return (
      <span
        aria-hidden="true"
        className="aspect-square w-(--seat-size) shrink-0"
      />
    );
  }

  const state = getSeatState(seat, isSelected);
  const isSelectable = state === 'available' || state === 'selected';

  return (
    <button
      type="button"
      onClick={() => onToggle(seat)}
      disabled={!isSelectable || (isFull && !isSelected)}
      aria-pressed={isSelected}
      aria-label={getSeatLabel(seat, state)}
      className={cn(
        'flex aspect-square w-(--seat-size) shrink-0 items-center justify-center rounded-menu text-sm font-extrabold transition-colors duration-150 ease-out disabled:cursor-not-allowed',
        getSeatClasses(state)
      )}
    >
      {seat.label}
    </button>
  );
};

export default SeatButton;
```

- [ ] **Step 6: Check**

Every seat of every row visible, no clipped right edge, no scrollbar. Seats measure 43 design px here — `(680 - 20 - 32 - 112) / 12` — and both Stalls and Balcony render at the same size. Narrow and widen the window: the map scales and never scrolls.

- [ ] **Step 7: `npm run lint`**

---

### Task 2: Seat map visual fidelity

| Element | Design | Current |
|---|---|---|
| SCREEN bar -> seat rows gap | 32px | 10px |
| Seat rows -> legend gap | 32px | 36px |
| Seat shadow | `0 1px 2px rgba(0,0,0,.2)` | none |
| Row label colour / weight | white, semibold | `text-secondary`, 400 |
| Legend list gap | 24px | 20px |
| Legend item gap | 8px | 6px |
| Legend swatch | 16px, 5px radius | 14px, 4px radius |
| Held seat text | `text/secondary` | `text-disabled` |
| Held seat fill | one diagonal stroke | repeating 3px stripes |

The design nests the screen bar, row stack and legend as three children of one `flex flex-col gap-[32px]` (node `253:1896`); our markup splits them across the scroll container, so the same 32px is set in two places — both already in Task 1 Step 3. `SeatSection`'s own `gap-2.5` stays: 10px is the design's row-to-row gap (node `253:1900`).

**Files:** `src/pages/Seats/components/SeatMap/{helpers.js,SeatLegend.jsx}`, `src/index.css`

- [ ] **Step 1: Seat state classes in `SeatMap/helpers.js`**

Shadow goes on the bordered states, not on `held` — the design's held seat has neither border nor shadow. `shadow-card` is the existing token; its inset component is invisible at this size against `bg-card`, so no new token.

```js
const SEAT_STATE_CLASSES = {
  available:
    'cursor-pointer border border-disabled bg-card shadow-card hover:border-secondary',
  selected: 'cursor-pointer bg-red shadow-card',
  sold: 'cursor-not-allowed bg-card text-disabled shadow-card',
  held: 'seat-hatch cursor-not-allowed text-secondary',
};
```

- [ ] **Step 2: Single-stroke hatch in `src/index.css`**

The design renders a held seat as one diagonal stroke clipped to the seat, not a stripe field. Replace the existing `seat-hatch` body. Percentage stops keep the stroke proportional, so the 52px seat and the 16px legend swatch both read correctly.

```css
@utility seat-hatch {
  background-color: var(--color-card);
  background-image: linear-gradient(
    127.44deg,
    transparent calc(50% - 0.09375rem),
    var(--color-raised) calc(50% - 0.09375rem) calc(50% + 0.09375rem),
    transparent calc(50% + 0.09375rem)
  );
}
```

- [ ] **Step 3: `SeatLegend.jsx`**

```jsx
import { cn } from '@/helpers';

const LEGEND_ITEMS = [
  { label: 'Available', className: 'border border-disabled bg-card' },
  { label: 'Selected', className: 'bg-red' },
  { label: 'Sold', className: 'bg-card' },
  { label: 'Held by another user', className: 'seat-hatch' },
];

const SeatLegend = () => {
  return (
    <ul className="flex items-center justify-center gap-6">
      {LEGEND_ITEMS.map(({ label, className }) => (
        <li
          key={label}
          className="flex items-center gap-2 text-xs leading-body text-secondary"
        >
          <span
            aria-hidden="true"
            className={cn('size-4 rounded-[0.3125rem]', className)}
          />
          {label}
        </li>
      ))}
    </ul>
  );
};

export default SeatLegend;
```

- [ ] **Step 4: Check**

Seats sit on a subtle drop shadow, row letters are white and semibold, the legend is roomier with 16px swatches, and a held seat shows one clean diagonal rather than a stripe field — in both the map and the legend.

- [ ] **Step 5: `npm run lint`**

---

### Task 3: Booking tabs and header

| Element | Design | Current |
|---|---|---|
| Tab track background | `bg/card` #1e2031 | `bg-raised` #2a2c3d |
| Gap between pills | 8px | 0 |
| Header title -> subtitle gap | 8px | 4px |

The track measured `rgb(42, 44, 61)` on the live page — a genuine token mix-up, not rounding.

**Files:** `src/pages/Seats/components/{BookingTabs.jsx,BookingHeader.jsx}`

- [ ] **Step 1: `BookingTabs.jsx`**

```jsx
import { cn } from '@/helpers';

const TAB_CLASSES =
  'flex-1 rounded-full px-4 py-2.5 text-center text-xs font-semibold text-primary';

const BookingTabs = () => {
  return (
    <div className="flex w-full items-center gap-2 rounded-full bg-card">
      <span aria-current="step" className={cn(TAB_CLASSES, 'bg-red')}>
        SEATS
      </span>

      <span className={TAB_CLASSES}>CHECKOUT</span>
    </div>
  );
};

export default BookingTabs;
```

- [ ] **Step 2: `BookingHeader.jsx`**

```jsx
const BookingHeader = ({ title, summary }) => {
  return (
    <header className="flex flex-col gap-2">
      <h1 className="text-xl font-extrabold uppercase">{title}</h1>
      <p className="text-xs leading-body text-secondary">{summary}</p>
    </header>
  );
};

export default BookingHeader;
```

**Out of scope, do not add:** the design's `SEATS HELD 7:48` badge at the header's top right. `GET /sessions/:id/seats` returns only `sessionId`, `hall`, `sections` — there is no hold-expiry field to count down from, so it needs a data source and is functional work.

- [ ] **Step 3: Check**

The tab track is the darker card blue with a visible gap between the two pills, and the header subtitle sits slightly lower.

- [ ] **Step 4: `npm run lint`**

---

### Task 4: Summary column spacing and type

Every gap in the right-hand column is too wide and the seat code is two steps too heavy.

| Element | Design | Current |
|---|---|---|
| Summary column gap | 12px | 20px |
| Seat card list gap | 12px | 20px |
| Card inner gap | 12px | 6px |
| Seat code type | 12px semibold | 14px extrabold |
| "Seat" -> code, price -> icon gap | 12px | 8px |
| Remove icon | 16px | 12px |
| Ticket pill text | regular, white | semibold, `text-secondary` |
| Subtotal row / block | `px-[5px]` / `pt-[10px]` | neither |

**Files:** `src/pages/Seats/components/SeatSummary/{SeatSummary.jsx,SelectedSeatCard.jsx,TicketTypeOptions.jsx}`

- [ ] **Step 1: `SeatSummary.jsx`** — section `gap-3`, list `gap-3`, subtotal block `pt-2.5`, subtotal row `px-1.25`

```jsx
<section aria-label="Your seats" className="flex min-w-0 flex-1 flex-col gap-3">
  <h2 className="text-sm font-extrabold">Your seats · Max {maxSeats}</h2>

  {/* empty-state paragraph unchanged */}

  <ul className="flex flex-col gap-3">
    {/* SelectedSeatCard map unchanged */}
  </ul>

  {/* holdError paragraph unchanged */}

  <div className="mt-auto flex flex-col gap-3 pt-2.5">
    <div className="flex items-center justify-between gap-4 px-1.25">
      <span className="text-xs font-semibold tracking-overline uppercase">
        Subtotal
      </span>

      <span className="text-2xl font-extrabold">₾ {subtotal}</span>
    </div>

    {/* Button unchanged */}
  </div>
</section>
```

- [ ] **Step 2: `SelectedSeatCard.jsx`**

`gap-3` on the row gives both the "Seat"->code and price->icon spacing at once, since `ml-auto` on the price absorbs the slack between them.

```jsx
import { XIcon } from '@/components';
import TicketTypeOptions from './TicketTypeOptions';

const SelectedSeatCard = ({
  seat,
  price,
  ticketTypes,
  onSelectTicketType,
  onRemove,
}) => {
  return (
    <li className="flex flex-col gap-3 rounded-2xl bg-card p-3.75">
      <div className="flex items-center gap-3">
        <span className="text-xs text-secondary">Seat</span>
        <span className="text-xs font-semibold">{seat.code}</span>

        <span className="ml-auto text-xs font-semibold">₾{price}</span>

        <button
          type="button"
          onClick={() => onRemove(seat.seatId)}
          aria-label={`Remove seat ${seat.code}`}
          className="cursor-pointer text-secondary transition-opacity duration-150 ease-out hover:opacity-80"
        >
          <XIcon className="size-4" />
        </button>
      </div>

      <span aria-hidden="true" className="h-px w-full bg-raised" />

      <TicketTypeOptions
        ticketTypes={ticketTypes}
        ticketType={seat.ticketType}
        onSelect={(ticketType) => onSelectTicketType(seat.seatId, ticketType)}
      />
    </li>
  );
};

export default SelectedSeatCard;
```

- [ ] **Step 3: `TicketTypeOptions.jsx`**

Both states are white in the design, which makes the old `hover:text-primary` a no-op — drop it rather than leave a dead class.

```jsx
import { cn } from '@/helpers';
import { getTicketTypeLabel } from './helpers';

const TicketTypeOptions = ({ ticketTypes, ticketType, onSelect }) => {
  return (
    <div className="flex items-center gap-2">
      {ticketTypes.map((option) => (
        <button
          key={option.slug}
          type="button"
          onClick={() => onSelect(option.slug)}
          aria-pressed={option.slug === ticketType}
          className={cn(
            'flex-1 cursor-pointer rounded-2xl py-2 text-xs whitespace-nowrap text-primary transition-colors duration-150 ease-out',
            option.slug === ticketType ? 'bg-red' : 'bg-raised'
          )}
        >
          {getTicketTypeLabel(option)}
        </button>
      ))}
    </div>
  );
};

export default TicketTypeOptions;
```

- [ ] **Step 4: Check**

Select two or three seats. The cards sit closer together, the seat code is lighter than the price was before, the remove X is noticeably bigger, and inactive ticket pills read white rather than grey.

- [ ] **Step 5: `npm run lint`**

---

### Task 5: Column divider and panel alignment

The design separates the seat map from the summary with a hairline we do not render at all.

**Files:** `src/pages/Seats/Seats.jsx`

- [ ] **Step 1: Add the divider and `items-center`**

The design draws the divider as a rotated 1px rectangle inside a container-query wrapper — a Figma auto-layout artefact. A `w-px self-stretch` span is the web equivalent; do not reproduce the rotation. Its 30px radius on a 1px bar is just `rounded-full`.

```jsx
<div className="flex justify-center px-12.75 pt-29.5 pb-65">
  <section
    aria-label="Seat selection"
    className="flex w-286.5 flex-col items-center gap-8 rounded-modal border border-raised bg-page p-8 shadow-modal"
  >
    <BookingHeader title={session.movie.title} summary={summary} />

    <div className="flex gap-5">
      <div className="flex w-180 flex-col gap-9">
        <BookingTabs />

        <SeatMap
          sections={sections}
          selectedIds={selectedIds}
          isFull={selectedSeats.length >= maxSeats}
          onToggle={toggleSeat}
        />
      </div>

      <span
        aria-hidden="true"
        className="w-px shrink-0 self-stretch rounded-full bg-card"
      />

      <SeatSummary
        maxSeats={maxSeats}
        selectedSeats={selectedSeats}
        ticketTypes={ticketTypes}
        prices={prices}
        subtotal={subtotal}
        holdError={holdError}
        isHolding={isHolding}
        onSelectTicketType={selectTicketType}
        onRemove={removeSeat}
        onSubmit={holdSelection}
      />
    </div>
  </section>
</div>
```

With the divider in place the row is 720 + 20 + 1 + 20 + 321 = 1082px, exactly the panel's 1146px minus its 2x32px padding — which confirms the summary's natural width is the design's 321px and nothing else needs resizing.

**Do not** add the design's `h-[599px]` or `overflow-clip`. That height assumes its 4-row hall; session 1365 is 8 rows, so pinning it would clip seats. Same for the summary list's `h-[351px]`.

- [ ] **Step 2: Check**

A hairline runs the full height between the seat map and the summary, matching the Figma frame.

- [ ] **Step 3: `npm run lint`**

---

## Deliberate deviations from the design

Recorded so a later reader does not "fix" them:

- **Panel and summary heights stay auto** — see Task 5 Step 1.
- **Seats render at 43 design px on 12-seat halls**, not 52px. 52px cannot fit a 12-seat row in a 720px column — that is what caused the scroll. The Task 1 formula yields exactly 52px for the 10-seat hall the design depicts, so the design is reproduced pixel-perfect for its own case.
- **Section headings** ("Stalls · Rows A-F", `SeatSection.jsx:7`) are not in the design, which shows one flat block of 4 rows. The API genuinely returns named sections, so removing them would drop information. Kept deliberately.
- **`SeatsPlaceholder` keeps `h-149.75`** (599px, the design's panel height) while the real panel is ~833px, so the skeleton is shorter than its content and the page shifts on load. Out of scope; worth a follow-up.
