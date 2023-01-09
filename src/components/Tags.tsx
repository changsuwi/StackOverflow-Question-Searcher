import { useEffect } from 'react';
import clsx from 'clsx';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from '../stores/store';
import tagsAsyncThunk from '../stores/tagsAsyncThunk';
import { tagsActions } from '../stores/tagsSlice';

function TagsList() {
  const {list: tagsList, selectedIndex} = useSelector((state: RootState) => state.tags);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(tagsAsyncThunk.fetchTags());
  }, [dispatch])

  const onClickTag = (index: number) => {
    dispatch(tagsActions.updateSelectedIndex(index));
  } 
  
  return (
    <div className="flex flex-row justify-center my-4 flex-wrap">
      {tagsList.map((tag, idx) => {
        return (
          <div 
            key={idx}
            className={clsx(`border border-gray-600 rounded-md mx-1 my-2 px-2 py-1 min-w-[60px] text-center cursor-pointer`, {'bg-orange-400': idx === selectedIndex})}
            onClick={() => onClickTag(idx)}
          >
            {tag.name}
          </div>
        )
      })}
    </div>
  );
}

export default TagsList;
