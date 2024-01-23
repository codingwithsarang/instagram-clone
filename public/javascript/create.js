let imageInput = document.querySelector("#imageupload")
    const uploadedImage = document.getElementById('uploaded-image');

        imageInput.addEventListener("change",handleImgUpload)
        
        function handleImgUpload(){
            const file = imageInput.files[0]
        
            if(file){
                const reader = new FileReader()
        
                reader.onload = function(e){
                    uploadedImage.src = e.target.result
        
                    sessionStorage.setItem('uploadedImage',e.target.result)
                }
                reader.readAsDataURL(file)
            }
        }
        
        const storageImage = sessionStorage.getItem("uploadedImage")
        
        if(storageImage){
            uploadedImage.src = storageImage
            console.log(uploadedImage.src)
        }

        let imgData = sessionStorage.getItem("uploadedImage")
        fetch("http://localhost:3000/created",{
            method: "POST",
            headers:{
                'content-type': 'application/json',
            },
            body: JSON.stringify({data: imgData})
        })