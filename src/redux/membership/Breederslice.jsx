// redux/membership/Breederslice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { breederService } from './Breederservice';

export const submitBreederRequest = createAsyncThunk(
    'breeder/submit',
    async (formData, { rejectWithValue }) => {
        try {
            const cleanData = {
                ...formData, // ⭐ KEEP ALL FIELDS (email, Designation, etc)

                Organization: formData.Organization || formData.organization || "",
                phone: parseInt(formData.Mobilenumber || formData.phone),
                Designation: formData.Designation || "",
                email: formData.email || "",
                Declaration: formData.Declaration ?? true,
            };

            console.log("🧹 Clean data for service:", cleanData);
            const response = await breederService.createBreederRequest(cleanData);
            return response.data;
        } catch (error) {
            console.error("❌ Breeder error:", error.response?.data);
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
