import { createSlice } from "@reduxjs/toolkit"



const initialState={
    basicInfo:undefined,
    Questions:[],
    availableExams:[]
}

const examSlice=createSlice({
    name:'exam',
    initialState,
    reducers:{
       updateBasicInfo:(state,action)=>{
        state.basicInfo=action.payload;
       },
       addQuestion:(state,action)=>{
        state.Questions.push(action.payload);
       },
       resetState:(state)=>{
        state.basicInfo=undefined;
        state.Questions=[];
       },
       setAvailableExam:(state,action)=>{
        state.availableExams=action.payload;
       }
    },
});

export const {updateBasicInfo,setAvailableExam,addQuestion,resetState}=examSlice.actions;
export default examSlice;