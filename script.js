async function process() {
    const status = document.getElementById('status');
    const frontIdFile = document.getElementById('frontId').files[0];
    
    if (!frontIdFile) {
        alert("Please upload a file.");
        return;
    }

    status.innerText = "Processing, please wait...";
    
    const CLOUD_NAME = "dfozphniu";
    const API_KEY = "322918746894421";
    const API_SECRET = "182skuOa3MhoaxyBIEN037t550g";
    
    const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
    
    const formData = new FormData();
    formData.append('file', frontIdFile);
    formData.append('upload_preset', 'ml_default');
    
    try {
        const response = await fetch(url, {
            method: 'POST',
            body: formData
        });
        
        const data = await response.json();
        
        if (data.secure_url) {
            document.getElementById('resultImage').src = data.secure_url;
            status.innerText = "Processing complete.";
        } else {
            status.innerText = "Upload failed.";
        }
    } catch (error) {
        status.innerText = "An error occurred.";
        console.error(error);
    }
}
