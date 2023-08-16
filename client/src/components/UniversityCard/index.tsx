"use client"
import { UniversityDetail } from '@/typings'
import styles from './style.module.css'
import { useCallback } from 'react'
import { UNIVERSITY_DETAILS_SORTED_KEYS } from '@/utils/constants'

export default function UniversityCard({ details }: { details: UniversityDetail }) {

    const renderUniversityCards = useCallback(() => {
        return UNIVERSITY_DETAILS_SORTED_KEYS.map((key) => {
            const value = details[key as keyof typeof details];
            return <div key={`${key}`} className={styles['row']}>
                <b>{key}:</b>
                {Array.isArray(value)
                    ? value.map(ele => <div key={ele} style={{ marginLeft: "10px" }} className={styles['row']}>
                        - {ele}
                    </div>)
                    : <div key={value} style={{ marginLeft: "10px" }} className={styles['row']}>
                        {value}
                    </div>}
            </div>
        })
    }, [details])

    return (
        <div className={styles['university-card']}>
            {renderUniversityCards()}
        </div>
    )
}
