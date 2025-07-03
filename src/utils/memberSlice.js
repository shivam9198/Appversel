import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const fetchMembers = createAsyncThunk('members/fetchMembers', async () => {
  const res = await axios.get('https://randomuser.me/api/?results=5');
  return res.data.results.map((user) => ({
    id: user.login.uuid,
    name: `${user.name.first} ${user.name.last}`,
    status: 'Offline', // default status
    tasks: [],         // empty task list
  }));
});

const membersSlice = createSlice({
  name: 'members',
  initialState: {
    list: [],
    loading: false,
  },
  reducers: {
    updateStatus: (state, action) => {
      const member = state.list.find((m) => m.id === action.payload.id);
      if (member) member.status = action.payload.status;
    },
    assignTask: (state, action) => {
      const { id, title, dueDate } = action.payload;
      const member = state.list.find((m) => m.id === id);
      if (member) {
        member.tasks.push({ title, dueDate, progress: 0 });
      }
    },
    updateTaskProgress: (state, action) => {
      const { memberId, taskIndex, change } = action.payload;
      const member = state.list.find((m) => m.id === memberId);
      if (member && member.tasks[taskIndex]) {
        const newProgress = member.tasks[taskIndex].progress + change;
        member.tasks[taskIndex].progress = Math.max(0, Math.min(100, newProgress));
      }
    },
  },
   extraReducers: (builder) => {
    builder
      .addCase(fetchMembers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMembers.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
    }
});

export const { updateStatus, assignTask, updateTaskProgress } = membersSlice.actions;
export default membersSlice.reducer;
