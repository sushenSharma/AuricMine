import React, { useState, useEffect } from "react";
import {
  DndContext,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core";
import { useSelector } from "react-redux"; // Import useSelector
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
  postWatchListData,
  updateCardStatus,
  updateTask
} from "../Ledgers/LedgerProducts/lib/api.js";
import SwalNotification from "../../../../src/components/SwalNotification/index.js";
import { getLabel } from "../../../../src/hooks/use-labels.js";
import Swal from "sweetalert2";
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import posthog from 'posthog-js';

const COLUMNS = [
  { id: "To Watch", title: "To Watch" },
  { id: "Researching", title: "Researching" },
  { id: "Ready To Buy", title: "Ready To Buy" },
  { id: "Bought", title: "Bought" },
  { id: "Ready To Sell", title: "Ready To Sell" },
  { id: "Sold", title: "Sold" },
];

const Kanban = () => {
  const [tasks, setTasks] = useState([]);
  const [archivedTasks, setArchivedTasks] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [archivedModalOpen, setArchivedModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { delay: 150, tolerance: 5 },
    })
  );

  const { userUUID } = useSelector((state) => state.public);

  useEffect(() => {
    const fetchData = async () => {
      if (!userUUID) return; // Ensure userUUID is available
      try {
        const { data, error } = await fetchWatchlistData(userUUID);
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
  }, [userUUID]);

  const handleFetchArchivedStocks = async () => {
    if (!userUUID) return;
    try {
      const { data, error } = await fetchWatchlistData(userUUID, { status: "Archived" });
      if (error) {
        SwalNotification({
          title: "Failed to Fetch Archived Stocks",
          text: "An error occurred while fetching archived stocks.",
          iconType: "error",
          btnLabel: "OK",
        });
        throw new Error("Error fetching archived tasks");
      }
      setArchivedTasks(data || []);
      setArchivedModalOpen(true);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleCloseArchivedModal = () => {
    setArchivedModalOpen(false);
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;
  
    if (!over || !over.id) return;
  
    const taskId = active.id;
    const newStatus = over.id;
  
    if (taskId && newStatus) {
      if (newStatus === "Sold") {
        // Show confirmation dialog before archiving the task
        Swal.fire({
          title: "Are you sure?",
          text: "This will move the task to 'Archived'.",
          icon: "question",
          showCancelButton: true,
          confirmButtonText: "Yes, archive it!",
          cancelButtonText: "No, cancel",
        }).then(async (result) => {
          if (result.isConfirmed) {
            // Archive the task locally
            setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  
            try {
              // Update the task's status in the backend
              const result = await updateTask(taskId, { status: "Archived" });
              if (!result.success) {
                console.error("Failed to archive task in Supabase:", result.error);
                Swal.fire("Error", "Failed to archive task. Please try again.", "error");
              } else {
                Swal.fire(
                  getLabel("successArchievedTitle"),
                  getLabel("successArchievedText"),
                  "success"
                );
              }
            } catch (err) {
              console.error("Unexpected error while archiving:", err);
              Swal.fire("Error", "An unexpected error occurred. Please try again.", "error");
            }
          } else {
            // User canceled the action
            Swal.fire("Cancelled", "The task was not archived.", "info");
          }
        });
      } else {
        // Update the task's status locally
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === taskId ? { ...task, status: newStatus } : task
          )
        );
  
        try {
          // Update the task's status in the backend
          const result = await updateCardStatus(taskId, newStatus);
          if (!result.success) {
            throw new Error("Failed to update task status in the database.");
          }
        } catch (err) {
          console.error(err.message);
          Swal.fire("Error", "Failed to update task status. Reverting changes.", "error");
  
          // Revert local changes in case of error
          setTasks((prevTasks) =>
            prevTasks.map((task) =>
              task.id === taskId
                ? { ...task, status: tasks.find((t) => t.id === taskId).status }
                : task
            )
          );
        }
      }
    }
  };
  

  const handleAddNewStock = () => {
    posthog.capture('button_click', { label: 'Add new Stock Button' });
    setSelectedTask({ title: "", description: "", status: COLUMNS[0].id });
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedTask(null);
  };

  const handleCardClick = (task) => {
    setSelectedTask(task);
    setModalOpen(true);
  };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setSelectedTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveTask = async () => {
    if (!selectedTask) return;
  
    if (selectedTask.id) {
      // Update the task locally
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === selectedTask.id ? selectedTask : task
        )
      );
  
      // Save the updated task to Supabase
      try {
        const result = await updateTask(selectedTask.id, {
          title: selectedTask.title,
          description: selectedTask.description,
          status: selectedTask.status,
        });
  
        if (!result.success) {
          SwalNotification({
            title: getLabel("FailUpdateStockCard"),
            text: getLabel("FailUpdateStockCardText"),
            iconType: "error",
            btnLabel: getLabel("okLabel")
          })
        }else{
          SwalNotification({
            title: getLabel("successUpdateStockCard"),
            text: getLabel("successUpdateStockCardText"),
            iconType: "success",
            btnLabel: getLabel("okLabel")
          })
          
        }
      } catch (err) {
        console.error("Unexpected error:", err);
        alert("An unexpected error occurred. Please try again.");
      }
    } else {
      // New task - add it
      const taskData = { ...selectedTask, id: Date.now().toString(), userUUID };
  
      try {
        const { data, error } = await postWatchListData(taskData);
  
        if (error) {
          SwalNotification({
            title: getLabel("FailUpdateStockSupabase"),
            text: getLabel("FailUpdateStockSupabaseText"),
            iconType: "error",
            btnLabel: getLabel("okLabel")
          })
          return;
        }else{
          SwalNotification({
            title: getLabel("successUpdateStockSupabase"),
            text: getLabel("successUpdateStockSupabaseText"),
            iconType: "success",
            btnLabel: getLabel("okLabel")
          })

        }
  
        setTasks((prevTasks) => [...prevTasks, taskData]);
      } catch (err) {
        console.error("Unexpected error:", err);
        alert("An unexpected error occurred. Please try again.");
      }
    }
  
    handleCloseModal();
  };
  

  return (
    <Box sx={{ padding: 2 }}>
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

         <LedgerButton
          label="Show Archived Stocks"
          type="outlined"
          variant="contained"
          hoverType="warning-color"
          icon={<ImportContactsIcon />}
          size="sm"
          style={{ width: "auto", padding: "8px 16px", marginLeft: "10px" }}
          onClick={handleFetchArchivedStocks}
        />
      </Box>

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
                onTaskClick={handleCardClick}
              />
            </Box>
          ))}
        </Box>
      </DndContext>

      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        aria-labelledby="edit-stock-modal"
        aria-describedby="edit-stock-form"
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
            {selectedTask?.title ? "Edit Stock" : "Add New Stock"}
          </Typography>
          <TextField
            fullWidth
            label="Stock Name"
            name="title"
            value={selectedTask?.title || ""}
            onChange={handleFieldChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={selectedTask?.description || ""}
            onChange={handleFieldChange}
            margin="normal"
            multiline
            rows={3}
          />
          <Box mt={2} display="flex" justifyContent="space-between">
            <Button variant="contained" color="primary" onClick={handleSaveTask}>
              Save
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

         {/* Modal for Archived Stocks */}
         <Modal
        open={archivedModalOpen}
        onClose={handleCloseArchivedModal}
        aria-labelledby="archived-stocks-modal"
        aria-describedby="archived-stocks-list"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "#fff",
            border: "1px solid #ddd",
            borderRadius: "8px",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography
            variant="h6"
            gutterBottom
            sx={{ color: "#333", fontWeight: "bold" }}
          >
            Archived Stocks
          </Typography>
          {archivedTasks.length ? (
            <Box
              sx={{
                maxHeight: "300px",
                overflowY: "auto",
                padding: "8px",
                bgcolor: "#f9f9f9",
                borderRadius: "4px",
              }}
            >
              <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
                {archivedTasks.map((task) => (
                  <li
                    key={task.id}
                    style={{
                      marginBottom: "8px",
                      padding: "8px",
                      backgroundColor: "#e6f7ff",
                      borderRadius: "4px",
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{ color: "#000" }}
                    >
                      {task.title} - {task.description}
                    </Typography>
                  </li>
                ))}
              </ul>
            </Box>
          ) : (
            <Typography variant="body2" color="textSecondary">
              No archived stocks found.
            </Typography>
          )}
          <Button
            variant="contained"
            color="primary"
            onClick={handleCloseArchivedModal}
            sx={{ marginTop: 2 }}
          >
            Close
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default Kanban;
