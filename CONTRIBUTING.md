# Getting Started & Contributing Guide: PV Sizing & ROI Calculator

This guide explains how to build, deploy, and contribute to the PV Sizing & ROI Calculator app. We'll use CodePen for development, Tiiny.host for hosting the web app, and WebintoApp to convert it into an Android APK.

**We warmly welcome contributions of all kinds!** Whether you are a seasoned developer, a solar energy expert, a UX/UI designer, or simply someone passionate about renewable energy, your input is valuable.

## 1. Building the App on CodePen

* **Create a New Pen:**
    * Go to [codepen.io](https://codepen.io) and create a new pen. This will be your development environment.
* **Structure Your Pen:**
    * CodePen pens have three main sections: HTML, CSS, and JavaScript. We will use these to build our calculator.

### 1.1 HTML Structure (index.html)

The HTML section (`index.html` in a standard project structure) defines the user interface of the calculator.

* **Basic Document Setup:**
    ```html
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>PV Sizing & ROI Calculator</title>
        <!-- Dependencies will be included here -->
    </head>
    <body>
        <!-- Navigation Bar -->
        <nav class="bg-[#f7f7f7] shadow-lg"></nav>

        <!-- Main Content/Calculator Section -->
        <main class="container mx-auto px-4 py-8"></main>

        <!-- JavaScript Files (Optional - can also be in the JS section of CodePen) -->
        </body>
    </html>
    ```

    **Explanation:**
    - `<!DOCTYPE html>`: Declares the document type as HTML5.
    - `<html lang="en">`: Sets the document language to English.
    - `<meta>` tags: Configure character set and viewport for responsiveness.
    - `<title>`: Sets the title that appears in the browser tab.
    - `<nav>`:  Will contain the navigation bar.
    - `<main>`:  Will hold the main content of the calculator.

* **Include Dependencies:**
    Add these `<script>` tags within the `<head>` section to include necessary libraries:
    ```html
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/vue@3.5.13/dist/vue.global.js"></script>
    ```
    **Explanation:**
    - **Tailwind CSS**:  A utility-first CSS framework for styling the UI quickly.
    - **Vue.js 3**:  A progressive JavaScript framework to enhance interactivity (used here for mobile menu toggle, and can be used for more complex UI logic if needed).

* **Navigation Bar (`<nav>`) Example:**
    ```html
    <nav class="bg-[#f7f7f7] shadow-lg">
        <div class="max-w-7xl mx-auto px-4">
            <div class="flex justify-between h-16">
                <div class="flex items-center">
                    <span class="font-bold text-xl">PV Calculator</span> <span class="ml-2 text-gray-500 text-sm">v1.0</span>
                </div>
                <div class="hidden md:flex items-center justify-center flex-1">
                    <div class="flex space-x-8">
                        <a href="#introduction" class="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">About</a>
                        <a href="#contribute" class="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Contribute</a>
                        <a href="#" class="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Guide</a>
                    </div>
                </div>
                <div class="md:hidden flex items-center">
                    <button @click="mobileMenuOpen = !mobileMenuOpen" class="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100">
                        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                            <path v-if="mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </nav>
    ```
    **Explanation:**
    - **Tailwind CSS Classes:**  Classes like `bg-[#f7f7f7]`, `shadow-lg`, `max-w-7xl`, `mx-auto`, `px-4`, `flex`, `justify-between`, `h-16` are Tailwind CSS utilities for styling and layout.
    - **Responsive Design:** `hidden md:flex` and `md:hidden flex` control visibility based on screen size (medium and above vs. small screens).
    - **Vue.js for Mobile Menu:** `@click="mobileMenuOpen = !mobileMenuOpen"` demonstrates basic Vue.js usage to toggle a mobile menu (you'll need to define `mobileMenuOpen` in your JavaScript/Vue instance).

* **PV System Calculator Section (`<main>`):**
    This is where you'll build the input forms and output areas. Here's an example structure:
    ```html
    <main class="container mx-auto px-4 py-8">
        <section id="calculator-section">
            <h2 class="text-2xl font-bold mb-4">PV System Calculator</h2>
            <p class="font-bold mb-2">Solar Panel Characteristics</p>
            <div class="mb-4 relative">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="Pmp">
                    Planned Solar Panel Power (W):
                    <span class="ml-1 cursor-help relative group">
                        ❔
                        <span class="hidden group-hover:block absolute z-10 p-2 text-sm w-64 bg-black text-white rounded shadow-lg left-1/2 transform -translate-x-1/2 top-6">
                            Enter the power rating of your planned solar panel in watts (e.g., 300W).
                        </span>
                    </span>
                </label>
                <input type="number" id="Pmp" value="300" min="200" max="550" step="50"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter power in watts">
            </div>

            <!-- ... (Similar input fields for other parameters like Pg, nm, PSH, etc.) ... -->

            <div class="mb-4 relative">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="monthlyBill">
                    Monthly Bill (RM):
                    <span class="ml-1 cursor-help relative group">❔
                        <span class="hidden group-hover:block absolute z-10 p-2 text-sm w-64 bg-black text-white rounded shadow-lg left-1/2 transform -translate-x-1/2 top-6">
                            Enter your estimated average monthly electricity bill in Ringgit Malaysia (RM).
                        </span>
                    </span>
                </label>
                <input type="number" id="monthlyBill" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter monthly bill in RM">
            </div>

            <button type="button" class="w-full bg-[#3bae1f] text-white px-4 py-2 rounded-md hover:bg-[#2ea512] transition-colors duration-300 font-medium" onclick="calculatePVSystem()">Calculate System Cost</button>

            <div id="result" class="mt-6 p-4 border rounded shadow-md">
                <!-- Results will be displayed here -->
            </div>
        </section>
    </main>
    ```
    **Explanation:**
    - **`<section id="calculator-section">`**: Encapsulates the calculator elements. Using IDs helps in JavaScript to target this section.
    - **Input Fields (`<input type="number">`):**
        - `type="number"`:  Ensures only numeric input.
        - `id`:  Unique identifier for each input field (e.g., `Pmp`, `monthlyBill`) used to access values in JavaScript.
        - `value`, `min`, `max`, `step`:  Attributes to control input behavior and provide default values.
        - **Tooltips:**  The `<span>` elements with class `cursor-help relative group` and the nested `<span> class="hidden group-hover:block ..."` create hoverable tooltips to guide users.
    - **Calculate Button (`<button onclick="calculatePVSystem()">`):**  Triggers the `calculatePVSystem()` JavaScript function when clicked.
    - **Output Area (`<div id="result">`):**  The calculated results will be inserted into this `div` using JavaScript.

### 1.2 CSS Styling (style.css - or CSS section in CodePen)

* **Tailwind CSS (Utility-First):** We are primarily using Tailwind CSS classes directly in the HTML for styling. You don't need a separate `style.css` file for basic styling with Tailwind.
* **Custom CSS (Optional):** If you need more specific styles or want to override Tailwind defaults, you can add CSS rules in the CSS section of CodePen or create a `style.css` file if you export the project.

### 1.3 JavaScript Logic (script.js - or JS section in CodePen)

The formulas used for PV system sizing and ROI calculations in the `calculatePVSystem()` function are based on methodologies described in the following publications:

1.  Ahmad, N. I. ., & Nor, A. F. M. (2022). Computational Method for Sizing and Cost Analysis of Grid Connected Photovoltaic System. *Journal of Quranic Sciences and Research, 3*(1), 1- 8. [https://publisher.uthm.edu.my/ojs/index.php/jqsr/article/view/9825](https://publisher.uthm.edu.my/ojs/index.php/jqsr/article/view/9825)
2.  Dunlop, J. P. (2011). *Photovoltaic Systems: In partnership with NJATC*.  Amazon.com: Books.


* **`calculatePVSystem()` Function:**
    This function contains the core logic for PV system sizing and ROI calculation.

    ```javascript
    function calculatePVSystem() {
        // --- 1. Input Retrieval ---
        const Pmp = parseFloat(document.getElementById('Pmp').value);
        const Pg = parseFloat(document.getElementById('Pg').value) / 100;
        const nm = parseFloat(document.getElementById('nm').value);
        const PSH = parseFloat(document.getElementById('PSH').value);
        const Avetemp = parseFloat(document.getElementById('Avetemp').value);
        const STC = parseFloat(document.getElementById('STC').value);
        const Ctemp = parseFloat(document.getElementById('Ctemp').value) / 100; // Internally negative
        const wiringLoss = parseFloat(document.getElementById('wiringLoss').value) / 100;
        const InvEff = parseFloat(document.getElementById('InvEff').value) / 100;
        const InvMPPT = parseFloat(document.getElementById('InvMPPT').value) / 100;
        const monthlyBill = parseFloat(document.getElementById('monthlyBill').value);
        const panelCost = parseFloat(document.getElementById('panelCost').value);
        const inverterCost = parseFloat(document.getElementById('inverterCost').value);
        const laborRate = parseFloat(document.getElementById('laborRate').value);
        const annualCleaning = parseFloat(document.getElementById('annualCleaning').value);
        const region = document.getElementById('region').value;

        // --- 2. Input Validation ---
        if (isNaN(monthlyBill) || monthlyBill <= 0) {
            alert("Please enter a valid monthly bill amount.");
            return;
        }
        if (isNaN(nm) || nm < 1 || isNaN(PSH) || PSH <= 0) {
            alert("Please enter valid values for required fields.");
            return;
        }

        // --- 3. Tariff Rates (Example for Malaysia) ---
        let tariffBlocks;
        if (region === "peninsular") {
            tariffBlocks = [ /* ... (tariff blocks as defined previously) ... */ ];
        } else if (region === "sabah") {
            tariffBlocks = [ /* ... (tariff blocks for sabah as defined previously) ... */ ];
        }

        // --- 4. Monthly Bill Breakdown Calculation ---
        let remainingBill = monthlyBill;
        let totalUsage = 0;
        let breakdown = [];
        for (const block of tariffBlocks) { /* ... (bill breakdown logic as defined previously) ... */ }
        const lastRate = breakdown[breakdown.length - 1].rate;

        // --- 5. PV System Calculations ---
        const Parr_g = Pmp * Pg * nm;
        const PVcon = Parr_g * ((Avetemp - STC) * -Ctemp);
        const Parr_T = Parr_g + PVcon;
        const Parr_net = Parr_T * (1 - wiringLoss);
        const PoutAC = Parr_net * InvEff * InvMPPT;
        const Poutave = PoutAC * PSH;
        const MEP = (Poutave * 30) / 1000;

        // --- 6. Savings and Cost Calculations ---
        const PV_saving = MEP * lastRate;
        const totalPanelCost = panelCost * nm;
        const maintenanceCost = annualCleaning;
        const totalCost = totalPanelCost + inverterCost + laborRate + maintenanceCost;
        const billAfterPV = monthlyBill - PV_saving;
        const paybackPeriod = totalCost / (PV_saving * 12);

        // --- 7. Output Results to HTML ---
        document.getElementById('result').innerHTML = `
            <h3>Monthly Bill Breakdown:</h3>
            <table border="1">
              <tr><th>kWh Usage</th><th>Rate (RM/kWh)</th><th>Cost (RM)</th></tr>
              ${breakdown.map(item => `<tr><td>${item.usage.toFixed(2)}</td><td>${item.rate.toFixed(3)}</td><td>${item.cost.toFixed(2)}</td></tr>`).join('')}
              <tr><th>Total Usage (kWh)</th><td colspan="2">${totalUsage.toFixed(2)}</td></tr>
              <tr><th>Actual Bill (RM)</th><td colspan="2">${monthlyBill.toFixed(2)}</td></tr>
              <tr><th>Bill Saved After PV Installation (RM)</th><td colspan="2">${PV_saving.toFixed(2)}</td></tr>
              <tr><th>Bill After PV Installation (RM)</th><td colspan="2">${billAfterPV.toFixed(2)}</td></tr>
            </table>

            <h3>PV System Calculation:</h3>
            <p>1. Parr_g (Minimum Guaranteed Power Output of the Array): ${Parr_g.toFixed(2)} W</p>
            <p>2. Parr_T (Temperature-Corrected Array Power Output): ${Parr_T.toFixed(2)} W</p>
            <p>3. Parr_net (Net Array Power Output after Wiring Losses): ${Parr_net.toFixed(2)} W</p>
            <p>4. PoutAC (Inverter Maximum AC Power Output): ${PoutAC.toFixed(2)} W</p>
            <p>5. Poutave (Average Daily Energy Production): ${Poutave.toFixed(2)} Wh/day</p>
            <p>6. MEP (Monthly Energy Production): ${MEP.toFixed(2)} kWh</p>
            <p>7. Total PV Panel Price: RM ${totalPanelCost.toFixed(2)}</p>
            <p>8. Total Inverter Price: RM ${inverterCost.toFixed(2)}</p>
            <p>9. Total Labor Price: RM ${laborRate.toFixed(2)}</p>
            <p>10. Total Maintenance Price: RM ${maintenanceCost.toFixed(2)}</p>
            <p>11. Total Cost: RM ${totalCost.toFixed(2)}</p>
            <p>12. Total Payback Period: ${paybackPeriod.toFixed(2)} years</p>
          `;
    }
    ```
    **Explanation of `calculatePVSystem()` function:**
    1. **Input Retrieval:** Gets values from HTML input fields using `document.getElementById()` and converts them to numbers using `parseFloat()`.
    2. **Input Validation:** Checks for invalid inputs (e.g., non-positive monthly bill, missing values).
    3. **Tariff Rates:** Defines electricity tariff blocks based on the selected region (Peninsular Malaysia or Sabah). *You need to fill in the actual tariff rates as per your data source.*
    4. **Monthly Bill Breakdown:** Calculates how the monthly bill is distributed across different tariff blocks to determine the effective electricity rate.
    5. **PV System Calculations:** Performs the core PV sizing calculations based on input parameters and standard formulas (these formulas are based on typical PV performance estimations).
    6. **Savings and Cost Calculations:** Calculates the monthly savings from PV, total system cost, and the payback period.
    7. **Output Results:** Formats the calculated results as HTML and inserts them into the `<div id="result">` area to display them on the page.

* **`calculateBatterySizing()` Function (Optional - if Battery Sizing is included):**
    If your calculator also includes battery sizing functionality, you will need a JavaScript function to handle these calculations. Here's an example `calculateBatterySizing()` function:

    ```javascript
    function calculateBatterySizing() {
        // --- 1. Input Retrieval ---
        const E = parseFloat(document.getElementById("dailyEnergy").value); // Daily Energy Consumption (Wh/day)
        const t = parseFloat(document.getElementById("Autonomy").value); // Autonomy (days)
        const V = parseFloat(document.getElementById("systemVoltage").value); // System Voltage (V)
        const top = parseFloat(document.getElementById("weightedOpTime").value); // Weighted Average Operating Time (hours/day)
        const to = parseFloat(document.getElementById("dischargeAutonomy").value); // Autonomy for Discharge Rate Calculation (days)
        const DODa = parseFloat(document.getElementById("dischargeDOD").value); // DOD for Discharge Rate Calculation
        const allowableDOD = parseFloat(document.getElementById("allowableDOD").value); // Allowable Depth of Discharge
        const CTr = parseFloat(document.getElementById("deratingFactor").value); // Temperature and Discharge Rate Derating Factor
        const Bout = parseFloat(document.getElementById("requiredBatteryOutput").value); // Required Battery Output (Ah)

        // --- 2. Calculations ---
        const batteryOutput = (E * t) / V; // Battery Size (Ah)
        const dischargeRate = (top * to) / DODa; // Average Discharge Rate (hours)
        const ratedBatteryCapacity = Bout / (allowableDOD * CTr); // Battery Bank Rated Capacity (Ah)

        // --- 3. Output Results to HTML ---
        const result = `
          Required Battery Output: ${batteryOutput.toFixed(2)} Ah<br>
          Average Discharge Rate: ${dischargeRate.toFixed(2)} hours<br>
          Battery Bank Rated Capacity: ${ratedBatteryCapacity.toFixed(2)} Ah
        `;
        document.getElementById("batteryResult").innerHTML = result;
    }
    ```

    **Explanation of `calculateBatterySizing()` function:**

    1. **Input Retrieval:**
        -  Gets input values from HTML elements using `document.getElementById()`.
        -  `parseFloat()` converts string values from input fields to floating-point numbers for calculations.
        - **Inputs include:**
            - `E`: Daily energy consumption in watt-hours (Wh/day).
            - `t`: Autonomy (number of days the system should operate without recharging).
            - `V`: System voltage in volts (V).
            - `top`: Weighted average operating time in hours per day.
            - `to`: Autonomy period used for discharge rate calculation (days).
            - `DODa`: Depth of discharge used for discharge rate calculation.
            - `allowableDOD`: Allowable depth of discharge for the battery bank.
            - `CTr`: Derating factor to account for temperature and discharge rate effects on battery capacity.
            - `Bout`: Required battery output in amp-hours (Ah).

    2. **Calculations:**
        - **`batteryOutput = (E * t) / V;`**: Calculates the required battery capacity in Amp-hours (Ah) based on daily energy consumption, autonomy, and system voltage. This is a simplified calculation for battery size.
        - **`dischargeRate = (top * to) / DODa;`**: Calculates the average discharge rate in hours. This calculation seems to be attempting to estimate a discharge time based on operating hours and autonomy, relative to a depth of discharge.  *(Note:  Review the formula's accuracy and purpose in your specific battery sizing context. It might need refinement based on the actual battery sizing methodology you intend to use).*
        - **`ratedBatteryCapacity = Bout / (allowableDOD * CTr);`**: Calculates the rated battery bank capacity in Amp-hours (Ah). This formula adjusts the required battery output (`Bout`) by the allowable depth of discharge and a derating factor to determine the total capacity needed.

    3. **Output Results to HTML:**
        -  Creates an HTML string (`result`) containing the calculated values:
            - Required Battery Output.
            - Average Discharge Rate.
            - Battery Bank Rated Capacity.
        -  Inserts this HTML string into the HTML element with the ID `batteryResult` using `document.getElementById("batteryResult").innerHTML = result;`, displaying the results on the webpage.

### 1.4 Testing in CodePen

* **Run and Test:** After writing your HTML, CSS (if any), and JavaScript code in CodePen, click the "Calculate" button to see the calculator in action.
* **Thoroughly Test:**  Test with different input values to ensure the calculations are accurate and the UI works as expected. Debug any errors in the CodePen console. Ensure the calculations are accurate and the interface functions correctly within CodePen's environment.

## 2. Exporting from CodePen

Once you are satisfied with your calculator in CodePen:

* **Direct Export (Recommended):** CodePen has a direct "Export as ZIP" feature in the Pen menu (usually found by clicking the "Pen" title at the top). This is the easiest way to export your project.
* **Manual Export (Alternative):**
    1. **Create Files:** If direct export isn't working or you prefer manual control, create three files locally: `index.html`, `style.css`, and `script.js`.
    2. **Copy Code:** Copy the HTML from the HTML section of CodePen and paste it into `index.html`. Do the same for CSS (into `style.css`) and JavaScript (into `script.js`). If you didn't use separate CSS or JS sections in CodePen, adjust accordingly (e.g., if CSS is inline in HTML, keep it there).
    3. **Create ZIP Archive:** Compress `index.html`, `style.css`, and `script.js` into a ZIP archive (e.g., `pv_calculator.zip`).

## 3. Hosting on Tiny.host

* **Go to Tiny.host:** Visit [https://tiiny.host](https://tiiny.host) (or your chosen free hosting provider).
* **Upload ZIP:** Drag and drop your `pv_calculator.zip` file onto the Tiiny.host webpage.
* **Get URL:** Tiiny.host will upload your ZIP and provide you with a public URL where your web app is hosted. Copy this URL.

## 4. Converting to APK with WebintoApp

* **Go to WebintoApp:** Visit [https://webtintoapp.com/](https://webtintoapp.com/) (or another website-to-APK converter of your choice).
* **Enter URL:** Paste the URL you obtained from Tiiny.host into the "Enter Website URL" field in WebintoApp.
* **Customize (Optional):**
    * **App Name:** Set the name of your app.
    * **Logo:** Upload a logo for your app.
    * **Other Settings:** Explore other customization options WebintoApp provides (splash screen, permissions, etc.). Add your app name, logo, and other customizations as desired.
* **Generate APK:** Click the button to convert your website into an APK. WebintoApp will generate and provide a download link for your APK file. Start the conversion process. WebintooApp will generate an APK file.

## 5. Installing the APK on Android

* **Download APK:** Download the generated APK file (usually named something like `your_app_name.apk` and located in an `android` folder if you get a ZIP from WebintoApp). It will be located inside the 'android' folder with the file name `your_app_name.apk`.
* **Enable Unknown Sources:** On your Android device, you may need to enable "Install from unknown sources" in **Settings > Security** or **Settings > Apps > Special app access > Install unknown apps** (the exact path may vary depending on your Android version). **Be cautious** and only enable this if you trust the source of the APK. You may need to enable this option in your Android device's settings to install APKs from sources other than the Google Play Store.  (Be cautious when enabling this and only install APKs from trusted sources).
* **Install APK:** Locate the downloaded APK file on your device using a file manager and tap on it to begin the installation process. Follow the on-screen prompts to install the app. Locate the downloaded APK file on your device and install it.

## Important Notes:

* **JavaScript Calculations Accuracy:** Ensure the formulas used in your `calculatePVSystem()` (and `calculateBatterySizing()`, if applicable) function are correct and aligned with standard PV sizing and ROI calculation methodologies. Verify your calculations with reliable sources. The core of your app's functionality will be the JavaScript code that performs the PV sizing and ROI calculations.  You'll need to research and implement the appropriate formulas.  Consider using a JavaScript library for complex mathematical operations if needed.
* **Free Hosting Limitations:** Tiiny.host and similar free hosting services are great for simple projects and testing, but they often have limitations: Free hosting services often have limitations (ads, storage space, bandwidth).  Be aware of these limitations.
    - **Ads:** Some free hosts may display ads on your app.
    - **Storage/Bandwidth Limits:**  There might be limits on storage space and monthly data transfer.
    - **Performance:** Performance might be slower compared to paid hosting.
    - **Uptime:** Uptime guarantees are usually not provided with free services.
* **Web-to-APK Converter Choices:** WebintoApp is just one option. Other website-to-APK converters exist (e.g.,  AppsGeyser,  WebViewGold if you want to purchase a more feature-rich solution). Explore alternatives to find one that best suits your needs and budget. There are several alternative website-to-APK converters available. Explore different options to find one that suits your needs.
* **Web-based Deployment:** This basic guide focuses on APK conversion. Remember the application can also be used directly as a web application accessible via the Tiny.host URL.
* **Advanced Features & Native Android Development:**  This guide provides a way to quickly wrap a web app into an APK. For more advanced features that require native device access (camera, sensors, offline capabilities, push notifications, better performance), learning native Android development (using Java or Kotlin) or cross-platform frameworks like React Native or Flutter would be necessary. This basic guide creates a simple web app wrapped in an APK.  For more advanced features (native device access, offline functionality), you'll need to explore native Android development.

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

## License

**In short, you are free to use, modify, and distribute this software for both commercial and non-commercial purposes, as long as you include the original copyright and license notice.**
