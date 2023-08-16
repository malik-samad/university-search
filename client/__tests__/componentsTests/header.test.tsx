import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '../../src/components/Header';
import { describe } from 'node:test';

describe('Header Component', () => {

    const renderComponent = () =>
        render(
            <Header />
        );

    test('renders "University Search"', () => {
        renderComponent();

        // Check if the text is rendered
        expect(screen.getByText('University Search')).toBeInstanceOf(HTMLElement);
    });
});