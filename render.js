function searchPhoto() {
  var apigClient = apigClientFactory.newClient();

  var user_message = document.getElementById('note-textarea').value;

  var body = {};
  var params = { 'q': user_message };

  if(params['q']=="")
  {
    alert("No Search Query Found. Enter keyword to Search!");
  }
  console.log(params['q']);

  var additionalParams = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  apigClient
    .searchGet(params, body, additionalParams)
    .then(function (res) {
      var data = {};
      var data_array = [];
      resp_data = res.data;
      length_of_response = resp_data.length;

      console.log("LEN RES", length_of_response);

      console.log("Result : ", res);

      var photosDiv = document.getElementById("img-container");
      photosDiv.innerHTML = "";

      if (length_of_response == 0) {
        photosDiv.innerHTML = '<h2 style="text-align: center;font-size: 25px;font-style: bold;margin-top:30px;">No Images Found !!!</h2>';
      }

      else {

      photosDiv.innerHTML = '<h2 style="text-align: center;font-size: 25px;font-style: bold;margin-top:30px;margin-bottom:30px;">Here are your images: </h2>';

      image_paths = res["data"];
      console.log(image_paths);
        console.log(photosDiv);
        for (n = 0; n < image_paths.length; n++) {
            images_list = image_paths[n].split('/');
            imageName = images_list[images_list.length - 1];
            photosDiv.innerHTML += '<figure><img src="' + image_paths[n] + '" style="width:25%"><figcaption>' + imageName + '</figcaption></figure>';

         } 
        
        console.log(photosDiv);
    }
    })
    .catch(function (result) {});
}

// function getBase64(file) {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     // reader.onload = () => resolve(reader.result)
//     reader.onload = () => {
//       let encoded = reader.result.replace(/^data:(.*;base64,)?/, '');
//       if ((encoded.length % 4) > 0) {
//         encoded += '='.repeat(4 - (encoded.length % 4));
//       }
//       resolve(encoded);
//     };
//     reader.onerror = error => reject(error);
//   });
// }



// function uploadPhoto() {
//   var file = document.getElementById('file_path').files[0];
//   if (!file) {
//       console.error("No file selected.");
//       return;
//   }

//   getBase64(file).then(data => {
//       console.log(data); // This is your base64 image data
//       var apigClient = apigClientFactory.newClient({
//           apiKey: "a3nkSjp9Tq9wNeatrtdAa9yAbxxNKCqIat3ieOmd"
//       });

//       var body = data; // Base64 encoded image
//       var params = {
//           "filename": file.name,
//           "bucket": "pulkit-cloud-assgn3-photos-bucket"
//       };

//       var additionalParams = {
//           headers: {
//               "Content-Type": file.type
//           }
//       };

//       apigClient.uploadBucketFilenamePut(params, body, additionalParams).then(function(res) {
//           if (res.status === 200) {
//               document.getElementById("uploadText").innerHTML = "Image Uploaded  !!!";
//               document.getElementById("uploadText").style.display = "block";
//           } else {
//               // Handle different status codes or errors
//           }
//       }).catch(function(error) {
//           console.error("Upload failed:", error);
//           // Handle upload error
//       });
//   }).catch(function(error) {
//       console.error("Error in getting base64:", error);
//       // Handle base64 conversion error
//   });
// }


function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      let encoded = reader.result.replace(/^data:(.*;base64,)?/, '');
      if (encoded.length % 4 > 0) {
        encoded += '='.repeat(4 - (encoded.length % 4));
      }
      resolve(encoded);
    };
    reader.onerror = (error) => reject(error);
  });
}

function uploadPhoto() {
  var fileInput = document.getElementById('file_path');
  var file = fileInput.files[0];

  if (!file) {
    alert("Please select a file to upload.");
    return;
  }

  var fileName = file.name;
  var fileType = file.type; // This will be used to set the correct content type

  var validExtensions = ['png', 'jpg', 'jpeg'];
  var fileExtension = fileName.split('.').pop().toLowerCase();

  if (!validExtensions.includes(fileExtension)) {
    alert("Please upload a valid .png, .jpg, or .jpeg file!");
    return;
  }

  let config = {
    headers: {
      'Content-Type': fileType, 'x-amz-meta-customlabels': custom_labels.value
    }
  };

  var url = 'https://q0h12hsiqg.execute-api.us-east-2.amazonaws.com/dev/upload/pulkit-cloud-assgn3-photos-bucket/' + fileName;
  console.log(url);

  axios.put(url, file, config)
    .then(response => {
      if (response.status === 200) {
        alert("Upload successful!!");
      } else {
        alert("Upload failed: " + response.status);
      }
    })
    .catch(error => {
      console.error("Error during upload: ", error);
      alert("Upload failed: " + error.message);
    });
}



// function uploadPhoto() {
//   var filePath = (document.getElementById('file_path').value).split("\\");
//   console.log(filePath);
//   var file = document.getElementById('file_path').files[0];
//   const reader = new FileReader();
//   console.log(filePath);
//   if ((filePath == "") || (!['png', 'jpg', 'jpeg'].includes(filePath.toString().split(".")[1]))) {
//         alert("Please upload a valid .png/.jpg/.jpeg file!");
//     } else {
//       let config = {
//                 headers:{'Content-Type': 'image/jpeg'}
//             };

//             url = 'https://q0h12hsiqg.execute-api.us-east-2.amazonaws.com/dev/upload/pulkit-cloud-assgn3-photos-bucket/'+ file.name
//             console.log(url)
//             axios.put(url, file, config).then(response => {
//               if(response.status === 200 || response.status === 500) {
//                 alert("Upload successful!!");
//               } else {
//                 // Handle non-200 responses if needed
//                 alert("Upload failed: " + response.status);
//               }
//             }).catch(error => {
//               // Handle errors here
//               console.error("Error during upload: ", error);
//               alert("Upload failed: " + error.message);
//             });
//           }
//         }