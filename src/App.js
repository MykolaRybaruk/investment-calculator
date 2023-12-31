 
import { useState } from 'react';
import Header from './components/Header/Header';
import ResultTable from './components/ResultsTable/ResultsTable';
import UserInput from './components/UserInput/UserInput';

function App() {
  const [userInput, setUserInput] = useState(null);

  const calculateHandler = (userInput) => {
    setUserInput(userInput);
  };

  const yearlyData = [];

  if (userInput) {
    let currentSavings = +userInput['current-savings'];
    const yearlyContribution = +userInput['yearly-contribution'];
    const expectedReturn = +userInput['expected-return'] / 100;
    const duration = +userInput['duration'];
  
    for (let i = 0; i < duration; i++) {
      const yearlyInterest = currentSavings * expectedReturn;
      currentSavings += yearlyInterest + yearlyContribution;
      yearlyData.push({
        // feel free to change the shape of the data pushed to the array!
        year: i + 1,
        yearlyInterest: yearlyInterest,
        savingsEndOfYear: currentSavings,
        yearlyContribution: yearlyContribution,
      });
    } 
  }

  return (
    <div>
      <Header />
      <UserInput onCalculate={calculateHandler}/>
      {!userInput && <p style={{display: 'flex', justifyContent: "center"}}>Nothing to calculate yet...</p>}
      {userInput && <ResultTable data={yearlyData} initialInvestment={userInput['current-savings']}/>}
    </div>
  )
}

export default App;
