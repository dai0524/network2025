import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Container, TextField, Typography, Box } from '@mui/material';

const columns = [
  { field: 'id', headerName: '編號', width: 90 },
  { field: 'title', headerName: '名稱', flex: 1 },
  { field: 'location', headerName: '地點', flex: 1 },
  { field: 'price', headerName: '票價', flex: 1 },
];

function App() {
  const [rawData, setRawData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    fetch("https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=6")
      .then(res => res.json())
      .then(data => {
        const formatted = data.map((item, index) => ({
          id: index + 1,
          title: item.title,
          location: item.showInfo[0]?.location || "無資料",
          price: item.showInfo[0]?.price || "無資料"
        }));
        setRawData(formatted);
        setFilteredData(formatted);
      })
      .catch(err => {
        console.error("載入失敗", err);
        setRawData([]);
        setFilteredData([]);
      });
  }, []);

  useEffect(() => {
    const lowerKeyword = keyword.toLowerCase();
    const filtered = rawData.filter(item => item.title.toLowerCase().includes(lowerKeyword));
    setFilteredData(filtered);
  }, [keyword, rawData]);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>景點觀光展覽資訊</Typography>
      <TextField
        label="搜尋名稱關鍵字"
        variant="outlined"
        fullWidth
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Box sx={{ height: 500 }}>
        <DataGrid
          rows={filteredData}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
        />
      </Box>
    </Container>
  );
}

export default App;
