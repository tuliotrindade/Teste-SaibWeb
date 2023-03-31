import React, { useContext, useEffect, useState } from 'react';
import { ApiContext } from '../../../../Providers/ApiProviders';
import './SearchBarCss.css'

export default function SearchBar({data}) {
  const { setFilteredData } = useContext(ApiContext);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setFilteredData(data.filter(item => item.TECL_NOME.toLowerCase().includes(searchTerm.toLowerCase())))
  }, [searchTerm])

  return (
      <label className='search-bar-style'>
        Pesquise algum registro pelo nome
        <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      </label>
  );
}
