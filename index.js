let attemptsCounter = 0;

const luhnAlgorithm = (card) => {
    const length = card.length;
    let count = 0;

    if(length % 2 == 0)
    {
        /** Traverse the whole credit card number.
         *  Starts at the beginning of the number and begins doubling from the first number.
        */
        for(let i = 0; i < length; i++)
        {
            let currentDigit = parseInt(card[i]);
            if (i % 2 == 0) // I only want to double every other number, starts doubling with the second-to-last number. I don't want to double the last number.
            {
                if ((currentDigit *= 2) > 9)
                {
                    // Separate the number into component parts and then add them together.
                    let trailingNumber = currentDigit % 10;
                    let firstNumber = parseInt(currentDigit / 10);

                    // If currentDigit was 18 then currentDigit is now 9.
                    currentDigit = firstNumber + trailingNumber;
                }
            }
            
            count += currentDigit;
        }
    }
    else {
        /** Traverse the whole credit card number.
         *  Starts at the end of the number and begins doubling from the second-to-last number. This fixes the case for odd-numbered length credit card numbers, like AMEX cards.
        */
        for(let i = length - 1 ; i >= 0; i--)
        {
            let currentDigit = parseInt(ccNumber[i]);
            if ((i - 1) % 2 == 0) // I only want to double every other number, starts doubling with the second-to-last number. I don't want to double the last number.
            {
                if ((currentDigit *= 2) > 9)
                {
                    // Separate the number into component parts and then add them together.
                    let trailingNumber = currentDigit % 10;
                    let firstNumber = parseInt(currentDigit / 10);

                    // If currentDigit was 18 then currentDigit is now 9.
                    currentDigit = firstNumber + trailingNumber;
                }
            }
            
            count += currentDigit;
        }
    }

    return (count % 10) === 0;
}


const form = document.getElementById('form');
const username = document.getElementById('user');
const email = document.getElementById('email');
const elCard = document.getElementById('card');

form.addEventListener('submit', e => {
    e.preventDefault();

    validateInputs();
});

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success')
}

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};

const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}


const validateInputs = () => {
    const userValue = user.value.trim();
    const emailValue = email.value.trim();
    const cardValue = card.value.trim();

    if(userValue === '') {
        setError(user, 'name is required');
    } else {
        setSuccess(user);
    }

    if(emailValue === '') {
        setError(email, 'Email is required');
    } else if (!isValidEmail(emailValue)) {
        setError(email, 'Provide a valid email address');
    } else {
        setSuccess(email);
    }


    if(cardValue === ''){
        setError(card, 'please enter a card');
    }
    else if (luhnAlgorithm(elCard.value)){
        setSuccess(card);
    }
    else{
        setError(card, 'sorry this card is not valid');
    }

};
