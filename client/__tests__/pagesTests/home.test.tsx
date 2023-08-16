import { fireEvent, render, screen } from '@testing-library/react'
import Home from '../../src/app/page'

describe('Home Page', () => {
    it('should render search input fields', () => {
        render(<Home />)

        // Check if screen has search inputs
        expect(screen.getByPlaceholderText('Search by country')).toBeInstanceOf(HTMLElement);
        expect(screen.getByPlaceholderText('Search by university')).toBeInstanceOf(HTMLElement);
    });
});