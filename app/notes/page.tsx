import NotesClient from "./Notes.client";
import { fetchNotes } from "@/lib/api/api";
import type { FetchNotesResponse } from "@/lib/api/api";

export default async function NotesPage() {
  let initialData: FetchNotesResponse;

  try {
    initialData = await fetchNotes({ page: 1, perPage: 12 });
  } catch {
    initialData = {
      notes: [],
      totalPages: 0
    };
  }

  return <NotesClient initialData={initialData} />;
}