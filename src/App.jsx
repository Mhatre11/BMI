import { useState, useMemo } from "react";
import "./App.css";

function App() {
  const [weight, setWeight] = useState(40);
  const [height, setHeight] = useState(140);
  const [category, setCategory] = useState(null);

  const onWeightChange = (event) => {
    setWeight(parseInt(event.target.value));
  };

  const onHeightChange = (event) => {
    setHeight(parseInt(event.target.value));
  };

  const bmiInfo = useMemo(() => {
    const calculateHeight = height / 100;
    const bmi = weight / (calculateHeight * calculateHeight);
    let bmiCategory;
    let color;

    if (bmi < 18.5) {
      bmiCategory = "Underweight";
      color = "#FF9800"; // Orange
    } else if (bmi >= 18.5 && bmi <= 24.9) {
      bmiCategory = "Healthy Weight";
      color = "#4CAF50"; // Green
    } else if (bmi >= 25 && bmi <= 29.9) {
      bmiCategory = "Overweight";
      color = "#FFC107"; // Yellow
    } else {
      bmiCategory = "Obese";
      color = "#F44336"; // Red
    }

    setCategory(bmiCategory);
    return { value: bmi.toFixed(1), color };
  }, [weight, height]);

  return (
    <div className="app-container">
      <header>
        <h1>BMI Calculator</h1>
      </header>
      <main className="calculator">
        <section className="input-group">
          <label htmlFor="weight">Weight (kg)</label>
          <div className="slider-container">
            <input
              type="range"
              id="weight"
              step="1"
              min="40"
              max="200"
              className="slider"
              value={weight}
              onChange={onWeightChange}
            />
            <span className="slider-value">{weight}</span>
          </div>
        </section>

        <section className="input-group">
          <label htmlFor="height">Height (cm)</label>
          <div className="slider-container">
            <input
              type="range"
              id="height"
              min="140"
              max="240"
              className="slider"
              value={height}
              onChange={onHeightChange}
            />
            <span className="slider-value">{height}</span>
          </div>
        </section>

        <section className="output-group">
          <h2>Your BMI</h2>
          <p className="bmi-value" style={{ color: bmiInfo.color }}>
            {bmiInfo.value}
          </p>
          {category && <p className="bmi-category">({category})</p>}
        </section>
      </main>
      <footer>
        <p>&copy; 2025 BMI Calculator</p>
      </footer>
    </div>
  );
}

export default App;