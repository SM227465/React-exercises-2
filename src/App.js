import { useState } from 'react';

function App() {
  return <TipCalculator />;
}

function TipCalculator() {
  const [bill, setBill] = useState('');
  const [percentage1, setPercentage1] = useState(0);
  const [percentage2, setPercentage2] = useState(0);

  const tip = bill * ((percentage1 + percentage2) / 2 / 100);

  function handleReset() {
    setBill('');
    setPercentage1(0);
    setPercentage2(0);
  }

  return (
    <div>
      <BillInput bill={bill} onSetBill={setBill} />
      <SelectPercentage bill={bill} onSelect={setPercentage1} percentage={percentage1}>
        How did you like the service?
      </SelectPercentage>
      <SelectPercentage bill={bill} percentage={percentage2} onSelect={setPercentage2}>
        How did your friend like the service?
      </SelectPercentage>
      {bill && (
        <>
          <Output bill={bill} tip={tip} />
          <Reset onReset={handleReset} />
        </>
      )}
    </div>
  );
}

function BillInput(props) {
  const { bill, onSetBill } = props;
  return (
    <div style={{ display: 'flex', marginBottom: '10px' }}>
      <label>How much was the bill?</label>
      <input
        placeholder='Bill value'
        type='number'
        value={bill}
        onChange={(event) => onSetBill(Number(event.target.value))}
      />
    </div>
  );
}

function SelectPercentage(props) {
  const { children, bill, percentage, onSelect } = props;

  return (
    <div style={{ display: 'flex' }}>
      <label>{children}</label>
      <select value={percentage} onChange={(event) => onSelect(Number(event.target.value))}>
        <option value={0}>Dissatisfied (0%)</option>
        <option value={5}>It was okay (5%)</option>
        <option value={10}>It was good (10%)</option>
        <option value={20}>Absolutely amazing (20%)</option>
      </select>
    </div>
  );
}

function Output(props) {
  const { bill, tip } = props;
  return (
    <h3>
      You pay ${bill + tip} (${bill} + ${tip} tip)
    </h3>
  );
}

function Reset(props) {
  const { onReset } = props;
  return <button onClick={onReset}>Reset</button>;
}

export default App;
