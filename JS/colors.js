 
// Connect to Clarifai
const app = new Clarifai.App({
    apiKey: '4debfa22106b48598807a79d96447256'
});







function getBase64Image(imgUrl, callback) 
{

var img = new Image();
img.onload = function()

{

  var canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  var ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);
  var dataURL = canvas.toDataURL("image/png"),
      dataURL = dataURL.replace(/^data:image\/(png|jpg);base64,/, "");

  callback(dataURL); // the base64 string

};


img.setAttribute('crossOrigin', 'anonymous'); //
img.src = imgUrl;

}





function getColors(file,callbackccc) {

    console.log(file)

    getBase64Image(file, function(base64image){
     console.log(base64image);

        var cc=getCC(base64image,function(ccc){
            console.log(ccc)
            callbackccc(ccc)
        });
       
       // return cc

});


}



var colorss;

function getCC(file,callbackcc){

    console.log('aa')
    app.models.predict(Clarifai.COLOR_MODEL, {base64: file})
    .then(
        // Response handler
        function (response) {
            // Get colors from response and sort by descending prevalence
            colorss = response.outputs[0].data.colors;
            colorss.sort((a, b) => (a.value > b.value) ? -1 : ((b.value > a.value) ? 1 : 0));

            console.log("hhhh")
            console.log(colorss)
            callbackcc(colorss)// colorss;
            
         
        },
        // Error handler
        function (err) {
            console.error(err);
        }
    )
    
}

