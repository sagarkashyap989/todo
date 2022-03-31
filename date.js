
// console.log(module);

exports.get_date = function (){ 
    const today = new Date();
 
   const options = {
       weekday : "long",
       day :"numeric",
       month:"long"
   
   };
   console.log("hello world");
var xyz = today.toLocaleDateString('en-US', options)
   return xyz;

}