import React from 'react';

const TaskItem = ({ task, onToggle, onDelete }) => {
  // Helper to get color based on category
  const getCategoryColor = (category) => {
    switch (category.toLowerCase()) {
      case 'work': return 'bg-gradient-to-r from-blue-500 to-blue-600 text-white';
      case 'personal': return 'bg-gradient-to-r from-green-500 to-green-600 text-white';
      case 'shopping': return 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white';
      default: return 'bg-gradient-to-r from-gray-500 to-gray-600 text-white';
    }
  };

  return (
    <div className={`bg-white rounded-2xl shadow-lg border border-gray-100 p-6 transition-all duration-200 hover:shadow-xl ${task.isDone ? 'opacity-60' : 'hover:scale-[1.02]'}`}>
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0 mt-1">
          <input
            type="checkbox"
            checked={task.isDone}
            onChange={() => onToggle(task._id, !task.isDone)}
            className="h-6 w-6 rounded-lg border-2 border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-2 transition-all duration-200"
          />
        </div>
        
        <div className="flex-grow min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-grow">
              <h3 className={`text-lg font-semibold text-gray-800 mb-2 transition-all duration-200 ${task.isDone ? 'line-through text-gray-500' : ''}`}>
                {task.title}
              </h3>
              {task.description && (
                <p className={`text-sm text-gray-600 mb-3 ${task.isDone ? 'line-through' : ''}`}>
                  {task.description}
                </p>
              )}
            </div>
            
            <div className="flex items-center space-x-3 ml-4">
              <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getCategoryColor(task.category)} shadow-sm`}>
                {task.category.charAt(0).toUpperCase() + task.category.slice(1)}
              </span>
              
              <button 
                onClick={() => onDelete(task._id)} 
                className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 group"
              >
                <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
          
          {task.isDone && (
            <div className="flex items-center space-x-2 mt-3">
              <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm text-green-600 font-medium">Completed</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskItem;