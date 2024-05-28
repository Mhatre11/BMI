import { useState, useMemo, useRef } from "react";
import "./App.css";

function App() {
  // State variables for weight, height, and category (BMI result)
  const [weight, setWeight] = useState(40);
  const [height, setHeight] = useState(140);
  const [category, setCategory] = useState(null); // Initially category is unknown

  let colorRef = useRef("");

  const onWeightChange = (event) => {
    setWeight(event.target.value);
  };
  const onHeightChange = (event) => {
    setHeight(event.target.value);
  };

  const output = useMemo(() => {
    const calculateHeight = height / 100;
    const bmi = weight / (calculateHeight * calculateHeight);

    let bmiCategory;
    if (bmi < 18.5) {
      bmiCategory = "Underweight";
      colorRef.current = "orange";
    } else if (bmi >= 18.5 && bmi <= 24.9) {
      bmiCategory = "Healthy Weight";
      colorRef.current = "green";
    } else if (bmi >= 25 && bmi <= 29.9) {
      bmiCategory = "Overweight";
      colorRef.current = "yellow";
    } else {
      bmiCategory = "Obese";
      colorRef.current = "red";
    }
    setCategory(bmiCategory);
    return bmi.toFixed(1);
  }, [weight, height]);

  return (
    <>
      <main>
        <h1>BMI Calculator</h1>
        <div className="container">
          <p id="weight">Weight : {weight}Kg</p>
          <input
            type="range"
            step="1"
            min="40"
            max="200"
            className="slider"
            onChange={onWeightChange}
          />
          <p id="height">Height : {height}Cm</p>
          <input type="range" min="140" max="240" onChange={onHeightChange} />
        </div>
        <div className="output-section">
          <p>Your BMI is : </p>
          <p className="outputs" style={{ color: colorRef.current }}>
            {output}
          </p>
          <p>{category}</p>
        </div>
      </main>
    </>
  );
}
export default App;
