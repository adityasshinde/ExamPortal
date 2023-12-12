import { createSlice } from "@reduxjs/toolkit";



const initialState={
    user:undefined,
    exam:undefined,
    attempted:[],
    score:0,
    remainingTime:{
        min:0,
        sec:0
    }
}

const testSlice=createSlice({
    name:'test',
    initialState,
    reducers:{
        addResponse:(state,action)=>{
          state.attempted.push(action.payload);
        },
        setUser:(state,action)=>{
            state.user=action.payload;
        },
        setScore:(state,action)=>{
            state.score=action.payload;
        },
        flushTest:(state)=>{
            state.attempted=[];
            state.exam=undefined;
            state.remainingTime.min=0;
            state.remainingTime.sec=0;
        },
        setExam:(state,action)=>{
            state.exam=action.payload;
            state.remainingTime.min=action.payload.basicInfo.totalTime;
            state.remainingTime.sec=0;
        },
        setTimer:(state)=>{
            if(state.remainingTime.sec===0){
                state.remainingTime.min-=1;
                state.remainingTime.sec=59;
            }else{
                state.remainingTime.sec-=1;;
            }
        }
    },
});

export const {addResponse,setScore,flushTest,setUser,setTimer,setExam}=testSlice.actions;
export default testSlice.reducer;