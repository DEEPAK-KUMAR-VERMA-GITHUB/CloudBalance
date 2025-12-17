import * as React from 'react';
import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';
import IconButton from '@mui/joy/IconButton';
import Checkbox from '@mui/joy/Checkbox';
import Typography from '@mui/joy/Typography';
import Box from '@mui/joy/Box';
import Chip from '@mui/joy/Chip';
import FilterAltOutlined from '@mui/icons-material/FilterAltOutlined';
import ContentCopyOutlined from '@mui/icons-material/ContentCopyOutlined';

const rows = [
  {
    id: 'arn:aws:autoscaling:...1',
    name: 'ck-dev2-ue1-ecs-asg',
    region: 'N. Virginia',
    desired: 4,
    min: 0,
    max: 5,
    status: 'RUNNING',
  },
  {
    id: 'arn:aws:autoscaling:...2',
    name: 'ck-dev3-ue1-ecs-asg',
    region: 'N. Virginia',
    desired: 4,
    min: 3,
    max: 4,
    status: 'RUNNING',
  },
  {
    id: 'arn:aws:autoscaling:...3',
    name: 'ck-qa2-ue1-ecs-asg',
    region: 'N. Virginia',
    desired: 1,
    min: 0,
    max: 1,
    status: 'STOPPED',
  },
];

export default function ResourceTable() {
  return (
    <Sheet
      variant="outlined"
      sx={{
        borderRadius: 'md',
        overflow: 'auto',
        boxShadow: 'sm',
      }}
    >
      <Table
        stickyHeader
        hoverRow
        size="sm"
        sx={{
          '--Table-headerUnderlineThickness': '1px',
          '--TableCell-paddingX': '12px',
          '--TableCell-paddingY': '8px',
          '& thead th': {
            backgroundColor: 'primary.solidBg',
            color: 'primary.solidColor',
            fontWeight: 'lg',
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
            <th>
              <Header label="Resource ID" />
            </th>
            <th>
              <Header label="Resource Name" />
            </th>
            <th>
              <Header label="Region" />
            </th>
            <th>
              <Header label="Desired Capacity" />
            </th>
            <th>
              <Header label="Min Size" />
            </th>
            <th>
              <Header label="Max Size" />
            </th>
            <th>
              <Header label="Status" />
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              <td>
                <Checkbox size="sm" />
              </td>
              <td>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography level="body-sm" color="primary">
                    {row.id}
                  </Typography>
                  <IconButton
                    size="sm"
                    variant="plain"
                    onClick={() => navigator.clipboard.writeText(row.id)}
                  >
                    <ContentCopyOutlined fontSize="inherit" />
                  </IconButton>
                </Box>
              </td>
              <td>
                <Typography level="body-sm">{row.name}</Typography>
              </td>
              <td>
                <Typography level="body-sm">{row.region}</Typography>
              </td>
              <td>{row.desired}</td>
              <td>{row.min}</td>
              <td>{row.max}</td>
              <td>
                <Chip
                  size="sm"
                  variant="soft"
                  color={row.status === 'RUNNING' ? 'success' : 'neutral'}
                >
                  {row.status}
                </Chip>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Sheet>
  );
}

function Header({ label }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
      <Typography level="title-sm">{label}</Typography>
      <IconButton size="sm" variant="plain" sx={{ color: 'inherit' }}>
        <FilterAltOutlined fontSize="inherit" />
      </IconButton>
    </Box>
  );
}
