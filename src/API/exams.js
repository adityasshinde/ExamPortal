export const saveExam=async(item)=>{
    const response=await fetch('https://examportal-1-default-rtdb.firebaseio.com/exams.json',{
        method:'POST',
        body:JSON.stringify(item),
        headers:{
            'Content-Type':'application/json'
        }
    });
    if(!response.ok){
        throw new Error();
    };
}
export const fetchAvlExams=async()=>{
    const response=await fetch('https://examportal-1-default-rtdb.firebaseio.com/exams.json');
    if(!response.ok){
        throw new Error();
    };
    const data=await response.json();
    let exams=[];
    for(const i in data){
        exams.push(data[i]);
    }
    return exams;
}