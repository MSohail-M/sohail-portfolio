import { useEffect, useRef } from 'react';

/**
 * LeadConnector (GoHighLevel) booking widget.
 *
 * The iframe ships with no height — form_embed.js measures the widget and
 * resizes it over postMessage. So we reserve a min-height up front, otherwise
 * the page jumps the moment the script lands.
 */
const CALENDAR_ID = 'SlGjkzvr6XcOUNXNdMxz';
const EMBED_SCRIPT = 'https://link.msgsndr.com/js/form_embed.js';

export const BookingEmbed = () => {
  const loaded = useRef(false);

  useEffect(() => {
    if (loaded.current) return;
    loaded.current = true;

    // The script is idempotent-ish but re-adding it duplicates listeners, so
    // only ever inject it once per document.
    if (document.querySelector(`script[src="${EMBED_SCRIPT}"]`)) return;

    const s = document.createElement('script');
    s.src = EMBED_SCRIPT;
    s.type = 'text/javascript';
    s.async = true;
    document.body.appendChild(s);
  }, []);

  return (
    <iframe
      src={`https://api.leadconnectorhq.com/widget/booking/${CALENDAR_ID}`}
      allow="payment"
      scrolling="no"
      id={`${CALENDAR_ID}_booking`}
      title="Book a call with Sohail Masood"
      /* height, not minHeight: form_embed.js writes style.height directly, and
         a minHeight would fight it and leave a gap. This value is only the
         pre-script reservation, so nothing shifts while it loads. */
      style={{
        width: '100%',
        height: '760px',
        border: 'none',
        overflow: 'hidden',
        display: 'block',
        colorScheme: 'light',
        borderRadius: '16px',
        background: '#ffffff',
      }}
    />
  );
};
