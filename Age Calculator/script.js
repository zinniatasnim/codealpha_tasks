document.getElementById("calculate").addEventListener("click", function () {
    const dob = new Date(document.getElementById("date").value);
    const now = new Date();
    const diff = Math.abs(now - dob);
    
    const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
    const months = Math.floor((diff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));
    const days = Math.floor((diff % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));

    const result = `Age: ${years} years, ${months} months, ${days} days`;
    document.querySelector(".result").textContent = result;
});
