import {screen, render, cleanup} from '@testing-library/react';
// import renderer from 'react-test-renderer';
import AddStayForm from '../AddStayForm';
import '@testing-library/jest-dom';


afterEach(()=>{
    cleanup();
})

test('See if AddStayForm exists',()=>{
    render(<AddStayForm />);
    // const form = document.querySelector('.addStayForm_container');
    const form = screen.getByTestId("1");
    // expect(screen).toHaveTextContent('Arrival Date');
    expect(form).toBeInTheDocument();
    
});
