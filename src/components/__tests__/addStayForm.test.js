import {screen, render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import AddStayForm from '../AddStayForm';

describe('Suite of tests for the AddStayForm component',()=>{


    test('See if AddStayForm exists',()=>{
        render(<AddStayForm />);
        const form = document.querySelector('.addStayForm_container');
        expect(form).toBeInTheDocument();
        // expect(form).toHaveTextContent('Add Stay');
    });

    test('Check that AddStayForm has approriate inputs', ()=>{
        render(<AddStayForm />);
        const nameInput = screen.getByLabelText('Pet Name');
        const arrivalDateInput = screen.getByLabelText('Arrival Date');
        const arrivalTimeInput = screen.getByLabelText('Arrival Time');
        const releaseDateInput = screen.getByLabelText('Release Date');
        const releaseTimeInput = screen.getByLabelText('Release Time');
        const notesInput = screen.getByLabelText('Pet Notes');
        const formSubmitButton = screen.getByRole('button', {"name":"Submit"} );
    });

    test.only('Check that form can accept input and submit', ()=>{
        render(<AddStayForm />);
        let i = 0;
        const stringInputs = [
            screen.getByLabelText('Pet Name'),
            screen.getByLabelText('Pet Notes') ];

        const dateInputs = [
            screen.getByLabelText('Arrival Date'),
            screen.getByLabelText('Release Date') ];

        const timeInputs = [
            screen.getByLabelText('Arrival Time'),
            screen.getByLabelText('Release Time') ];

        const submitButton = screen.getByRole('button', {"name":"Submit"} );

        stringInputs.map( input => {
            userEvent.type(input, `name ${i}`);
            expect(input).toHaveValue(`name ${i}`);
            i++;
        });
        dateInputs.map( input =>{
            // userEvent.type(input, `032${i}2021`);
            // console.log('input value is ');
            // console.log(input.value);
            // expect(input).toHaveValue(`2021-03-2${i}`);
            // i++;
        });
        timeInputs.map( input => {
            userEvent.type(input, `0315p`);
            expect(input).toHaveValue(`03:15`);
            i++;
        });
        // userEvent.type(nameInput, "Mr. Kitty");
        // expect(nameInput).toHaveValue('Mr. Kitty');
    });


});

