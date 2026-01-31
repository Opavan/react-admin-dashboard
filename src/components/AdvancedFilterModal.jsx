import { X, RotateCcw } from 'lucide-react';

const AdvancedFilterModal = ({
  isOpen,
  onClose,
  onApply,
  filters,
  onFilterChange,
  filterOptions,
}) => {
  if (!isOpen) return null;

  const handleReset = () => {
    const resetFilters = {};
    Object.keys(filterOptions).forEach((key) => {
      resetFilters[key] = [];
    });
    onFilterChange(resetFilters);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-96 overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b sticky top-0 bg-white">
          <h2 className="text-lg font-bold text-gray-800">Advanced Filters</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Filters */}
        <div className="p-6 space-y-6">
          {Object.entries(filterOptions).map(([filterKey, options]) => (
            <div key={filterKey}>
              <h3 className="font-semibold text-gray-700 mb-3 capitalize">
                {filterKey.replace(/([A-Z])/g, ' $1').trim()}
              </h3>
              <div className="space-y-2">
                {options.map((option) => (
                  <label
                    key={option.value}
                    className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded"
                  >
                    <input
                      type="checkbox"
                      checked={filters[filterKey]?.includes(option.value) || false}
                      onChange={(e) => {
                        const newFilters = { ...filters };
                        if (e.target.checked) {
                          newFilters[filterKey] = [
                            ...(newFilters[filterKey] || []),
                            option.value,
                          ];
                        } else {
                          newFilters[filterKey] = (newFilters[filterKey] || []).filter(
                            (v) => v !== option.value
                          );
                        }
                        onFilterChange(newFilters);
                      }}
                      className="w-4 h-4 rounded cursor-pointer accent-blue-600"
                    />
                    <span className="text-gray-700 text-sm">{option.label}</span>
                    {option.count !== undefined && (
                      <span className="ml-auto text-xs text-gray-500">
                        ({option.count})
                      </span>
                    )}
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-6 border-t bg-gray-50 sticky bottom-0">
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition text-gray-700 font-medium"
          >
            <RotateCcw size={16} />
            Reset
          </button>
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-gray-700 font-medium"
          >
            Close
          </button>
          <button
            onClick={onApply}
            className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 transition text-white rounded-lg font-medium"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdvancedFilterModal;
