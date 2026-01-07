export interface Movie {
  id: string;
  title: string;
  genre: string;
  duration: number;
  language: string;
  rating: number;
}

export interface Theater {
  id: string;
  name: string;
  location: string;
  totalSeats: number;
}

export interface Show {
  id: string;
  movieId: string;
  theaterId: string;
  startTime: string;
  price: number;
  movie?: Movie;
  theater?: Theater;
}

export interface Seat {
  id: string;
  row: string;
  number: number;
  isBooked: boolean;
}

export interface SeatsResponse {
  showId: string;
  totalSeats: number;
  availableCount: number;
  bookedCount: number;
  seats: Seat[];
}

export interface Booking {
  id: string;
  showId: string;
  seatIds: string[];
  userId: string;
  totalAmount: number;
  bookedAt: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    token: string;
    refreshToken: string;
  };
}

