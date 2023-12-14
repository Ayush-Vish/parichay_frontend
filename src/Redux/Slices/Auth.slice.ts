import axiosInstance from "@/Helpers/axios/axios.helper";
import { toast } from "@/components/ui/use-toast";
import { authInitailState } from "@/types/authTypes";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"


let data = {};
if (typeof localStorage !== 'undefined') {
  const userData = localStorage.getItem("userdata");
  if (userData) {
    try {
      data = JSON.parse(userData);
    } catch (error) {
      console.error("Error parsing user data from localStorage:", error);
    }
  }
}



const initailState= {
    isLoggedIn :localStorage.getItem("isLoggedIn") ||false, 
    data : data,
} as authInitailState ;


export const getUserData= createAsyncThunk("/auth/user/getData" , async () =>{
    try {
        const response = await axiosInstance.get("user/getuser");
        toast({
            title : "Success",
            description : response.data.message,
        })
        return (await response)?.data;
    } catch (error : any) {
        console.log(error.response.data.message);
    }
})



const authSlice = createSlice({
    name:"auth",
    initialState:initailState,
    reducers:{}, 
    extraReducers  :(builder) => {
        builder
            .addCase(getUserData.fulfilled , (state   ,action ) => {
                console.log(action.payload);
                localStorage.setItem("userdata" , JSON.stringify(action?.payload?.data));
                localStorage.setItem("isLoggedIn" , "true");
                state.data = action.payload?.data;
                state.isLoggedIn = true;
            })
            .addCase(getUserData.rejected , (state  : authInitailState,action ) => {
                console.log(action.payload);
                localStorage.removeItem("userdata");
                localStorage.removeItem("isLoggedIn");
                state.data = {};
                state.isLoggedIn = false;
            })
         
        
    }
})


// export const authActions = authSlice.actions;
export default authSlice.reducer;   