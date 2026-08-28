/**
 * Project-brief intake for portfolio.vocryn.com.
 *
 *   Browser form  →  POST /api/contact  →  Airtable (record of truth)
 *                                       →  Web3Forms (instant email ping)
 *
 * Runs as a Vercel Serverless Function on the site's own domain, so no
 * credential ever reaches the browser bundle. Same shape as design.vocryn.com's
 * /api/contact and vocryn.com's /api/lead, pointed at its own table.
 *
 * Environment variables (Vercel → Settings → Environment Variables):
 *
 *   AIRTABLE_TOKEN     PAT with data.records:write on the base  (required)
 *   AIRTABLE_BASE_ID   defaults to app3HrnNrE3c8UBbu
 *   AIRTABLE_TABLE     defaults to tblI7KkB0Y0PaMKJI ("Portfolio Leads")
 *   WEB3FORMS_KEY      access key issued to design@vocryn.com   (optional)
 *
 * Delivery contract: this endpoint returns 200 only if the brief actually
 * landed somewhere. If every configured channel fails, or none is configured,
 * it returns an error and the form tells the visitor to email instead. It
 * never reports success for a brief that went nowhere.
 *
 * ESM on purpose — package.json declares "type": "module", so a CommonJS
 * `module.exports` handler would throw at cold start.
 */

const AIRTABLE_API = 'https://api.airtable.com/v0';
const WEB3FORMS_API = 'https://api.web3forms.com/submit';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  let data = req.body;
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data);
    } catch {
      data = {};
    }
  }
  data = data || {};

  // Honeypot — a hidden field no real visitor fills. Accept and drop silently
  // so the bot sees success and does not retry.
  if (data.botcheck) return res.status(200).json({ ok: true });

  const name = String(data.name || '').trim();
  const email = String(data.email || '').trim();
  const message = String(data.message || '').trim();
  const category = String(data.category || '').trim();

  if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res
      .status(400)
      .json({ ok: false, error: 'Name, a valid email and a project overview are required.' });
  }

  const { AIRTABLE_TOKEN, WEB3FORMS_KEY } = process.env;

  /* Be forgiving about what got pasted into the env vars: if either one holds a
     full Airtable URL, pull the app…/tbl… ids out of it. Defaults point at the
     Portfolio Leads table, so only AIRTABLE_TOKEN is strictly required. */
  const rawBase = process.env.AIRTABLE_BASE_ID || 'app3HrnNrE3c8UBbu';
  const rawTable = process.env.AIRTABLE_TABLE || 'tblI7KkB0Y0PaMKJI';
  const AIRTABLE_BASE_ID = ((rawBase + ' ' + rawTable).match(/app[A-Za-z0-9]{10,}/) || [rawBase])[0];
  const AIRTABLE_TABLE = (rawTable.match(/tbl[A-Za-z0-9]{10,}/) || [rawTable])[0];

  const airtableReady = Boolean(AIRTABLE_TOKEN && AIRTABLE_BASE_ID);
  if (!airtableReady && !WEB3FORMS_KEY) {
    console.error('No delivery channel configured — brief NOT delivered', { email });
    return res.status(503).json({ ok: false, error: 'not-configured' });
  }

  /* Only send fields that have a value. Airtable rejects an empty string for
     typed columns like a single select, so an omitted field is safer than a
     blank one. */
  const fields = {
    Name: name,
    Email: email,
    Message: message,
    Source: 'portfolio.vocryn.com',
    Status: 'New',
  };
  if (category) fields.Service = category;

  let stored = false;
  let emailed = false;

  // 1) Airtable — the record you work through stages.
  if (airtableReady) {
    try {
      const r = await fetch(
        `${AIRTABLE_API}/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE)}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${AIRTABLE_TOKEN}`,
            'Content-Type': 'application/json',
          },
          // typecast lets Airtable create select options it has not seen before
          body: JSON.stringify({ records: [{ fields }], typecast: true }),
        }
      );
      if (r.ok) stored = true;
      else console.error('Airtable rejected the record', r.status, await r.text());
    } catch (err) {
      console.error('Airtable request failed', err);
    }
  }

  // 2) Web3Forms — so a human is pinged immediately.
  if (WEB3FORMS_KEY) {
    try {
      const r = await fetch(WEB3FORMS_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `New project brief from ${name} — portfolio.vocryn.com`,
          from_name: 'Sohail Masood portfolio',
          replyto: email,
          Name: name,
          Email: email,
          'Service required': category || '—',
          Message: message,
          Source: 'portfolio.vocryn.com /contact',
          'Saved to Airtable': stored ? 'yes' : 'NO — check the logs',
        }),
      });
      const out = await r.json().catch(() => ({}));
      if (r.ok && out.success !== false) emailed = true;
      else console.error('Web3Forms rejected the submission', r.status, out);
    } catch (err) {
      console.error('Web3Forms request failed', err);
    }
  }

  if (!stored && !emailed) {
    console.error('Every delivery channel failed — brief LOST', { email });
    return res.status(502).json({ ok: false, error: 'upstream' });
  }

  return res.status(200).json({ ok: true, stored, emailed });
}
