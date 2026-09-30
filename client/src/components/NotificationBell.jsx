import { useEffect, useRef, useState } from "react";
import { useNotifications } from "../context/NotificationContext.jsx";
import NotificationDropdown from "./NotificationDropdown.jsx";

export default function NotificationBell() {
  const { state } = useNotifications();
  const { unreadCount } = state;
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;

    function handleMouseDown(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleMouseDown);
    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, [open]);

  return (
    <div ref={containerRef} style={{ position: "relative" }}>
      <button
        type="button"
        onClick={() => setOpen(current => !current)}
        aria-label={`Notifications${unreadCount > 0 ? `, ${unreadCount} unread` : ""}`}
        aria-expanded={open}
        aria-haspopup="dialog"
        style={{
          position: "relative",
          display: "grid",
          placeItems: "center",
          width: 40,
          height: 40,
          color: "#fff",
          background: "transparent",
          border: 0,
          borderRadius: 6,
          cursor: "pointer",
        }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M10 21h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </button>
      {unreadCount > 0 && (
        <span style={{
          position: "absolute",
          top: 0,
          right: 0,
          minWidth: 17,
          height: 17,
          display: "grid",
          placeItems: "center",
          padding: "0 3px",
          border: "2px solid #1e1b4b",
          borderRadius: 999,
          background: "#e5484d",
          color: "#fff",
          fontSize: 10,
          fontWeight: 700,
          lineHeight: 1,
          boxSizing: "content-box",
        }}>
          {unreadCount > 99 ? "99+" : unreadCount}
        </span>
      )}
      {open && <NotificationDropdown onClose={() => setOpen(false)} />}
    </div>
  );
}
