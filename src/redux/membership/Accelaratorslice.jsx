import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { accelartorService } from './Accelaratorservice';

export const submitAccelartorRequest = createAsyncThunk(
    'accelartor/submit',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await accelartorService.createRequest(formData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.error?.message || 'Something went wrong');
        }
    }
);


const accelartorSlice = createSlice({
    name: 'accelartor',
    initialState: {
        items: [],
        status: 'idle',
        error: null,
    },
    reducers: {
        clearFormState: (state) => {
            state.status = 'idle';
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(submitAccelartorRequest.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(submitAccelartorRequest.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items.push(action.payload);
            })
            .addCase(submitAccelartorRequest.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export const { clearFormState } = accelartorSlice.actions;
export default accelartorSlice.reducer;