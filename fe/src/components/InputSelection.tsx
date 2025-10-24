import React, { useState } from 'react';

const styles = {
  inputSection: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    marginBottom: '20px'
  },
  inputRow: {
    display: 'flex',
    gap: '15px',
    marginBottom: '15px'
  },
  input: {
    flex: 1,
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px'
  },
  select: {
    flex: 1,
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px',
    backgroundColor: 'white'
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#1976d2',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px'
  }
};

export const InputSection: React.FC = () => {
    const [numberValue, setNumberValue] = useState('');
    const [selectorValue, setSelectorValue] = useState('');
    const [textValue, setTextValue] = useState('');

    const handleAddRow = () => {
        if (numberValue && selectorValue && textValue) {
            // TODO dispatch add row
            setNumberValue('');
            setSelectorValue('');
            setTextValue('');
        }
    };

    return (
        <div style={styles.inputSection}>
            <div style={styles.inputRow}>
                <input
                    type="number"
                    placeholder="Number"
                    value={numberValue}
                    onChange={(e) => setNumberValue(e.target.value)}
                    style={styles.input}
                />
                
                <select
                    value={selectorValue}
                    onChange={(e) => setSelectorValue(e.target.value)}
                    style={styles.select}
                    >
                    <option value="">Select option...</option>
                    <option value="Option 1">Option 1</option>
                    <option value="Option 2">Option 2</option>
                    <option value="Option 3">Option 3</option>
                </select>
                
                <input
                    type="text"
                    placeholder="Free Text"
                    value={textValue}
                    onChange={(e) => setTextValue(e.target.value)}
                    style={styles.input}
                />
            </div>
            
            <button 
                style={{
                ...styles.button,
                opacity: (!numberValue || !selectorValue || !textValue) ? 0.5 : 1,
                cursor: (!numberValue || !selectorValue || !textValue) ? 'not-allowed' : 'pointer'
                }}
                onClick={handleAddRow}
                disabled={!numberValue || !selectorValue || !textValue}
            >
                Add Row
            </button>
        </div>
    );
};