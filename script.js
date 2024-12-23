document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  // Animate the section
  gsap.from(".solutions-section", {
    opacity: 0,
    y: 100,
    duration: 1.5,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".solutions-section",
      start: "top center",
    },
  });

  // Animate solution items
  gsap.from(".solution-item", {
    y: 50,
    opacity: 0,
    duration: 1,
    stagger: 0.3,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".solutions-section",
      start: "top center+=100",
      toggleActions: "play none none reverse",
    },
  });

  // Vertical line animation
  gsap.to(".vertical-line", {
    height: "100%",
    duration: 1.5,
    scrollTrigger: {
      trigger: ".solutions-section",
      start: "top center",
      end: "bottom center",
      scrub: true,
    },
  });
});









// -------------------------------------------
const loanType = document.getElementById('loanType');
const amountRange = document.getElementById('amountRange');
const tenureRange = document.getElementById('tenureRange');
const amountValue = document.getElementById('amountValue');
const tenureValue = document.getElementById('tenureValue');
const emiResult = document.getElementById('emiResult');
const loanDetailsList = document.getElementById('loanDetailsList');

const loanData = {
    'short-term': {
        tenure: [6, 9, 12],
        maxAmount: 100000,
        interestRate: 0.02, // Approximate monthly interest
        details: [
            'Tenure: Choose from 6, 9, or 12 months.',
            'Amount: Up to ₹1,00,000 and or above with the Credit Partner entities*',
            'Approval feedback within 1 to 24 hours',
            'Flexibility: Pay off the loan in full or make partial payment.',
        ],
    },
    'instant-credit': {
        tenure: [5, 10],
        maxAmount: 50000,
        interestRate: [0.04, 0.06], // 2% for 5 days, 3% for 10 days
        details: [
            'Tenure: 5 or 10 days.',
            'Amount: From ₹10k–₹50k initially',
            'Interest: 2% for 5 days, 3% for 10 days.',
            'Repayment: Custom or partial payments are not allowed.',
        ],
    },
    'credit-line': {
        tenure: [6, 12],
        maxAmount: 150000,
        interestRate: 0.015, // Approximate monthly interest
        details: [
            'Eligibility: Accessible to users with a top credit rating.',
            'Tenure: Up to 6 & 12 months.',
            'Amount: ₹10,000–₹1,50,000',
            'Monthly auto-debits for interest only during tenure.',
        ],
    },
};

function updateUI() {
    const selectedLoan = loanType.value;
    const data = loanData[selectedLoan];

    // Update sliders
    amountRange.max = data.maxAmount;
    tenureRange.max = Math.max(...data.tenure);
    tenureRange.min = Math.min(...data.tenure);

    // Update values
    amountValue.textContent = `₹${amountRange.value}`;
    tenureValue.textContent = `${tenureRange.value} Months`;

    // Calculate EMI
    const amount = parseInt(amountRange.value, 10);
    const tenure = parseInt(tenureRange.value, 10);
    const rate = data.interestRate;

    let emi;
    if (selectedLoan === 'instant-credit') {
        const interestRate = tenure === 5 ? rate[0] : rate[1];
        emi = amount + amount * interestRate;
    } else {
        const monthlyRate = rate;
        emi = (amount * monthlyRate * Math.pow(1 + monthlyRate, tenure)) /
            (Math.pow(1 + monthlyRate, tenure) - 1);
    }

    emiResult.textContent = `₹${emi.toFixed(2)}`;

    // Update details
    loanDetailsList.innerHTML = '';
    data.details.forEach((detail) => {
        const li = document.createElement('li');
        li.textContent = detail;
        loanDetailsList.appendChild(li);
    });
}

// Event Listeners
loanType.addEventListener('change', updateUI);
amountRange.addEventListener('input', updateUI);
tenureRange.addEventListener('input', updateUI);

// Initial UI update
updateUI();



