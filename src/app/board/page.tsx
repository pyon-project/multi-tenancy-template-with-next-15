import React, { use } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Board Platform",
  description: "Manage your tasks and projects",
};

interface Task {
  id: number;
  title: string;
  description: string;
  status: "todo" | "in-progress" | "done";
  priority: "low" | "medium" | "high";
}

function getTasks(): Promise<Task[]> {
  // Simulate API call
  return Promise.resolve([
    {
      id: 1,
      title: "Design System",
      description: "Create design system components",
      status: "done",
      priority: "high",
    },
    {
      id: 2,
      title: "API Integration",
      description: "Integrate with backend API",
      status: "in-progress",
      priority: "high",
    },
    {
      id: 3,
      title: "Documentation",
      description: "Write technical documentation",
      status: "todo",
      priority: "medium",
    },
    {
      id: 4,
      title: "Testing",
      description: "Write unit tests",
      status: "todo",
      priority: "medium",
    },
    {
      id: 5,
      title: "Deployment",
      description: "Setup deployment pipeline",
      status: "todo",
      priority: "high",
    },
  ]);
}

export default function Page() {
  const tasks = use(getTasks());

  const columns = {
    todo: tasks.filter((task) => task.status === "todo"),
    "in-progress": tasks.filter((task) => task.status === "in-progress"),
    done: tasks.filter((task) => task.status === "done"),
  };

  return (
    <div className="min-h-screen p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Project Board</h1>
          <p className="text-gray-600">Manage your tasks and track progress</p>
        </div>
        <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
          Add Task
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {Object.entries(columns).map(([status, tasks]) => (
          <div key={status} className="bg-gray-50 rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold capitalize">
                {status.replace("-", " ")}
              </h2>
              <span className="bg-gray-200 text-gray-700 text-sm px-2 py-1 rounded">
                {tasks.length}
              </span>
            </div>
            <div className="space-y-4">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow"
                >
                  <h3 className="font-semibold mb-2">{task.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">
                    {task.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        task.priority === "high"
                          ? "bg-red-100 text-red-800"
                          : task.priority === "medium"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {task.priority}
                    </span>
                    <button className="text-gray-400 hover:text-gray-600">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
