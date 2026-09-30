import { useNotifications } from "../context/NotificationContext.jsx";
import NotificationItem from "./NotificationItem.jsx";

export default function NotificationDropdown() {
  const { state, dispatch } = useNotifications();
  const { notifications, unreadCount } = state;

  return (
    <section
      role="dialog"
      aria-label="Notifications"
      style={{
        position: "absolute",
        top: "calc(100% + 10px)",
        right: 0,
        zIndex: 20,
        width: 360,
        maxWidth: "calc(100vw - 2rem)",
        overflow: "hidden",
        border: "1px solid #d8dee8",
        borderRadius: 8,
        background: "#fff",
        color: "#172033",
        boxShadow: "0 16px 40px rgba(15, 23, 42, 0.2)",
      }}
    >
      <header style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
        padding: "14px 16px",
        borderBottom: "1px solid #e8ebf0",
      }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 15, fontWeight: 700 }}>Notifications</h2>
          <p style={{ margin: "3px 0 0", color: "#687386", fontSize: 12 }}>
            {unreadCount} unread
          </p>
        </div>
        <button
          type="button"
          onClick={() => dispatch({ type: "MARK_ALL_READ" })}
          disabled={unreadCount === 0}
          style={{
            padding: "6px 8px",
            border: 0,
            borderRadius: 4,
            background: "transparent",
            color: unreadCount === 0 ? "#9aa3b2" : "#2457a7",
            fontSize: 12,
            fontWeight: 600,
            cursor: unreadCount === 0 ? "default" : "pointer",
          }}
        >
          Mark all as read
        </button>
      </header>
      {notifications.length === 0 ? (
        <p style={{ margin: 0, padding: "28px 16px", color: "#687386", textAlign: "center", fontSize: 13 }}>
          You are all caught up.
        </p>
      ) : (
        <ul style={{ maxHeight: 380, overflowY: "auto", margin: 0, padding: 0, listStyle: "none" }}>
          {notifications.map(notification => (
            <NotificationItem key={notification.id} notification={notification} />
          ))}
        </ul>
      )}
    </section>
  );
}