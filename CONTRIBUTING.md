## Getting Started (User Guide)

This guide explains how to build and deploy the PV Sizing & ROI Calculator app using CodePen, Tiiny.host, and WebintoApp.

**1. Building the App on CodePen:**

* **Create a new CodePen:** Go to [codepen.io](codepen.io) and create a new pen.
* **HTML (index.html):**  Develop the user interface (input forms, buttons, output display areas) in the HTML section.
* **CSS (style.css):**  Style the interface using CSS in the CSS section.
* **JavaScript (script.js):** Implement the PV sizing and ROI calculation logic in the JavaScript section. Define the formulas and calculations here.  You'll need to handle user input, perform the calculations, and display the results on the page. *[See notes below about JavaScript calculations]*
* **Test thoroughly:**  Ensure the calculations are accurate and the interface functions correctly within CodePen's environment.

**2. Exporting from CodePen:**

* **CodePen have a direct "Export as ZIP" feature to export or the other way is by
* **Manual Create files:**  Create three files: `index.html`, `style.css`, and `script.js`.
* **Paste code:** Copy the code from your CodePen pen and paste it into the corresponding files you just created with format as "index.html", "script.js", "style.css".
* **Create ZIP archive:** Compress these three files into a ZIP archive (e.g., `pv_calculator.zip`).

**3. Hosting on Tiny.host:**

* **Go to Tiny.host:** Visit [tiiny.host](tiiny.host) (or your chosen free hosting provider).
* **Upload the ZIP file:** Upload the `pv_calculator.zip` file for example.
* **Get the URL:** Tiny.host will provide you with a URL for your hosted web app.  Copy this URL.

**4. Converting to APK with WebToApp:**

* **Go to WebintoApp:** Visit the WebintoApp website or use your preferred website-to-APK converter.
* **Enter the URL:** Paste the URL you got from Tiiny.host into WebToApp.
* **Customize (Optional):** Add your app name, logo, and other customizations as desired.
* **Convert:** Start the conversion process. WebintooApp will generate an APK file.

**5. Installing the APK:**

* **Download the APK:** Download the generated APK file to your Android device.  It will be located inside the 'android' folder with the file name `your_app_name.apk`.
* **Enable installation from unknown sources:** You may need to enable this option in your Android device's settings to install APKs from sources other than the Google Play Store.  (Be cautious when enabling this and only install APKs from trusted sources).
* **Install the APK:** Locate the downloaded APK file on your device and install it.


**Important Notes:**

* **JavaScript Calculations:** The core of your app's functionality will be the JavaScript code that performs the PV sizing and ROI calculations.  You'll need to research and implement the appropriate formulas.  Consider using a JavaScript library for complex mathematical operations if needed.
* **Free Hosting Limitations:** Free hosting services often have limitations (ads, storage space, bandwidth).  Be aware of these limitations.
* **WebToApp Alternatives:**  There are several alternative website-to-APK converters available. Explore different options to find one that suits your needs.
* **Advanced Features:**  This basic guide creates a simple web app wrapped in an APK.  For more advanced features (native device access, offline functionality), you'll need to explore native Android development.

## Contributing

**We warmly welcome contributions of all kinds!** Whether you are a seasoned developer, a solar energy expert, a UX/UI designer, or simply someone passionate about renewable energy, your input is valuable.

**Here's how you can contribute:**

* **Report Bugs:** If you encounter any issues or unexpected behavior, please describe the problem in detail.
* **Suggest New Features:**  Have an idea for a new feature or improvement? Discuss your suggestion.
* **Code Contributions:**  Want to contribute code?  Great! Please follow these steps:
    1. **Fork the repository.**
    2. **Create a new branch** for your feature or bug fix: `git checkout -b feature/your-feature-name` or `git checkout -b fix/bug-description`.
    3. **Make your changes** and commit them with clear and concise commit messages.
    4. **Test your changes** thoroughly.
    5. **Submit a pull request** to the `main` branch with a detailed description of your changes.

   * **Please review our [CONTRIBUTING.md](CONTRIBUTING.md) file for more detailed guidelines on coding style, testing, and pull request process.** *(Create this file and add more specific contribution instructions).*
* **Design Improvements:**  If you have UX/UI design skills, we'd love your help in making the application more user-friendly and visually appealing.
* **Spread the Word:**  Share this project with others who might find it useful or who might be interested in contributing!

**We are particularly interested in contributions that focus on:**

* **Improving accuracy and reliability of calculations.**
* **Expanding data sources (e.g., weather APIs, panel databases).**
* **Enhancing the user interface and user experience.**
* **Internationalization and localization (supporting multiple languages and regions).**

## Roadmap & Future Enhancements

We have a vision for continuously improving this application.  Some of the planned future enhancements include:

* **Web-based Deployment:**  Making the application accessible online for wider usage.
* **Interactive Visualizations:**  Adding charts and graphs to visualize results and make them more insightful.
* **Advanced Scenario Modeling:**  Including more sophisticated factors like shading, panel orientation optimization, and battery storage integration.
* **Integration with Data APIs:**  Connecting to external APIs for real-time weather data, panel specifications, and electricity tariffs.
* **Mobile Responsiveness:**  Ensuring the application works well on different screen sizes, including Apple devices.
* **User Accounts & Saved Projects:**  Allowing users to save their projects and track their solar planning progress.

This roadmap is flexible and will be shaped by community feedback and contributions.


**In short, you are free to use, modify, and distribute this software for both commercial and non-commercial purposes, as long as you include the original copyright and license notice.**

