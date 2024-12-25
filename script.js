document.addEventListener("DOMContentLoaded", function () {
    const addRowBtn = document.getElementById("add-row"); // Button to add more rows
    const removeRowBtn = document.getElementById("remove-row"); // Button to remove rows
    const tableBody = document.getElementById("table-body"); // Table body where rows are added
    const totalCostElement = document.getElementById("total-cost"); // Element for total cost
    const taxInput = document.getElementById("tax"); // Tax input
    const printBtn = document.getElementById("print-btn"); // Button to print the form
    const form = document.getElementById("form"); // Form element

    // Initialize row counter
    let rowCounter = 4;

    // Add row to the table
    addRowBtn.addEventListener("click", function () {
        if (rowCounter < 20) {
            rowCounter++;
            const row = document.createElement("tr");
            row.innerHTML = `
                <td><input type="text" class="description" placeholder="Description"></td>
                <td><input type="number" class="quantity" placeholder="Quantity" min="1"></td>
                <td><input type="number" class="unit-price" placeholder="Unit Price" min="0"></td>
                <td><input type="number" class="cost" placeholder="Cost" disabled></td>
            `;
            tableBody.appendChild(row);
        }
    });

    // Remove row from the table
    removeRowBtn.addEventListener("click", function () {
        if (rowCounter > 4) {
            tableBody.removeChild(tableBody.lastChild);
            rowCounter--;
        }
    });

    // Calculate the cost for each row
    function calculateRowCost() {
        const rows = tableBody.querySelectorAll("tr");
        rows.forEach((row) => {
            const quantity = row.querySelector(".quantity").value;
            const unitPrice = row.querySelector(".unit-price").value;
            const costInput = row.querySelector(".cost");

            if (quantity && unitPrice) {
                costInput.value = (quantity * unitPrice).toFixed(2);
            } else {
                costInput.value = "";
            }
        });
    }

    // Calculate the total cost
    function calculateTotalCost() {
        let totalCost = 0;
        const rows = tableBody.querySelectorAll("tr");
        rows.forEach((row) => {
            const cost = parseFloat(row.querySelector(".cost").value) || 0;
            totalCost += cost;
        });

        // Apply tax if any
        const taxPercentage = parseFloat(taxInput.value) || 0;
        const taxAmount = (totalCost * taxPercentage) / 100;
        totalCost += taxAmount;

        totalCostElement.textContent = `Total: $${totalCost.toFixed(2)}`;
    }

    // Update cost and total on user input
    tableBody.addEventListener("input", function () {
        calculateRowCost();
        calculateTotalCost();
    });

    // Handle form submission (you can adjust this for your needs)
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        alert("Form submitted!");
    });

    // Print the form
    printBtn.addEventListener("click", function () {
        window.print();
    });
});
