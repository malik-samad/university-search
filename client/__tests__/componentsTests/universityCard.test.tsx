import React from 'react';
import { render, screen } from '@testing-library/react';
import UniversityCard from '../../src/components/UniversityCard';
import { describe } from 'node:test';
import { UniversityDetail } from '@/typings';
import { UNIVERSITY_DETAILS_SORTED_KEYS } from '@/utils/constants';

describe('UniversityCard Component', () => {

    const mockUniversityDetials: UniversityDetail = {
        "country": "germany",
        "domains": ["testdomain.co.uk"],
        "alpha_two_code": "DE",
        "state-province": "province-1",
        "web_pages": ["wepbage-1"],
        "name": "university of berlin",
    };

    const renderComponent = () =>
        render(
            <UniversityCard details={mockUniversityDetials} />
        );

    test('renders all the keys and its values', () => {
        renderComponent();

        // Check if it renders all the keys and its values
        UNIVERSITY_DETAILS_SORTED_KEYS.forEach(key => {
            expect(screen.getByText(`${key}:`)).toBeInstanceOf(HTMLElement);
            const value = mockUniversityDetials[key as keyof typeof mockUniversityDetials];
            Array.isArray(value)
                ? value.forEach(ele => expect(screen.getByText(`- ${ele}`)).toBeInstanceOf(HTMLElement))
                : { value }
        })
    });
});