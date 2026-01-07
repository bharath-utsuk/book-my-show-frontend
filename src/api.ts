import type { Movie, Show, SeatsResponse, Booking } from './types';

const API_BASE = '/api';

async function fetchJson<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });
  
  if (!res.ok) {
    const error = await res.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(error.error || 'Request failed');
  }
  
  return res.json();
}

export const api = {
  // Movies
  getMovies: () => fetchJson<Movie[]>(`${API_BASE}/movies`),
  getMovie: (id: string) => fetchJson<Movie>(`${API_BASE}/movies/${id}`),

  // Shows
  getShows: (movieId?: string) => {
    const params = movieId ? `?movieId=${movieId}` : '';
    return fetchJson<Show[]>(`${API_BASE}/shows${params}`);
  },
  getShow: (id: string) => fetchJson<Show>(`${API_BASE}/shows/${id}`),

  // Seats
  getSeats: (showId: string) => fetchJson<SeatsResponse>(`${API_BASE}/seats?showId=${showId}`),

  // Bookings
  createBooking: (showId: string, seatIds: string[], userId: string) =>
    fetchJson<Booking>(`${API_BASE}/bookings`, {
      method: 'POST',
      body: JSON.stringify({ showId, seatIds, userId }),
    }),
  getBooking: (id: string) => fetchJson<Booking>(`${API_BASE}/bookings/${id}`),
  getUserBookings: (userId: string) => fetchJson<Booking[]>(`${API_BASE}/bookings?userId=${userId}`),
};

