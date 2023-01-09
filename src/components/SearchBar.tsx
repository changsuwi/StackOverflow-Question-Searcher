import { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { AppDispatch } from '../stores/store';
import tagsAsyncThunk from '../stores/tagsAsyncThunk';
import { tagsActions } from '../stores/tagsSlice';

function SearchBar() {
    const [text, setText] = useState("");
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if(text.length > 0) {
            dispatch(tagsActions.updateSelectedIndex(0));
            dispatch(tagsAsyncThunk.fetchTags(text));
        }
    }, [text, dispatch])
    return (
        <div className="sticky top-0 py-4 z-10 bg-white">
            <div className='flex justify-center'>
                <input
                    type="text"
                    className="border border-gray-600 w-full min-w-[200px] px-2 mr-4"
                    placeholder='tags'
                    onChange={(event) => setText(event.target.value)} 
                />
                <button>Search</button>
            </div>
            
        </div>
    );
}

export default SearchBar;
