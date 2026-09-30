import { useMutation } from "@tanstack/react-query";
import { useNotifications } from "../context/NotificationContext.jsx";
import apiClient from "../services/apiClient.js";

export default function NotificationItem({ notification }) {
  const { dispatch } = useNotifications();
  const { mutate: markRead } = useMutation({
    mutationFn: id => apiClient.patch(`/api/notifications/${id}/read`),
    onMutate: id => dispatch({ type: "MARK_READ", payload: id }),
    onError: error => {
      console.error("[NotificationItem] mark-read error:", error);
      apiClient.get("/api/notifications")
        .then(response => dispatch({ type: "LOAD_NOTIFICATIONS", payload: response.data }))
        .catch(fetchError => console.error("[NotificationItem] rollback fetch error:", fetchError));
    },
  });

  const timestamp = notification.createdAt || notification.timestamp;

  return (
    <li style={{ borderBottom: "1px solid #edf0f4" }}>
      <button
        type="button"
        onClick={() => {
          if (!notification.isRead) markRead(notification.id);
        }}
        aria-label={`${notification.isRead ? "Read" : "Unread"}: ${notification.message}`}
        style={{
          display: "flex",
          width: "100%",
          gap: 11,
          alignItems: "flex-start",
          padding: "13px 16px",
          border: 0,
          background: notification.isRead ? "#fff" : "#f1f6ff",
          color: "#172033",
          textAlign: "left",
          cursor: notification.isRead ? "default" : "pointer",
        }}
      >
        <span
          aria-hidden="true"
          style={{
            flex: "0 0 8px",
            width: 8,
            height: 8,
            marginTop: 5,
            borderRadius: "50%",
            background: notification.isRead ? "transparent" : "#2873c8",
          }}
        />
        <span style={{ minWidth: 0, display: "block" }}>
          <span style={{ display: "block", fontSize: 13, lineHeight: 1.45 }}>
            {notification.message}
          </span>
          {timestamp && (
            <time
              dateTime={timestamp}
              style={{ display: "block", marginTop: 4, color: "#778195", fontSize: 11 }}
            >
              {new Date(timestamp).toLocaleString()}
            </time>
          )}
        </span>
      </button>
    </li>
  );
}