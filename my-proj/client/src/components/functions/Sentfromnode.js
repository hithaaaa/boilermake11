
const askServer = async (typeofdata) => {
  try{
      const data = {typeofdata:typeofdata};
      const response = await fetch("http://localhost:3005/retrieve-data", {
        method: 'POST',   
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached     
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(data) 
        })
      const responseData = await response.json();
      console.log('Server response:', responseData);
      return responseData;
      } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };
   export default askServer;
  