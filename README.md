# 🎨 Image Editor - Web Based Premium Photo Tool

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=flat&logo=javascript&logoColor=%23F7DF1E)

A modern, high-performance web application for editing images directly in the browser. Featuring a stunning **Glassmorphism UI**, real-time filtering, and professional-grade presets, this tool allows users to enhance photos instantly without uploading data to a server.

---

## ✨ Key Features

- **🖼️ Premium UI/UX:** A fully responsive Glassmorphism interface powered by modern CSS variables and HSL color spaces.
- **⚡ Real-Time Editing:** Instant feedback for brightness, contrast, saturation, blurred effects, and more using HTML5 Canvas.
- **📂 Drag & Drop:** Seamlessly upload images by dragging them onto the interface or using the file picker.
- **🎨 One-Click Presets:** Instantly apply professional looks like *Vintage*, *Cinematic*, *Noir*, and *Glitch*.
- **📱 Fully Responsive:** Optimized for desktops, tablets, and mobile devices with touch-friendly sliders and controls.
- **🎥 Animation & Recording:** Create dynamic "Cyber Glitch" effects and record/download them as `.webm` videos directly from the browser.
- **📏 Image Size Reducer:** Reduce photo dimensions and file size (KB) with precision. Features live size estimation and JPEG quality control.
- **🔒 Privacy First:** All processing happens client-side. Your photos never leave your browser.

---

## 🛠️ Tech Stack

- **Core:** HTML5, Semantic Web Standards
- **Styling:** Vanilla CSS3 (Variables, Flexbox, Grid, Glassmorphism effects)
- **Logic:** Vanilla JavaScript (ES6+, Canvas API)
- **Icons:** RemixIcon
- **Font:** Inter (Google Fonts)

---

## 🚀 Getting Started

No build steps or complex installation required. This project is built with standard web technologies.

### Prerequisites

- A modern web browser (Chrome, Firefox, Edge, Safari).

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/sham-jadhav03/Image-Editor.git
    cd Image-Editor
    ```

2.  **Run the Application**
    - simply open `index.html` in your web browser.
    - **OR** use a lightweight dev server for the best experience (e.g., Live Server in VS Code).

    ```bash
    # using npx and serve
    npx serve .
    ```

---

## 📖 Usage Guide

1.  **Upload:** Click "Choose Image" or drag a file into the center panel.
2.  **Edit:**
    - Use the **Features** panel on the right to adjust individual parameters (Brightness, Blur, etc.).
    - Click any **Preset** button to apply a pre-configured look.
3.  **Animate & Record:**
    - Click **Animate** to see a live "Cyber Glitch" effect.
    - Click **Record** to capture the animation. Hit "Stop Rec" to automatically download the video.
4.  **Resize & Optimize:**
    - Enter desired **Width** or **Height** in the resize panel.
    - Toggle **Maintain Aspect Ratio** to keep the image proportions.
    - Use the **Quality** slider to compress the image and watch the **Estimated Size** update in real-time.
5.  **Reset:** Made a mistake? Click the "Reset" button to revert to the original image and dimensions.
6.  **Download:** Click the "Download" button to save your masterpiece. (Saves as `.jpg` if quality is reduced, or `.png` for lossless).

---

## 🎛️ Filter Capabilities

| Filter | Description | Unit |
| :--- | :--- | :--- |
| **Brightness** | Adjusts the lightness of the image. | % |
| **Contrast** | Enhances or reduces the separation between dark and light areas. | % |
| **Saturation** | Controls the intensity of colors. | % |
| **Hue Rotation** | Shifts the colors around the color wheel. | deg |
| **Blur** | Applies a Gaussian blur effect. | px |
| **Grayscale** | Converts the image to black and white. | % |
| **Sepia** | Applies a warm, antique tone. | % |
| **Opacity** | Adjusts the transparency of the image. | % |
| **Invert** | Inverts the colors (creates a negative effect). | % |
| **Resize** | Change physical dimensions (Width/Height). | px |
| **Quality** | JPEG compression level for file size reduction. | % |

---

## 📏 Resize & Quality Control

This version introduces powerful tools for optimizing your images for the web:

-   **Dimension Control:** Adjust the width and height of your image. The aspect ratio is maintained by default to prevent stretching.
-   **File Size Optimization:** Using the Quality slider, you can apply JPEG compression to significantly reduce the file size (KB).
-   **Live Estimation:** The editor provides a real-time estimate of the final file size, helping you find the perfect balance between quality and performance.
-   **Smart Export:** 
    -   **100% Quality:** Saved as `.png` (lossless, high quality).
    -   **Lower Quality:** Saved as `.jpg` (compressed, small file size).

---

## 📂 Project Structure

```
Image-Editor/
│
├── index.html      # Main HTML structure
├── style.css       # Core layout and responsive styles
├── theme.css       # Color variables and design tokens
├── script.js       # App logic, canvas manipulation, and event listeners
└── README.md       # Project documentation
```

---

## 🤝 Contributing

Contributions are welcome! If you'd like to improve this project:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/YourFeature`).
3.  Commit your changes (`git commit -m 'Add some feature'`).
4.  Push to the branch (`git push origin feature/YourFeature`).
5.  Open a Pull Request.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/sham-jadhav03">Sham Jadhav</a>
</p>
