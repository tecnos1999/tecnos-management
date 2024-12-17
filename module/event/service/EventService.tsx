import ApiServer from "@/module/system/service/ApiServer";
import EventDTO from "../dto/EventDTO";

class EventService extends ApiServer {
  // Add Event
addEvent = async (
  eventDTO: EventDTO,
  image: File | null,
  token: string
): Promise<string> => {
  const formData = new FormData();

  formData.append(
    "event",
    new Blob([JSON.stringify(eventDTO)], { type: "application/json" })
  );

  if (image) {
    formData.append("image", image);
  }

  const response = await this.api<FormData, string>(
    `/events/create`,
    "POST",
    formData,
    token
  );

  if (response.status === 201) {
    const data = await response.text();
    return data;
  } else {
    const errorData = await response.json();
    return Promise.reject(errorData.message || "Failed to add event");
  }
};


  // Update Event
updateEvent = async (
  eventDTO: EventDTO,
  image: File | null,
  token: string
): Promise<string> => {
  const formData = new FormData();

 
  formData.append(
    "event",
    new Blob([JSON.stringify(eventDTO)], { type: "application/json" })
  );

  if (image) {
    formData.append("image", image);
  }

  const response = await this.api<FormData, string>(
    `/events/update`,
    "PUT",
    formData,
    token
  );

  if (response.status === 200) {
    const data = await response.text();
    return data; 
  } else {
    const errorData = await response.json();
    return Promise.reject(
      errorData.message || "Failed to update event"
    );
  }
};


  // Delete Event
  deleteEvent = async (eventCode: string, token: string): Promise<string> => {
    const response = await this.api<null, any>(
      `/events/delete/${eventCode}`,
      "DELETE",
      null,
      token
    );
    if (response.status === 200) {
      const data = await response.text();
      return data; 
    } else {
      const errorData = await response.json();
      return Promise.reject(
        errorData.message || "Failed to delete event"
      );
    }
  };

  getEventByCode = async (eventCode: string): Promise<EventDTO> => {
    const response = await this.api<null, any>(
      `/events/${eventCode}`,
      "GET",
      null,
      ""
    );
    if (response.status === 200) {
      const data = await response.json();
      return data as EventDTO;
    } else {
      const errorData = await response.json();
      return Promise.reject(
        errorData.message || "Failed to fetch event"
      );
    }
  };

  getAllEvents = async (): Promise<EventDTO[]> => {
    const response = await this.api<null, any>(
      `/events`,
      "GET",
      null,
      ""
    );
    if (response.status === 200) {
      const data = await response.json();
      return data as EventDTO[];
    } else {
      const errorData = await response.json();
      return Promise.reject(
        errorData.message || "Failed to fetch events"
      );
    }
  };
}

export default EventService;
