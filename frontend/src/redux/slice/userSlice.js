import { createSlice } from "@reduxjs/toolkit";

// STEP 1: Define what the vault looks like when the app FIRST loads.
const initialState = {
  currentUser: null, // Nobody is logged in yet
  error: null,       // No errors have happened yet
  loading: false,    // We aren't waiting on the server right now
};

// STEP 2: Create the Slice (The Reducer + Actions)
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Action 1: User clicks "Submit" on the login form
    signInStart: (state) => {
      state.loading = true; // Tell the app to show a loading spinner
      state.error = null;   // Clear previous errors
    },

    // Action 2: Server returns "Success! Here is the user data"
    signInSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload; // Store the incoming user object
      state.error = null;
    },

    // Action 3: Server returns "Wrong password!"
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload; // Store the error message to display
    },

    // Action 4: User clicks "Logout"
    signOutSuccess: (state) => {
      state.currentUser = null; // Wipe the user data
      state.error = null;
      state.loading = false;
    },
  },
});

// Export the action triggers for your React components to call
export const { signInStart, signInSuccess, signInFailure, signOutSuccess } = userSlice.actions;

// Export the reducer so the main Store can use it
export default userSlice.reducer;