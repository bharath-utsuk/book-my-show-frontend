/**
 * Type definitions and type guards for template data validation
 * Ensures that API response data matches the expected structure for each template
 */

/**
 * Interface for expense card template data
 */
export interface ExpenseCardData {
  intent?: string | null;
  parameters: {
    amount: number;
    description?: string;
    category?: string;
    paidBy?: string;
    currency?: string;
    type?: string;
    splitWith?: string[];
    date?: string;
  };
  clarification?: string;
  text?: string;
}

/**
 * Interface for bill split card template data
 */
export interface BillSplitCardData {
  intent?: string | null;
  parameters: {
    totalAmount: number;
    numberOfPeople?: number;
    perPersonAmount?: number;
    billName?: string;
    participants?: string[];
    splits?: Array<{
      name: string;
      amount: number;
      percentage?: number;
    }>;
  };
  clarification?: string;
  text?: string;
}

/**
 * Type guard to check if data is a valid ExpenseCardData
 * Validates both the presence and types of required fields
 */
export function isExpenseCardData(data: any): data is ExpenseCardData {
  if (!data || typeof data !== "object") {
    return false;
  }

  // Check if parameters object exists
  if (!data.parameters || typeof data.parameters !== "object") {
    return false;
  }

  const params = data.parameters;

  // Required fields: amount (number) and description (string)
  if (typeof params.amount !== "number" || !isFinite(params.amount)) {
    return false;
  }

  if (
    typeof params.description !== "string" ||
    params.description.trim() === ""
  ) {
    return false;
  }

  // Optional fields type validation
  if (params.category !== undefined && typeof params.category !== "string") {
    return false;
  }

  if (params.paidBy !== undefined && typeof params.paidBy !== "string") {
    return false;
  }

  if (params.splitWith !== undefined) {
    if (!Array.isArray(params.splitWith)) {
      return false;
    }
    // Validate all elements are strings
    if (!params.splitWith.every((item: any) => typeof item === "string")) {
      return false;
    }
  }

  if (params.date !== undefined && typeof params.date !== "string") {
    return false;
  }

  // Optional top-level fields
  if (
    data.intent !== undefined &&
    data.intent !== null &&
    typeof data.intent !== "string"
  ) {
    return false;
  }

  if (
    data.clarification !== undefined &&
    typeof data.clarification !== "string"
  ) {
    return false;
  }

  if (data.text !== undefined && typeof data.text !== "string") {
    return false;
  }

  return true;
}

export function isAddExpenseCardData(data: any): data is ExpenseCardData {
  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    return false;
  }

  const obj = data as any;

  // parameters must exist
  if (!obj.parameters || typeof obj.parameters !== 'object' || Array.isArray(obj.parameters)) {
    return false;
  }

  const params = obj.parameters;

  // required field
  if (typeof params.amount !== 'number' || !isFinite(params.amount)) {
    return false;
  }

  // optional fields → validate ONLY if present
  if (
    params.description !== undefined &&
    (typeof params.description !== 'string' || params.description.trim() === '')
  ) {
    return false;
  }

  if (params.category !== undefined && typeof params.category !== 'string') {
    return false;
  }

  if (params.paidBy !== undefined && typeof params.paidBy !== 'string') {
    return false;
  }

  if (
    params.splitWith !== undefined &&
    (!Array.isArray(params.splitWith) ||
      !params.splitWith.every((item: unknown) => typeof item === 'string'))
  ) {
    return false;
  }

  if (params.date !== undefined && typeof params.date !== 'string') {
    return false;
  }

  // top-level optional fields
  if (obj.intent !== undefined && obj.intent !== null && typeof obj.intent !== 'string') {
    return false;
  }

  if (obj.clarification !== undefined && typeof obj.clarification !== 'string') {
    return false;
  }

  if (obj.text !== undefined && typeof obj.text !== 'string') {
    return false;
  }

  return true;
}


/**
 * Type guard to check if data is a valid BillSplitCardData
 * Validates both the presence and types of required fields
 */
export function isBillSplitCardData(data: any): data is BillSplitCardData {
  if (!data || typeof data !== "object") {
    return false;
  }

  // Check if parameters object exists
  if (!data.parameters || typeof data.parameters !== "object") {
    return false;
  }

  const params = data.parameters;

  // Required field: totalAmount (number)
  if (typeof params.totalAmount !== "number" || !isFinite(params.totalAmount)) {
    return false;
  }

  // At least one of these should be present for a valid bill split
  const hasNumberOfPeople = params.numberOfPeople !== undefined;
  const hasSplits = params.splits !== undefined;

  if (!hasNumberOfPeople && !hasSplits) {
    return false;
  }

  // Optional fields type validation
  if (params.numberOfPeople !== undefined) {
    if (
      typeof params.numberOfPeople !== "number" ||
      !Number.isInteger(params.numberOfPeople) ||
      params.numberOfPeople <= 0
    ) {
      return false;
    }
  }

  if (params.perPersonAmount !== undefined) {
    if (
      typeof params.perPersonAmount !== "number" ||
      !isFinite(params.perPersonAmount)
    ) {
      return false;
    }
  }

  if (params.billName !== undefined && typeof params.billName !== "string") {
    return false;
  }

  if (params.participants !== undefined) {
    if (!Array.isArray(params.participants)) {
      return false;
    }
    // Validate all elements are strings
    if (!params.participants.every((item: any) => typeof item === "string")) {
      return false;
    }
  }

  if (params.splits !== undefined) {
    if (!Array.isArray(params.splits)) {
      return false;
    }
    // Validate each split object
    for (const split of params.splits) {
      if (!split || typeof split !== "object") {
        return false;
      }
      // Required fields in split
      if (typeof split.name !== "string" || split.name.trim() === "") {
        return false;
      }
      if (typeof split.amount !== "number" || !isFinite(split.amount)) {
        return false;
      }
      // Optional percentage field
      if (split.percentage !== undefined) {
        if (
          typeof split.percentage !== "number" ||
          !isFinite(split.percentage)
        ) {
          return false;
        }
      }
    }
  }

  // Optional top-level fields
  if (
    data.intent !== undefined &&
    data.intent !== null &&
    typeof data.intent !== "string"
  ) {
    return false;
  }

  if (
    data.clarification !== undefined &&
    typeof data.clarification !== "string"
  ) {
    return false;
  }

  if (data.text !== undefined && typeof data.text !== "string") {
    return false;
  }

  return true;
}

/**
 * Helper function to check if intent matches expense-related intents
 */
export function isExpenseIntent(intent: string | null | undefined): boolean {
  if (!intent || typeof intent !== "string") {
    return false;
  }

  const expenseIntents = [
    "show_expense",
    "add_expense",
    "create_expense",
    "record_expense",
    "log_expense",
  ];

  return expenseIntents.includes(intent.toLowerCase());
}

/**
 * Helper function to check if intent matches bill-splitting related intents
 */
export function isBillSplitIntent(intent: string | null | undefined): boolean {
  if (!intent || typeof intent !== "string") {
    return false;
  }

  const billSplitIntents = [
    "split_bill",
    "calculate_split",
    "show_split",
    "divide_bill",
    "split_expense",
  ];

  return billSplitIntents.includes(intent.toLowerCase());
}

/**
 * Interface for profile card template data
 * The user data is nested inside parameters object
 */
export interface ProfileCardData {
  // session?: {
  //   token: string;
  //   userId?: string;
  // };
  conversationId?: string;
  text?: string;
  intent?: string | null;
  parameters: {
    user: {
      id: string;
      email: string;
      profile: Array<{
        fullName: string;
        contactDetails?: string;
        address?: {
          city?: string;
          line1?: string;
          state?: string;
          country?: string;
          pincode?: string;
        };
        phone?: string;
        gender?: string;
      }>;
      createdAt?: string;
      updatedAt?: string;
      authTokens?: Array<{
        id: string;
        status: string;
        createdAt: string;
        expiresAt: string;
      }>;
    };
  };
  clarification?: string;
}

/**
 * Type guard to check if data is a valid ProfileCardData
 * Validates both the presence and types of required fields
 * The user data is nested inside parameters.user
 */
// export function isProfileCardData(data: any): data is ProfileCardData {
//   if (!data || typeof data !== 'object') {
//     return false;
//   }

//   // Check if parameters object exists
//   if (!data.parameters || typeof data.parameters !== 'object') {
//     return false;
//   }

//   // Check if user object exists inside parameters
//   if (!data.parameters.user || typeof data.parameters.user !== 'object') {
//     return false;
//   }

//   const user = data.parameters.user;

//   // Required fields in user
//   if (typeof user.id !== 'string' || user.id.trim() === '') {
//     return false;
//   }

//   if (typeof user.email !== 'string' || user.email.trim() === '') {
//     return false;
//   }

//   // Profile array is required and must have at least one profile
//   if (!Array.isArray(user.profile) || user.profile.length === 0) {
//     return false;
//   }

//   // Validate the first profile object (at minimum)
//   const profile = user.profile[0];
//   if (!profile || typeof profile !== 'object') {
//     return false;
//   }

//   // Required field in profile
//   if (typeof profile.fullName !== 'string' || profile.fullName.trim() === '') {
//     return false;
//   }

//   // Optional fields validation
//   if (profile.contactDetails !== undefined && typeof profile.contactDetails !== 'string') {
//     return false;
//   }

//   if (profile.phone !== undefined && typeof profile.phone !== 'string') {
//     return false;
//   }

//   if (profile.gender !== undefined && typeof profile.gender !== 'string') {
//     return false;
//   }

//   // Validate address if present
//   if (profile.address !== undefined) {
//     if (typeof profile.address !== 'object') {
//       return false;
//     }
//     const addr = profile.address;
//     if (addr.city !== undefined && typeof addr.city !== 'string') {
//       return false;
//     }
//     if (addr.line1 !== undefined && typeof addr.line1 !== 'string') {
//       return false;
//     }
//     if (addr.state !== undefined && typeof addr.state !== 'string') {
//       return false;
//     }
//     if (addr.country !== undefined && typeof addr.country !== 'string') {
//       return false;
//     }
//     if (addr.pincode !== undefined && typeof addr.pincode !== 'string') {
//       return false;
//     }
//   }

//   // Validate auth tokens array if present
//   if (user.authTokens !== undefined) {
//     if (!Array.isArray(user.authTokens)) {
//       return false;
//     }
//     // Validate each token
//     for (const token of user.authTokens) {
//       if (!token || typeof token !== 'object') {
//         return false;
//       }
//       if (typeof token.id !== 'string' || typeof token.status !== 'string') {
//         return false;
//       }
//     }
//   }

//   // Optional top-level fields
//   if (data.session !== undefined) {
//     if (typeof data.session !== 'object') {
//       return false;
//     }
//     if (typeof data.session.token !== 'string') {
//       return false;
//     }
//   }

//   if (data.conversationId !== undefined && typeof data.conversationId !== 'string') {
//     return false;
//   }

//   if (data.intent !== undefined && data.intent !== null && typeof data.intent !== 'string') {
//     return false;
//   }

//   if (data.clarification !== undefined && typeof data.clarification !== 'string') {
//     return false;
//   }

//   if (data.text !== undefined && typeof data.text !== 'string') {
//     return false;
//   }

//   return true;
// }

export function isProfileCardData(data: any): data is ProfileCardData {
  if (!data || typeof data !== "object") {
    return false;
  }

  // Check if parameters object exists
  if (!data.parameters || typeof data.parameters !== "object") {
    return false;
  }

  const user = data.parameters;

  // Profile array is required and must have at least one profile
  if (!Array.isArray(user.profile) || user.profile.length === 0) {
    return false;
  }

  // Validate the first profile object (at minimum)
  const profile = user.profile[0];
  if (!profile || typeof profile !== "object") {
    return false;
  }

  if (typeof profile.id !== "string" || profile.id.trim() === "") {
    return false;
  }

  if (typeof profile.userId !== "string" || profile.userId.trim() === "") {
    return false;
  }

  // Required field in profile
  if (
    profile.fullName !== undefined &&
    (typeof profile.fullName !== "string" || profile.fullName.trim() === "")
  ) {
    return false;
  }

  // Optional fields validation
  // if (profile.contactDetails !== undefined && typeof profile.contactDetails !== 'string') {
  //   return false;
  // }

  if (profile.phone !== undefined && typeof profile.phone !== "string") {
    return false;
  }

  if (profile.gender !== undefined && typeof profile.gender !== "string") {
    return false;
  }

  if (profile.address !== undefined && typeof profile.address !== "string") {
    return false;
  }

  if (profile.bio !== undefined && typeof profile.bio !== "string") {
    return false;
  }

  if (profile.age !== undefined && typeof profile.age !== "number") {
    return false;
  }

  if (
    data.conversationId !== undefined &&
    typeof data.conversationId !== "string"
  ) {
    return false;
  }

  if (
    data.intent !== undefined &&
    data.intent !== null &&
    typeof data.intent !== "string"
  ) {
    return false;
  }

  if (
    data.clarification !== undefined &&
    typeof data.clarification !== "string"
  ) {
    return false;
  }

  if (data.text !== undefined && typeof data.text !== "string") {
    return false;
  }

  return true;
}

/**
 * Helper function to check if intent matches profile-related intents
 */
export function isProfileIntent(intent: string | null | undefined): boolean {
  if (!intent || typeof intent !== "string") {
    return false;
  }

  const profileIntents = [
    "show_profile",
    "get_profile",
    "view_profile",
    "my_profile",
    "user_profile",
    "profile_details",
  ];

  return profileIntents.includes(intent.toLowerCase());
}

/**
 * Interface for spend summary card template data
 */
export interface SpendSummaryCardData {
  intent?: string | null;
  parameters: {
    start_date?: string;
    end_date?: string;
    total_spend: number;
    categories?: Array<{
      category: string;
      spend: number;
    }>;
  };
  clarification?: string;
  text?: string;
}

/**
 * Type guard to check if data is a valid SpendSummaryCardData
 * Validates both the presence and types of required fields
 */
export function isSpendSummaryCardData(data: any): data is SpendSummaryCardData {
  if (!data || typeof data !== "object") {
    return false;
  }

  // Check if parameters object exists
  if (!data.parameters || typeof data.parameters !== "object") {
    return false;
  }

  const params = data.parameters;

  // Required field: total_spend (number)
  if (typeof params.total_spend !== "number" || !isFinite(params.total_spend)) {
    return false;
  }

  // Optional fields type validation
  if (params.start_date !== undefined && typeof params.start_date !== "string") {
    return false;
  }

  if (params.end_date !== undefined && typeof params.end_date !== "string") {
    return false;
  }

  // Validate categories array if present
  if (params.categories !== undefined) {
    if (!Array.isArray(params.categories)) {
      return false;
    }
    // Validate each category object
    for (const cat of params.categories) {
      if (!cat || typeof cat !== "object") {
        return false;
      }
      if (typeof cat.category !== "string" || cat.category.trim() === "") {
        return false;
      }
      if (typeof cat.spend !== "number" || !isFinite(cat.spend)) {
        return false;
      }
    }
  }

  // Optional top-level fields
  if (
    data.intent !== undefined &&
    data.intent !== null &&
    typeof data.intent !== "string"
  ) {
    return false;
  }

  if (
    data.clarification !== undefined &&
    typeof data.clarification !== "string"
  ) {
    return false;
  }

  if (data.text !== undefined && typeof data.text !== "string") {
    return false;
  }

  return true;
}

/**
 * Helper function to check if intent matches spend summary related intents
 */
export function isSpendSummaryIntent(intent: string | null | undefined): boolean {
  if (!intent || typeof intent !== "string") {
    return false;
  }

  const spendSummaryIntents = [
    "spend_summary",
    "spending_summary",
    "show_spending",
    "view_spending",
    "expense_summary",
    "spending_report",
  ];

  return spendSummaryIntents.includes(intent.toLowerCase());
}

/**
 * Interface for movie shows card template data
 */
export interface MovieShowsCardData {
  intent?: string | null;
  parameters: {
    movieId?: string;
    data: Array<{
      id: string;
      movieId: string;
      theaterId: string;
      startTime: string;
      price: number;
      movie?: {
        id: string;
        title: string;
        genre: string;
        duration: number;
        language: string;
        rating: number;
      };
      theater?: {
        id: string;
        name: string;
        location: string;
        totalSeats: number;
      };
    }>;
  };
  clarification?: string;
  text?: string;
}

/**
 * Type guard to check if data is a valid MovieShowsCardData
 */
export function isMovieShowsCardData(data: any): data is MovieShowsCardData {
  console.log('isMovieShowsCardData', data);
  if (!data || typeof data !== "object") {
    return false;
  }

  // Check if parameters object exists
  if (!data.parameters || typeof data.parameters !== "object") {
    return false;
  }

  const params = data.parameters;

  // Required field: data array with shows
  if (!Array.isArray(params.data) || params.data.length === 0) {
    return false;
  }

  // Validate each show object
  for (const show of params.data) {
    if (!show || typeof show !== "object") {
      return false;
    }

    // Required fields in show
    if (typeof show.id !== "string" || show.id.trim() === "") {
      return false;
    }

    if (typeof show.movieId !== "string" || show.movieId.trim() === "") {
      return false;
    }

    if (typeof show.theaterId !== "string" || show.theaterId.trim() === "") {
      return false;
    }

    if (typeof show.startTime !== "string" || show.startTime.trim() === "") {
      return false;
    }

    if (typeof show.price !== "number" || !isFinite(show.price)) {
      return false;
    }

    // Validate movie object if present
    if (show.movie !== undefined) {
      if (typeof show.movie !== "object") {
        return false;
      }
      const movie = show.movie;
      if (typeof movie.id !== "string" || typeof movie.title !== "string") {
        return false;
      }
    }

    // Validate theater object if present
    if (show.theater !== undefined) {
      if (typeof show.theater !== "object") {
        return false;
      }
      const theater = show.theater;
      if (typeof theater.id !== "string" || typeof theater.name !== "string") {
        return false;
      }
    }
  }

  // Optional top-level fields
  // if (
  //   data.intent !== undefined // &&
  //   // data.intent !== null &&
  //   // typeof data.intent !== "string"
  // ) {
  //   return false;
  // }

  // if (
  //   data.clarification !== undefined &&
  //   typeof data.clarification !== "string"
  // ) {
  //   return false;
  // }

  // if (data.text !== undefined && typeof data.text !== "string") {
  //   return false;
  // }

  return true;
}

/**
 * Helper function to check if intent matches movie shows related intents
 */
export function isMovieShowsIntent(intent: string | null | undefined): boolean {
  if (!intent || typeof intent !== "string") {
    return false;
  }

  const movieShowsIntents = [
    "list_shows",
    "show_times",
    "movie_shows",
    "available_shows",
    "get_shows",
    "view_shows",
  ];

  return movieShowsIntents.includes(intent.toLowerCase());
}

/**
 * Interface for movies list card template data
 */
export interface MoviesListCardData {
  intent?: string | null;
  parameters: {
    data: Array<{
      id: string;
      title: string;
      genre: string;
      duration: number;
      language: string;
      rating: number;
    }>;
  };
  clarification?: string;
  text?: string;
}

/**
 * Type guard to check if data is a valid MoviesListCardData
 */
export function isMoviesListCardData(data: any): data is MoviesListCardData {
  if (!data || typeof data !== "object") {
    return false;
  }

  // Check if parameters object exists
  if (!data.parameters || typeof data.parameters !== "object") {
    return false;
  }

  const params = data.parameters;

  // Required field: data array with movies
  if (!Array.isArray(params.data) || params.data.length === 0) {
    return false;
  }

  // Validate each movie object
  for (const movie of params.data) {
    if (!movie || typeof movie !== "object") {
      return false;
    }

    // Required fields in movie
    if (typeof movie.id !== "string" || movie.id.trim() === "") {
      return false;
    }

    if (typeof movie.title !== "string" || movie.title.trim() === "") {
      return false;
    }

    if (typeof movie.genre !== "string" || movie.genre.trim() === "") {
      return false;
    }

    if (typeof movie.duration !== "number" || !isFinite(movie.duration)) {
      return false;
    }

    if (typeof movie.language !== "string" || movie.language.trim() === "") {
      return false;
    }

    if (typeof movie.rating !== "number" || !isFinite(movie.rating)) {
      return false;
    }
  }

  return true;
}

/**
 * Helper function to check if intent matches movies list related intents
 */
export function isMoviesListIntent(intent: string | null | undefined): boolean {
  if (!intent || typeof intent !== "string") {
    return false;
  }

  const moviesListIntents = [
    "list_movies",
    "show_movies",
    "get_movies",
    "available_movies",
    "view_movies",
    "all_movies",
  ];

  return moviesListIntents.includes(intent.toLowerCase());
}
