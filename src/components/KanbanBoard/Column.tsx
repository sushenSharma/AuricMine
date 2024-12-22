import React from "react";
import { Column as ColumnType, Task } from "./types";
import { TaskCard } from "./TaskCard";
import { useDroppable } from "@dnd-kit/core";

type ColumnProps = {
  column: ColumnType;
  tasks: Task[];
  onTaskClick?: (task: Task) => void; // Define onTaskClick
};

export function Column({ column, tasks, onTaskClick }: ColumnProps) {
  const { setNodeRef } = useDroppable({
    id: column.id, // Sets the droppable ID to the column's ID
  });

  return (
    <div className="flex w-80 flex-col rounded-lg bg-neutral-800 p-4">
      <h2 className="mb-4 font-semibold text-neutral-100">{column.title}</h2>
      
      {/* Conditionally display message for "Sold" column */}
      {column.id === "Sold" && (
        <div className="mb-4 text-sm text-neutral-400">
          <p>
            Stocks moved here will be archived automatically and will no longer be visible on the board.
          </p>
        </div>
      )}

      <div ref={setNodeRef} className="flex flex-1 flex-col gap-4">
        {tasks.length === 0 ? (
          <div className="flex items-center justify-center text-neutral-400">
            Drop tasks here
          </div>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onClick={() => onTaskClick && onTaskClick(task)} // Pass click handler
            />
          ))
        )}
      </div>
    </div>
  );
}
