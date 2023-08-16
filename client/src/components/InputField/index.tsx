"use client"
import { SearchHistory } from '../../typings';
import styles from './style.module.css'
import { ChangeEvent, useState, useRef, useEffect, SetStateAction, Dispatch } from 'react'

export default function InputField({
    value,
    placeholder,
    name,
    onChange,
    history
}: {
    onChange: (val: string) => void,
    value: string,
    placeholder?: string,
    name?: string,
    history?: SearchHistory[]
}) {
    const [canShowHistory, setCanShowHistory] = useState(false);
    const elementId = `input-wrapper-${name}`;

    useEffect(() => {
        window.addEventListener('click', function (e) {
            if (document?.getElementById(elementId)?.contains(e.target as Node)) {
                setCanShowHistory(true)
            } else {
                setCanShowHistory(false)
            }
        })
    })

    return (
        <div id={elementId} className={styles['input-wrapper']}>
            <input className={styles["search-input"]}
                placeholder={placeholder}
                onFocus={() => setCanShowHistory(true)}
                onBlur={() => setCanShowHistory(true)}
                name={name}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
            {canShowHistory && history && history?.length > 0 ? <div style={{ width: "310px" }} className={styles['input-suggestions']}>
                {history.map(itm => <div
                    className={styles['suggestion-item']}
                    onClick={(e) => {
                        onChange(itm.value);
                        setCanShowHistory(false)
                    }}
                    key={itm.value}>
                    {itm.value}
                </div>)}
            </div> : <></>}
        </div>
    )
}
