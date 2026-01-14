import React, { useState, useEffect } from "react";
import { Box, Typography, Input, Checkbox, Stack, Card } from "@mui/joy";
import { Search } from "@mui/icons-material";

export default function AccountList({
  title,
  accounts = [],
  selectedIds = [],
  onSelect,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    setFiltered(
      accounts.filter((a) =>
        a.accountAlias.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, accounts]);

  const allFilteredIds = filtered.map((a) => a.id);
  const allSelectedInFiltered =
    filtered.length > 0 &&
    allFilteredIds.every((id) => selectedIds.includes(id));

  const handleSelectAll = () => {
    onSelect(allFilteredIds, !allSelectedInFiltered);
  };

  const handleCheckbox = (id) => {
    onSelect([id], !selectedIds.includes(id));
  };

  return (
    <Stack spacing={2}>
      <Typography level="title-sm">{title}</Typography>

      <Input
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        startDecorator={<Search />}
      />

      <Card
        sx={{
          maxHeight: 400,
          overflowY: "auto",
          display: "flex",
          alignItems: "center",
          justifyContent: accounts.length === 0 ? "center" : "flex-start",
        }}
      >
        {accounts.length === 0 ? (
          <Typography level="body-sm" color="neutral">
            No account assigned yet.
          </Typography>
        ) : filtered.length === 0 ? (
          <Typography level="body-sm" color="neutral">
            No matching accounts
          </Typography>
        ) : (
          <Stack spacing={1} width="100%">
            {/* Select all */}
            <label style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Checkbox
                checked={allSelectedInFiltered}
                onChange={handleSelectAll}
              />
              <Typography>Select All</Typography>
            </label>

            {filtered.map((acc) => (
              <label
                key={acc.id}
                style={{ display: "flex", alignItems: "center", gap: 6 }}
              >
                <Checkbox
                  checked={selectedIds.includes(acc.id)}
                  onChange={() => handleCheckbox(acc.id)}
                />
                <Typography noWrap>
                  {acc.accountAlias} ({acc.accountId})
                </Typography>
              </label>
            ))}
          </Stack>
        )}
      </Card>
    </Stack>
  );
}
