import * as React from 'react';
import Box from '@mui/joy/Box';
import Chip from '@mui/joy/Chip';
import Typography from '@mui/joy/Typography';
import IconButton from '@mui/joy/IconButton';
import ContentCopyOutlined from '@mui/icons-material/ContentCopyOutlined';
import { ResourceTable } from '../components/table/ResourceTable';

/* ===============================
   Mock cursor-based API
================================ */
const PAGE_SIZE = 10;

function mockFetchResources({ cursor, sort }) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const start = cursor ? Number(cursor) : 0;

      let items = Array.from({ length: PAGE_SIZE }).map((_, i) => {
        const idx = start + i + 1;
        return {
          id: `arn:aws:autoscaling:::resource-${idx}`,
          name: `ck-env-${idx}-ecs-asg`,
          region: 'N. Virginia',
          desired: Math.floor(Math.random() * 5) + 1,
          min: 0,
          max: 10,
          status: Math.random() > 0.3 ? 'RUNNING' : 'STOPPED',
        };
      });

      if (sort) {
        items.sort((a, b) => {
          if (a[sort.id] > b[sort.id]) return sort.direction === 'asc' ? 1 : -1;
          if (a[sort.id] < b[sort.id]) return sort.direction === 'asc' ? -1 : 1;
          return 0;
        });
      }

      resolve({
        items,
        nextCursor: start + PAGE_SIZE < 50 ? String(start + PAGE_SIZE) : null,
      });
    }, 700);
  });
}

/* ===============================
   Columns (JS only)
================================ */
export const resourceColumns = [
  {
    id: 'id',
    header: 'Resource ID',
    sortable: true,
    accessor: (r) => (
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        <Typography level="body-sm" color="primary">
          {r.id}
        </Typography>
        <IconButton
          size="sm"
          variant="plain"
          onClick={() => navigator.clipboard.writeText(r.id)}
        >
          <ContentCopyOutlined fontSize="inherit" />
        </IconButton>
      </Box>
    ),
  },
  { id: 'name', header: 'Resource Name', sortable: true, accessor: (r) => r.name },
  { id: 'region', header: 'Region', sortable: true, accessor: (r) => r.region },
  { id: 'desired', header: 'Desired', sortable: true, accessor: (r) => r.desired },
  { id: 'min', header: 'Min', accessor: (r) => r.min },
  { id: 'max', header: 'Max', accessor: (r) => r.max },
  {
    id: 'status',
    header: 'Status',
    accessor: (r) => (
      <Chip size="sm" color={r.status === 'RUNNING' ? 'success' : 'neutral'}>
        {r.status}
      </Chip>
    ),
  },
];

/* ===============================
   Preview Page
================================ */
export default function CostExplorer() {
  const [data, setData] = React.useState([]);
  const [cursor, setCursor] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [sort, setSort] = React.useState(null);

  const loadMore = async (reset = false) => {
    setLoading(true);
    const res = await mockFetchResources({
      cursor: reset ? null : cursor,
      sort,
    });
    setData((d) => (reset ? res.items : [...d, ...res.items]));
    setCursor(res.nextCursor);
    setLoading(false);
  };

  React.useEffect(() => {
    loadMore(true);
  }, [sort]);

  return (
    <Box sx={{ p: 2 }}>
      <ResourceTable
        columns={resourceColumns}
        data={data}
        sort={sort}
        onSortChange={setSort}
        loadMore={() => loadMore(false)}
        hasMore={!!cursor}
        loading={loading}
      />
    </Box>
  );
}
