# Contact form → Airtable

The "Send Project Brief" form in [`src/components/Contact.jsx`](src/components/Contact.jsx)
POSTs to [`api/contact.js`](api/contact.js), a Vercel Serverless Function that runs on
portfolio.vocryn.com itself. The Airtable token never reaches the browser bundle.

```
Browser form  →  POST /api/contact  →  Airtable   (record of truth)
                                    →  Web3Forms  (instant email ping)
```

Same shape as `design.vocryn.com`'s `/api/contact` and `vocryn.com`'s `/api/lead`,
pointed at its own table in the same base.

## 1. The Airtable table

**Base** `app3HrnNrE3c8UBbu` · **Table** `tblI7KkB0Y0PaMKJI` — "Portfolio Leads"
([open it](https://airtable.com/app3HrnNrE3c8UBbu/tblI7KkB0Y0PaMKJI)). Created
2026-08-28, in the same base as the design.vocryn.com leads.

Columns the handler writes, spelled exactly:

| Column | Type | Notes |
|---|---|---|
| `Name` | Single line text | Primary field |
| `Email` | Email | |
| `Service` | Single select | The dropdown value; omitted when the visitor leaves it blank |
| `Message` | Long text | |
| `Source` | Single line text | Always `portfolio.vocryn.com` |
| `Status` | Single select | Handler always writes `New`; you move it through stages |

A `Created time` column is worth adding but the handler never sends it — Airtable
fills it. Any extra columns are ignored.

`Service` and `Status` are **single** select, not multiple: the handler sends a
plain string for each. `typecast: true` lets Airtable create select options it
has not seen before, so the seven service names do not need pre-seeding.

## 2. Environment variables

Vercel → the portfolio project → Settings → Environment Variables, all three
environments. **Redeploy afterwards** — env vars only apply to new builds.

| Variable | Value | Required? |
|---|---|---|
| `AIRTABLE_TOKEN` | PAT with `data.records:write` on base `app3HrnNrE3c8UBbu` | **Yes** |
| `WEB3FORMS_KEY` | Access key issued to `design@vocryn.com` | No, but recommended |
| `AIRTABLE_BASE_ID` | `app3HrnNrE3c8UBbu` | No — that is the built-in default |
| `AIRTABLE_TABLE` | `tblI7KkB0Y0PaMKJI` | No — that is the built-in default |

So in practice only `AIRTABLE_TOKEN` has to be set. Base and table ids are
hardcoded as defaults in `api/contact.js`; set the env vars only to point the
form somewhere else. Either one also accepts a full pasted Airtable URL — the
handler pulls the `app…` / `tbl…` ids out of it.

A PAT is created at [airtable.com/create/tokens](https://airtable.com/create/tokens):
scope `data.records:write`, access limited to the one base. It does **not** need
schema access now that the table exists.

## 3. Delivery contract

The endpoint returns 200 only if the brief actually landed somewhere.

- Airtable fails but Web3Forms works → 200, and the email carries
  `Saved to Airtable: NO — check the logs`.
- Every channel fails, or none is configured → 502 / 503, and the form tells the
  visitor to email `design@vocryn.com` directly.

It never reports success for a brief that went nowhere. The success panel in the
UI only renders on `{ ok: true }`.

## 4. Testing it

```bash
curl -sS -X POST https://portfolio.vocryn.com/api/contact \
  -H 'Content-Type: application/json' \
  -d '{"name":"Test","email":"test@example.com","category":"AI-Powered Solutions","message":"ignore"}'
# → {"ok":true,"stored":true,"emailed":true}
```

`stored` and `emailed` tell you which channels actually accepted it. A hidden
`botcheck` field in the form is a honeypot: any request carrying a value there
gets a silent 200 and is dropped.

## 5. Note on module format

`package.json` declares `"type": "module"`, so `api/contact.js` uses
`export default`. A CommonJS `module.exports` handler throws at cold start in
this package.
