import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { breederService } from './Breederservice';

// Async Thunk for form submission
export const submitBreederRequest = createAsyncThunk(
    'breeder/submit',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await breederService.createBreederRequest(formData);
            return response.data;
        } catch (error) {
            // Capture Strapi error message or return default
            return rejectWithValue(error.response?.data?.error?.message || 'Submission failed');
        }
    }
);

const breederSlice = createSlice({
    name: 'breeder',
    initialState: {
        breederData: [],
        isLoading: false,
        isSuccess: false,
        isError: false,
        errorMessage: '',
    },
    reducers: {
        // Reset state flags (useful when navigating away or starting a new form)
        resetBreederState: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.errorMessage = '';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(submitBreederRequest.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(submitBreederRequest.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.breederData.push(action.payload);
            })
            .addCase(submitBreederRequest.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.errorMessage = action.payload;
            });
    },
});

export const { resetBreederState } = breederSlice.actions;
export default breederSlice.reducer;