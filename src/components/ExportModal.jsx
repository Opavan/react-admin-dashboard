import { X, Download, FileJson, FileText } from 'lucide-react';
import { exportToCSV, exportToJSON, exportToTSV } from '../utils/exportUtils';

const ExportModal = ({ isOpen, onClose, data, filename, dataName }) => {
  if (!isOpen) return null;

  const exportOptions = [
    {
      format: 'CSV',
      icon: FileText,
      description: 'Comma-separated values',
      handler: () => {
        exportToCSV(data, filename);
        onClose();
      },
      color: 'text-green-600',
    },
    {
      format: 'JSON',
      icon: FileJson,
      description: 'JSON format',
      handler: () => {
        exportToJSON(data, filename);
        onClose();
      },
      color: 'text-blue-600',
    },
    {
      format: 'TSV',
      icon: FileText,
      description: 'Tab-separated values (Excel)',
      handler: () => {
        exportToTSV(data, filename);
        onClose();
      },
      color: 'text-orange-600',
    },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-lg font-bold text-gray-800">Export {dataName}</h2>
            <p className="text-sm text-gray-600 mt-1">
              {data?.length || 0} records ready to export
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Export Options */}
        <div className="p-6 space-y-3">
          {exportOptions.map((option) => {
            const Icon = option.icon;
            return (
              <button
                key={option.format}
                onClick={option.handler}
                className="w-full flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition"
              >
                <Icon size={24} className={option.color} />
                <div className="text-left flex-1">
                  <p className="font-semibold text-gray-800">{option.format}</p>
                  <p className="text-sm text-gray-600">{option.description}</p>
                </div>
                <Download size={18} className="text-gray-400" />
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-6 border-t bg-gray-50">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition text-gray-700 font-medium"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExportModal;
