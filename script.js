async function uploadAndRemove() {
    const file = document.getElementById('imageInput').files[0];
    const status = document.getElementById('status');
    const resultImg = document.getElementById('resultImage');

    if (!file) return alert("No file selected.");
    status.innerText = "Processing...";

    const CLOUD_NAME = "dfozphniu";
    const UPLOAD_PRESET = "ml_default"; 
    const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', UPLOAD_PRESET);
    
    // AI Removal transformation
    formData.append('transformation', JSON.stringify([{
        effect: "gen_remove"
    }]));

    try {
        const response = await fetch(url, {
            method: 'POST',
            body: formData
        });
        const data = await response.json();

        if (data.secure_url) {
            resultImg.src = data.secure_url;
            status.innerText = "Complete!";
        } else {
            status.innerText = "Error: " + JSON.stringify(data.error);
        }
    } catch (err) {
        status.innerText = "Connection failed.";
    }
}
