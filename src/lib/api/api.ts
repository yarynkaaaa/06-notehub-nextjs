import axios from "axios";
import type { Note, NoteTag } from "@/types/note"; // Залежно від вашого шляху до типів, тут може бути і відносний шлях ../../types/note

const BASE_URL = "https://notehub-public.goit.study/api";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    // Змінили import.meta.env на process.env для Next.js
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
  },
});

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
}

export interface FetchNotesResponse {
  items: Note[];
  total: number;
  totalPages: number;
}

export interface CreateNoteParams {
  title: string;
  content: string;
  tag: NoteTag;
}

interface ApiNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  params: FetchNotesParams = {}
): Promise<FetchNotesResponse> => {
  const { page = 1, perPage = 12, search = "" } = params;

  const response = await api.get<ApiNotesResponse>("/notes", {
    params: { page, perPage, ...(search && { search }) },
  });

  const items: Note[] = response.data.notes || [];
  const totalPages: number = response.data.totalPages ?? 1;
  const total: number = totalPages * perPage;

  return {
    items,
    total,
    totalPages,
  };
};

export const createNote = async (noteData: CreateNoteParams): Promise<Note> => {
  const response = await api.post<Note>("/notes", noteData);
  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response = await api.delete<Note>(`/notes/${id}`);
  return response.data;
};