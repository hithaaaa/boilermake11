
const sendToServer = async (typeofdata, the_data) => {
try{
    const tosend = {'typeofdata':typeofdata, 'data':the_data};
    const req = await fetch("http://localhost:3005/data", {
      method: 'POST',   
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached     
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(tosend) 
      })
    const responseData = await req.json();
    console.log('Server response:', responseData);
    return responseData;
  	} catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
 export default sendToServer;
