const defaultFilters = {
    brightness: { value: 100, min: 0, max: 200, unit: '%' },
    contrast: { value: 100, min: 0, max: 200, unit: '%' },
    saturation: { value: 100, min: 0, max: 200, unit: '%' },
    hueRotation: { value: 0, min: 0, max: 360, unit: 'deg' },
    blur: { value: 0, min: 0, max: 20, unit: 'px' },
    grayscale: { value: 0, min: 0, max: 100, unit: '%' },
    sepia: { value: 0, min: 0, max: 100, unit: '%' },
    opacity: { value: 100, min: 0, max: 100, unit: '%' },
    invert: { value: 0, min: 0, max: 200, unit: '%' }
};

let filters = JSON.parse(JSON.stringify(defaultFilters));

const filtersContainer = document.querySelector('.filters');
const presetsContainer = document.querySelector('.presets');
const imageCanvas = document.querySelector('#image-canvas');
const imgInput = document.querySelector('#image-input');
const resetButton = document.querySelector('#reset-btn');
const downloadButton = document.querySelector('#download-btn');
const animButton = document.querySelector('#anim-btn');
const recordButton = document.querySelector('#record-btn');
const dropZone = document.querySelector('.bottom');
const canvasCtx = imageCanvas.getContext('2d');
let file = null;
let image = null;

let isAnimating = false;
let animationId = null;
let mediaRecorder = null;
let recordedChunks = [];
let isRecording = false;

function createFilterElement(name, unit = '%', value, min, max) {
    const div = document.createElement('div');
    div.classList.add('filter');

    const label = document.createElement('div');
    label.classList.add('filter-info');

    const p = document.createElement('p');
    p.innerText = name.charAt(0).toUpperCase() + name.slice(1).replace(/([A-Z])/g, ' $1');

    const valDisplay = document.createElement('span');
    valDisplay.innerText = `${value}${unit}`;

    label.appendChild(p);
    label.appendChild(valDisplay);

    const input = document.createElement('input');
    input.type = 'range';
    input.min = min;
    input.max = max;
    input.value = value;
    input.id = name;

    div.appendChild(label);
    div.appendChild(input);

    input.addEventListener('input', (event) => {
        filters[name].value = input.value;
        valDisplay.innerText = `${input.value}${unit}`;
        if (!isAnimating) applyFilters();
    });

    return div;
}

function createFilters() {
    filtersContainer.innerHTML = "";
    Object.keys(filters).forEach(keys => {
        const filterElement = createFilterElement(keys, filters[keys].unit, filters[keys].value, filters[keys].min, filters[keys].max);
        filtersContainer.appendChild(filterElement);
    });
}

// Drag and Drop Logic
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropZone.addEventListener(eventName, preventDefaults, false);
});

function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

['dragenter', 'dragover'].forEach(eventName => {
    dropZone.addEventListener(eventName, highlight, false);
});

['dragleave', 'drop'].forEach(eventName => {
    dropZone.addEventListener(eventName, unhighlight, false);
});

function highlight() {
    dropZone.classList.add('drag-active');
}

function unhighlight() {
    dropZone.classList.remove('drag-active');
}

dropZone.addEventListener('drop', handleDrop, false);

function handleDrop(e) {
    const dt = e.dataTransfer;
    const files = dt.files;
    handleFiles(files);
}

function handleFiles(files) {
    if (files.length > 0) {
        const file = files[0];
        if (file.type.startsWith('image/')) {
            loadImage(file);
        } else {
            alert("Please upload an image file.");
        }
    }
}

function loadImage(file) {
    const imagePlaceholder = document.querySelector('.placeholder');
    imageCanvas.style.display = 'block';
    imagePlaceholder.style.display = 'none';

    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
        image = img;
        imageCanvas.width = img.width;
        imageCanvas.height = img.height;
        applyFilters();
        if (recordButton) recordButton.disabled = false;
    };
}

imgInput.addEventListener('change', () => {
    const file = imgInput.files[0];
    if (file) loadImage(file);
});

function getFilterString() {
    return `
    brightness(${filters.brightness.value}${filters.brightness.unit})
    contrast(${filters.contrast.value}${filters.contrast.unit})
    saturate(${filters.saturation.value}${filters.saturation.unit})
    hue-rotate(${filters.hueRotation.value}${filters.hueRotation.unit})
    blur(${filters.blur.value}${filters.blur.unit})
    grayscale(${filters.grayscale.value}${filters.grayscale.unit})
    sepia(${filters.sepia.value}${filters.sepia.unit})
    opacity(${filters.opacity.value}${filters.opacity.unit})
    invert(${filters.invert.value}${filters.invert.unit})
    `.trim();
}

function applyFilters() {
    if (!image) return;
    canvasCtx.clearRect(0, 0, imageCanvas.width, imageCanvas.height);
    canvasCtx.filter = getFilterString();
    canvasCtx.drawImage(image, 0, 0);
}

// --- Animation Logic ---

function toggleAnimation() {
    if (isAnimating) {
        isAnimating = false;
        cancelAnimationFrame(animationId);
        animButton.innerHTML = `<i class="ri-movie-line"></i> Animate`;
        applyFilters(); // Reset to static
    } else {
        if (!image) return;
        isAnimating = true;
        animButton.innerHTML = `<i class="ri-pause-line"></i> Stop`;
        animateGlitch();
    }
}

animButton.addEventListener('click', toggleAnimation);

function animateGlitch() {
    if (!isAnimating) return;

    // 1. Draw base filtered image
    canvasCtx.clearRect(0, 0, imageCanvas.width, imageCanvas.height);
    canvasCtx.filter = getFilterString();
    canvasCtx.drawImage(image, 0, 0);

    // 2. Add Glitch Effects
    if (Math.random() > 0.8) {
        const sliceHeight = Math.random() * 50 + 5;
        const sliceY = Math.random() * imageCanvas.height;
        const offset = (Math.random() - 0.5) * 40;
        canvasCtx.drawImage(
            imageCanvas,
            0, sliceY, imageCanvas.width, sliceHeight, // Source
            offset, sliceY, imageCanvas.width, sliceHeight // Dest
        );
    }

    // RGB Split / Color Shift
    if (Math.random() > 0.9) {
        const offset = (Math.random() - 0.5) * 10;
        canvasCtx.globalCompositeOperation = 'screen';
        canvasCtx.filter = getFilterString() + ` hue-rotate(90deg) opacity(0.5)`;
        canvasCtx.drawImage(image, offset, 0);
        canvasCtx.globalCompositeOperation = 'source-over';
    }

    animationId = requestAnimationFrame(animateGlitch);
}

// --- Recording Logic ---

recordButton.addEventListener('click', () => {
    if (isRecording) {
        stopRecording();
    } else {
        startRecording();
    }
});

function startRecording() {
    if (!image) return;

    // Force animation if not active
    if (!isAnimating) toggleAnimation();

    const stream = imageCanvas.captureStream(30);
    mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm;codecs=vp9' });

    recordedChunks = [];
    isRecording = true;
    recordButton.innerHTML = `<i class="ri-stop-circle-line"></i> Stop Rec`;
    recordButton.classList.add('recording-active');

    mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) recordedChunks.push(e.data);
    };

    mediaRecorder.onstop = exportVideo;
    mediaRecorder.start();
}

function stopRecording() {
    isRecording = false;
    recordButton.innerHTML = `<i class="ri-record-circle-line"></i> Record`;
    recordButton.classList.remove('recording-active');
    mediaRecorder.stop();
    if (isAnimating) toggleAnimation();
}

function exportVideo() {
    const blob = new Blob(recordedChunks, { type: 'video/webm' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = `glitch-animation-${Date.now()}.webm`;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }, 100);
}

resetButton.addEventListener('click', () => {
    filters = JSON.parse(JSON.stringify(defaultFilters));
    if (isAnimating) toggleAnimation();
    applyFilters();
    createFilters();
});

downloadButton.addEventListener('click', () => {
    if (!image) return;
    const link = document.createElement('a');
    link.download = `edited-image-${Date.now()}.png`;
    link.href = imageCanvas.toDataURL();
    link.click();
});

const presets = {
    normal: { ...defaultFilters },
    drama: { brightness: 105, contrast: 140, saturation: 120 },
    vintage: { brightness: 110, contrast: 90, saturation: 80, hueRotation: 10, grayscale: 10, sepia: 35 },
    oldSchool: { brightness: 95, contrast: 110, saturation: 70, blur: 1, grayscale: 20, sepia: 50 },
    cinematic: { contrast: 130, saturation: 90, hueRotation: 350, sepia: 10 },
    faded: { brightness: 115, contrast: 80, saturation: 75, sepia: 15 },
    blackAndWhite: { contrast: 120, saturation: 0, grayscale: 100 },
    noir: { brightness: 90, contrast: 160, saturation: 0, grayscale: 100, sepia: 10 },
    retroPop: { brightness: 110, contrast: 120, saturation: 140, hueRotation: 15, sepia: 20 },
    glitch: { contrast: 110, saturation: 130, hueRotation: 180, blur: 1, invert: 20 }
};

function presetfilters() {
    presetsContainer.innerHTML = "";
    Object.keys(presets).forEach(presetName => {
        const presetButton = document.createElement('button');
        presetButton.classList.add('btn', 'preset-btn');
        presetButton.innerText = presetName.replace(/([A-Z])/g, ' $1').trim();
        presetsContainer.appendChild(presetButton);

        presetButton.addEventListener('click', () => {

            filters = JSON.parse(JSON.stringify(defaultFilters));


            const preset = presets[presetName];
            Object.keys(preset).forEach(filterName => {
                if (filters[filterName]) {
                    filters[filterName].value = preset[filterName];
                }
            });

            applyFilters();
            createFilters();
        });
    });
}

createFilters();
presetfilters();