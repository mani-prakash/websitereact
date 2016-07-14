class FetchUtils{

}
FetchUtils.getData = function(url){
  return fetch(url).then(
      function(response)
      {
        return response.json();
      }
  ).catch(function(error){
        return null;
      });
};

export default FetchUtils;