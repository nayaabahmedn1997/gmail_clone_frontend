import {createSlice, createAsyncThunk, isRejectedWithValue} from 
'@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosInstance';
import { generateToast } from '../../utils/generateToast';

//Create and async thunk fir fetching user data

export const fetchUserData = 
createAsyncThunk('user/fetchUserData', async(_,{ rejectWithValue })=>{
    const token = localStorage.getItem('token-url');
        try {
            const response = await axiosInstance.get("/api/users/get-userData",{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            });
             
            return await response.data;
        } catch (error) {
           // Return a detailed error message with rejectWithValue
            return rejectWithValue( error.message);
        }
      
    
  
})


const userSlice = createSlice({
    name:'user',
    initialState:{
        user:[],
        status:'idle', //or 'loading', 'succeeded', 'failed'
        error:null
    },
    reducers:{},
    extraReducers:(builder) =>{
        builder.addCase(fetchUserData.pending, (state)=>{
            state.status= 'loading';
        })
        .addCase(fetchUserData.fulfilled, (state, action)=>{
            state.status  = 'succeeded';
            state.user = action.payload;
        })
        .addCase(fetchUserData.rejected, (state, action)=>{
            state.status = 'failed';
            state.error = action.payload || 'Something went wrong';
        })
    }
});



export default  userSlice.reducer;