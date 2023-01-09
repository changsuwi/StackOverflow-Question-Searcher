import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const tagsAsyncThunk = {
    fetchTags: createAsyncThunk('tags/fetchTags', async (text: string = "") => {
        try {
            const response = await axios.get(`https://api.stackexchange.com/2.3/tags?order=desc&sort=popular&inname=${encodeURIComponent(text)}&site=stackoverflow`);
            let tagsList = response.data.items;
            if(tagsList.length > 10) tagsList = tagsList.slice(0, 10);
            return tagsList;
        } catch(err) {
            console.error(err);
        }
        
    }),
};

export default tagsAsyncThunk;
