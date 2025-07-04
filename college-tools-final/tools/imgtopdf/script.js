$(document).ready(function() {
    const $dropArea = $('#dropArea');
    const $fileInput = $('#fileInput');
    const $imagePreview = $('#imagePreview');
    const $convertBtn = $('#convertBtn');
    const $downloadLink = $('#downloadLink');
    
    // File selection handler
    $fileInput.on('change', handleFile);
    
    // Drag and drop event handlers
    $dropArea.on('dragenter dragover dragleave drop', preventDefaults);
    $dropArea.on('dragenter dragover', highlight);
    $dropArea.on('dragleave drop', unhighlight);
    $dropArea.on('drop', handleDrop);
    
    // Convert button handler
    $convertBtn.on('click', convertToPdf);
    
    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    
    function highlight() {
        $dropArea.addClass('active');
    }
    
    function unhighlight() {
        $dropArea.removeClass('active');
    }
    
    function handleDrop(e) {
        const dt = e.originalEvent.dataTransfer;
        const files = dt.files;
        if (files.length) {
            $fileInput[0].files = files;
            handleFile();
        }
    }
    
    function handleFile() {
        const file = $fileInput[0].files[0];
        
        if (!file || !file.type.match('image.*')) {
            alert('Please select an image file');
            return;
        }
        
        const reader = new FileReader();
        
        reader.onload = function(e) {
            $imagePreview.attr('src', e.target.result).show();
            $convertBtn.prop('disabled', false);
            $downloadLink.hide();
            $convertBtn.text('Convert to PDF');
        };
        
        reader.readAsDataURL(file);
    }
    
    function convertToPdf() {
        const img = new Image();
        img.src = $imagePreview.attr('src');
        
        $(img).on('load', function() {
            const { jsPDF } = window.jspdf;
            const pdf = new jsPDF();
            
            // Calculate dimensions to fit in A4
            const aspectRatio = img.width / img.height;
            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();
            
            let imgWidth = pageWidth;
            let imgHeight = pageWidth / aspectRatio;
            
            if (imgHeight > pageHeight) {
                imgHeight = pageHeight;
                imgWidth = pageHeight * aspectRatio;
            }
            
            // Center the image
            const x = (pageWidth - imgWidth) / 2;
            const y = (pageHeight - imgHeight) / 2;
            
            pdf.addImage(img, 'JPEG', x, y, imgWidth, imgHeight);
            
            // Generate PDF and create download link
            const pdfBlob = pdf.output('blob');
            const url = URL.createObjectURL(pdfBlob);
            
            $downloadLink
                .attr('href', url)
                .attr('download', 'converted-image.pdf')
                .show();
                
            $convertBtn.text('Converted!');
        });
    }
});