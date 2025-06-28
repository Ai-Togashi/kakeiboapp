import React from 'react';

interface TabNavProps {
  activeTab: 'input' | 'analysis' | 'history';
  setActiveTab: (tab: 'input' | 'analysis' | 'history') => void;
}

const TabNav: React.FC<TabNavProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex justify-center space-x-4 border-b pb-2 mb-4">
      <button
        onClick={() => setActiveTab('input')}
        className={`px-4 py-2 rounded-md font-medium transition ${
          activeTab === 'input'
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
        }`}
      >
        家計入力
      </button>
      <button
        onClick={() => setActiveTab('analysis')}
        className={`px-4 py-2 rounded-md font-medium transition ${
          activeTab === 'analysis'
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
        }`}
      >
        月別分析
      </button>
      <button
        onClick={() => setActiveTab('history')}
        className={`px-4 py-2 rounded-md font-medium transition ${
          activeTab === 'history'
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
        }`}
      >
        全履歴
      </button>
    </div>
  );
};

export default TabNav;
