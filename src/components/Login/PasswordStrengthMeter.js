import React, {Component} from 'react';
import * as zxcvbn from "zxcvbn";
import './PasswordStrengthMeter.css';

class PasswordStrengthMeter extends Component {

    createPasswordLabel = (result) => {
        switch (result.score) {
            case 0:
                return 'Weak';
            case 1:
                return 'Weak';
            case 2:
                return 'Fair';
            case 3:
                return 'Good';
            case 4:
                return 'Strong';
            default:
                return 'Weak';
        }
    }

    render() {
        const {password} = this.props;
        const testedResult = zxcvbn(password);
        return (
            <div className="password-strength-meter">
                {/*<progress*/}
                {/*    className={`password-strength-meter-progress strength-${this.createPasswordLabel(testedResult)}`}*/}
                {/*    value={testedResult.score}*/}
                {/*    max="4"*/}
                {/*/>*/}
                <br/>
                <label
                    className="password-strength-meter-label"
                >
                    {password && (<div className={`color-${this.createPasswordLabel(testedResult)}`}>{this.createPasswordLabel(testedResult)}</div>)}
                </label>
            </div>
        );
    }
}

export default PasswordStrengthMeter;