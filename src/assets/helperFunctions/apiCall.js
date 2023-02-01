export const getTableData = async(url,token)=>{
  try{
    const response = await fetch(url,{
        method:"GET",
        headers:{
            "Content-Type":"application/json",
            'token': token
        }
    });

    if(response?.status !== 200){
      console.log("Failed to get Data");
    }
    else{
      const result = await response.json();
      return result;
    }

}
catch(e){
    console.log(e);
}
}



export const deleteOrGetReciept = async (url,recieptId,token,method) => {
  try {
    const response = await fetch(url, {
      method:method,
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      body: JSON.stringify({
        _id: recieptId,
      }),
    });
    return response;

  } catch (e) {
    console.log(e);
  }
};
