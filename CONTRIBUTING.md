## Contributing

**We warmly welcome contributions of all kinds!** Whether you are a seasoned developer, a solar energy expert, a UX/UI designer, or simply someone passionate about renewable energy, your input is valuable.

**Here's how you can contribute:**

* **Report Bugs:** If you encounter any issues or unexpected behavior, please describe the problem in detail.
* **Suggest New Features:**  Have an idea for a new feature or improvement? Discuss your suggestion.
* **Code Contributions:**  Want to contribute code?  Please follow these steps:
    1. **Fork the repository.**
    2. **Create a new branch** for your feature or bug fix 
    3. **Make your changes** and commit them with clear and concise commit messages.
    4. **Test your changes** thoroughly.
    5. **Submit a pull request** to the `main` branch with a detailed description of your changes.
  
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


# How it was made: PV Sizing & ROI Calculator

This guide explains how Ibuild, deploy, and contribute to the PV Sizing & ROI Calculator app. We'll use CodePen for development, firebase for hosting the web app, and WebintoApp to convert it into an Android APK.

**We warmly welcome contributions of all kinds!** Whether you are a seasoned developer, a solar energy expert, a UX/UI designer, or simply someone passionate about renewable energy, your input is valuable.

## 1. Building the App on CodePen

* **Create a New Pen:**
    * Go to [codepen.io](https://codepen.io) and create a new pen. This will be your development environment.
* **Structure Your Pen:**
    * CodePen pens have three main sections: HTML, CSS, and JavaScript. We will use these to build our calculator.

### 1.1 HTML Structure (index.html)

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



This roadmap is flexible and will be shaped by community feedback and contributions.

## License

**In short, you are free to use, modify, and distribute this software for both commercial and non-commercial purposes, as long as you include the original copyright and license notice.**
