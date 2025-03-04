export type EventType = "Conference" | "Meetup" | "Workshop";

export interface Event {
  id: number;
  name: string;
  date: string;
  location: string;
  type: EventType;
}

export interface EventTemplate {
  id: number | null;
  eventId: number | null;
  arrangementId: number | null;
  section: "PERSONAL" | "CEREMONY" | "RECEPTION" | "SUGGESTION";
  slotNo: number;
  slotName: string;
  defaultArrangementType: number;
  event?: any | null;
  arrangement?: any | null;
  quantity?: number | null;
}
