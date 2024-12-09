import React, { useState, useEffect } from "react";
import {
  DndContext,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core";
import { Column } from "../../../components/KanbanBoard/Column.tsx";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import LedgerButton from "../../../ui-kit/Buttons/LedgerButton/index.js";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {
  fetchWatchlistData,
  postUserLedgerData,
  postWatchListData,
} from "../../../containers/Main/Ledgers/LedgerProducts/lib/api.js";

const COLUMNS = [
  { id: "To Watch", title: "To Watch" },
  { id: "Researching", title: "Researching" },
  { id: "Ready To Buy", title: "Ready To Buy" },
  { id: "Bought", title: "Bought" },
  { id: "Ready To Sell", title: "Ready To Sell" },
];

const BlogPosts = () => {
  const [tasks, setTasks] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    status: COLUMNS[0].id, // Default to the first status
  });

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { delay: 150, tolerance: 5 },
    })
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await fetchWatchlistData();
        if (error) {
          console.error("Error fetching watchlist data:", error);
        } else {
          setTasks(data || []);
        }
      } catch (err) {
        console.error("Unexpected error fetching watchlist data:", err);
      }
    };

    fetchData();
  }, []);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over || !over.id) return;

    const taskId = active.id;
    const newStatus = over.id;

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
  };

  const handleAddNewStock = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setNewTask({
      title: "",
      description: "",
      status: COLUMNS[0].id,
    });
  };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddTask = async () => {
    const taskData = { ...newTask, id: Date.now().toString() };

    try {
      const { data, error } = await postWatchListData(taskData);

      if (error) {
        console.error("Error adding task to ledger:", error);
        alert("Failed to add task. Please try again.");
        return;
      }

      setTasks((prevTasks) => [...prevTasks, taskData]);
      handleCloseModal();
    } catch (err) {
      console.error("Unexpected error:", err);
      alert("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      {/* Add New Stock Button */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          marginBottom: 2,
        }}
      >
        <LedgerButton
          label="Add New Stock"
          type="outlined"
          variant="contained"
          className="ledger-buttons get-insights"
          hoverType="success-color"
          size="sm"
          icon={<AddCircleOutlineIcon />}
          style={{
            width: "auto",
            padding: "8px 16px",
          }}
          onClick={handleAddNewStock}
        />
      </Box>

      {/* Swimlanes */}
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <Box
          sx={{
            display: "flex",
            overflowX: "auto",
            gap: 3,
          }}
        >
          {COLUMNS.map((column) => (
            <Box key={column.id} sx={{ minWidth: 300 }}>
              <Column
                column={column}
                tasks={tasks.filter((task) => task.status === column.id)}
              />
            </Box>
          ))}
        </Box>
      </DndContext>

      {/* Add New Stock Modal */}
      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        aria-labelledby="add-new-stock-modal"
        aria-describedby="add-new-stock-form"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "1px solid #ddd",
            borderRadius: "8px",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Add New Stock
          </Typography>
          <TextField
            fullWidth
            label="Stock Name"
            name="title"
            value={newTask.title}
            onChange={handleFieldChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={newTask.description}
            onChange={handleFieldChange}
            margin="normal"
            multiline
            rows={3}
          />
          <TextField
            fullWidth
            select
            label="Status"
            name="status"
            value={newTask.status}
            onChange={handleFieldChange}
            margin="normal"
            SelectProps={{
              native: true,
            }}
          >
            {COLUMNS.map((column) => (
              <option key={column.id} value={column.id}>
                {column.title}
              </option>
            ))}
          </TextField>
          <Box mt={2} display="flex" justifyContent="space-between">
            <Button variant="contained" color="primary" onClick={handleAddTask}>
              Add
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleCloseModal}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default BlogPosts;
