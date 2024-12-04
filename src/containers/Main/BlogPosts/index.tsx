import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import type { Task, Column as ColumnType } from '../../../components/KanbanBoard/types.js';
import { Column } from '../../../components/KanbanBoard/Column';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';

const COLUMNS: ColumnType[] = [
  { id: 'To Watch', title: 'To Watch' },
  { id: 'Researching', title: 'Researching' },
  { id: 'Ready To Buy', title: 'Ready To Buy' },
  { id: 'Bought', title: 'Bought' },
  { id: 'Ready To Sell', title: 'Ready To Sell' },
];

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
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over || !over.id) return;

    const taskId = active.id as string;
    const newStatus = over.id as Task["status"];

    if (taskId && newStatus) {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId
            ? {
                ...task,
                status: newStatus,
              }
            : task
        )
      );
    }
  }

  const handleTaskClick = (task: Task) => {
    console.log("Task Clicked!", task)
    setSelectedTask(task);
    setModalOpen(true); // Open the modal
  };

  const handleClose = () => {
    setModalOpen(false); // Close the modal
    setSelectedTask(null);
  };

  return (
    <Box
      sx={{
        display: "flex",
        overflowX: "auto",
        padding: 2,
        gap: 3,
      }}
    >
      <DndContext onDragEnd={handleDragEnd}>
        {COLUMNS.map((column) => (
          <Box key={column.id} sx={{ minWidth: 300, marginRight: 2 }}>
            <Column
              column={column}
              tasks={tasks.filter((task) => task.status === column.id)}
              onTaskClick={handleTaskClick} // Pass the click handler
            />
          </Box>
        ))}
      </DndContext>

      {/* Modal Component */}
      <Modal open={modalOpen} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          {selectedTask && (
            <>
              <Typography variant="h6" component="h2">
                {selectedTask.title}
              </Typography>
              <Typography sx={{ mt: 2 }}>{selectedTask.description}</Typography>
            </>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default BlogPosts;
