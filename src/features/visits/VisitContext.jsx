import { createContext, useContext, useState, useCallback, useEffect } from "react";

const VisitContext = createContext(null);

// Mock logged-in renter — replace with real auth
const MOCK_USER = { id: "u1", name: "Abebe", role: "renter" };

// Simulated owner auto-approval after a delay
const SIMULATE_REVIEW_MS = 4000;

function getStorageKey(userId) {
  return `visit_requests_${userId}`;
}

export function VisitProvider({ children }) {
  const [user] = useState(MOCK_USER);
  const [visits, setVisits] = useState(() => {
    try {
      const stored = localStorage.getItem(getStorageKey(user.id));
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [modalState, setModalState] = useState({
    open: false,
    property: null, // { id, title, image, ownerName }
  });

  // Persist visits
  useEffect(() => {
    localStorage.setItem(getStorageKey(user.id), JSON.stringify(visits));
  }, [visits, user.id]);

  const openScheduleModal = useCallback((property) => {
    setModalState({ open: true, property });
  }, []);

  const closeScheduleModal = useCallback(() => {
    setModalState({ open: false, property: null });
  }, []);

  const submitVisit = useCallback(
    ({ propertyId, propertyTitle, propertyImage, ownerName, date, timeSlot, type, note }) => {
      const visit = {
        id: `visit-${Date.now()}`,
        propertyId,
        propertyTitle,
        propertyImage,
        ownerName,
        date,
        timeSlot,
        type,      // "physical" | "virtual"
        note,
        status: "pending", // "pending" | "approved" | "rejected"
        submittedAt: Date.now(),
        updatedAt: Date.now(),
      };

      setVisits((prev) => [visit, ...prev]);

      // Simulate owner review — randomly approve or reject
      setTimeout(() => {
        const outcome = Math.random() > 0.2 ? "approved" : "rejected";
        setVisits((prev) =>
          prev.map((v) =>
            v.id === visit.id
              ? { ...v, status: outcome, updatedAt: Date.now() }
              : v,
          ),
        );
      }, SIMULATE_REVIEW_MS);

      return visit.id;
    },
    [],
  );

  const cancelVisit = useCallback((visitId) => {
    setVisits((prev) => prev.filter((v) => v.id !== visitId));
  }, []);

  const rescheduleVisit = useCallback((visitId, { date, timeSlot, type }) => {
    setVisits((prev) =>
      prev.map((v) =>
        v.id === visitId
          ? { ...v, date, timeSlot, type, status: "pending", updatedAt: Date.now() }
          : v,
      ),
    );
    // Re-simulate review
    setTimeout(() => {
      const outcome = Math.random() > 0.2 ? "approved" : "rejected";
      setVisits((prev) =>
        prev.map((v) =>
          v.id === visitId
            ? { ...v, status: outcome, updatedAt: Date.now() }
            : v,
        ),
      );
    }, SIMULATE_REVIEW_MS);
  }, []);

  const getVisitForProperty = useCallback(
    (propertyId) => visits.find((v) => v.propertyId === propertyId) ?? null,
    [visits],
  );

  return (
    <VisitContext.Provider
      value={{
        user,
        visits,
        modalState,
        openScheduleModal,
        closeScheduleModal,
        submitVisit,
        cancelVisit,
        rescheduleVisit,
        getVisitForProperty,
      }}
    >
      {children}
    </VisitContext.Provider>
  );
}

export function useVisit() {
  const ctx = useContext(VisitContext);
  if (!ctx) throw new Error("useVisit must be used within a VisitProvider");
  return ctx;
}
