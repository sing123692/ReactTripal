import React, { useState, useEffect } from 'react';

function LoadingPage() {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // 调用数据加载函数，并在数据加载完成后设置isLoading为false
    setIsLoading(true);
    loadData().then(() => setIsLoading(false));
  }, []);

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <p>Data loaded successfully!</p>
      )}
    </div>
  );
}

async function loadData() {
  // 模拟加载数据的过程
  await new Promise(resolve => setTimeout(resolve, 2000));
}


export default LoadingPage;