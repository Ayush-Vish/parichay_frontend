import axiosInstance from "@/Helpers/axios/axios.helper";
import { toast } from "@/components/ui/use-toast";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"


const initailState= {} as unknown ;


export const getUserData= createAsyncThunk("/auth/user/getData" , async () =>{
    try {
        const response = await axiosInstance.get("user/getuser");
        toast({
            title : "Success",
            description : response.data.message,
        })
        return (await response)?.data;
    } catch (error : any) {
       toast({
            title : "Error",
            description : error.message,
       })
    }
})



const authSlice = createSlice({
    name:"auth",
    initialState:initailState,
    reducers:{}, 
    extraReducers  :(builder) => {
        builder
            .addCase(getUserData.fulfilled , (state ,action ) => {
                console.log(action.payload);

                state = action.payload;
            })
        
        
    }
})


// export const authActions = authSlice.actions;
export default authSlice.reducer;   