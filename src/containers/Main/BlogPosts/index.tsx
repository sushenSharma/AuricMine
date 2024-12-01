import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import type { Task, Column as ColumnType } from '../../../components/KanbanBoard/types.js';
import { Column } from '../../../components/KanbanBoard/Column';
import Box from '@mui/material/Box';

// Define the swimlanes
const COLUMNS: ColumnType[] = [
  { id: 'To Watch', title: 'To Watch' },
  { id: 'Researching', title: 'Researching' },
  { id: 'Ready To Buy', title: 'Ready To Buy' },
  { id: 'Bought', title: 'Bought' },
  { id: 'Ready To Sell', title: 'Ready To Sell' },
];

// Define initial tasks aligned with the new swimlanes
const INITIAL_TASKS: Task[] = [
  {
    id: '1',
    title: 'TCS',
    description: 'Strong quarter results; potential for long-term growth.',
    status: 'To Watch',
  },
  {
    id: '2',
    title: 'Infosys',
    description: 'New product launch anticipated; research ongoing.',
    status: 'Researching',
  },
  {
    id: '3',
    title: 'Tata Steel',
    description: 'Bullish chart pattern forming ahead of results.',
    status: 'Researching',
  },
  {
    id: '4',
    title: 'Reliance',
    description: 'Good entry point for diversified portfolio.',
    status: 'Ready To Buy',
  },
  {
    id: '5',
    title: 'HDFC Bank',
    description: 'Recently purchased; tracking financial performance.',
    status: 'Bought',
  },
  {
    id: '6',
    title: 'Adani Ports',
    description: 'Approaching target price; consider partial exit.',
    status: 'Ready To Sell',
  },
  {
    id: '7',
    title: 'Wipro',
    description: 'Awaiting breakout confirmation on the technical chart.',
    status: 'To Watch',
  },
  {
    id: '8',
    title: 'ITC',
    description: 'Stable dividend-paying stock; great for long-term hold.',
    status: 'Bought',
  },
  {
    id: '9',
    title: 'Maruti Suzuki',
    description: 'Strong performance post-quarterly results; may hit target soon.',
    status: 'Ready To Sell',
  },
];

const BlogPosts = () => {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

   if (!over || !over.id) return;

    const taskId = active.id as string;
    const newStatus = over.id as Task['status'];

    if (taskId && newStatus) {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId
            ? {
                ...task,
                status: newStatus,
              }
            : task,
        ),
      );
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        overflowX: 'auto',
        padding: 2,
        gap: 2,
      }}
    >
      <DndContext onDragEnd={handleDragEnd}>
        {COLUMNS.map((column) => (
          <Box key={column.id} sx={{ minWidth: 300 }}>
            <Column
              column={column}
              tasks={tasks.filter((task) => task.status === column.id)}
            />
          </Box>
        ))}
      </DndContext>
    </Box>
  );
};

export default BlogPosts;
