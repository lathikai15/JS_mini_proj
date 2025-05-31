function calculateBMI() {
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value) / 100; // Convert cm to meters

    if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
        alert("Please enter valid weight and height values.");
        return;
    }

    const bmi = weight / (height * height);
    const resultElement = document.getElementById('result');
    const categoryElement = document.getElementById('category');
    
    resultElement.textContent = bmi.toFixed(2); // Display BMI with 2 decimal places

    // Determine BMI category
    if (bmi < 18.5) {
        categoryElement.textContent = "Underweight";
    } else if (bmi >= 18.5 && bmi < 24.9) {
        categoryElement.textContent = "Normal weight";
    } else if (bmi >= 25 && bmi < 29.9) {
        categoryElement.textContent = "Overweight";
    } else {
        categoryElement.textContent = "Obesity";
    }
}
