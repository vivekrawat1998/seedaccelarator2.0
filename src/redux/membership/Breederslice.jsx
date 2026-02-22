import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { breederService } from './Breederservice';

export const submitBreederRequest = createAsyncThunk(
    'breeder/submit',
    async (formData, { rejectWithValue }) => {
        try {
            // ✅ NO data cleaning needed - pass exactly as RegistrationPage sends
            console.log("🌱 Breeder data to API:", formData);
            const response = await breederService.createBreederRequest(formData);
            return response.data;
        } catch (error) {
            console.error("❌ Breeder API error:", error.response?.data);
            return rejectWithValue(error.response?.data);
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
                state.errorMessage = action.payload?.message || 'Submission failed';
            });
    },
});

export const { resetBreederState } = breederSlice.actions;
export default breederSlice.reducer;
