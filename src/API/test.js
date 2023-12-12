export const saveResponse=async(item)=>{
      let tm=0,ob=0;
      for(const i of item.Answers){
        for(const j of item.Questions){
           if(j.type=='mcq' && i.statement===j.statement){
               tm+=Number(j.marks);
               if(i.answer===j.options[Number(j.correctAnswer)]){
                ob+=Number(j.marks);
               }
           }else if(j.type=='yes_no' && i.statement===j.statement){
            tm+=Number(j.marks);
            if(i.answer===j.correctAnswer){
             ob+=Number(j.marks);
            }
        }
        }
      }
      console.log(tm," ",ob);
      const objectiveScore=((ob/tm)*100).toFixed(2);
      item={
        ...item,
        objectiveScore
      }
    const response=await fetch('https://examportal-1-default-rtdb.firebaseio.com/responses.json',{
        method:'POST',
        body:JSON.stringify(item),
        headers:{
            'Content-Type':'application/json'
        }
    });
    if(!response.ok){
        throw new Error();
    };
    return Number(objectiveScore);
}
export const fetchResponses=async()=>{
    const response=await fetch('https://examportal-1-default-rtdb.firebaseio.com/responses.json');
    if(!response.ok){
        throw new Error();
    };
    const data=await response.json();
    let test=[];
    for(const i in data){
        test.push(data[i]);
    }
    return test;
}