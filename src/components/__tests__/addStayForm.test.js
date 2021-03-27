import {screen, render} from '@testing-library/react';
// import renderer from 'react-test-renderer';
import '@testing-library/jest-dom';
import AddStayForm from '../AddStayForm';


test('See if AddStayForm exists',()=>{
    render(<AddStayForm />);
    const form = document.querySelector('.addStayForm_container');
    expect(form).toBeInTheDocument();
    expect(form).toHaveTextContent('Add Stay');
});

test('Check that AddStayForm has approriate inputs', ()=>{
    render(<AddStayForm />);
    const nameInput = screen.getByLabelText('Pet Name');
    const arrivalDateInput = screen.getByLabelText('Arrival Date');
    const arrivalTimeInput = screen.getByLabelText('Arrival Time');
    const releaseDateInput = screen.getByLabelText('Release Date');
    const releaseTimeInput = screen.getByLabelText('Release Time');
    const notesInput = screen.getByLabelText('Pet Notes');
    const formSubmitButton = screen.getByText('Submit');
});

