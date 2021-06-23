import React, { useEffect, useState } from "react";
import { Empty, Input, Skeleton } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { MappedElement } from "../../utils/helpers";
import CSearchItem from "../../components/shared/CSearchItem/CSearchItem";
import { useDispatch, useSelector } from "react-redux";
import { getSearchItems } from "../../store/Actions/SearchActions";


export default function Search() {
  const [searchText, setSearchText] = useState('');
  const [isSearched , setIsSearched] = useState(false);
  const dispatch = useDispatch();

 

  const handleSubmit = () => {
    setIsSearched(false)
    //search with tags
      dispatch(getSearchItems(searchText,()=> setIsSearched(true)));
  }


  // get redux state
  const stateProps = useSelector(({ search }) => { return { ...search } });

  const { data, loading } = stateProps;

  return (
    <div className="search-container">

      <Input
        className='search-bar'
        onPressEnter={handleSubmit}
        placeholder="Write down keywords, like Maman, Ecofriendly or Lifestyle"
        onChange={e => setSearchText(e.target.value)}
        suffix={<SearchOutlined className="search-icon" onClick={handleSubmit} />}
      />
      <div className="search-results-container">

        {/* Show loading when search */}
        {loading &&
          <Skeleton avatar paragraph={{ rows: 3 }} active />
        }

        {/* Show results if any items found */}
        {!loading && data.length > 0 && 

          <MappedElement data={data} renderElement={(obj, index) => {
            return <CSearchItem {...obj} key={index} />
          }} />

        }

        {/* Show empty icon if no item found */}
        {!loading && data.length === 0 && isSearched &&
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No search results found!" />
        }


      </div>


    </div>
  );
}
