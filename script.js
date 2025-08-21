// --- Mobile Menu Toggle ---
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// --- Function to toggle the technical details visibility ---
function toggleDetails() {
    const details = document.getElementById('technical-details');
    const btn = document.getElementById('toggle-details-btn');
    if (details.style.display === 'none' || details.style.display === '') {
        details.style.display = 'block';
        btn.textContent = 'Hide Technical Details';
    } else {
        details.style.display = 'none';
        btn.textContent = 'See More Technical Details';
    }
}

// --- PV System Calculator ---
function calculatePVSystem() {
    // Grab all the values from the form
    const Pmp = parseFloat(document.getElementById('Pmp').value);
    const Pg = parseFloat(document.getElementById('Pg').value) / 100;
    const nm = parseFloat(document.getElementById('nm').value);
    const PSH = parseFloat(document.getElementById('PSH').value);
    const Avetemp = parseFloat(document.getElementById('Avetemp').value);
    const STC = parseFloat(document.getElementById('STC').value);
    const Ctemp = parseFloat(document.getElementById('Ctemp').value) / 100;
    const wiringLoss = parseFloat(document.getElementById('wiringLoss').value) / 100;
    const InvEff = parseFloat(document.getElementById('InvEff').value) / 100;
    const InvMPPT = parseFloat(document.getElementById('InvMPPT').value) / 100;
    const monthlyBill = parseFloat(document.getElementById('monthlyBill').value);
    const panelCost = parseFloat(document.getElementById('panelCost').value);
    const inverterCost = parseFloat(document.getElementById('inverterCost').value);
    const laborRate = parseFloat(document.getElementById('laborRate').value);
    const annualCleaning = parseFloat(document.getElementById('annualCleaning').value);
    const region = document.getElementById('region').value;

    if ([Pmp, nm, PSH, monthlyBill, panelCost, inverterCost, laborRate, annualCleaning].some(isNaN) || region === "") {
        alert("Hold up, bro! Please fill out all required fields before calculating.");
        return;
    }

    // --- All Calculations ---
    const Parr_g = Pmp * Pg * nm;
    const PVcon = Parr_g * ((Avetemp - STC) * Ctemp);
    const Parr_T = Parr_g - PVcon;
    const Parr_net = Parr_T * (1 - wiringLoss);
    const PoutAC = Parr_net * InvEff * InvMPPT;
    const Poutave_daily_Wh = PoutAC * PSH;
    const MEP_kWh = (Poutave_daily_Wh * 30) / 1000;

    let tariffBlocks = region === "peninsular" ? [
        { name: "1 - 200", limit: 200, rate: 0.218 }, { name: "201 - 300", limit: 100, rate: 0.334 },
        { name: "301 - 600", limit: 300, rate: 0.516 }, { name: "601 - 900", limit: 300, rate: 0.546 },
        { name: "901 onwards", limit: Infinity, rate: 0.571 },
    ] : [
        { name: "1 - 100", limit: 100, rate: 0.175 }, { name: "101 - 200", limit: 100, rate: 0.185 },
        { name: "201 - 300", limit: 100, rate: 0.33 }, { name: "301 - 500", limit: 200, rate: 0.445 },
        { name: "501 - 1000", limit: 500, rate: 0.45 }, { name: "1001 onwards", limit: Infinity, rate: 0.47 },
    ];

    let remainingBill = monthlyBill;
    let billBreakdown = [];
    for (const block of tariffBlocks) {
        const blockCostLimit = block.limit * block.rate;
        if (remainingBill > blockCostLimit && block.limit !== Infinity) {
            remainingBill -= blockCostLimit;
            billBreakdown.push({ name: block.name, usage: block.limit, rate: block.rate, cost: blockCostLimit });
        } else {
            const usageInBlock = remainingBill / block.rate;
            billBreakdown.push({ name: block.name, usage: usageInBlock, rate: block.rate, cost: remainingBill });
            break;
        }
    }
    
    const highestRateBlock = billBreakdown[billBreakdown.length - 1];
    const monthlySaving = MEP_kWh * highestRateBlock.rate;
    const totalOverallCost = (panelCost * nm) + inverterCost + laborRate + annualCleaning;
    const paybackPeriodYears = totalOverallCost / (monthlySaving * 12);

    // --- Build the HTML for the Export (Savings) Table ---
    let exportTableRows = '';
    for (const block of tariffBlocks) {
        if (block.name === highestRateBlock.name) {
            // This is the block where savings happen
            exportTableRows += `<tr><td>${block.name}</td><td>${MEP_kWh.toFixed(2)}</td><td>${block.rate.toFixed(3)}</td><td>${monthlySaving.toFixed(2)}</td></tr>`;
        } else {
            // All other blocks have 0 savings
            exportTableRows += `<tr><td>${block.name}</td><td>0.00</td><td>${block.rate.toFixed(3)}</td><td>0.00</td></tr>`;
        }
    }

    // --- Build the final output HTML ---
    const resultDiv = document.getElementById('result');
    resultDiv.style.display = 'block';
    resultDiv.innerHTML = `
        <h3>PV System Analysis</h3>
        <p><strong>Monthly Energy Production (MEP):</strong> <span><span class="highlight-result">${MEP_kWh.toFixed(2)} kWh</span></span></p>
        <p><strong>Estimated Monthly Savings:</strong> <span><span class="highlight-result">RM ${monthlySaving.toFixed(2)}</span></span></p>
        <p><strong>Your New Estimated Monthly Bill:</strong> <span><span class="highlight-result">RM ${(monthlyBill - monthlySaving).toFixed(2)}</span></span></p>
        
        <h3>Investment Breakdown</h3>
        <p><strong>Total Overall Costing:</strong> <span><span class="highlight-result">RM ${totalOverallCost.toFixed(2)}</span></span></p>
        <p><strong>Payback Period:</strong> <span><span class="highlight-result">${paybackPeriodYears.toFixed(2)} years</span></span></p>
        
        <button type="button" class="btn btn-secondary" id="toggle-details-btn" onclick="toggleDetails()">See More Technical Details</button>

        <div id="technical-details" style="display:none; margin-top: 1.5rem; padding-top: 1.5rem; border-top: 1px solid #ddd;">
            
            <h4>PV Array Calculation Steps</h4>
            <p><strong>PV Panel Rated DC Power Output:</strong> <span>${Pmp.toFixed(2)} W</span></p>
            <p><strong>Manufacturer Power Guarantee:</strong> <span>${(Pg * 100).toFixed(0)}%</span></p>
            <p><strong>Number of Panel in Array:</strong> <span>${nm}</span></p>
            <p><strong>Array Guarantee Power Output:</strong> <span>${Parr_g.toFixed(2)} W</span></p>
            <hr>
            <p><strong>Array Avg. Operating Temperature:</strong> <span>${Avetemp.toFixed(2)} °C</span></p>
            <p><strong>Temperature Coefficient for Power:</strong> <span>${(Ctemp * 100).toFixed(2)} %/°C</span></p>
            <p><strong>Standard Test Condition Temperature:</strong> <span>${STC.toFixed(2)} °C</span></p>
            <p><strong>Temperature-Corrected Array Power:</strong> <span>${Parr_T.toFixed(2)} W</span></p>
            <hr>
            <p><strong>Array Wiring and Mismatch Losses:</strong> <span>${(wiringLoss * 100).toFixed(0)}%</span></p>
            <p><strong>Net Array Power Output:</strong> <span>${Parr_net.toFixed(2)} W</span></p>
            
            <h4>Inverter & Energy Production</h4>
            <p><strong>Inverter Power Conversion Efficiency:</strong> <span>${(InvEff * 100).toFixed(0)}%</span></p>
            <p><strong>Inverter MPPT Efficiency:</strong> <span>${(InvMPPT * 100).toFixed(0)}%</span></p>
            <p><strong>Inverter Maximum AC Power Output:</strong> <span>${PoutAC.toFixed(2)} W</span></p>
            <hr>
            <p><strong>Average Daily Insolation (PSH):</strong> <span>${PSH} hours</span></p>
            <p><strong>Average Daily Energy Production:</strong> <span>${Poutave_daily_Wh.toFixed(2)} Wh/day</span></p>

            <h4>Total Import Charge (Consumed)</h4>
            <table>
                <thead>
                    <tr><th>Block</th><th>kWh Usage</th><th>Rate (RM/kWh)</th><th>Amount (RM)</th></tr>
                </thead>
                <tbody>
                    ${billBreakdown.map(item => `<tr><td>${item.name}</td><td>${item.usage.toFixed(2)}</td><td>${item.rate.toFixed(3)}</td><td>${item.cost.toFixed(2)}</td></tr>`).join('')}
                    <tr><td><strong>Total</strong></td><td><strong>${billBreakdown.reduce((sum, item) => sum + item.usage, 0).toFixed(2)}</strong></td><td>-</td><td><strong>${monthlyBill.toFixed(2)}</strong></td></tr>
                </tbody>
            </table>

            <h4>Total Export Charge (Saved)</h4>
            <table>
                <thead>
                    <tr><th>Block</th><th>kWh Usage (Saved)</th><th>Rate (RM/kWh)</th><th>Amount (RM)</th></tr>
                </thead>
                <tbody>
                    ${exportTableRows}
                    <tr><td><strong>Total</strong></td><td><strong>${MEP_kWh.toFixed(2)}</strong></td><td>-</td><td><strong>${monthlySaving.toFixed(2)}</strong></td></tr>
                </tbody>
            </table>
        </div>
    `;
}

// --- Battery Sizing Calculator (no changes) ---
function calculateBatterySizing() {
    const dailyEnergy = parseFloat(document.getElementById("dailyEnergy").value);
    const autonomyDays = parseFloat(document.getElementById("Autonomy").value);
    const systemVoltage = parseFloat(document.getElementById("systemVoltage").value);
    const allowableDOD = parseFloat(document.getElementById("allowableDOD").value);
    const deratingFactor = parseFloat(document.getElementById("deratingFactor").value);

    if ([dailyEnergy, autonomyDays, systemVoltage, allowableDOD, deratingFactor].some(isNaN)) {
        alert("Yo, check your numbers for the battery sizing!");
        return;
    }

    const totalEnergyNeeded = dailyEnergy * autonomyDays;
    const requiredCapacityAh = totalEnergyNeeded / systemVoltage;
    const finalBatterySizeAh = requiredCapacityAh / (allowableDOD * deratingFactor);

    const batteryResultDiv = document.getElementById("batteryResult");
    batteryResultDiv.style.display = 'block';
    batteryResultDiv.innerHTML = `
      <h3>Battery Sizing Results</h3>
      <p><strong>Required Battery Capacity (Ah):</strong> <span class="highlight-result">${finalBatterySizeAh.toFixed(2)} Ah</span></p>
      <p>This is the total rated capacity your battery bank needs to provide power for ${autonomyDays} days without charging, considering a ${allowableDOD * 100}% depth of discharge.</p>
    `;
}