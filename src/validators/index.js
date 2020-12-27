
import cardvalidator from 'card-validator';

export const creditcard = {
    $validator: value => {
        if(typeof value === 'undefined' || value === null || value === '') {
            return true;
        }

        return cardvalidator.number(value).isValid;
    },
    $message: 'Not a valid credit card number.'
}