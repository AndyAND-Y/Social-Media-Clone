function imageResizeSetup() {
    function resizeImage() {
        const imagePreview = document.getElementById("imagePreview");

        const width = window.innerWidth || document.documentElement.clientWidth ||
            document.body.clientWidth;
        const height = window.innerHeight || document.documentElement.clientHeight ||
            document.body.clientHeight;

        if (width <= 960) imagePreview.width = 0.9 * width;
        else imagePreview.width = 0.5 * width;
        imagePreview.height = 0.5 * height;

    };
    resizeImage();

    setInterval(resizeImage, 750)
}