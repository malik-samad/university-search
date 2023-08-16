"use client"
import { useGetUniversityData } from '../hooks/UniversityDataHooks';
import InputField from '../components/InputField';
import styles from './page.module.css'
import { useEffect, useMemo, useState } from 'react'
import UniversityCard from '@/components/UniversityCard';
import { getHistoryByField } from '@/services/searchHistoryService';
import { SearchHistory } from '@/typings';

export default function Home() {
  const [universitySearchValue, setUniversitySearchValue] = useState<string>("");
  const [countrySearchValue, setCountrySearchValue] = useState<string>("");
  const [countryFieldHistory, setCountryFieldHistory] = useState<SearchHistory[]>([])
  const [universityFieldHistory, setUniversityFieldHistory] = useState<SearchHistory[]>([])

  // custom hooks
  const { isLoading, universityData } = useGetUniversityData({ country: countrySearchValue.trim(), universityName: universitySearchValue.trim() })

  const isSearchEmpty = useMemo(() => universitySearchValue.trim() == "" && countrySearchValue.trim() == "", [universitySearchValue, countrySearchValue])

  // load field history
  useEffect(() => {
    const debounceFunction = setTimeout(() => {
      getHistoryByField("country", countrySearchValue)
        .then((response) => setCountryFieldHistory(response))
        .catch(err => console.log("error in getting country field history", err));
    }, 1000);

    return () => clearTimeout(debounceFunction);
  }, [countrySearchValue])


  useEffect(() => {
    const debounceFunction = setTimeout(() => {
      getHistoryByField("university", universitySearchValue)
        .then((response) => setUniversityFieldHistory(response))
        .catch(err => console.log("error in getting university field history", err))
    }, 1000);

    return () => clearTimeout(debounceFunction);
  }, [universitySearchValue])

  return (
    <div className={styles.main}>
      <div className={styles['inputs-wrapper']}>
        <InputField
          name='university-search-input'
          placeholder='Search by university'
          value={universitySearchValue}
          history={universityFieldHistory}
          onChange={(value: string) => setUniversitySearchValue(value)}
        />

        <InputField
          name='country-search-input'
          placeholder='Search by country'
          value={countrySearchValue}
          history={countryFieldHistory}
          onChange={(value: string) => setCountrySearchValue(value)}
        />
      </div>
      <div className={styles['university-cards-wrapper']}>
        <div className={styles["university-cards-positioner"]}>
          {isLoading ? <>Loading...</> :
            universityData.length > 0
              ? universityData.map(universityDetail => <UniversityCard key={universityDetail.name} details={universityDetail} />)
              : !isSearchEmpty
                ? <>Empty result. please try another keyword</>
                : <>Use some keyword in the search boxes above to see universities data</>
          }
        </div>
      </div>
    </div>
  )
}
