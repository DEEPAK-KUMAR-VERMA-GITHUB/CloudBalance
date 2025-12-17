import * as React from 'react';
import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';
import IconButton from '@mui/joy/IconButton';
import Checkbox from '@mui/joy/Checkbox';
import Typography from '@mui/joy/Typography';
import Box from '@mui/joy/Box';
import Chip from '@mui/joy/Chip';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import Dropdown from '@mui/joy/Dropdown';
import Button from '@mui/joy/Button';
import FilterAltOutlined from '@mui/icons-material/FilterAltOutlined';
import ContentCopyOutlined from '@mui/icons-material/ContentCopyOutlined';
import ArrowUpward from '@mui/icons-material/ArrowUpward';
import ArrowDownward from '@mui/icons-material/ArrowDownward';
import SettingsOutlined from '@mui/icons-material/SettingsOutlined';

/* ===============================
   Enterprise Table
================================ */
export function ResourceTable({
  columns,
  data,
  sort,
  onSortChange,
  loadMore,
  hasMore,
  loading,
}) {
  const [colState, setColState] = React.useState(columns);

  /* ---------- column resize ---------- */
  const startResize = (e, id) => {
    const startX = e.clientX;
    const col = colState.find((c) => c.id === id);
    const startWidth = col.width || 160;

    const onMove = (ev) => {
      const delta = ev.clientX - startX;
      setColState((prev) =>
        prev.map((c) =>
          c.id === id ? { ...c, width: Math.max(80, startWidth + delta) } : c,
        ),
      );
    };

    const onUp = () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  };

  const visibleCols = colState.filter((c) => c.visible !== false);

  return (
    <Sheet variant="outlined" sx={{ borderRadius: 'md', overflow: 'auto' }}>
      {/* Toolbar */}
      <Box
        sx={{
          p: 1,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Typography level="title-sm">Resources</Typography>
        <Dropdown>
          <MenuButton size="sm" variant="outlined">
            <SettingsOutlined fontSize="small" /> Columns
          </MenuButton>
          <Menu>
            {colState.map((c) => (
              <MenuItem key={c.id}>
                <Checkbox
                  checked={c.visible !== false}
                  onChange={(e) =>
                    setColState((prev) =>
                      prev.map((x) =>
                        x.id === c.id ? { ...x, visible: e.target.checked } : x,
                      ),
                    )
                  }
                />
                <Typography level="body-sm">{c.header}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Dropdown>
      </Box>

      <Table
        stickyHeader
        hoverRow
        size="sm"
        sx={{
          '& thead th': {
            backgroundColor: 'primary.solidBg',
            color: 'primary.solidColor',
            whiteSpace: 'nowrap',
          },
          '& tbody tr:nth-of-type(odd)': {
            backgroundColor: 'background.level1',
          },
        }}
      >
        <thead>
          <tr>
            <th style={{ width: 40 }}>
              <Checkbox size="sm" />
            </th>
            {visibleCols.map((col) => (
              <th key={col.id} style={{ width: col.width || 160 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box
                    sx={{ display: 'flex', alignItems: 'center', gap: 0.5, flex: 1 }}
                  >
                    <Typography level="title-sm">{col.header}</Typography>
                    {col.sortable && (
                      <IconButton
                        size="sm"
                        variant="plain"
                        onClick={() =>
                          onSortChange({
                            id: col.id,
                            direction:
                              sort?.id === col.id && sort.direction === 'asc'
                                ? 'desc'
                                : 'asc',
                          })
                        }
                      >
                        {sort?.id === col.id ? (
                          sort.direction === 'asc' ? (
                            <ArrowUpward fontSize="inherit" />
                          ) : (
                            <ArrowDownward fontSize="inherit" />
                          )
                        ) : (
                          <FilterAltOutlined fontSize="inherit" />
                        )}
                      </IconButton>
                    )}
                  </Box>

                  {/* resize handle */}
                  <Box
                    onMouseDown={(e) => startResize(e, col.id)}
                    sx={{
                      width: 4,
                      cursor: 'col-resize',
                      height: '100%',
                    }}
                  />
                </Box>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx}>
              <td>
                <Checkbox size="sm" />
              </td>
              {visibleCols.map((col) => (
                <td key={col.id}>{col.accessor(row)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Cursor pagination */}
      {hasMore && (
        <Box sx={{ p: 1, textAlign: 'center' }}>
          <Button
            size="sm"
            loading={loading}
            variant="outlined"
            onClick={loadMore}
          >
            Load more
          </Button>
        </Box>
      )}
    </Sheet>
  );
}
