import React from 'react';
import './App.css';
import PasswordGenerator from './PasswordGenerator';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Password Generator and Strength Checker</h1>
            </header>
            <main className="main-container">
                <PasswordGenerator />
            </main>
        </div>
    );
}

export default App;
