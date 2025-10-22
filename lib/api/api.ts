import axios from 'axios';
import type { Note, NoteTag } from '../../types/note';

export interface FetchNotesParams {
    page?: number;
    perPage?: number;
    search?: string;
}

export interface FetchNotesResponse {
    notes: Note[];
    totalPages: number;
}

export interface CreateNoteData {
    title: string;
    content: string;
    tag: NoteTag;
}

const BASE_URL = 'https://notehub-public.goit.study/api';
const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

function checkToken() {
  if (!TOKEN || TOKEN.trim() === '') {
    throw new Error('Access token is missing or empty. API calls will fail.');
  }
}

export async function fetchNotes(params: FetchNotesParams = {}): Promise<FetchNotesResponse> {
    checkToken();
    const page = params.page ?? 1;
    const perPage = params.perPage ?? 12;
    const queryParams: Record<string, unknown> = {
        page,
        perPage,
    };
    if (params.search) {
        queryParams.search = params.search;
    }

    const response = await axios.get<FetchNotesResponse>(`${BASE_URL}/notes`, {
        headers: {
            Authorization: `Bearer ${TOKEN}`,
        },
        params: queryParams,
    });
    return response.data;
}

export async function createNote(data: CreateNoteData): Promise<Note> {
    checkToken();
    const response = await axios.post<Note>(`${BASE_URL}/notes`, data, {
        headers: {
            Authorization: `Bearer ${TOKEN}`,
        },
    });
    return response.data;
}

export async function deleteNote(id: string): Promise<Note> {
    checkToken();
    const response = await axios.delete<Note>(`${BASE_URL}/notes/${id}`, {
        headers: {
            Authorization: `Bearer ${TOKEN}`,
        },
    });
    return response.data;
}
export async function fetchNoteById(id: string): Promise<Note> {
  checkToken();
  const response = await axios.get<Note>(`${BASE_URL}/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
  return response.data;
}