document.getElementById('loanForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const income = parseFloat(document.getElementById('income').value);
    const currentAmount = parseFloat(document.getElementById('currentAmount').value);
    const loanAmount = parseFloat(document.getElementById('loanAmount').value);
    const creditHistory = document.getElementById('creditHistory').value;
    const lastDepositDate = new Date(document.getElementById('lastDepositDate').value);
    const lastLoanDate = new Date(document.getElementById('lastLoanDate').value);
    let loanRepaymentPeriodStart = new Date(document.getElementById('loanRepaymentPeriodStart').value);
    let loanRepaymentPeriodEnd = new Date(document.getElementById('loanRepaymentPeriodEnd').value);
    const accountType = document.getElementById('accountType').value;

    let points = 0;

    // Calculate the maximum loan amount
    const maxLoanAmount = income * 0.45;

    // Check if current amount in account is more than loan amount required
    if (currentAmount >= loanAmount) {
        points += 10;
    } else {
        points -= 10;
    }

   // Validate credit history
   if (isNaN(creditHistory)) {
    document.getElementById('creditHistoryError').textContent = 'Please select a credit history.';
} else {
    if (creditHistory >= 6) {
        points += 10;
    }
}


    // Last deposit date within a month
    const currentDate = new Date();
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(currentDate.getMonth() - 1);
    if (lastDepositDate > oneMonthAgo) {
        points += 5;
    }

    // Last loan collection date more than 6 months ago
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(currentDate.getMonth() - 6);
    if (lastLoanDate < sixMonthsAgo) {
        points += 10;
    }

   // Validate loan repayment period dates
   if (isNaN(loanRepaymentPeriodStart.getTime()) || isNaN(loanRepaymentPeriodEnd.getTime())) {
    document.getElementById('loanRepaymentPeriodStartError').textContent = 'Please enter valid loan repayment period start and end dates.';
    document.getElementById('loanRepaymentPeriodEndError').textContent = '';
} else {
    if ((loanRepaymentPeriodEnd - loanRepaymentPeriodStart) / (1000 * 60 * 60 * 24) <= 180) {
        points += 5;
    }
}

    // Account type
    if (accountType === 'current') {
        points += 10;
    } else if (accountType === 'savings') {
        points += 5;
    }

    let resultText;
    if (points > 30) {
        resultText = `Congratulations!,You qualify for the loan .`;
    } else {
        resultText = `Sorry,You do not qualify for the loan. `;
    }

    document.getElementById('result').innerText = resultText;
});
