import axios from 'axios';

const url = "http://localhost:3000";

export const fetchStories = () => axios.get(url);