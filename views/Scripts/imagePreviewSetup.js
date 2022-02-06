function imagePreviewSetup() {
    const image = document.getElementById("imageInput");

    function readRead() {
        console.log("ceva");
        if (this.files && this.files[0]) {
            const reader = new FileReader();

            reader.addEventListener("load", (e) => {
                document.getElementById("imagePreview").src = e.target.result;
            });
            reader.readAsDataURL(this.files[0]);
        }
    }

    image.addEventListener("change", readRead);
}