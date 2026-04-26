import { useAuth } from "../AuthContext";

export default function RequireAuthWrapper({ children, fallbackAction }) {
  const { isAuthenticated, openLoginModal } = useAuth();

  const handleClick = (e) => {
    if (!isAuthenticated) {
      e.preventDefault();
      e.stopPropagation();
      openLoginModal();
    } else if (fallbackAction) {
      fallbackAction();
    }
  };

  // We clone the children to inject the onClick handler or wrap them
  // This is a simple version. For complex buttons, might need better logic.
  return <div onClickCapture={handleClick} className="contents">{children}</div>;
}
