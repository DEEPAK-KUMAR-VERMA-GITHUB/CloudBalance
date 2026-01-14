
export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const readTableStateFromUrl = (searchParams) => {
  const params = Object.fromEntries([...searchParams]);

  return {
    page: Number(params.page ?? 0),
    sortBy: params.sortBy ?? "createdAt",
    sortDir: params.sortDir ?? "desc",
    filters: Object.keys(params)
      .filter((k) => k.startsWith("f_"))
      .reduce((acc, k) => {
        acc[k.replace("f_", "")] = params[k];
        return acc;
      }, {}),
  };
};

export const writeTableStateToUrl = ({
  page,
  sortBy,
  sortDir,
  filters,
  setSearchParams,
}) => {
  const params = {
    page,
    sortBy,
    sortDir,
  };

  Object.entries(filters).forEach(([k, v]) => {
    if (v) params[`f_${k}`] = v;
  });

  setSearchParams(params, { replace: true });
};
