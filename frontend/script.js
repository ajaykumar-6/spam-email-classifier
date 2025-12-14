const dom = {
    textArea: document.getElementById("emailText"),
    predictBtn: document.getElementById("predictBtn"),
    btnText: document.querySelector(".btn-text"),
    loader: document.querySelector(".loader"),
    result: document.getElementById("result"),
    statusIcon: document.getElementById("statusIcon"),
    predLabel: document.getElementById("predictionLabel"),
    confText: document.getElementById("confidenceText"),
    barFill: document.getElementById("barFill"),
    percLabel: document.getElementById("percentageLabel"),
    errorMsg: document.getElementById("error-msg"),
    themeBtn: document.getElementById("toggleTheme"),
    charCount: document.querySelector(".char-count")
};

dom.themeBtn.addEventListener("click", toggleTheme);
dom.textArea.addEventListener("input", updateCharCount);

// Theme
function toggleTheme() {
    const theme = document.body.getAttribute("data-theme") === "dark" ? "light" : "dark";
    document.body.setAttribute("data-theme", theme);
    dom.themeBtn.innerHTML = theme === "dark"
        ? '<i class="fa-solid fa-sun"></i>'
        : '<i class="fa-solid fa-moon"></i>';
}

// Text utils
function updateCharCount() {
    const len = dom.textArea.value.length;
    dom.charCount.innerText = `${len} characters`;

    // ✅ HIDE ERROR WHEN USER TYPES
    if (len > 0) {
        dom.errorMsg.classList.add("hidden");
    }
}

async function pasteText() {
    try {
        const text = await navigator.clipboard.readText();
        dom.textArea.value = text;
        updateCharCount();
        dom.errorMsg.classList.add("hidden"); // ✅ add
        dom.textArea.focus();
    } catch (err) {
        showError("Failed to read clipboard permission.");
    }
}
function clearText() {
    dom.textArea.value = "";
    updateCharCount();
    dom.result.classList.add("hidden");
}

// Prediction
async function predictSpam() {
    const text = dom.textArea.value.trim();
    if (!text) return showError("Please enter email content.");

    setLoading(true);
    dom.result.classList.add("hidden");
    dom.barFill.style.width = "0%";

    try {
        const response = await fetch("https://spam-email-classifier-ibt6.onrender.com/predict", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email_text: text })
        });

        const data = await response.json();
        displayResult(data);

    } catch {
        showError("Backend not reachable.");
    } finally {
        setLoading(false);
    }
}

function displayResult(data) {
    dom.errorMsg.classList.add("hidden");
    dom.result.classList.remove("hidden");
    dom.result.className = "result-container";

    const prob = Math.round(data.probability * 100);
    dom.percLabel.innerText = `${prob}%`;
    dom.barFill.style.width = `${prob}%`;

    let confidenceClass =
        prob < 30 ? "low" :
        prob < 60 ? "medium" :
        prob < 80 ? "high" : "very-high";

    dom.result.classList.add(confidenceClass);

    if (data.prediction === "spam") {
        dom.statusIcon.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i>';
        dom.predLabel.innerText = "Spam Detected";
        dom.confText.innerText = "High risk email";
    } else {
        dom.statusIcon.innerHTML = '<i class="fa-solid fa-check"></i>';
        dom.predLabel.innerText = "Safe Email";
        dom.confText.innerText = "Looks legitimate";
    }
}

function setLoading(state) {
    dom.predictBtn.disabled = state;
    dom.loader.classList.toggle("hidden", !state);
    dom.btnText.innerText = state ? "Analyzing..." : "Analyze Email";
}

function showError(msg) {
    dom.errorMsg.querySelector("span").innerText = msg;
    dom.errorMsg.classList.remove("hidden");
}
