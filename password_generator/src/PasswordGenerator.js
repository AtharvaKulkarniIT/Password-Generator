import React, { useState } from 'react';
import './PasswordGenerator.css';

const PasswordGenerator = () => {
    const [length, setLength] = useState(12);
    const [generatedPassword, setGeneratedPassword] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [passwordStrength, setPasswordStrength] = useState('');

    const generatePassword = (length) => {
        const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const lowerCase = "abcdefghijklmnopqrstuvwxyz";
        const numbers = "0123456789";
        const specialChars = "+~`|}{[]:;?><,./-=!@#$%^&*()_";
        const allChars = upperCase + lowerCase + numbers + specialChars;

        let password = "";
        password += upperCase[Math.floor(Math.random() * upperCase.length)];
        password += lowerCase[Math.floor(Math.random() * lowerCase.length)];
        password += numbers[Math.floor(Math.random() * numbers.length)];
        password += specialChars[Math.floor(Math.random() * specialChars.length)];

        for (let i = 4; i < length; i++) {
            password += allChars[Math.floor(Math.random() * allChars.length)];
        }

        password = shuffle(password);

        return password;
    };

    const shuffle = (string) => {
        const array = string.split('');
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array.join('');
    };

    const handleGenerateClick = () => {
        if (length < 8) {
            alert("Password length must be at least 8 characters.");
            return;
        }

        const password = generatePassword(length);
        setGeneratedPassword(password);
    };

    const handlePasswordChange = (e) => {
        const password = e.target.value;
        setUserPassword(password);
        setPasswordStrength(calculateStrength(password));
    };

    const calculateStrength = (password) => {
        let score = 0;
        if (password.length >= 8) score++;
        if (password.length >= 12) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[a-z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[^A-Za-z0-9]/.test(password)) score ++; 

        switch (score) {
            case 1:
            case 2:
                return 'Very Weak';
            case 3:
                return 'Weak';
            case 4:
                return 'Medium';
            case 5:
                return 'Strong';
            case 6:
                return 'Very Strong';
            default:
                return 'Very Weak';
        }
    };

    return (
        <div className="password-generator-container">
            <div className="password-generator">
                <h2>Password Generator</h2>
                <label>
                    Password Length:
                    <input 
                        type="number" 
                        value={length} 
                        onChange={(e) => setLength(e.target.value)} 
                        min="1"
                        max="100"
                    />
                </label>
                <button onClick={handleGenerateClick}>Generate Password</button>
                <div className="generated-password">
                    <div className="password-display"> {generatedPassword}</div>
                </div>
            </div>

            <div className="password-strength-checker">
                <h2>Password Strength Checker</h2>
                <label>
                    Enter Password:
                    <input 
                        type="text" 
                        value={userPassword} 
                        onChange={handlePasswordChange} 
                    />
                </label>
                <div className="password-strength">
                    <strong>Password Strength:</strong>
                    <div className={`strength-indicator ${passwordStrength.toLowerCase().replace(' ', '-')}`}>
                        {passwordStrength}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PasswordGenerator;
