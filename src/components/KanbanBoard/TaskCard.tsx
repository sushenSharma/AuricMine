import { useDraggable } from '@dnd-kit/core';
import { Task } from './types';
import React from 'react';

type TaskCardProps = {
  task: Task;
  onClick?: () => void; // Add optional onClick prop
};

export function TaskCard({ task, onClick }: TaskCardProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });

  const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      onClick={() => {
        console.log("TaskCard clicked:", task); // Debugging
        onClick && onClick(); // Call parent handler
      }}
      className="cursor-grab rounded-lg bg-neutral-700 p-4 shadow-sm hover:shadow-md"
      style={style}
    >
      <h3 className="font-medium text-neutral-100 underline cursor-pointer">
        {task.title}
      </h3>
      <p className="mt-2 text-sm text-neutral-400">{task.description}</p>
    </div>
  );
}
