import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import InputField from '../../src/components/InputField';
import { describe, it } from 'node:test';

describe('InputField Component', () => {
    const mockOnChange = jest.fn();

    const mockHistory = [
        {
            _id: "123",
            value: "Germany",
            field: "country",
        },
        {
            _id: "123",
            value: "Australia",
            field: "country",
        }
    ];

    const renderComponent = () =>
        render(
            <InputField
                value=""
                placeholder="Search"
                name="search"
                onChange={mockOnChange}
                history={mockHistory}
            />
        );

    test('renders input field with suggestions', () => {
        renderComponent();

        const inputElement = screen.getByPlaceholderText('Search');
        fireEvent.focus(inputElement);

        // Check if the input suggestions are visible
        expect(screen.getByText('Germany')).toBeInstanceOf(HTMLElement);
        expect(screen.getByText('Australia')).toBeInstanceOf(HTMLElement);
    });

    test('calls onChange when suggestion is clicked', () => {
        renderComponent();

        const inputElement = screen.getByPlaceholderText('Search');
        fireEvent.focus(inputElement);

        // Click on a suggestion
        fireEvent.click(screen.getByText('Germany'));

        // Check if mockOnChange has been called with the correct value
        expect(mockOnChange).toHaveBeenCalledWith('Germany');
    });
});